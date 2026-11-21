import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  normalizeKissatenPersona,
  sanitizeAndParseKissatenReply,
  sanitizeConversationHistory,
} from './src/utils/kissatenResilience';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Increase payload limit for canvas base64 image evaluation
app.use(express.json({ limit: '25mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Generation endpoint for dynamic JLPT & Japanese learning queries
app.post('/api/gemini/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, systemInstruction, imageBase64, responseSchema, fastMode } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Chưa cấu hình GEMINI_API_KEY. Vui lòng kiểm tra Settings > Secrets.',
      });
    }

    const contents: any = [];
    if (imageBase64) {
      const mimeMatch = String(imageBase64).match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/);
      const detectedMime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const cleanBase64 = String(imageBase64).replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
      contents.push({
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType: detectedMime,
              data: cleanBase64,
            },
          },
          {
            text: prompt || 'Hãy phân tích hình ảnh tiếng Nhật này chi tiết.',
          },
        ],
      });
    } else {
      contents.push(prompt);
    }

    const config: any = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }
    if (responseSchema) {
      config.responseMimeType = 'application/json';
      config.responseSchema = responseSchema;
    }
    if (req.body.useGoogleSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const candidateModels = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'];

    let lastError: any = null;
    let responseText = '';
    let responseGrounding: any = null;

    for (const modelName of candidateModels) {
      try {
        const modelConfig: any = { ...config };
        if (fastMode && modelName === 'gemini-4-hydrogen') {
          modelConfig.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
        }

        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents: contents.length === 1 && typeof contents[0] === 'string' ? contents[0] : contents,
          config: modelConfig,
        });

        // Balanced timeout allowing ThinkingLevel.LOW + structured JSON completion without stalling
        const timeoutMs = fastMode ? 18000 : 28000;
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout on model ${modelName}`)), timeoutMs)
        );

        const response: any = await Promise.race([generatePromise, timeoutPromise]);

        if (response && response.text) {
          responseText = response.text;
          responseGrounding = response.candidates?.[0]?.groundingMetadata || null;
          break;
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const isQuota =
          err?.status === 429 ||
          errMsg.includes('429') ||
          errMsg.includes('RESOURCE_EXHAUSTED') ||
          errMsg.includes('Quota exceeded');

        if (isQuota) {
          console.info(`Gemini quota limit reached on ${modelName}, proceeding to next candidate or procedural data.`);
          break;
        }

        // If tools like googleSearch timed out or encountered issues, retry without tools
        if (config.tools && config.tools.length > 0) {
          console.info(`[Gemini] Retrying ${modelName} without external tools...`);
          try {
            const noToolsConfig = { ...config };
            delete noToolsConfig.tools;
            const fallbackResponse: any = await Promise.race([
              ai.models.generateContent({
                model: modelName,
                contents: contents.length === 1 && typeof contents[0] === 'string' ? contents[0] : contents,
                config: noToolsConfig,
              }),
              new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error(`Timeout without tools on ${modelName}`)), 20000)
              ),
            ]);
            if (fallbackResponse && fallbackResponse.text) {
              responseText = fallbackResponse.text;
              responseGrounding = fallbackResponse.candidates?.[0]?.groundingMetadata || null;
              break;
            }
          } catch (innerErr: any) {
            console.info(`[Gemini] Candidate ${modelName} fallback attempt ended: ${innerErr?.message?.substring(0, 60)}`);
          }
        } else {
          console.info(`[Gemini] Candidate ${modelName} unavailable, trying next candidate...`);
        }
      }
    }

    if (!responseText) {
      const isQuota =
        lastError?.status === 429 ||
        lastError?.message?.includes('429') ||
        lastError?.message?.includes('RESOURCE_EXHAUSTED');

      if (isQuota) {
        return res.status(429).json({
          error: 'Hạn mức Gemini Free Tier tạm thời hết trong ngày. Đang dùng tri thức nội bộ.',
          quotaExceeded: true,
          text: '',
        });
      }

      return res.status(503).json({
        error: lastError?.message || 'Dịch vụ AI đang bận',
        text: '',
      });
    }

    return res.json({
      text: responseText,
      groundingMetadata: responseGrounding,
      groundingChunks: responseGrounding?.groundingChunks || []
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error?.message || error);
    return res.status(500).json({
      error: error?.message || 'Lỗi khi gọi Gemini API',
    });
  }
});

// Dedicated Zero-Crash Chat Endpoint for Yoru no Kissaten (夜の喫茶店)
app.post('/api/kissaten/chat', async (req: Request, res: Response) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        code: 'MISSING_API_KEY',
        error: 'Chưa cấu hình GEMINI_API_KEY trong hệ thống. Vui lòng kiểm tra Settings > Secrets.',
      });
    }

    const rawUserMessage = typeof req.body?.userMessage === 'string' ? req.body.userMessage.trim() : '';
    if (!rawUserMessage) {
      return res.status(400).json({
        code: 'EMPTY_MESSAGE',
        error: 'Lời nhắn không được để trống.',
      });
    }

    // 1. Strict Persona Binding (never allows null/undefined for default, +3, or custom guests)
    const persona = normalizeKissatenPersona(req.body?.persona);

    // 2. Strict Role-Order Sanitization (user -> model -> user, 12-16 turn window)
    const { contents, openingContext } = sanitizeConversationHistory(
      req.body?.history,
      rawUserMessage,
      14
    );

    const systemInstruction = [
      persona.system_prompt,
      `Thông tin nhân vật: ID=${persona.persona_id} | Tên=${persona.name} (${persona.japaneseName}) | Nghề nghiệp=${persona.role} | Vùng miền=${persona.region} | Tầng ngôn ngữ=${persona.speech_style} | Đồ uống yêu thích=${persona.favoriteDrink}.`,
      openingContext ? `Lời chào mở đầu của bạn khi khách mới bước vào quán: 「${openingContext}」` : '',
      'QUY TẮC HỘI THOẠI QUÁN CÀ PHÊ ĐÊM SHOWA:',
      '- Chấp nhận mọi kiểu đầu vào từ khách: tiếng Nhật (Kanji/Hiragana/Katakana), Romaji, tiếng Việt thuần hoặc tiếng Việt pha tiếng Nhật. Nếu khách viết tiếng Việt hoặc Romaji, hãy thấu hiểu trọn vẹn cảm xúc và đáp lại bằng tiếng Nhật thật tự nhiên, ấm áp.',
      '- Trả về DUY NHẤT một đối tượng JSON ngắn gọn, hợp lệ theo schema quy định.',
      '- "japanese": 1–2 câu tiếng Nhật tự nhiên, súc tích, đúng tính cách vùng miền và văn phong nhân vật.',
      '- "furigana": chính xác câu "japanese" nhưng gắn cách đọc Hiragana ngay sau cụm Kanji theo dạng Kanji[kana] (ví dụ: 今夜[こんや]は静[しず]かですね。珈琲[コーヒー]をどうぞ。).',
      '- "reading": toàn bộ câu "japanese" viết bằng Hiragana để đọc âm.',
      '- "vietnamese": bản dịch sắc thái tiếng Việt tinh tế, gọn gàng.',
      '- "uchiSotoNote": 1 câu tiếng Việt ngắn gọn, nhẹ nhàng về sắc thái Uchi/Soto (hoặc chuỗi rỗng nếu chưa cần).',
      '- "aizuchiHints": đúng 3 gợi ý câu đệm lời Aizuchi ngắn gọn để khách nối chuyện.',
    ]
      .filter(Boolean)
      .join('\n');

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        japanese: { type: Type.STRING },
        furigana: { type: Type.STRING },
        reading: { type: Type.STRING },
        vietnamese: { type: Type.STRING },
        uchiSotoNote: { type: Type.STRING },
        aizuchiHints: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              japanese: { type: Type.STRING },
              reading: { type: Type.STRING },
              vietnamese: { type: Type.STRING },
              registerNote: { type: Type.STRING },
            },
            required: ['japanese', 'reading', 'vietnamese', 'registerNote'],
          },
        },
      },
      required: ['japanese', 'furigana', 'reading', 'vietnamese'],
    };

    // Prioritize gemini-4-hydrogen (with LOW thinking) and fallback to gemini-3.1-flash-lite
    const candidateModels = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'];
    let lastError: any = null;
    let rawOutput = '';
    let modelUsed = '';

    for (let idx = 0; idx < candidateModels.length; idx++) {
      const modelName = candidateModels[idx];
      try {
        const modelConfig: any = {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema,
        };
        if (modelName === 'gemini-4-hydrogen') {
          modelConfig.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
        }

        const response: any = await Promise.race([
          ai.models.generateContent({
            model: modelName,
            contents,
            config: modelConfig,
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout on ${modelName}`)), 22000)
          ),
        ]);

        if (response && typeof response.text === 'string' && response.text.trim()) {
          rawOutput = response.text;
          modelUsed = modelName;
          break;
        }
      } catch (err: any) {
        lastError = err;
        const msg = err?.message || String(err);
        const status = err?.status || err?.code;
        console.info(`[Kissaten API] Attempt ${idx + 1} (${modelName}) issue:`, msg.slice(0, 120));

        // If schema enforcement rejected a subtle format issue, retry same model in free JSON mode
        if (status === 400 && !msg.includes('API_KEY')) {
          try {
            const looseResponse: any = await Promise.race([
              ai.models.generateContent({
                model: modelName,
                contents,
                config: {
                  systemInstruction,
                  ...(modelName === 'gemini-4-hydrogen'
                    ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
                    : {}),
                },
              }),
              new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error(`Loose timeout on ${modelName}`)), 20000)
              ),
            ]);
            if (looseResponse && typeof looseResponse.text === 'string' && looseResponse.text.trim()) {
              rawOutput = looseResponse.text;
              modelUsed = `${modelName}-loose`;
              break;
            }
          } catch (looseErr: any) {
            lastError = looseErr;
          }
        }

        if (status === 429 || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
          break;
        }
        if (status === 403 || msg.includes('PERMISSION_DENIED') || msg.includes('API_KEY_INVALID')) {
          break;
        }
      }
    }

    if (!rawOutput) {
      const msg = lastError?.message || '';
      const status = lastError?.status || lastError?.code;
      if (status === 429 || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
        return res.status(429).json({
          code: 'QUOTA_EXCEEDED',
          error: 'Hết hạn mức gọi AI tạm thời (429). Vui lòng đợi giây lát rồi bấm Gửi lại.',
        });
      }
      if (status === 403 || msg.includes('PERMISSION_DENIED') || msg.includes('API_KEY_INVALID')) {
        return res.status(403).json({
          code: 'AUTH_ERROR',
          error: 'Khóa API chưa hợp lệ hoặc thiếu quyền truy cập (403). Kiểm tra Settings > Secrets.',
        });
      }
      if (msg.toLowerCase().includes('timeout')) {
        return res.status(504).json({
          code: 'TIMEOUT',
          error: 'Kết nối tới máy chủ AI quá thời gian chờ (Timeout). Hãy bấm Gửi lại.',
        });
      }
      return res.status(503).json({
        code: 'UPSTREAM_UNAVAILABLE',
        error: 'Máy chủ AI đang bận tạm thời (503). Hãy bấm Gửi lại.',
      });
    }

    // 3. Bulletproof 3-Tier JSON Sanitizer & Graceful Fallback Parser (NEVER crashes on malformed JSON)
    const parsedReply = sanitizeAndParseKissatenReply(rawOutput, persona);
    if (!parsedReply) {
      return res.status(503).json({
        code: 'EMPTY_PARSED_REPLY',
        error: 'Phản hồi từ AI trống. Hãy bấm Gửi lại.',
      });
    }

    return res.json({
      ok: true,
      persona_id: persona.persona_id,
      modelUsed,
      rescued: Boolean(parsedReply.rescued),
      reply: parsedReply,
    });
  } catch (error: any) {
    console.error('[Kissaten API] Fatal route error:', error?.message || error);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      error: error?.message || 'Lỗi nội bộ máy chủ khi xử lý hội thoại.',
    });
  }
});

// Zero-Latency SSE Streaming endpoint for real-time AI Sensei token output
app.post('/api/gemini/stream', async (req: Request, res: Response) => {
  try {
    const { prompt, systemInstruction, fastMode = true } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Chưa cấu hình GEMINI_API_KEY. Vui lòng kiểm tra Settings > Secrets.',
      });
    }

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Thiếu nội dung prompt.' });
    }

    const candidateModels = fastMode
      ? ['gemini-3.1-flash-lite', 'gemini-4-hydrogen']
      : ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'];
    let streamStarted = false;
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const config: any = {};
        if (systemInstruction) {
          config.systemInstruction = systemInstruction;
        }
        if (modelName === 'gemini-4-hydrogen') {
          config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
        }

        const streamResponse = await ai.models.generateContentStream({
          model: modelName,
          contents: prompt,
          config,
        });

        for await (const chunk of streamResponse) {
          const chunkText = chunk?.text;
          if (chunkText) {
            if (!streamStarted) {
              streamStarted = true;
              res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
              res.setHeader('Cache-Control', 'no-cache, no-transform');
              res.setHeader('Connection', 'keep-alive');
              res.setHeader('X-Accel-Buffering', 'no');
              res.flushHeaders?.();
            }
            res.write(`data: ${JSON.stringify({ chunk: chunkText })}\n\n`);
          }
        }

        if (streamStarted) {
          res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
          res.end();
          return;
        }
      } catch (err: any) {
        lastError = err;
        if (streamStarted) {
          res.write(`data: ${JSON.stringify({ done: true, error: err?.message || 'Stream interrupted' })}\n\n`);
          res.end();
          return;
        }
        const errMsg = err?.message || String(err);
        if (err?.status === 429 || errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')) {
          break;
        }
      }
    }

    if (!res.headersSent) {
      return res.status(503).json({
        error: lastError?.message || 'Dịch vụ AI Stream tạm thời bận',
      });
    }
  } catch (error: any) {
    if (!res.headersSent) {
      return res.status(500).json({
        error: error?.message || 'Lỗi kết nối stream',
      });
    }
    res.end();
  }
});

// Gemini Native TTS endpoint with PCM-to-WAV wrapper for browser playback & Web Audio pitch modulation
function wrapPcmAsWavBase64(pcmBase64: string, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): string {
  const pcmBuffer = Buffer.from(pcmBase64, 'base64');
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const wavHeader = Buffer.alloc(44);

  wavHeader.write('RIFF', 0);
  wavHeader.writeUInt32LE(36 + pcmBuffer.length, 4);
  wavHeader.write('WAVE', 8);
  wavHeader.write('fmt ', 12);
  wavHeader.writeUInt32LE(16, 16);
  wavHeader.writeUInt16LE(1, 20);
  wavHeader.writeUInt16LE(numChannels, 22);
  wavHeader.writeUInt32LE(sampleRate, 24);
  wavHeader.writeUInt32LE(byteRate, 28);
  wavHeader.writeUInt16LE(blockAlign, 32);
  wavHeader.writeUInt16LE(bitsPerSample, 34);
  wavHeader.write('data', 36);
  wavHeader.writeUInt32LE(pcmBuffer.length, 40);

  return Buffer.concat([wavHeader, pcmBuffer]).toString('base64');
}

app.post('/api/gemini/tts', async (req: Request, res: Response) => {
  try {
    const { text, voiceName = 'Kore', stylePrompt } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Thiếu nội dung text để tổng hợp giọng nói.' });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'No API Key', fallbackToWebSpeech: true });
    }

    const ttsPrompt = stylePrompt
      ? `${stylePrompt}: ${text}`
      : `Speak this Japanese sentence in natural standard Tokyo NHK pitch accent clearly: ${text}`;

    const ttsModels = ['gemini-3.8-flash-lite-tts', 'gemini-3.8-flash-tts'];
    let lastError: any = null;

    for (const modelName of ttsModels) {
      try {
        const ttsResponse: any = await Promise.race([
          ai.models.generateContent({
            model: modelName,
            contents: [{ role: 'user', parts: [{ text: ttsPrompt }] }],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName },
                },
              },
            } as any,
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`TTS timeout on ${modelName}`)), 18000)
          ),
        ]);

        const parts = ttsResponse?.candidates?.[0]?.content?.parts || [];
        const audioPart = parts.find((p: any) => p.inlineData?.data);
        if (audioPart?.inlineData?.data) {
          const rawMime: string = audioPart.inlineData.mimeType || 'audio/L16;rate=24000';
          const isRawPcm = rawMime.includes('L16') || rawMime.includes('pcm');
          const rateMatch = rawMime.match(/rate=(\d+)/);
          const sampleRate = rateMatch ? Number(rateMatch[1]) : 24000;

          const audioBase64 = isRawPcm
            ? wrapPcmAsWavBase64(audioPart.inlineData.data, sampleRate)
            : audioPart.inlineData.data;

          return res.json({
            audioBase64,
            mimeType: isRawPcm ? 'audio/wav' : rawMime,
            modelUsed: modelName,
          });
        }
      } catch (err: any) {
        lastError = err;
        console.info(`[Gemini TTS] ${modelName} fallback: ${err?.message?.substring(0, 80)}`);
      }
    }

    return res.status(503).json({
      error: lastError?.message || 'Gemini TTS không khả dụng lúc này',
      fallbackToWebSpeech: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message || 'TTS Error',
      fallbackToWebSpeech: true,
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Kotoba Infinity API' });
});

// Setup Vite dev server or static file serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

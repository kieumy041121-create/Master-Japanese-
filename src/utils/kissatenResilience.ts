/**
 * Yoru no Kissaten — Zero-Crash Resilience Engine
 * Shared isomorphic utilities for:
 * 1) Strict Persona Payload Normalization (default + AI +3 + custom guests)
 * 2) Role-Order Conversation History Sanitization (user -> model -> user, 12-16 turn window)
 * 3) Bulletproof JSON Sanitizer & 3-Tier Graceful Fallback Parser
 * 4) Ruby Furigana Token Builder & Showa Persona Waiting States
 */

export interface KissatenRubyToken {
  text: string;
  reading?: string;
}

export interface KissatenAizuchiHint {
  japanese: string;
  reading: string;
  vietnamese: string;
  registerNote: string;
}

export interface NormalizedKissatenPersona {
  persona_id: string;
  id: string;
  name: string;
  japaneseName: string;
  role: string;
  region: string;
  speech_style: string;
  speechRegister:
    | 'Teineigo trầm ấm'
    | 'Tameguchi thân thiện'
    | 'Kansai-ben nhẹ'
    | 'Cổ điển lịch thiệp'
    | 'Đời thường Tokyo';
  favoriteDrink: string;
  avatarKanji: string;
  accentColor: string;
  bio: string;
  openingGreeting: string;
  openingReading: string;
  openingVietnamese: string;
  system_prompt: string;
  systemPersonaPrompt: string;
  isCustom?: boolean;
  createdAt: number;
}

export interface SanitizedChatTurn {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export interface KissatenHistoryInput {
  id?: string;
  sender?: 'user' | 'persona' | string;
  japanese?: string;
  status?: 'sent' | 'failed' | string;
}

export interface ParsedKissatenReply {
  japanese: string;
  tokens: KissatenRubyToken[];
  reading: string;
  vietnamese: string;
  uchiSotoNote: string;
  aizuchiHints: KissatenAizuchiHint[];
  rescued?: boolean;
}

const VALID_SPEECH_REGISTERS: NormalizedKissatenPersona['speechRegister'][] = [
  'Teineigo trầm ấm',
  'Tameguchi thân thiện',
  'Kansai-ben nhẹ',
  'Cổ điển lịch thiệp',
  'Đời thường Tokyo',
];

const KANJI_REGEX = /[\u4e00-\u9faf\u3400-\u4dbf々]/;
const JAPANESE_CHAR_REGEX = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/;

export const FALLBACK_AIZUCHI_HINTS: KissatenAizuchiHint[] = [
  {
    japanese: 'なるほど、そうなんですね。もう少し聞かせてください。',
    reading: 'なるほど、そうなんですね。もうすこしきかせてください。',
    vietnamese: 'Ra là vậy ạ. Bạn kể thêm một chút nữa được không?',
    registerNote: 'Aizuchi lắng nghe tinh tế (Teineigo)',
  },
  {
    japanese: 'わかります、なんだか気持ちが軽くなりますね。',
    reading: 'わかります、なんだかきもちがかるくなりますね。',
    vietnamese: 'Mình hiểu cảm giác đó, nghe thấy nhẹ lòng hẳn ra.',
    registerNote: 'Đệm lời đồng cảm ấm áp',
  },
  {
    japanese: '今夜の珈琲、すごく落ち着きますね。',
    reading: 'こんやのコーヒー、すごくおちつきますね。',
    vietnamese: 'Tách cà phê đêm nay thật khiến lòng bình yên quá.',
    registerNote: 'Chuyển mạch tự nhiên không gian quán đêm',
  },
];

function cleanStr(val: unknown, fallback = ''): string {
  if (typeof val !== 'string') return fallback;
  const trimmed = val.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

/**
 * Guarantees every persona (default, AI +3, or user-created custom guest) has valid,
 * non-null/non-undefined fields before binding to the AI API payload.
 */
export function normalizeKissatenPersona(raw: Partial<Record<string, any>> | null | undefined): NormalizedKissatenPersona {
  const src = raw && typeof raw === 'object' ? raw : {};
  const id = cleanStr(src.id || src.persona_id, `persona_guest_${Date.now()}`);
  const japaneseName = cleanStr(src.japaneseName || src.name, '健二マスター');
  const role = cleanStr(src.role, 'Vị khách quen tại quán cà phê đêm Showa');
  const name = cleanStr(src.name, `${japaneseName} · ${role}`);
  const region = cleanStr(src.region, 'Tokyo');

  const rawRegister = cleanStr(src.speechRegister || src.speech_style, 'Teineigo trầm ấm');
  const speechRegister = VALID_SPEECH_REGISTERS.includes(
    rawRegister as NormalizedKissatenPersona['speechRegister']
  )
    ? (rawRegister as NormalizedKissatenPersona['speechRegister'])
    : 'Teineigo trầm ấm';

  const favoriteDrink = cleanStr(src.favoriteDrink, 'Cà phê pha phin vải (Nel-drip)');
  const avatarKanji = cleanStr(src.avatarKanji, japaneseName.charAt(0) || '客').slice(0, 1);
  const accentColor =
    typeof src.accentColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(src.accentColor)
      ? src.accentColor
      : '#B47B44';

  const bio = cleanStr(
    src.bio,
    `Một vị khách trầm lắng đến từ ${region}, thích thưởng thức ${favoriteDrink} trong không gian yên tĩnh của quán cà phê đêm.`
  );

  const openingGreeting = cleanStr(
    src.openingGreeting,
    'こんばんは。静かな夜ですね。ゆっくりお話ししましょうか。'
  );
  const openingReading = cleanStr(
    src.openingReading,
    'こんばんは。しずかなよるですね。ゆっくりおはなししましょうか。'
  );
  const openingVietnamese = cleanStr(
    src.openingVietnamese,
    'Chào buổi tối. Đêm nay yên tĩnh quá, mình ngồi trò chuyện thong thả một chút nhé?'
  );

  const defaultPrompt = `Bạn là ${japaneseName} (${name}), nghề nghiệp: ${role}, đến từ ${region}. Văn phong giao tiếp: ${speechRegister}. Đồ uống yêu thích: ${favoriteDrink}. Hãy trò chuyện bằng tiếng Nhật tự nhiên chuẩn bản xứ, ấm áp, tinh tế và giàu lòng Omoiyari. Không chấm điểm hay sửa lỗi khô khan.`;
  const systemPrompt = cleanStr(src.systemPersonaPrompt || src.system_prompt, defaultPrompt);

  return {
    persona_id: id,
    id,
    name,
    japaneseName,
    role,
    region,
    speech_style: speechRegister,
    speechRegister,
    favoriteDrink,
    avatarKanji,
    accentColor,
    bio,
    openingGreeting,
    openingReading,
    openingVietnamese,
    system_prompt: systemPrompt,
    systemPersonaPrompt: systemPrompt,
    isCustom: Boolean(src.isCustom),
    createdAt: typeof src.createdAt === 'number' && Number.isFinite(src.createdAt) ? src.createdAt : Date.now(),
  };
}

/**
 * Enforces strict Gemini alternating turn order: user -> model -> user.
 * - Filters empty or failed messages.
 * - Extracts any leading model opening greeting into `openingContext` so contents always starts with `user`.
 * - Merges consecutive messages of the same role.
 * - Keeps a clean sliding window of the last `maxTurns` (12-16) turns and always ends with `user`.
 */
export function sanitizeConversationHistory(
  history: KissatenHistoryInput[] | null | undefined,
  currentUserMessage: string,
  maxTurns = 14
): { contents: SanitizedChatTurn[]; openingContext: string } {
  const safeUserMessage = cleanStr(currentUserMessage);
  const rawList = Array.isArray(history) ? history : [];

  const cleaned: Array<{ role: 'user' | 'model'; text: string }> = [];
  for (const item of rawList) {
    if (!item || typeof item !== 'object') continue;
    if (item.status === 'failed') continue;
    const text = cleanStr(item.japanese);
    if (!text) continue;
    const role: 'user' | 'model' = item.sender === 'user' ? 'user' : 'model';
    cleaned.push({ role, text });
  }

  // Pull out any leading model greetings before the first user turn
  const openingParts: string[] = [];
  while (cleaned.length > 0 && cleaned[0].role === 'model') {
    const first = cleaned.shift();
    if (first) openingParts.push(first.text);
  }

  // Merge consecutive identical roles
  const alternating: Array<{ role: 'user' | 'model'; text: string }> = [];
  for (const turn of cleaned) {
    const prev = alternating[alternating.length - 1];
    if (prev && prev.role === turn.role) {
      if (!prev.text.includes(turn.text)) {
        prev.text = `${prev.text}\n${turn.text}`;
      }
    } else {
      alternating.push({ ...turn });
    }
  }

  // Ensure the latest user message is present at the very end as a user turn
  if (safeUserMessage) {
    const last = alternating[alternating.length - 1];
    if (!last) {
      alternating.push({ role: 'user', text: safeUserMessage });
    } else if (last.role === 'user') {
      if (!last.text.endsWith(safeUserMessage)) {
        last.text = `${last.text}\n${safeUserMessage}`;
      }
    } else {
      alternating.push({ role: 'user', text: safeUserMessage });
    }
  }

  // Trim to sliding context window (12-16 turns) while preserving leading `user` role
  const windowSize = Math.max(4, Math.min(16, maxTurns));
  let trimmed = alternating.slice(-windowSize);
  while (trimmed.length > 0 && trimmed[0].role !== 'user') {
    trimmed.shift();
  }

  // Safety guarantee: never return empty contents if user sent text
  if (trimmed.length === 0 && safeUserMessage) {
    trimmed = [{ role: 'user', text: safeUserMessage }];
  }

  return {
    contents: trimmed.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
    openingContext: openingParts.join('\n'),
  };
}

/**
 * Repairs common LLM JSON syntax defects without corrupting Japanese quotes (「」/『』):
 * - Strips markdown code fences & BOM
 * - Escapes raw newlines / tabs / control chars inside JSON string literals
 * - Removes trailing commas before } or ]
 */
export function repairRawJsonString(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';

  // Remove BOM and markdown fences
  let text = raw
    .replace(/^\uFEFF/, '')
    .replace(/```(?:json|JSON)?\s*/g, '')
    .replace(/```/g, '')
    .trim();

  // Extract outermost balanced JSON object if prose surrounds it
  const firstOpen = text.indexOf('{');
  const lastClose = text.lastIndexOf('}');
  if (firstOpen !== -1 && lastClose > firstOpen) {
    text = text.slice(firstOpen, lastClose + 1);
  }

  // Escape unescaped control characters inside string literals while leaving structure intact
  let result = '';
  let inString = false;
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) {
        result += ch;
        escaped = false;
      } else if (ch === '\\') {
        result += ch;
        escaped = true;
      } else if (ch === '"') {
        result += ch;
        inString = false;
      } else if (ch === '\n') {
        result += '\\n';
      } else if (ch === '\r') {
        result += '\\r';
      } else if (ch === '\t') {
        result += '\\t';
      } else {
        const code = ch.charCodeAt(0);
        if (code < 0x20) {
          result += ' ';
        } else {
          result += ch;
        }
      }
    } else {
      if (ch === '"') {
        inString = true;
      }
      result += ch;
    }
  }

  // Remove trailing commas before closing } or ]
  result = result.replace(/,\s*([}\]])/g, '$1');

  return result;
}

/**
 * Extracts a single string field via tolerant regex when JSON is partially broken or truncated.
 */
function rescueStringField(source: string, fieldName: string): string {
  const regex = new RegExp(`"${fieldName}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's');
  const match = source.match(regex);
  if (match && match[1]) {
    try {
      return JSON.parse(`"${match[1].replace(/\n/g, '\\n').replace(/\r/g, '')}"`).trim();
    } catch {
      return match[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .trim();
    }
  }

  // Handle truncated last field where closing quote was cut off
  const openRegex = new RegExp(`"${fieldName}"\\s*:\\s*"([^"{}\\[\\]]+)`, 's');
  const openMatch = source.match(openRegex);
  if (openMatch && openMatch[1]) {
    return openMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').trim();
  }

  return '';
}

/**
 * Deterministically parses compact inline Furigana markup like:
 *   "今夜[こんや]は静[しず]かですね。珈琲[コーヒー]をどうぞ。"
 * into granular RubyToken[] for <ruby>Kanji<rt>kana</rt></ruby> rendering.
 */
export function parseInlineFuriganaToTokens(annotated: string): KissatenRubyToken[] {
  const src = cleanStr(annotated);
  if (!src || !src.includes('[') || !src.includes(']')) return [];

  const tokens: KissatenRubyToken[] = [];
  // Match Kanji/iteration-mark cluster (optional leading/trailing spaces stripped) followed by [reading]
  const regex = /([\u4e00-\u9faf\u3400-\u4dbf々]+)\[([^\[\]\n]{1,24})\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(src)) !== null) {
    if (match.index > lastIndex) {
      const plain = src.slice(lastIndex, match.index);
      if (plain) tokens.push({ text: plain });
    }
    const base = match[1];
    const reading = match[2].trim();
    if (base) {
      tokens.push(reading && reading !== base ? { text: base, reading } : { text: base });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < src.length) {
    const tail = src.slice(lastIndex);
    if (tail) tokens.push({ text: tail });
  }

  return tokens.some((t) => Boolean(t.reading)) ? tokens : [];
}

/**
 * Validates and normalizes Ruby tokens for <ruby> Furigana rendering.
 * Supports: (1) compact inline `furigana` markup, (2) explicit `tokens` array, (3) safe fallback.
 */
export function normalizeRubyTokens(
  tokensInput: unknown,
  japanese: string,
  reading?: string,
  furiganaMarkup?: string
): KissatenRubyToken[] {
  const cleanJp = cleanStr(japanese);
  if (!cleanJp) return [];

  // Prefer compact inline Kanji[kana] markup (fast & accurate)
  if (typeof furiganaMarkup === 'string' && furiganaMarkup.trim()) {
    const parsedInline = parseInlineFuriganaToTokens(furiganaMarkup);
    if (parsedInline.length > 0) {
      return parsedInline;
    }
  }

  // Also check if japanese itself accidentally contains inline markup
  if (cleanJp.includes('[') && cleanJp.includes(']')) {
    const parsedFromJp = parseInlineFuriganaToTokens(cleanJp);
    if (parsedFromJp.length > 0) {
      return parsedFromJp;
    }
  }

  if (Array.isArray(tokensInput) && tokensInput.length > 0) {
    const valid: KissatenRubyToken[] = [];
    for (const item of tokensInput) {
      if (!item || typeof item !== 'object') continue;
      const text = typeof (item as any).text === 'string' ? (item as any).text : '';
      if (!text) continue;
      const rawReading = typeof (item as any).reading === 'string' ? (item as any).reading.trim() : '';
      const shouldAttachReading = Boolean(rawReading) && KANJI_REGEX.test(text) && rawReading !== text;
      valid.push(shouldAttachReading ? { text, reading: rawReading } : { text });
    }
    const joined = valid.map((t) => t.text).join('');
    if (valid.length > 0 && joined.length >= Math.max(1, Math.floor(cleanJp.length * 0.6))) {
      return valid;
    }
  }

  // Fallback: if no Kanji, just return single plain token
  if (!KANJI_REGEX.test(cleanJp)) {
    return [{ text: cleanJp }];
  }

  const cleanReading = cleanStr(reading);
  if (cleanReading && cleanJp.length <= 16 && !/[。、！？\n]/.test(cleanJp)) {
    return [{ text: cleanJp, reading: cleanReading }];
  }

  return [{ text: cleanJp }];
}

function normalizeAizuchiHints(rawHints: unknown): KissatenAizuchiHint[] {
  if (!Array.isArray(rawHints)) return [...FALLBACK_AIZUCHI_HINTS];

  const valid: KissatenAizuchiHint[] = [];
  for (const item of rawHints) {
    if (!item || typeof item !== 'object') continue;
    const jp = cleanStr((item as any).japanese);
    if (!jp) continue;
    valid.push({
      japanese: jp,
      reading: cleanStr((item as any).reading, jp),
      vietnamese: cleanStr((item as any).vietnamese, 'Câu đệm lời tự nhiên tiếp nối câu chuyện.'),
      registerNote: cleanStr((item as any).registerNote, 'Aizuchi tự nhiên'),
    });
  }

  // Pad to 3 items with safe defaults if AI returned fewer
  let idx = 0;
  while (valid.length < 3 && idx < FALLBACK_AIZUCHI_HINTS.length) {
    const candidate = FALLBACK_AIZUCHI_HINTS[idx++];
    if (!valid.some((v) => v.japanese === candidate.japanese)) {
      valid.push(candidate);
    }
  }

  return valid.slice(0, 3);
}

/**
 * 3-Tier Bulletproof JSON Sanitizer & Graceful Fallback Parser for Yoru no Kissaten.
 * NEVER throws on malformed JSON or missing optional fields.
 */
export function sanitizeAndParseKissatenReply(
  rawText: string,
  persona?: Partial<NormalizedKissatenPersona>
): ParsedKissatenReply | null {
  const safeRaw = typeof rawText === 'string' ? rawText.trim() : '';
  if (!safeRaw) return null;

  // TIER 1: Clean JSON repair & standard JSON.parse
  try {
    const repaired = repairRawJsonString(safeRaw);
    if (repaired.startsWith('{') && repaired.endsWith('}')) {
      const parsed = JSON.parse(repaired);
      if (parsed && typeof parsed === 'object') {
        const rawJp = cleanStr(parsed.japanese || parsed.reply || parsed.text || parsed.message);
        if (rawJp) {
          const furiganaMarkup = cleanStr(parsed.furigana, '');
          // Strip inline [reading] brackets from clean japanese string if model placed them there
          const jp = rawJp.replace(/([\u4e00-\u9faf\u3400-\u4dbf々]+)\[[^\[\]\n]{1,24}\]/g, '$1');
          const reading = cleanStr(parsed.reading, jp);
          const vietnamese = cleanStr(
            parsed.vietnamese || parsed.translation,
            'Lời hồi đáp ấm áp từ vị khách trong quán cà phê đêm.'
          );
          const uchiSotoNote = cleanStr(parsed.uchiSotoNote, '');
          const tokens = normalizeRubyTokens(parsed.tokens, jp, reading, furiganaMarkup || rawJp);
          const aizuchiHints = normalizeAizuchiHints(parsed.aizuchiHints);
          return {
            japanese: jp,
            tokens,
            reading,
            vietnamese,
            uchiSotoNote,
            aizuchiHints,
            rescued: false,
          };
        }
      }
    }
  } catch {
    // Proceed to Tier 2 Rescue
  }

  // TIER 2: Field-by-field regex extraction from broken/truncated JSON
  const cleanedForRegex = safeRaw.replace(/```(?:json|JSON)?/g, '').replace(/```/g, '');
  const rescuedRawJp =
    rescueStringField(cleanedForRegex, 'japanese') ||
    rescueStringField(cleanedForRegex, 'reply') ||
    rescueStringField(cleanedForRegex, 'message');

  if (rescuedRawJp) {
    const rescuedFurigana = rescueStringField(cleanedForRegex, 'furigana');
    const rescuedJp = rescuedRawJp.replace(/([\u4e00-\u9faf\u3400-\u4dbf々]+)\[[^\[\]\n]{1,24}\]/g, '$1');
    const rescuedReading = rescueStringField(cleanedForRegex, 'reading') || rescuedJp;
    const rescuedVi =
      rescueStringField(cleanedForRegex, 'vietnamese') ||
      'Vị khách khẽ mỉm cười đáp lại trong không gian tĩnh lặng của quán đêm.';
    const rescuedUchiSoto = rescueStringField(cleanedForRegex, 'uchiSotoNote') || '';
    return {
      japanese: rescuedJp,
      tokens: normalizeRubyTokens(null, rescuedJp, rescuedReading, rescuedFurigana || rescuedRawJp),
      reading: rescuedReading,
      vietnamese: rescuedVi,
      uchiSotoNote: rescuedUchiSoto,
      aizuchiHints: [...FALLBACK_AIZUCHI_HINTS],
      rescued: true,
    };
  }

  // TIER 3: Raw natural prose rescue (if AI ignored JSON instructions and answered in plain text)
  const plainLines = cleanedForRegex
    .split(/\r?\n/)
    .map((l) => l.replace(/^["'{}\[\],\s]+|["'{}\[\],\s]+$/g, '').trim())
    .filter((l) => l.length > 0 && !/^(japanese|reading|vietnamese|uchiSotoNote|aizuchiHints|tokens)\s*:/i.test(l));

  const jpLines = plainLines.filter((l) => JAPANESE_CHAR_REGEX.test(l));
  const viLines = plainLines.filter((l) => !JAPANESE_CHAR_REGEX.test(l) && /[a-zA-ZÀ-ỹ]/.test(l));

  if (jpLines.length > 0) {
    const jpText = jpLines.slice(0, 3).join(' ');
    const viText =
      viLines.slice(0, 2).join(' ') ||
      `${persona?.japaneseName || 'Vị khách'} vừa nhẹ nhàng đáp lời bạn.`;
    return {
      japanese: jpText,
      tokens: normalizeRubyTokens(null, jpText, jpText),
      reading: jpText,
      vietnamese: viText,
      uchiSotoNote: '',
      aizuchiHints: [...FALLBACK_AIZUCHI_HINTS],
      rescued: true,
    };
  }

  // Last resort if the model returned non-Japanese plain text
  if (plainLines.length > 0) {
    const fallbackJp = 'ええ、ゆっくりお話ししましょう。今夜はお時間がありますから。';
    return {
      japanese: fallbackJp,
      tokens: normalizeRubyTokens(null, fallbackJp),
      reading: 'ええ、ゆっくりおはなししましょう。こんやはおじかんがありますから。',
      vietnamese: plainLines.slice(0, 2).join(' '),
      uchiSotoNote: '',
      aizuchiHints: [...FALLBACK_AIZUCHI_HINTS],
      rescued: true,
    };
  }

  return null;
}

/**
 * Character-accurate atmospheric Showa waiting status message for Optimistic UI.
 */
export function getPersonaWaitingMessage(persona: Partial<NormalizedKissatenPersona>): string {
  const id = persona.id || persona.persona_id || '';
  const jpName = cleanStr(persona.japaneseName, 'Chủ quán');
  const drink = cleanStr(persona.favoriteDrink, 'trà nóng');

  if (id === 'persona_master_kenji') {
    return `${jpName} đang khẽ gật đầu, chậm rãi rót nước nóng qua phin vải và suy ngẫm...`;
  }
  if (id === 'persona_hana_tokyo') {
    return `${jpName} đang kẹp dấu sách vào trang Bunkobon, mỉm cười lắng nghe bạn...`;
  }
  if (id === 'persona_tetsuo_kyoto') {
    return `${jpName} đang xoay nhẹ chén trà Hōjicha ấm và khẽ gật gù lắng nghe...`;
  }
  return `${jpName} đang nhấp ngụm ${drink.toLowerCase()} và chậm rãi lắng nghe bạn...`;
}

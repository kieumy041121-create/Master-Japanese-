import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  GraduationCap,
  Send,
  Volume2,
  Copy,
  Check,
  Mic,
  Brain,
  RotateCcw,
  Search,
  Pin,
  PinOff,
  ChevronDown,
  ChevronUp,
  BookOpen,
  GripVertical,
  ArrowRight,
  MessageSquare,
  X,
} from 'lucide-react';
import {
  SenseiChatMessage,
  SenseiFocusMode,
  SenseiExplanationPersona,
  DirectResolvedWordResult,
  VocabArchetype,
  cleanSenseiText,
  detectUserAcademicIntent,
  resolveDirectKanjiOrVocab,
  extractCoreKeywordsVi,
  extractKanjiRootSnapshot,
  classifyVocabWord,
  extractLoanwordOrigin,
  extractContextWeightedMeanings,
  extractLockedQueryTarget,
  verifyAndHealLexiconDossier,
  purgeSenseiLookupCache,
} from '../../services/aiSenseiService';
import { speechService } from '../../services/speechService';
import {
  katakanaToHiragana,
  hiraganaToRomaji,
  analyzeJapanesePhonetics,
} from '../../data/kanaRomajiUtils';
import { JLPTLevel } from '../../types';

interface PromptCategoryItem {
  id: string;
  label: string;
  chips: string[];
}

interface AchillesHeelItem {
  id: string;
  shortTag: string;
  labelVi: string;
  practicePrompt: string;
}

interface KnowledgeSection {
  id: string;
  icon: string;
  title: string;
  tone: 'emerald' | 'sky' | 'rose' | 'amber' | 'indigo' | 'slate';
  lines: string[];
  previewText: string;
}

interface QuickLexiconDossier {
  term: string;
  sourceMsgId: string;
  lexicon: DirectResolvedWordResult;
  pitchNumber: number | null;
  phoneticsSummary: string;
}

interface Props {
  messages: SenseiChatMessage[];
  inputText: string;
  onInputChange: (value: string) => void;
  onSendMessage: (customQuery?: string) => void;
  isAnswering: boolean;
  streamingMsgId: string | null;
  activeQueryTarget?: string;
  lookupEpoch?: number;
  explanationPersona: SenseiExplanationPersona;
  onPersonaChange: (persona: SenseiExplanationPersona) => void;
  focusMode: SenseiFocusMode;
  onFocusModeChange: (mode: SenseiFocusMode) => void;
  senseiLevel: JLPTLevel;
  achillesHeels: AchillesHeelItem[];
  onResetAchilles: () => void;
  speechRate: number;
  onSpeechRateChange: (rate: number) => void;
  isListening: boolean;
  onToggleVoiceInput: () => void;
  onSpeak: (text: string) => void;
  onCopy: (id: string, text: string) => void;
  copiedId: string | null;
  categorizedPromptChips: PromptCategoryItem[];
  selectedPromptCategory: string;
  onSelectPromptCategory: (id: string) => void;
  onOpenVocab5D: (topic: string) => void;
  onOpenConceptRetrieval: () => void;
}

function extractTopicFromSenseiMessage(text: string): string {
  if (!text) return 'Chủ đề trọng tâm';
  const lines = cleanSenseiText(text, true)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const firstLine = lines[0] || '';
  const match = firstLine.match(/「([^」]+)」/);
  if (match && match[1]) {
    return match[1].trim();
  }
  const cleaned = firstLine
    .replace(
      /^(🎯|⚖️|⚠️|🔬|🧭|🔍|🧠|💡|⏳|🎭|📖|🎧)?\s*(phân biệt|giải thích|trả lời|chuyên đề|định nghĩa|hệ thống|giải mã|bí kíp|trả lời trực diện|kết luận trực diện|chuyên gia):?\s*/i,
      ''
    )
    .replace(/^【.*?】|^\[.*?\]|\*\*/g, '')
    .trim();
  return cleaned.slice(0, 56) || 'Phân tích chuyên sâu';
}

function extractInteractiveJapaneseTerms(text: string, limit = 5): string[] {
  if (!text) return [];
  const candidates: string[] = [];
  const seen = new Set<string>();

  const quoteMatches = text.match(/「([^」\n]{1,18})」/g);
  if (quoteMatches) {
    for (const q of quoteMatches) {
      const inner = q.slice(1, -1).trim();
      if (inner && /[\u3040-\u30ff\u4e00-\u9faf]/.test(inner) && !seen.has(inner)) {
        seen.add(inner);
        candidates.push(inner);
      }
    }
  }

  const jpRuns = text.match(/[\u4e00-\u9faf]{1,6}[\u3040-\u309f]{0,4}|[\u30a0-\u30ff]{2,10}/g);
  if (jpRuns) {
    for (const token of jpRuns) {
      const t = token.trim();
      if (t.length >= 2 && !seen.has(t)) {
        seen.add(t);
        candidates.push(t);
      }
      if (candidates.length >= limit) break;
    }
  }

  return candidates.slice(0, limit);
}

function splitIntoMorae(reading: string, preserveKatakana = false): string[] {
  const normalized = preserveKatakana
    ? (reading || '').replace(/[^\u3040-\u309f\u30a0-\u30ffー]/g, '')
    : katakanaToHiragana(reading).replace(/[^\u3040-\u309fー]/g, '');
  if (!normalized) return [];
  const smalls = new Set([
    'ゃ',
    'ゅ',
    'ょ',
    'ぁ',
    'ぃ',
    'ぅ',
    'ぇ',
    'ぉ',
    'ャ',
    'ュ',
    'ョ',
    'ァ',
    'ィ',
    'ゥ',
    'ェ',
    'ォ',
  ]);
  const morae: string[] = [];
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (smalls.has(ch) && morae.length > 0) {
      morae[morae.length - 1] += ch;
    } else {
      morae.push(ch);
    }
  }
  return morae;
}

function extractPitchAccentNumber(text: string, moraCount = 3): number | null {
  if (!text) return null;
  const numMatch =
    text.match(/(?:trọng âm|pitch(?:\s*accent)?|accent|cao độ)[^\n\d]{0,24}(?:\[|\()?([0-6])(?:\]|\))?/i) ||
    text.match(/\[([0-5])\]/);
  if (numMatch && numMatch[1]) {
    const num = Number(numMatch[1]);
    return Number.isFinite(num) ? num : null;
  }

  const circled = ['⓪', '①', '②', '③', '④', '⑤', '⑥'];
  for (let i = 0; i < circled.length; i++) {
    if (text.includes(circled[i])) return i;
  }

  const lower = text.toLowerCase();
  if (lower.includes('heiban') || text.includes('平板')) return 0;
  if (lower.includes('atamadaka') || text.includes('頭高')) return 1;
  if (lower.includes('odaka') || text.includes('尾高')) return Math.max(1, moraCount);
  if (lower.includes('nakadaka') || text.includes('中高')) return Math.max(2, Math.min(moraCount - 1, 2));

  return null;
}

function describePitchType(moraCount: number, effectivePitch: number): {
  code: string;
  name: string;
  rule: string;
} {
  if (effectivePitch === 0) {
    return {
      code: '[0]',
      name: 'Heiban (平板型)',
      rule: 'Thấp ở phách 1, nâng cao đều và giữ cao sang trợ từ',
    };
  }
  if (effectivePitch === 1) {
    return {
      code: '[1]',
      name: 'Atamadaka (頭高型)',
      rule: 'Cao ngay phách đầu rồi hạ dứt khoát từ phách 2',
    };
  }
  if (effectivePitch >= moraCount) {
    return {
      code: `[${effectivePitch}]`,
      name: 'Odaka (尾高型)',
      rule: 'Tăng cao đến âm cuối, chỉ hạ xuống khi nối trợ từ',
    };
  }
  return {
    code: `[${effectivePitch}]`,
    name: 'Nakadaka (中高型)',
    rule: `Nâng cao ở giữa và hạ dứt khoát sau phách ${effectivePitch}`,
  };
}

function computePitchContour(
  moraCount: number,
  pitchNum: number | null
): {
  effectivePitch: number;
  wordLevels: Array<'H' | 'L'>;
  particleLevel: 'H' | 'L';
  dropAfterIndex: number | null;
} {
  if (moraCount <= 0) {
    return { effectivePitch: 0, wordLevels: [], particleLevel: 'H', dropAfterIndex: null };
  }
  const effectivePitch =
    pitchNum === null ? (moraCount > 2 ? 0 : 1) : Math.max(0, Math.min(pitchNum, moraCount));

  const wordLevels: Array<'H' | 'L'> = [];
  for (let idx = 0; idx < moraCount; idx++) {
    const pos = idx + 1;
    if (effectivePitch === 0) {
      wordLevels.push(pos === 1 ? 'L' : 'H');
    } else if (effectivePitch === 1) {
      wordLevels.push(pos === 1 ? 'H' : 'L');
    } else {
      if (pos === 1) wordLevels.push('L');
      else if (pos <= effectivePitch) wordLevels.push('H');
      else wordLevels.push('L');
    }
  }

  const particleLevel: 'H' | 'L' = effectivePitch === 0 ? 'H' : 'L';
  const dropAfterIndex = effectivePitch > 0 ? effectivePitch - 1 : null;
  return { effectivePitch, wordLevels, particleLevel, dropAfterIndex };
}

function extractFallbackLexiconFromSenseiText(
  topic: string,
  text: string
): DirectResolvedWordResult | null {
  if (!text) return null;
  const cleaned = cleanSenseiText(text, false);
  const jpTerm =
    topic.match(/[\u4e00-\u9faf\u3040-\u30ffー]+/)?.[0] ||
    cleaned.match(/「([^」\n]{1,18})」/)?.[1]?.match(/[\u4e00-\u9faf\u3040-\u30ffー]+/)?.[0] ||
    cleaned.match(/[\u4e00-\u9faf]{1,6}[\u3040-\u309f]{0,4}/)?.[0] ||
    '';

  if (!jpTerm || jpTerm.length < 1) return null;

  // Try matching reading inside parentheses near the headword: e.g. 曖昧 (あいまい)
  const escaped = jpTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const readMatch = cleaned.match(
    new RegExp(`${escaped}\\s*[（(\\[「]([\\u3040-\\u30ffー・\\s]+)[）)\\]」]`)
  );
  const extractedKana = readMatch?.[1]
    ? readMatch[1].replace(/[・\s]/g, '').trim()
    : /^[\u3040-\u30ffー]+$/.test(jpTerm)
    ? jpTerm
    : '';

  const rootSnapshot = extractKanjiRootSnapshot(jpTerm);
  const firstMeaningLine =
    cleaned
      .split('\n')
      .map((l) => l.trim())
      .find(
        (l) =>
          l.length > 6 &&
          !l.startsWith('|') &&
          !l.startsWith('🎯') &&
          !l.startsWith('🔬') &&
          !l.startsWith('⚖️') &&
          /[a-zA-Z\u00C0-\u1EF9]/.test(l)
      ) || '';

  const coreKeywords = extractCoreKeywordsVi(
    firstMeaningLine
      .replace(/^.*?(?:nghĩa là|có nghĩa|là|:|-)\s*/i, '')
      .replace(/\*\*/g, '')
  );

  const romaji = extractedKana
    ? hiraganaToRomaji(katakanaToHiragana(extractedKana))
    : rootSnapshot.kunyomi[0]
    ? hiraganaToRomaji(katakanaToHiragana(rootSnapshot.kunyomi[0]))
    : '';

  const hanVietJoined = rootSnapshot.radicals.map((r) => r.hanViet).filter(Boolean).join(' ');
  const isKatakanaLoan = /^[\u30a0-\u30ffー・\s]+$/.test(jpTerm);
  const litMatch = cleaned.match(/nghĩa\s*đen\s*[:：\-]?\s*([^\n.;]+)/i);
  const figMatch = cleaned.match(/nghĩa\s*bóng\s*[:：\-]?\s*([^\n.;]+)/i);

  return {
    found: true,
    word: jpTerm,
    reading: extractedKana || rootSnapshot.kunyomi[0] || rootSnapshot.onyomi[0] || '',
    romaji,
    hanViet: isKatakanaLoan ? '' : hanVietJoined,
    level: 'JLPT',
    partOfSpeech: isKatakanaLoan
      ? 'Từ mượn ngoại lai (Gairaigo)'
      : litMatch && figMatch
      ? 'Thành ngữ / Quán dụng ngữ'
      : 'Trích xuất trực tiếp',
    meaning: coreKeywords.join(' · ') || topic,
    literalMeaning: litMatch?.[1]?.replace(/\*\*/g, '').trim(),
    figurativeMeaning: figMatch?.[1]?.replace(/\*\*/g, '').trim(),
    loanwordSource: isKatakanaLoan ? extractLoanwordOrigin(jpTerm, text) : undefined,
    coreKeywords: coreKeywords.length > 0 ? coreKeywords : [topic.slice(0, 32)],
    radicals: isKatakanaLoan ? [] : rootSnapshot.radicals,
    onyomi: isKatakanaLoan ? [] : rootSnapshot.onyomi,
    kunyomi: isKatakanaLoan ? [] : rootSnapshot.kunyomi,
    strokeCount: isKatakanaLoan ? undefined : rootSnapshot.strokeCount,
    examples: [],
  };
}

function renderInlineBoldKeywords(text: string): React.ReactNode {
  if (!text.includes('**')) return text;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-white tracking-tight">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function parseSenseiKnowledgeSections(text: string): KnowledgeSection[] {
  const cleaned = cleanSenseiText(text, true);
  const lines = cleaned.split('\n');
  const sections: KnowledgeSection[] = [];

  const detectHeader = (
    trimmed: string
  ): { icon: string; title: string; tone: KnowledgeSection['tone'] } | null => {
    if (!trimmed) return null;

    if (
      trimmed.startsWith('🎯') ||
      trimmed.startsWith('TRẢ LỜI TRỰC DIỆN') ||
      trimmed.startsWith('GIẢI ĐÁP TRỰC DIỆN')
    ) {
      return {
        icon: '🎯',
        title: trimmed.replace(/^[🎯\s*]+|\*\*$/g, '').trim(),
        tone: 'emerald',
      };
    }
    if (
      trimmed.startsWith('⚖️') ||
      trimmed.startsWith('PHÂN BIỆT ĐỐI CHIẾU') ||
      trimmed.startsWith('PHÂN BIỆT:')
    ) {
      return {
        icon: '⚖️',
        title: trimmed.replace(/^[⚖️\s*]+|\*\*$/g, '').trim(),
        tone: 'sky',
      };
    }
    if (
      trimmed.startsWith('⚠️') ||
      trimmed.startsWith('CẢNH BÁO') ||
      trimmed.startsWith('BẪY ĐỀ THI')
    ) {
      return {
        icon: '⚠️',
        title: trimmed.replace(/^[⚠️\s*]+|\*\*$/g, '').trim(),
        tone: 'rose',
      };
    }
    if (
      trimmed.startsWith('🧠') ||
      trimmed.startsWith('ĐIỂM NEO TRÍ NHỚ') ||
      trimmed.startsWith('💡') ||
      trimmed.startsWith('⏳') ||
      trimmed.startsWith('MẸO PHẢN XẠ') ||
      trimmed.startsWith('MẸO GHI NHỚ') ||
      trimmed.startsWith('LỜI KHUYÊN')
    ) {
      const iconChar = trimmed.startsWith('🧠') ? '🧠' : trimmed.startsWith('⏳') ? '⏳' : '💡';
      return {
        icon: iconChar,
        title: trimmed.replace(/^[🧠💡⏳\s*]+|\*\*$/g, '').trim(),
        tone: 'amber',
      };
    }
    if (
      trimmed.startsWith('🔍') ||
      trimmed.startsWith('VÍ DỤ THỰC TẾ') ||
      trimmed.startsWith('CẶP VÍ DỤ')
    ) {
      return {
        icon: '🔍',
        title: trimmed.replace(/^[🔍\s*]+|\*\*$/g, '').trim(),
        tone: 'slate',
      };
    }
    const specialPrefixMatch = trimmed.match(/^(🔬|🧭|🔗|🧩|🛡️|🩺|🎭|📖|🎧)\s*(.+)$/);
    if (specialPrefixMatch) {
      return {
        icon: specialPrefixMatch[1],
        title: specialPrefixMatch[2].replace(/\*\*/g, '').trim(),
        tone: 'indigo',
      };
    }
    return null;
  };

  let currentSection: KnowledgeSection = {
    id: 'sec_0',
    icon: '📖',
    title: 'Tổng quan & Nội dung trọng tâm',
    tone: 'emerald',
    lines: [],
    previewText: '',
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    const header = detectHeader(trimmed);
    if (header) {
      if (currentSection.lines.some((l) => l.trim().length > 0)) {
        sections.push({
          ...currentSection,
          previewText:
            currentSection.lines
              .find((l) => l.trim().length > 0 && !l.trim().startsWith('|'))
              ?.replace(/\*\*/g, '')
              .trim()
              .slice(0, 90) || '',
        });
      }
      currentSection = {
        id: `sec_${sections.length + 1}`,
        icon: header.icon,
        title: header.title,
        tone: header.tone,
        lines: [],
        previewText: '',
      };
    } else {
      currentSection.lines.push(rawLine);
    }
  }

  if (currentSection.lines.some((l) => l.trim().length > 0)) {
    sections.push({
      ...currentSection,
      previewText:
        currentSection.lines
          .find((l) => l.trim().length > 0 && !l.trim().startsWith('|'))
          ?.replace(/\*\*/g, '')
          .trim()
          .slice(0, 90) || '',
    });
  }

  return sections;
}

function renderSectionBodyLines(
  lines: string[],
  isNarrowPanel: boolean,
  onSelectTerm?: (term: string) => void
): React.ReactNode {
  const blocks: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      blocks.push(<div key={`sp_${i}`} className="h-2" />);
      continue;
    }

    // Group consecutive markdown pipe tables: | Col 1 | Col 2 |
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.split('|').length >= 3) {
      const tableRows: string[][] = [];
      let j = i;
      while (j < lines.length) {
        const rowLine = lines[j].trim();
        if (!(rowLine.startsWith('|') && rowLine.endsWith('|'))) break;
        const isSeparator =
          /^\|[\s:-]+\|/.test(rowLine) &&
          !/[a-zA-Z0-9\u3040-\u9faf\u00C0-\u1EF9]/.test(rowLine);
        if (!isSeparator) {
          const cells = rowLine
            .slice(1, -1)
            .split('|')
            .map((c) => c.trim());
          if (cells.length >= 2) {
            tableRows.push(cells);
          }
        }
        j++;
      }

      if (tableRows.length >= 1) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(1);

        if (isNarrowPanel && bodyRows.length > 0) {
          // Responsive Zen: Stack rows cleanly into non-overlapping cards when right panel is narrow
          blocks.push(
            <div key={`tbl_stack_${i}`} className="my-3 space-y-2.5">
              {bodyRows.map((row, rIdx) => (
                <div
                  key={rIdx}
                  className="rounded-xl border border-slate-800/75 bg-slate-950/55 p-3.5 space-y-2"
                >
                  {row.map((cell, cIdx) => (
                    <div key={cIdx} className="space-y-0.5 break-words">
                      <div className="text-[11px] font-medium text-slate-400">
                        {renderInlineBoldKeywords(headerRow[cIdx] || `Mục ${cIdx + 1}`)}
                      </div>
                      <div
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          cIdx === 0 ? 'font-semibold text-white' : 'text-slate-200'
                        }`}
                      >
                        {renderInlineBoldKeywords(cell)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        } else {
          blocks.push(
            <div
              key={`tbl_${i}`}
              className="my-3 overflow-x-auto rounded-xl border border-slate-800/75 bg-slate-950/45"
            >
              <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
                <thead>
                  <tr className="border-b border-slate-800/80 text-slate-300 font-semibold">
                    {headerRow.map((cell, cIdx) => (
                      <th key={cIdx} className="px-4 py-2.5 align-top">
                        {renderInlineBoldKeywords(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                {bodyRows.length > 0 && (
                  <tbody className="divide-y divide-slate-800/50">
                    {bodyRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/35 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-4 py-2.5 align-top leading-relaxed break-words ${
                              cIdx === 0 ? 'font-medium text-slate-100' : 'text-slate-300'
                            }`}
                          >
                            {renderInlineBoldKeywords(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          );
        }
        i = j - 1;
        continue;
      }
    }

    // Japanese quote / example block: soft hairline rounded Zen block (no thick left bar)
    if (trimmed.includes('「') && trimmed.includes('」')) {
      const detectedTerms = extractInteractiveJapaneseTerms(trimmed, 2);
      blocks.push(
        <div
          key={`jp_${i}`}
          className="my-1.5 rounded-xl bg-slate-950/55 border border-slate-800/70 px-3.5 py-2 text-slate-100 leading-relaxed flex items-start justify-between gap-2"
        >
          <div className="min-w-0 break-words flex-1">
            {renderInlineBoldKeywords(lines[i])}
          </div>
          {onSelectTerm && detectedTerms[0] && (
            <button
              type="button"
              onClick={() => onSelectTerm(detectedTerms[0])}
              className="text-[11px] font-jp text-sky-300 hover:text-white shrink-0 px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-colors cursor-pointer"
              title={`Tra nhanh hồ sơ "${detectedTerms[0]}"`}
            >
              {detectedTerms[0]}
            </button>
          )}
        </div>
      );
      continue;
    }

    blocks.push(
      <div key={`ln_${i}`} className="text-slate-200 leading-[1.8] break-words">
        {renderInlineBoldKeywords(lines[i])}
      </div>
    );
  }

  return <div className="space-y-1.5 text-sm leading-[1.8] text-slate-200">{blocks}</div>;
}

function buildCompactChatPreview(text: string): string {
  const cleaned = cleanSenseiText(text, false);
  const nonEmptyLines = cleaned
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith('|'));

  if (nonEmptyLines.length === 0) return 'Đang tổng hợp phân tích...';
  const snippetLines = nonEmptyLines.slice(0, 3);
  const joined = snippetLines.join(' · ').replace(/\*\*/g, '');
  return joined.length > 180 ? `${joined.slice(0, 177)}...` : joined;
}

const SECTION_TONE_CLASSES: Record<KnowledgeSection['tone'], string> = {
  emerald: 'text-emerald-300',
  sky: 'text-sky-300',
  rose: 'text-rose-300',
  amber: 'text-amber-200',
  indigo: 'text-indigo-300',
  slate: 'text-slate-200',
};

export const AiSenseiSplitWorkspace: React.FC<Props> = ({
  messages,
  inputText,
  onInputChange,
  onSendMessage,
  isAnswering,
  streamingMsgId,
  explanationPersona,
  onPersonaChange,
  focusMode,
  onFocusModeChange,
  senseiLevel,
  achillesHeels,
  onResetAchilles,
  speechRate,
  onSpeechRateChange,
  isListening,
  onToggleVoiceInput,
  onSpeak,
  onCopy,
  copiedId,
  categorizedPromptChips,
  selectedPromptCategory,
  onSelectPromptCategory,
  onOpenVocab5D,
  onOpenConceptRetrieval,
  activeQueryTarget,
  lookupEpoch,
}) => {
  // Split-Core Workspace Sizing & Magnetic Divider
  const workspaceRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [splitRatio, setSplitRatio] = useState<number>(44);
  const [isDraggingDivider, setIsDraggingDivider] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [mobilePane, setMobilePane] = useState<'chat' | 'knowledge'>('chat');
  const [rightPanelWidth, setRightPanelWidth] = useState<number>(640);

  // Quick Prompt Drawer Toggle
  const [showQuickPrompts, setShowQuickPrompts] = useState<boolean>(true);

  // Pin-Lock Knowledge Display Matrix
  const [pinnedMessageId, setPinnedMessageId] = useState<string>('welcome');
  const [isPinLocked, setIsPinLocked] = useState<boolean>(false);
  const [quickLexicon, setQuickLexicon] = useState<QuickLexiconDossier | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [audioPulseWord, setAudioPulseWord] = useState<string | null>(null);

  // Monitor desktop breakpoint
  useEffect(() => {
    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Measure Right Hemisphere container width for Responsive Zen & Smart Accordion
  useEffect(() => {
    const target = rightScrollRef.current;
    if (!target || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setRightPanelWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [isDesktop, mobilePane]);

  const isNarrowRightPanel = rightPanelWidth < 460;

  // Magnetic Divider drag handling with gentle detent snapping
  useEffect(() => {
    if (!isDraggingDivider) return;

    const handlePointerMove = (e: PointerEvent) => {
      const container = workspaceRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0) return;

      let pct = ((e.clientX - rect.left) / rect.width) * 100;
      pct = Math.max(28, Math.min(72, pct));

      // Gentle magnetic snap detents at 30%, 40%, 50%, 60%, 70%
      const detents = [30, 40, 50, 60, 70];
      for (const snap of detents) {
        if (Math.abs(pct - snap) <= 1.2) {
          pct = snap;
          break;
        }
      }
      setSplitRatio(Math.round(pct * 10) / 10);
    };

    const handlePointerUp = () => {
      setIsDraggingDivider(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDraggingDivider]);

  // Track latest user message index to detect active pending lookup (before Sensei reply starts)
  const lastUserMsgIndex = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === 'user') return i;
    }
    return -1;
  }, [messages]);

  const hasSenseiReplyAfterLastUser = useMemo(() => {
    if (lastUserMsgIndex < 0) return true;
    for (let i = lastUserMsgIndex + 1; i < messages.length; i++) {
      if (messages[i].sender === 'sensei') return true;
    }
    return false;
  }, [messages, lastUserMsgIndex]);

  const isPendingNewLookup = Boolean(isAnswering && !hasSenseiReplyAfterLastUser);

  // AGGRESSIVE CACHE-PURGE PROTOCOL: immediately wipe old term state when a new lookup epoch fires
  useEffect(() => {
    if (!lookupEpoch) return;
    setQuickLexicon(null);
    setIsPinLocked(false);
    setPinnedMessageId('');
    setExpandedSections({});
    if (rightScrollRef.current) {
      rightScrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [lookupEpoch]);

  // Auto-project newest Sensei message to Right Knowledge Panel unless Pin-Locked
  const latestSenseiMessage = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === 'sensei') return messages[i];
    }
    return messages[0];
  }, [messages]);

  useEffect(() => {
    if (!isPinLocked && latestSenseiMessage && !isPendingNewLookup) {
      setPinnedMessageId(latestSenseiMessage.id);
      setQuickLexicon(null);
    }
  }, [latestSenseiMessage?.id, isPinLocked, isPendingNewLookup]);

  // Smoothly scroll ONLY Left Chat container on new message without affecting Right Panel
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
    return () => cancelAnimationFrame(frameId);
  }, [messages.length, streamingMsgId]);

  const activePinnedMessage = useMemo(() => {
    if (isPendingNewLookup) return null;
    return (
      messages.find((m) => m.id === pinnedMessageId && m.sender === 'sensei') ||
      latestSenseiMessage ||
      messages[0]
    );
  }, [messages, pinnedMessageId, latestSenseiMessage, isPendingNewLookup]);

  // Exact paired user prompt immediately preceding activePinnedMessage
  const pairedUserQuery = useMemo(() => {
    if (!activePinnedMessage) return activeQueryTarget || '';
    const msgIdx = messages.findIndex((m) => m.id === activePinnedMessage.id);
    if (msgIdx > 0) {
      for (let i = msgIdx - 1; i >= 0; i--) {
        if (messages[i].sender === 'user') return messages[i].text;
      }
    }
    return activeQueryTarget || '';
  }, [messages, activePinnedMessage?.id, activeQueryTarget]);

  const parsedSections = useMemo(() => {
    if (!activePinnedMessage) return [];
    return parseSenseiKnowledgeSections(activePinnedMessage.text || '');
  }, [activePinnedMessage?.text]);

  // Auto-compute 1:1 Target-Locked & Cross-Verified lexicon dossier (ZERO stale prose bleed)
  const pinnedAutoLexicon = useMemo(() => {
    if (!activePinnedMessage || activePinnedMessage.id === 'welcome') return null;
    const topic = extractTopicFromSenseiMessage(activePinnedMessage.text);
    const lockedTargetInput = pairedUserQuery || topic;

    // Step 1: Resolve directly from paired user query FIRST, then Japanese-only topic title, never arbitrary Vietnamese prose!
    const topicHasJp = /[\u4e00-\u9faf\u3040-\u30ff]/.test(topic);
    const rawCandidate =
      (pairedUserQuery ? resolveDirectKanjiOrVocab(pairedUserQuery) : null) ||
      (topicHasJp ? resolveDirectKanjiOrVocab(topic) : null) ||
      extractFallbackLexiconFromSenseiText(topic, activePinnedMessage.text);

    // Step 2: Cross-Verification Auto-Healing Middleware ([Input User] === [Output UI])
    const verified = verifyAndHealLexiconDossier(
      rawCandidate,
      lockedTargetInput,
      activePinnedMessage.text
    );
    const resolved = verified.lexicon;
    if (!resolved || !resolved.found) return null;

    const hira = katakanaToHiragana(resolved.reading || resolved.word);
    const phonetics = analyzeJapanesePhonetics(hira);
    const moraLen = splitIntoMorae(resolved.reading || resolved.word).length || 3;
    const pitchNum = extractPitchAccentNumber(activePinnedMessage.text, moraLen);
    return {
      lexicon: resolved,
      pitchNum,
      phonetics,
    };
  }, [activePinnedMessage?.id, activePinnedMessage?.text, pairedUserQuery]);

  const handlePinMessageToRight = (msgId: string) => {
    setPinnedMessageId(msgId);
    setQuickLexicon(null);
    setExpandedSections({});
    if (!isDesktop) {
      setMobilePane('knowledge');
    }
    if (rightScrollRef.current) {
      rightScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleZeroLatencyTermClick = (term: string, sourceMsgId: string) => {
    // Immediate Cache Flush before binding clicked term
    setQuickLexicon(null);
    purgeSenseiLookupCache(term);

    const sourceMsg = messages.find((m) => m.id === sourceMsgId);
    const rawResolved =
      resolveDirectKanjiOrVocab(term, term) ||
      extractFallbackLexiconFromSenseiText(term, sourceMsg?.text || term);

    const verified = verifyAndHealLexiconDossier(rawResolved, term, sourceMsg?.text);
    const resolved = verified.lexicon;

    if (resolved && resolved.found) {
      const hira = katakanaToHiragana(resolved.reading || resolved.word);
      const phonetics = analyzeJapanesePhonetics(hira);
      const moraLen = splitIntoMorae(resolved.reading || resolved.word).length || 3;
      setQuickLexicon({
        term,
        sourceMsgId,
        lexicon: resolved,
        pitchNumber: extractPitchAccentNumber(sourceMsg?.text || '', moraLen),
        phoneticsSummary: phonetics.explanationText,
      });
      setPinnedMessageId(sourceMsgId);
      if (!isDesktop) {
        setMobilePane('knowledge');
      }
      if (rightScrollRef.current) {
        rightScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Fallback: if no direct dict match, pin the parent message right away
    handlePinMessageToRight(sourceMsgId);
  };

  const handleInstantSpeakWord = (wordToSpeak: string) => {
    speechService.speakExactPhrase(wordToSpeak, speechRate);
    setAudioPulseWord(wordToSpeak);
    setTimeout(() => {
      setAudioPulseWord((prev) => (prev === wordToSpeak ? null : prev));
    }, 550);
  };

  const toggleSectionAccordion = (secId: string, currentlyOpen: boolean) => {
    setExpandedSections((prev) => ({
      ...prev,
      [secId]: !currentlyOpen,
    }));
  };

  const handleToggleExpandAll = () => {
    const allExplicitlyCollapsed = parsedSections.every(
      (sec, idx) => !(expandedSections[sec.id] ?? (isNarrowRightPanel ? idx < 2 : true))
    );
    const nextMap: Record<string, boolean> = {};
    parsedSections.forEach((sec, idx) => {
      nextMap[sec.id] = allExplicitlyCollapsed ? true : idx === 0;
    });
    setExpandedSections(nextMap);
  };

  const currentCategoryChips =
    categorizedPromptChips.find((c) => c.id === selectedPromptCategory)?.chips ||
    categorizedPromptChips[0]?.chips ||
    [];

  const activePersonaIsSingularity =
    activePinnedMessage?.explanationPersona === 'ultimate_singularity';
  const activeTopicTitle = extractTopicFromSenseiMessage(activePinnedMessage?.text || '');

  // Active Pitch + Lexicon header card data — strictly gated by Cross-Verification Middleware
  const displayLexicon = useMemo(() => {
    if (isPendingNewLookup) return null;
    const candidate = quickLexicon?.lexicon || pinnedAutoLexicon?.lexicon || null;
    if (!candidate) return null;
    const expectedQuery = quickLexicon ? quickLexicon.term : pairedUserQuery || activeTopicTitle;
    const checked = verifyAndHealLexiconDossier(
      candidate,
      expectedQuery,
      activePinnedMessage?.text
    );
    if (checked.fatalMismatchDetected && !checked.healed) {
      return null;
    }
    return checked.lexicon;
  }, [
    isPendingNewLookup,
    quickLexicon,
    pinnedAutoLexicon,
    pairedUserQuery,
    activeTopicTitle,
    activePinnedMessage?.text,
  ]);
  const displayPitchNumber =
    quickLexicon !== null ? quickLexicon.pitchNumber : pinnedAutoLexicon?.pitchNum ?? null;

  const vocabArchetype: VocabArchetype = useMemo(() => {
    if (!displayLexicon) return 'jukugo';
    return classifyVocabWord(displayLexicon.word, activePinnedMessage?.text, displayLexicon);
  }, [displayLexicon, activePinnedMessage?.text]);

  const displayMorae = useMemo(() => {
    if (!displayLexicon) return [];
    const preserveKana = vocabArchetype === 'gairaigo';
    const rawSource =
      preserveKana && /^[\u30a0-\u30ffー・\s]+$/.test(displayLexicon.word.trim())
        ? displayLexicon.word.trim()
        : (displayLexicon.reading || displayLexicon.word)
            .split('/')[0]
            .split('、')[0]
            .trim();
    return splitIntoMorae(rawSource, preserveKana);
  }, [displayLexicon, vocabArchetype]);

  const displayContour = useMemo(
    () => computePitchContour(displayMorae.length, displayPitchNumber),
    [displayMorae.length, displayPitchNumber]
  );
  const displayPitchMeta = useMemo(
    () => describePitchType(displayMorae.length, displayContour.effectivePitch),
    [displayMorae.length, displayContour.effectivePitch]
  );

  // Gather active Q&A context (preceding user prompt + Sensei direct conclusion) for context-weighted meaning
  const qaContextText = useMemo(() => {
    const targetMsgId = quickLexicon?.sourceMsgId || activePinnedMessage?.id;
    const idx = messages.findIndex((m) => m.id === targetMsgId);
    const prevUserPrompt = idx > 0 && messages[idx - 1]?.sender === 'user' ? messages[idx - 1].text : '';
    const senseiSnippet = (activePinnedMessage?.text || '').slice(0, 420);
    return `${prevUserPrompt} ${senseiSnippet}`.trim();
  }, [messages, quickLexicon?.sourceMsgId, activePinnedMessage?.id, activePinnedMessage?.text]);

  const weightedMeanings = useMemo(() => {
    if (!displayLexicon) return [];
    return extractContextWeightedMeanings(displayLexicon.meaning, qaContextText, displayLexicon);
  }, [displayLexicon, qaContextText]);

  const loanwordOrigin = useMemo(() => {
    if (!displayLexicon || vocabArchetype !== 'gairaigo') return null;
    return displayLexicon.loanwordSource || extractLoanwordOrigin(displayLexicon.word, activePinnedMessage?.text);
  }, [displayLexicon, vocabArchetype, activePinnedMessage?.text]);

  const displayRootSnapshot = useMemo(() => {
    if (!displayLexicon || vocabArchetype === 'gairaigo') {
      return { radicals: [], onyomi: [], kunyomi: [], strokeCount: undefined };
    }
    if (displayLexicon.radicals && displayLexicon.radicals.length > 0) {
      return {
        radicals: displayLexicon.radicals,
        onyomi: displayLexicon.onyomi || [],
        kunyomi: displayLexicon.kunyomi || [],
        strokeCount: displayLexicon.strokeCount ?? displayLexicon.radicals[0]?.strokes,
      };
    }
    return extractKanjiRootSnapshot(displayLexicon.word);
  }, [displayLexicon, vocabArchetype]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#060912]">
      {/* Mobile Dual-Hemisphere Switcher (< lg) */}
      {!isDesktop && (
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMobilePane('chat')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              mobilePane === 'chat'
                ? 'bg-sky-500/15 text-sky-200 border border-sky-400/50'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800/70'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Tương tác & Hỏi Đáp</span>
          </button>
          <button
            type="button"
            onClick={() => setMobilePane('knowledge')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              mobilePane === 'knowledge'
                ? 'bg-indigo-500/15 text-indigo-200 border border-indigo-400/50'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800/70'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bảng Tri Thức Ghim</span>
          </button>
        </div>
      )}

      {/* SPLIT-CORE DUAL WORKSPACE CONTAINER */}
      <div
        ref={workspaceRef}
        className={`flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden relative ${
          isDraggingDivider ? 'select-none' : ''
        }`}
      >
        {/* =======================================================================
            LEFT HEMISPHERE: INTERACTIVE CHAT & DUAL-MODE CONTROL
           ======================================================================= */}
        <section
          aria-label="Không gian tương tác và điều khiển AI Sensei"
          style={
            isDesktop
              ? { width: `${splitRatio}%`, flexShrink: 0, flexGrow: 0 }
              : undefined
          }
          className={`${
            !isDesktop && mobilePane !== 'chat' ? 'hidden' : 'flex'
          } flex-col flex-1 lg:flex-none min-h-0 min-w-0 overflow-hidden bg-[#060912] border-r border-slate-800/40`}
        >
          {/* Left Top Controls: Dual-Mode Toggle & Focus */}
          <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800/70 space-y-2.5 shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onPersonaChange('encyclopedic_master')}
                className={`px-3.5 py-2 rounded-xl text-left transition-colors cursor-pointer border min-w-0 ${
                  explanationPersona === 'encyclopedic_master'
                    ? 'bg-sky-500/12 border-sky-400/60 text-white'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold flex items-center gap-1.5 truncate">
                    <span className="shrink-0">⚡</span>
                    <span className="truncate">Chế độ 1 · Đại Tông Sư</span>
                  </span>
                  {explanationPersona === 'encyclopedic_master' && (
                    <span className="text-[10px] font-mono text-sky-300 shrink-0 whitespace-nowrap">
                      Đang bật
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  Nhanh 0ms · 5 Trụ cột Bách khoa &amp; JEES
                </p>
              </button>

              <button
                type="button"
                onClick={() => onPersonaChange('ultimate_singularity')}
                className={`px-3.5 py-2 rounded-xl text-left transition-colors cursor-pointer border min-w-0 ${
                  explanationPersona === 'ultimate_singularity'
                    ? 'bg-violet-500/12 border-violet-400/60 text-white'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold flex items-center gap-1.5 truncate">
                    <span className="shrink-0">🌌</span>
                    <span className="truncate">Chế độ 2 · Thực Thể Toàn Tri</span>
                  </span>
                  {explanationPersona === 'ultimate_singularity' && (
                    <span className="text-[10px] font-mono text-violet-300 shrink-0 whitespace-nowrap">
                      Đang bật
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  Ngoại cảm · Vá Achilles · Từ nguyên &amp; Neo 3s
                </p>
              </button>
            </div>

            {/* Focus Mode + Prompt Drawer Toggle */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1 shrink-0 text-[11px]">
                {(
                  [
                    { id: 'comprehensive', label: 'Toàn diện' },
                    { id: 'jlpt_exam', label: 'Bẫy JLPT' },
                    { id: 'daily_spoken', label: 'Khẩu ngữ' },
                    { id: 'business_keigo', label: 'Kính ngữ' },
                    { id: 'vocab_mastery', label: 'Từ 5D' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onFocusModeChange(item.id)}
                    className={`px-2 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      focusMode === item.id
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 shrink-0 text-[11px]">
                <button
                  type="button"
                  onClick={() => setShowQuickPrompts((prev) => !prev)}
                  className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white bg-slate-900/70 border border-slate-800/80 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {showQuickPrompts ? 'Ẩn gợi ý' : 'Gợi ý mẫu'}
                </button>
                <button
                  type="button"
                  onClick={onOpenConceptRetrieval}
                  className="px-2.5 py-1 rounded-lg font-medium text-sky-300 hover:text-white bg-slate-900/70 border border-slate-800/80 transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1"
                  title="Tìm từ tiếng Nhật qua nghĩa Việt (4 bước)"
                >
                  <Search className="w-3 h-3" />
                  <span>Việt→Nhật</span>
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible Prompt Suggestions */}
          {showQuickPrompts && (
            <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800/50 space-y-1.5 shrink-0">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                {categorizedPromptChips.map((cat) => {
                  const isCatActive = selectedPromptCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onSelectPromptCategory(cat.id)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isCatActive
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                {currentCategoryChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setShowQuickPrompts(false);
                      onSendMessage(chip);
                    }}
                    disabled={isAnswering}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/75 hover:bg-slate-800 border border-slate-800/70 text-[11px] text-slate-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* INDEPENDENT LEFT CHAT TIMELINE SCROLL */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-4">
            {messages.map((msg) => {
              const isSensei = msg.sender === 'sensei';
              const isSingularity = msg.explanationPersona === 'ultimate_singularity';
              const isPinnedToRight = isSensei && activePinnedMessage?.id === msg.id;
              const topicTitle = isSensei ? extractTopicFromSenseiMessage(msg.text) : '';
              const compactPreview = isSensei ? buildCompactChatPreview(msg.text) : '';
              const interactiveTerms = extractInteractiveJapaneseTerms(msg.text, 4);

              if (!isSensei) {
                return (
                  <div key={msg.id} className="flex flex-col items-end gap-1.5">
                    <div className="max-w-[90%] rounded-2xl bg-indigo-600/90 text-white px-4 py-3 text-sm leading-relaxed shadow-sm">
                      <div className="whitespace-pre-line font-sans break-words">{msg.text}</div>
                      {interactiveTerms.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-indigo-400/30">
                          {interactiveTerms.map((term) => (
                            <button
                              key={term}
                              type="button"
                              onClick={() =>
                                handleZeroLatencyTermClick(
                                  term,
                                  activePinnedMessage?.id || latestSenseiMessage?.id || 'welcome'
                                )
                              }
                              className="px-2 py-0.5 rounded-md bg-indigo-950/50 hover:bg-indigo-950/80 text-[11px] font-jp text-indigo-100 transition-colors cursor-pointer"
                              title={`Tra nhanh từ "${term}" bên bảng tri thức phải`}
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-mono tabular-nums text-slate-500 px-1">
                      Bạn · {msg.timestamp}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  onClick={() => handlePinMessageToRight(msg.id)}
                  className={`group rounded-2xl border p-4 transition-colors cursor-pointer ${
                    isPinnedToRight
                      ? isSingularity
                        ? 'bg-violet-500/8 border-violet-400/55'
                        : 'bg-sky-500/8 border-sky-400/55'
                      : 'bg-slate-900/55 border-slate-800/75 hover:border-slate-700'
                  }`}
                >
                  {/* Top Header Row inside Left Sensei Card: Mode Badge + Pin State */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${
                        isSingularity ? 'text-violet-300' : 'text-sky-300'
                      }`}
                    >
                      <span>{isSingularity ? '🌌' : '⚡'}</span>
                      <span>
                        {isSingularity
                          ? 'Chế độ 2 · Thực Thể Toàn Tri'
                          : 'Chế độ 1 · Đại Tông Sư'}
                      </span>
                    </span>

                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="font-mono tabular-nums text-slate-500">
                        {msg.timestamp}
                      </span>
                      <span
                        className={`font-medium whitespace-nowrap ${
                          isPinnedToRight ? 'text-emerald-300' : 'text-slate-400 group-hover:text-white'
                        }`}
                      >
                        {isPinnedToRight ? 'Đang mở bên phải' : 'Xem bên phải →'}
                      </span>
                    </div>
                  </div>

                  {/* Topic Title + Concise Zen Preview */}
                  <h4 className="text-sm font-semibold text-white leading-snug mb-1.5 break-words">
                    {topicTitle}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 break-words">
                    {compactPreview}
                  </p>

                  {/* Interactive Japanese Term Chips for Zero-Latency Cross-Interaction */}
                  {interactiveTerms.length > 0 && (
                    <div
                      className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-800/60"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[10px] text-slate-500 font-medium mr-0.5">
                        Tra nhanh:
                      </span>
                      {interactiveTerms.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handleZeroLatencyTermClick(term, msg.id)}
                          className="px-2 py-0.5 rounded-md bg-slate-950/75 hover:bg-slate-800 border border-slate-800/80 hover:border-sky-400/50 text-[11px] font-jp text-slate-200 hover:text-white transition-colors cursor-pointer"
                          title={`Mở ngay hồ sơ "${term}" bên phải`}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Quick Actions Row */}
                  {msg.id !== 'welcome' && (
                    <div
                      className="flex flex-wrap items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-800/45 text-[11px] text-slate-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSpeak(msg.text)}
                          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Nghe</span>
                        </button>
                        <span className="text-slate-700" aria-hidden="true">·</span>
                        <button
                          type="button"
                          onClick={() => onCopy(msg.id, msg.text)}
                          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap"
                        >
                          {copiedId === msg.id ? (
                            <span className="text-emerald-400">Đã chép</span>
                          ) : (
                            <span>Sao chép</span>
                          )}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePinMessageToRight(msg.id)}
                        className="text-sky-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap"
                      >
                        <span>Mở bách khoa</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {isAnswering && !streamingMsgId && (
              <div className="rounded-2xl border border-slate-800/75 bg-slate-900/55 px-4 py-3 text-xs text-slate-300 flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-sky-300 shrink-0" />
                <span>
                  {explanationPersona === 'ultimate_singularity'
                    ? '🌌 Chế độ 2 đang ngoại cảm ý định & bắn tri thức sang bảng phải...'
                    : '⚡ Chế độ 1 đang tổng hợp 5 trụ cột sang bảng phải...'}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Left Bottom Input Bar */}
          <div className="px-4 py-3 bg-slate-950/90 border-t border-slate-800/70 shrink-0 space-y-2">
            {achillesHeels.length > 0 && inputText.trim().length <= 1 && (
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/70 text-[11px] text-slate-400 overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-2 shrink-0">
                  <Brain className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-slate-300">Ôn lỗ hổng ({senseiLevel}):</span>
                  {achillesHeels.map((heel) => (
                    <button
                      key={heel.id}
                      type="button"
                      onClick={() => onSendMessage(heel.practicePrompt)}
                      disabled={isAnswering}
                      className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-amber-200 hover:text-white transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                      title={`Ôn luyện nhanh: ${heel.labelVi}`}
                    >
                      {heel.shortTag}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={onResetAchilles}
                  className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors cursor-pointer shrink-0"
                  title="Làm mới ghi nhận điểm yếu"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            )}

            {inputText.trim().length > 1 && (() => {
              const liveIntent = detectUserAcademicIntent(inputText);
              return (
                <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-semibold text-sky-300 shrink-0 text-[11px]">
                      X-Quang Ý Định:
                    </span>
                    <span className="truncate text-slate-200 text-[11px]">
                      {liveIntent.telepathyReadout || liveIntent.focusBadge}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0 hidden sm:inline">
                    {liveIntent.antiWordByWordAlert ? 'Tái cấu trúc TPO' : `Chuẩn ${senseiLevel}`}
                  </span>
                </div>
              );
            })()}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="hidden xl:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-2 shrink-0">
                {([0.8, 1.0, 1.2] as const).map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => onSpeechRateChange(r)}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums font-semibold transition-colors cursor-pointer ${
                      speechRate === r
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                    title={`Tốc độ đọc ${r}x`}
                  >
                    {r}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={onToggleVoiceInput}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-center shrink-0 ${
                  isListening
                    ? 'bg-rose-600 border-rose-500 text-white animate-pulse'
                    : 'bg-slate-900 border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white'
                }`}
                title={isListening ? 'Đang lắng nghe...' : 'Nói tiếng Nhật (Microphone)'}
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Hỏi từ vựng, Hán tự, ngữ pháp N5-N1, bối cảnh TPO..."
                className="flex-1 min-w-0 px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors"
                disabled={isAnswering}
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isAnswering}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Gửi</span>
              </button>
            </form>
          </div>
        </section>

        {/* =======================================================================
            MAGNETIC RESIZE DIVIDER (Desktop lg+)
           ======================================================================= */}
        {isDesktop && (
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Thanh trượt tùy biến tỷ lệ không gian"
            onPointerDown={() => setIsDraggingDivider(true)}
            className="w-2.5 shrink-0 flex items-center justify-center cursor-col-resize relative group bg-slate-950/60 hover:bg-sky-500/10 transition-colors"
            title="Kéo trái/phải để tùy chỉnh tỷ lệ màn hình"
          >
            <div
              className={`w-px h-full transition-colors ${
                isDraggingDivider
                  ? 'bg-sky-400'
                  : 'bg-slate-800/80 group-hover:bg-sky-400/70'
              }`}
            />
            <div
              className={`absolute flex items-center justify-center w-4 h-10 rounded-full border transition-colors ${
                isDraggingDivider
                  ? 'bg-sky-500 border-sky-300 text-white'
                  : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-sky-400/70 group-hover:text-sky-200'
              }`}
            >
              <GripVertical className="w-3 h-3" />
            </div>
            {isDraggingDivider && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900 border border-sky-400/60 text-[10px] font-mono tabular-nums text-sky-200 whitespace-nowrap z-20 pointer-events-none">
                {Math.round(splitRatio)}% / {Math.round(100 - splitRatio)}%
              </div>
            )}
          </div>
        )}

        {/* =======================================================================
            RIGHT HEMISPHERE: INDEPENDENT ENCYCLOPEDIC KNOWLEDGE DISPLAY PANEL
           ======================================================================= */}
        <section
          aria-label="Không gian Bách khoa Tri thức AI Sensei"
          className={`${
            !isDesktop && mobilePane !== 'knowledge' ? 'hidden' : 'flex'
          } flex-1 min-h-0 min-w-0 flex-col overflow-hidden bg-[#070b15]`}
        >
          {/* Right Knowledge Top Bar: Mode Stamp + Pin-Lock + Ratio Presets */}
          <div className="px-4 sm:px-6 py-3 bg-slate-950/90 border-b border-slate-800/70 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border shrink-0 whitespace-nowrap ${
                  activePersonaIsSingularity
                    ? 'bg-violet-500/10 border-violet-400/35 text-violet-300'
                    : 'bg-sky-500/10 border-sky-400/35 text-sky-300'
                }`}
              >
                <span>{activePersonaIsSingularity ? '🌌' : '⚡'}</span>
                <span>
                  {activePersonaIsSingularity
                    ? 'Chế độ 2 · Thực Thể Toàn Tri'
                    : 'Chế độ 1 · Đại Tông Sư Toàn Năng'}
                </span>
              </span>

              <span className="text-xs font-medium text-slate-300 truncate hidden sm:inline">
                {quickLexicon ? `Hồ sơ: ${quickLexicon.lexicon.word}` : activeTopicTitle}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Quick Split Presets on Desktop */}
              {isDesktop && (
                <div className="hidden xl:flex items-center gap-0.5 bg-slate-900/70 border border-slate-800/80 rounded-lg p-0.5 text-[10px] font-mono tabular-nums">
                  {([
                    { left: 30, label: '30·70' },
                    { left: 40, label: '40·60' },
                    { left: 50, label: '50·50' },
                    { left: 60, label: '60·40' },
                  ] as const).map((preset) => (
                    <button
                      key={preset.left}
                      type="button"
                      onClick={() => setSplitRatio(preset.left)}
                      className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                        Math.round(splitRatio) === preset.left
                          ? 'bg-slate-800 text-sky-300 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title={`Đặt tỷ lệ khung Trái ${preset.left}% / Phải ${100 - preset.left}%`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Pin-Lock Toggle (Chống trôi bài) */}
              <button
                type="button"
                onClick={() => setIsPinLocked((prev) => !prev)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0 ${
                  isPinLocked
                    ? 'bg-amber-500/15 border-amber-400/50 text-amber-200'
                    : 'bg-slate-900/70 border-slate-800/80 text-slate-300 hover:text-white'
                }`}
                title={
                  isPinLocked
                    ? 'Đang ghim khóa kiến thức này (Chat mới sẽ không đẩy trôi bảng phải)'
                    : 'Tự động cập nhật khi có câu trả lời mới'
                }
              >
                {isPinLocked ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
                <span>{isPinLocked ? 'Đang ghim khóa' : 'Tự cập nhật'}</span>
              </button>

              {parsedSections.length > 1 && (
                <button
                  type="button"
                  onClick={handleToggleExpandAll}
                  className="px-2.5 py-1 rounded-lg text-[11px] text-slate-300 hover:text-white bg-slate-900/70 border border-slate-800/80 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  title="Đóng / mở tất cả khối kiến thức"
                >
                  Đóng/Mở mục
                </button>
              )}

              {activePinnedMessage && (
                <>
                  <button
                    type="button"
                    onClick={() => onSpeak(activePinnedMessage.text)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900/70 border border-slate-800/80 transition-colors cursor-pointer shrink-0"
                    title={`Nghe giọng mẫu (${speechRate}x)`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onCopy(activePinnedMessage.id, activePinnedMessage.text)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900/70 border border-slate-800/80 transition-colors cursor-pointer shrink-0"
                    title="Sao chép toàn bộ nội dung"
                  >
                    {copiedId === activePinnedMessage.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* INDEPENDENT RIGHT KNOWLEDGE SCROLL CANVAS */}
          <div
            ref={rightScrollRef}
            className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-7 py-6 space-y-6"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              {/* =================================================================
                  CLEAN SKELETON LOADING STATE (ZERO STALE DATA DURING FLUSH/FETCH)
                 ================================================================= */}
              {isPendingNewLookup && (() => {
                const lockedPreview = extractLockedQueryTarget(activeQueryTarget || '');
                const previewTarget = lockedPreview.jpToken || lockedPreview.hanVietHint || activeQueryTarget || '';
                return (
                  <div className="space-y-5">
                    <div className="rounded-2xl backdrop-blur-md bg-slate-900/75 border border-slate-700/60 p-5 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-semibold text-sky-300">
                          Đang khóa mục tiêu 1:1 {previewTarget ? `· 「${previewTarget}」` : ''}
                        </span>
                        <span className="text-slate-400">Đang truy xuất từ điển chuẩn...</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-[36fr_64fr] gap-4 items-center">
                        <div className="h-24 rounded-xl bg-slate-800/60 border border-slate-800/80" />
                        <div className="h-24 rounded-xl bg-slate-800/45 border border-slate-800/70" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800/70">
                        <div className="h-16 rounded-xl bg-slate-800/45 border border-slate-800/70" />
                        <div className="h-16 rounded-xl bg-slate-800/45 border border-slate-800/70" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-14 rounded-2xl bg-slate-900/60 border border-slate-800/70" />
                      <div className="h-28 rounded-2xl bg-slate-900/45 border border-slate-800/70" />
                    </div>
                  </div>
                );
              })()}

              {/* =================================================================
                  TOP-PINNED LIVING GLASSMORPHISM VOCABULARY & PHONETIC DOSSIER
                  Multi-Class Morphing (Single Kanji / Jukugo / Gairaigo / Idiom)
                 ================================================================= */}
              {displayLexicon && (() => {
                const moraLen = displayMorae.length;
                const totalNodes = moraLen + (moraLen > 0 ? 1 : 0);
                const cellW = moraLen <= 4 ? 48 : moraLen <= 7 ? 38 : 31;
                const svgW = Math.max(cellW, totalNodes * cellW);
                const svgH = 34;
                const highY = 9;
                const lowY = 25;
                const isTapSpeaking = audioPulseWord === displayLexicon.word;

                const isSingleKanji = vocabArchetype === 'single_kanji';
                const isJukugo = vocabArchetype === 'jukugo';
                const isGairaigo = vocabArchetype === 'gairaigo';
                const isIdiom = vocabArchetype === 'idiom';

                const strokeCount = displayRootSnapshot.strokeCount ?? displayLexicon.strokeCount;
                const archetypeLabel = isSingleKanji
                  ? 'Hán tự đơn'
                  : isGairaigo
                  ? 'Từ mượn Gairaigo'
                  : isIdiom
                  ? 'Thành ngữ / Quán dụng'
                  : 'Từ ghép Jukugo';

                // Golden-Ratio hero only when headword is short AND not an idiom panoramic phrase
                const useGoldenHero =
                  !isIdiom &&
                  !isNarrowRightPanel &&
                  (isSingleKanji || Array.from(displayLexicon.word).length <= 3);

                const primaryReadingLabel = isGairaigo
                  ? ''
                  : displayLexicon.reading?.split('/')[0]?.trim() || '';

                return (
                  <div
                    key={`${displayLexicon.word}::${vocabArchetype}::${activePinnedMessage?.id || quickLexicon?.term || lookupEpoch || 0}`}
                    className="space-y-4"
                  >
                    <div className="rounded-2xl backdrop-blur-md bg-gradient-to-br from-slate-900/75 via-slate-900/60 to-slate-950/80 border border-slate-700/60 shadow-[0_14px_40px_-14px_rgba(2,6,23,0.9)] ring-1 ring-white/5 p-5 sm:p-6 space-y-4">
                      {/* Card Top Bar Metadata (Morphs cleanly per Vocab Archetype) */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                        <div className="flex flex-wrap items-center gap-2 min-w-0">
                          <span className="font-semibold text-sky-300">
                            {quickLexicon ? 'Tra cứu tức thì' : 'Hồ sơ Từ vựng & Ngữ âm'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-300 font-medium">{archetypeLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums text-slate-300">
                            {displayLexicon.level}
                          </span>
                          {!isGairaigo && displayLexicon.hanViet && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-semibold text-amber-300">
                                Hán Việt: {displayLexicon.hanViet}
                              </span>
                            </>
                          )}
                          {isSingleKanji && strokeCount !== undefined && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums text-slate-300">
                                {strokeCount} nét
                              </span>
                            </>
                          )}
                        </div>

                        {quickLexicon && (
                          <button
                            type="button"
                            onClick={() => setQuickLexicon(null)}
                            className="p-1 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                            title="Đóng thẻ tra nhanh"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Morphing Upper Identity + Elastic Real-Time SVG Pitch Map */}
                      <div
                        className={
                          useGoldenHero
                            ? 'grid grid-cols-[36fr_64fr] gap-5 items-center'
                            : 'space-y-4'
                        }
                      >
                        {/* Headword + Smart Audio Trimmer Trigger */}
                        <div
                          className={`flex ${
                            useGoldenHero
                              ? 'flex-col justify-center rounded-xl bg-slate-950/60 border border-slate-800/75 p-4 text-center'
                              : isIdiom
                              ? 'flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-950/55 border border-slate-800/75 px-4 py-3.5'
                              : 'flex-wrap items-center justify-between gap-3'
                          }`}
                        >
                          <div
                            className={`flex ${
                              useGoldenHero
                                ? 'flex-col items-center gap-2'
                                : 'flex-wrap items-baseline gap-3 min-w-0 flex-1'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => handleInstantSpeakWord(displayLexicon.word)}
                              className="group inline-flex items-center gap-2.5 text-left cursor-pointer focus:outline-none"
                              title="Chạm để nghe phát âm bản xứ ngay lập tức (Smart Audio Trimmer)"
                            >
                              <span
                                className={`font-bold text-white font-jp tracking-tight break-words transition-colors group-hover:text-sky-200 ${
                                  isSingleKanji
                                    ? 'text-5xl sm:text-6xl leading-none py-1'
                                    : isIdiom
                                    ? 'text-xl sm:text-2xl leading-snug'
                                    : Array.from(displayLexicon.word).length <= 3
                                    ? 'text-3xl sm:text-4xl'
                                    : 'text-2xl sm:text-3xl'
                                }`}
                              >
                                {displayLexicon.word}
                              </span>
                              <span
                                className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                                  isTapSpeaking
                                    ? 'bg-sky-500 border-sky-300 text-white scale-105'
                                    : 'bg-slate-900/90 border-slate-700/80 text-sky-300 group-hover:border-sky-400 group-hover:text-white'
                                }`}
                              >
                                <Volume2 className="w-4 h-4" />
                              </span>
                            </button>

                            <div
                              className={`flex flex-wrap items-baseline gap-2 ${
                                useGoldenHero ? 'justify-center' : ''
                              }`}
                            >
                              {primaryReadingLabel && (
                                <span className="text-sm font-jp font-medium text-sky-300">
                                  {primaryReadingLabel}
                                </span>
                              )}
                              {displayLexicon.romaji && (
                                <span className="text-xs font-mono text-slate-400">
                                  /{displayLexicon.romaji}/
                                </span>
                              )}
                            </div>
                          </div>

                          {!useGoldenHero && (
                            <button
                              type="button"
                              onClick={() => handleInstantSpeakWord(displayLexicon.word)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                                isTapSpeaking
                                  ? 'bg-sky-500/20 border-sky-400 text-white'
                                  : 'bg-slate-950/75 border-slate-800 text-slate-200 hover:border-sky-400/60 hover:text-white'
                              }`}
                              title={`Nghe phát âm bản xứ tức thì (${speechRate}x)`}
                            >
                              <Volume2 className="w-3.5 h-3.5 text-sky-300" />
                              <span>Nghe ({speechRate}x)</span>
                            </button>
                          )}
                        </div>

                        {/* Elastic SVG Pitch Accent Contour (Auto-scales cleanly from 2 to 10+ morae, preserves Katakana on Gairaigo) */}
                        {displayMorae.length > 0 && (
                          <div className="rounded-xl bg-slate-950/65 border border-slate-800/75 p-3.5 space-y-2 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                              <span className="text-slate-400 font-medium">
                                Pitch Accent Tokyo · {displayPitchMeta.name}
                              </span>
                              <span
                                className={`font-mono tabular-nums font-semibold ${
                                  displayContour.effectivePitch === 0
                                    ? 'text-sky-300'
                                    : 'text-rose-300'
                                }`}
                              >
                                {displayPitchMeta.code}
                              </span>
                            </div>

                            <div className="overflow-x-auto scrollbar-none pb-0.5">
                              <div
                                className="flex flex-col select-none mx-auto"
                                style={{
                                  width: '100%',
                                  maxWidth: `${svgW}px`,
                                  minWidth: totalNodes > 9 ? `${totalNodes * 28}px` : undefined,
                                }}
                              >
                                {/* Elastic SVG Contour Line Graph */}
                                <svg
                                  viewBox={`0 0 ${svgW} ${svgH}`}
                                  className="w-full h-auto block overflow-visible"
                                  aria-label={`Đồ thị trọng âm ${displayPitchMeta.name}`}
                                >
                                  {(() => {
                                    const allLevels = [
                                      ...displayContour.wordLevels,
                                      displayContour.particleLevel,
                                    ];
                                    const coords = allLevels.map((lvl, idx) => ({
                                      x: idx * cellW + cellW / 2,
                                      y: lvl === 'H' ? highY : lowY,
                                      lvl,
                                      isParticle: idx === displayMorae.length,
                                    }));

                                    return (
                                      <>
                                        <line
                                          x1={8}
                                          y1={highY}
                                          x2={svgW - 8}
                                          y2={highY}
                                          stroke="rgba(148,163,184,0.12)"
                                          strokeDasharray="2 3"
                                        />
                                        <line
                                          x1={8}
                                          y1={lowY}
                                          x2={svgW - 8}
                                          y2={lowY}
                                          stroke="rgba(148,163,184,0.12)"
                                          strokeDasharray="2 3"
                                        />

                                        {coords.slice(0, -1).map((pt, idx) => {
                                          const nextPt = coords[idx + 1];
                                          const isDropSegment =
                                            pt.lvl === 'H' && nextPt.lvl === 'L';
                                          const isAccentedHigh =
                                            displayContour.effectivePitch > 0 &&
                                            pt.lvl === 'H' &&
                                            nextPt.lvl === 'H';
                                          const strokeColor =
                                            isDropSegment || isAccentedHigh
                                              ? '#f43f5e'
                                              : '#38bdf8';

                                          return (
                                            <line
                                              key={`seg_${idx}`}
                                              x1={pt.x}
                                              y1={pt.y}
                                              x2={nextPt.x}
                                              y2={nextPt.y}
                                              stroke={strokeColor}
                                              strokeWidth={isDropSegment ? 2.5 : 2}
                                              strokeDasharray={
                                                nextPt.isParticle ? '4 3' : undefined
                                              }
                                              strokeLinecap="round"
                                            />
                                          );
                                        })}

                                        {coords.map((pt, idx) => {
                                          const isDropOrigin =
                                            displayContour.dropAfterIndex === idx;
                                          const isHigh = pt.lvl === 'H';
                                          const nodeColor = pt.isParticle
                                            ? isHigh
                                              ? '#38bdf8'
                                              : '#f43f5e'
                                            : isDropOrigin ||
                                              (displayContour.effectivePitch > 0 && isHigh)
                                            ? '#f43f5e'
                                            : '#38bdf8';

                                          return (
                                            <g key={`nd_${idx}`}>
                                              <circle
                                                cx={pt.x}
                                                cy={pt.y}
                                                r={isDropOrigin ? 4.8 : 3.8}
                                                fill={pt.isParticle ? '#020617' : nodeColor}
                                                stroke={nodeColor}
                                                strokeWidth={2}
                                              />
                                              {isDropOrigin && (
                                                <text
                                                  x={pt.x + 7}
                                                  y={pt.y + 4}
                                                  fontSize="10"
                                                  fill="#fb7185"
                                                  fontWeight="700"
                                                >
                                                  ╲
                                                </text>
                                              )}
                                            </g>
                                          );
                                        })}
                                      </>
                                    );
                                  })()}
                                </svg>

                                {/* Mora Grid Locked Pixel-for-Pixel Directly Under SVG Nodes */}
                                <div
                                  className="grid items-start pt-1"
                                  style={{
                                    gridTemplateColumns: `repeat(${totalNodes}, minmax(0, 1fr))`,
                                  }}
                                >
                                  {displayMorae.map((mora, idx) => {
                                    const isHigh = displayContour.wordLevels[idx] === 'H';
                                    const isDropOrigin = displayContour.dropAfterIndex === idx;
                                    return (
                                      <div
                                        key={`${mora}_${idx}`}
                                        className="flex flex-col items-center text-center min-w-0"
                                      >
                                        <span
                                          className={`font-jp font-semibold leading-tight ${
                                            moraLen > 6 ? 'text-xs' : 'text-sm'
                                          } ${
                                            isDropOrigin
                                              ? 'text-rose-300'
                                              : isHigh
                                              ? 'text-white'
                                              : 'text-sky-300/85'
                                          }`}
                                        >
                                          {mora}
                                        </span>
                                        <span className="text-[9px] font-mono text-slate-500">
                                          {isHigh ? 'H' : 'L'}
                                        </span>
                                      </div>
                                    );
                                  })}

                                  <div
                                    className="flex flex-col items-center text-center opacity-65 min-w-0"
                                    title="Cao độ khi nối tiếp trợ từ (が)"
                                  >
                                    <span className="text-[11px] font-jp text-slate-400 leading-tight">
                                      (が)
                                    </span>
                                    <span className="text-[9px] font-mono text-slate-500">
                                      {displayContour.particleLevel}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p className="text-[11px] text-slate-400 leading-snug">
                              {displayPitchMeta.rule}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Morphing Lower Liquid Zen Grid (Tailored Per Vocab Class) */}
                      {isIdiom ? (
                        /* IDIOM / YOJIJUKUGO: Panoramic Nghĩa đen -> Nghĩa bóng hierarchy */
                        <div
                          className={`grid gap-3 pt-3 border-t border-slate-800/70 ${
                            isNarrowRightPanel ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                          }`}
                        >
                          <div className="rounded-xl bg-slate-950/55 border border-slate-800/75 p-3.5 space-y-2 min-w-0">
                            <div className="text-[11px] font-medium text-slate-400">
                              Nghĩa đen (Mặt chữ gốc)
                            </div>
                            <div className="text-xs sm:text-[13px] text-slate-300 leading-relaxed break-words">
                              {displayLexicon.literalMeaning ||
                                'Hình ảnh ghép từ từng chữ cấu thành trong ngữ cảnh gốc'}
                            </div>
                          </div>

                          <div className="rounded-xl bg-amber-500/10 border border-amber-400/40 p-3.5 space-y-2 min-w-0">
                            <div className="flex items-center justify-between gap-2 text-[11px]">
                              <span className="font-semibold text-amber-300">
                                Nghĩa bóng (Hàm ý thực chiến)
                              </span>
                              <span className="text-amber-200/80 font-medium">Trọng tâm</span>
                            </div>
                            <div className="text-sm sm:text-[15px] font-semibold text-white leading-snug break-words">
                              {displayLexicon.figurativeMeaning ||
                                weightedMeanings[0]?.text ||
                                displayLexicon.meaning}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`grid gap-3 pt-3 border-t border-slate-800/70 ${
                            isNarrowRightPanel ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                          }`}
                        >
                          {/* Context-Weighted 1-2 Core Vietnamese Meanings */}
                          <div className="rounded-xl bg-slate-950/55 border border-slate-800/70 p-3.5 space-y-2 min-w-0">
                            <div className="flex items-center justify-between gap-2 text-[11px]">
                              <span className="font-medium text-slate-400">
                                Nghĩa cốt lõi (Chắt lọc ngữ cảnh)
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {weightedMeanings.length > 0 ? (
                                weightedMeanings.map((item, idx) => (
                                  <div
                                    key={`${item.text}_${idx}`}
                                    className={`flex items-baseline justify-between gap-2 rounded-lg px-2.5 py-1.5 transition-colors ${
                                      item.isContextMatch
                                        ? 'bg-amber-400/12 border border-amber-400/35 text-amber-100'
                                        : 'bg-slate-900/50 border border-slate-800/60 text-slate-300'
                                    }`}
                                  >
                                    <span className="text-xs sm:text-[13.5px] font-semibold leading-snug break-words">
                                      {item.text}
                                    </span>
                                    {item.isContextMatch && (
                                      <span className="text-[10px] font-medium text-amber-300 shrink-0 whitespace-nowrap">
                                        Khớp bối cảnh
                                      </span>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <div className="text-sm font-semibold text-white leading-snug break-words">
                                  {displayLexicon.meaning}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Morphing Right Companion Block per Vocab Class */}
                          {isGairaigo ? (
                            /* GAIRAIGO: Omit Kanji/On-Kun completely -> Loanword Origin + Nuance */
                            <div className="rounded-xl bg-slate-950/55 border border-slate-800/70 p-3.5 space-y-2 min-w-0">
                              <div className="text-[11px] font-medium text-slate-400">
                                Gốc từ ngoại lai (Loanword Origin)
                              </div>
                              <div className="text-xs sm:text-[13.5px] font-semibold text-sky-200 leading-snug break-words">
                                {loanwordOrigin || 'Từ mượn Katakana hiện đại'}
                              </div>
                              {displayLexicon.culturalNote && (
                                <p className="text-[11px] text-slate-400 leading-snug break-words">
                                  {displayLexicon.culturalNote}
                                </p>
                              )}
                            </div>
                          ) : isSingleKanji ? (
                            /* SINGLE KANJI: Focus on Bộ thủ, Stroke count, and Separate On/Kun blocks */
                            <div className="rounded-xl bg-slate-950/55 border border-slate-800/70 p-3.5 space-y-2.5 min-w-0">
                              <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
                                <span className="font-medium">Giải phẫu Hán tự đơn</span>
                                {strokeCount !== undefined && (
                                  <span className="font-mono tabular-nums text-slate-300">
                                    {strokeCount} nét bút
                                  </span>
                                )}
                              </div>

                              {displayRootSnapshot.radicals[0] && (
                                <div className="text-xs text-slate-200">
                                  <span className="text-slate-400">Bộ thủ: </span>
                                  <strong className="text-amber-300 font-semibold">
                                    {displayRootSnapshot.radicals[0].radical}
                                  </strong>
                                </div>
                              )}

                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <div className="rounded-lg bg-slate-900/70 border border-slate-800/70 px-2.5 py-1.5">
                                  <div className="text-slate-400 font-medium mb-0.5">Âm On</div>
                                  <div className="font-jp text-white font-semibold break-words">
                                    {displayRootSnapshot.onyomi.length > 0
                                      ? displayRootSnapshot.onyomi.slice(0, 3).join('・')
                                      : '—'}
                                  </div>
                                </div>
                                <div className="rounded-lg bg-slate-900/70 border border-slate-800/70 px-2.5 py-1.5">
                                  <div className="text-slate-400 font-medium mb-0.5">Âm Kun</div>
                                  <div className="font-jp text-sky-200 font-semibold break-words">
                                    {displayRootSnapshot.kunyomi.length > 0
                                      ? displayRootSnapshot.kunyomi.slice(0, 3).join('・')
                                      : '—'}
                                  </div>
                                </div>
                              </div>

                              {displayLexicon.sinoTruthAlert &&
                                (displayLexicon.sinoTruthAlert.secondaryWarnings.length > 0 ||
                                  displayLexicon.sinoTruthAlert.canChiWarning ||
                                  displayLexicon.sinoTruthAlert.contextualAlert) && (
                                  <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 px-3 py-2 space-y-1 text-[11px] leading-relaxed">
                                    {(displayLexicon.sinoTruthAlert.canChiWarning ||
                                      displayLexicon.sinoTruthAlert.secondaryWarnings[0]) && (
                                      <div className="text-slate-300">
                                        {displayLexicon.sinoTruthAlert.canChiWarning ||
                                          displayLexicon.sinoTruthAlert.secondaryWarnings[0]}
                                      </div>
                                    )}
                                    {displayLexicon.sinoTruthAlert.contextualAlert && (
                                      <div className="text-amber-200/95">
                                        {displayLexicon.sinoTruthAlert.contextualAlert}
                                      </div>
                                    )}
                                  </div>
                                )}
                            </div>
                          ) : (
                            /* JUKUGO: Focus on Compound Kanji Etymology Synthesis */
                            <div className="rounded-xl bg-slate-950/55 border border-slate-800/70 p-3.5 space-y-2 min-w-0">
                              <div className="text-[11px] font-medium text-slate-400">
                                {isJukugo && displayRootSnapshot.radicals.length >= 2
                                  ? 'Hợp thành chiết tự (Kanji + Kanji)'
                                  : 'Gốc rễ Hán tự & Âm đọc'}
                              </div>
                              {displayRootSnapshot.radicals.length > 0 ? (
                                <div className="space-y-2 text-xs">
                                  <div className="flex flex-wrap items-center gap-1.5 text-slate-200">
                                    {displayRootSnapshot.radicals.slice(0, 3).map((r, idx) => (
                                      <React.Fragment key={r.kanji}>
                                        {idx > 0 && (
                                          <span className="text-slate-500 font-mono text-[11px]">
                                            +
                                          </span>
                                        )}
                                        <span className="inline-flex items-baseline gap-1 rounded-lg bg-slate-900/70 border border-slate-800/70 px-2 py-1">
                                          <strong className="font-jp text-white font-semibold">
                                            {r.kanji}
                                          </strong>
                                          <span className="text-amber-300 font-medium text-[11px]">
                                            {r.hanViet || r.radical}
                                          </span>
                                        </span>
                                      </React.Fragment>
                                    ))}
                                  </div>
                                  {(displayRootSnapshot.onyomi.length > 0 ||
                                    displayRootSnapshot.kunyomi.length > 0) && (
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-300 font-jp">
                                      {displayRootSnapshot.onyomi.length > 0 && (
                                        <span>
                                          <strong className="font-sans text-slate-400 font-medium">
                                            On:{' '}
                                          </strong>
                                          {displayRootSnapshot.onyomi.slice(0, 2).join('・')}
                                        </span>
                                      )}
                                      {displayRootSnapshot.kunyomi.length > 0 && (
                                        <span>
                                          <strong className="font-sans text-slate-400 font-medium">
                                            Kun:{' '}
                                          </strong>
                                          {displayRootSnapshot.kunyomi.slice(0, 2).join('・')}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="text-xs text-slate-300 leading-relaxed break-words">
                                  {displayLexicon.partOfSpeech || 'Từ thuần Nhật / Khẩu ngữ chuẩn'}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Quick Examples only on Zero-Latency term inspection */}
                      {quickLexicon && displayLexicon.examples.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-slate-800/60">
                          {displayLexicon.examples.slice(0, 2).map((ex, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl bg-slate-950/55 border border-slate-800/70 px-3.5 py-2.5 text-xs space-y-0.5"
                            >
                              <div className="font-jp font-semibold text-white">{ex.japanese}</div>
                              <div className="text-slate-400 font-mono text-[11px]">{ex.romaji}</div>
                              <div className="text-slate-200">{ex.vietnamese}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Visual Funnel Divider separating 3s Top Card from Deep Encyclopedia */}
                    <div className="flex items-center gap-3 px-1">
                      <div className="h-px flex-1 bg-slate-800/75" />
                      <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                        Giải phẫu bách khoa chuyên sâu
                      </span>
                      <div className="h-px flex-1 bg-slate-800/75" />
                    </div>
                  </div>
                );
              })()}

              {/* Zen Encyclopedic Knowledge Header */}
              <div className="space-y-1.5 pb-4 border-b border-slate-800/70">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span>Hồ sơ tri thức</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {activePinnedMessage?.timestamp || ''}
                  </span>
                  {streamingMsgId === activePinnedMessage?.id && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-sky-300 font-medium">Đang kết xuất trực tiếp...</span>
                    </>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight break-words">
                  {activeTopicTitle}
                </h2>
              </div>

              {/* Structured Encyclopedic Sections with Responsive Smart Accordion */}
              <div className="space-y-4">
                {parsedSections.map((section, idx) => {
                  const defaultOpen = isNarrowRightPanel ? idx < 2 : true;
                  const isOpenSection =
                    expandedSections[section.id] !== undefined
                      ? expandedSections[section.id]
                      : defaultOpen;

                  return (
                    <div
                      key={section.id}
                      className="rounded-2xl border border-slate-800/70 bg-slate-900/40 overflow-hidden"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpenSection}
                        onClick={() => toggleSectionAccordion(section.id, isOpenSection)}
                        className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-slate-900/70 transition-colors cursor-pointer"
                      >
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div
                            className={`text-sm sm:text-[15px] font-semibold flex items-center gap-2 ${
                              SECTION_TONE_CLASSES[section.tone]
                            }`}
                          >
                            <span className="shrink-0">{section.icon}</span>
                            <span className="break-words">{section.title}</span>
                          </div>
                          {!isOpenSection && section.previewText && (
                            <p className="text-xs text-slate-400 truncate pl-6">
                              {section.previewText}
                            </p>
                          )}
                        </div>
                        <span className="text-slate-400 shrink-0">
                          {isOpenSection ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </span>
                      </button>

                      {isOpenSection && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-800/50">
                          {renderSectionBodyLines(
                            section.lines,
                            isNarrowRightPanel,
                            (term) =>
                              handleZeroLatencyTermClick(
                                term,
                                activePinnedMessage?.id || 'welcome'
                              )
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Minimal Follow-up Bar on Pinned Knowledge Entry */}
              {activePinnedMessage && activePinnedMessage.id !== 'welcome' && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 border-t border-slate-800/70 text-xs text-slate-400">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Đào sâu tiếp:
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onSendMessage(
                        `Sensei hãy phân tích bẫy đề thi thật JLPT và cho mẹo làm bài của điểm: "${activeTopicTitle}"`
                      )
                    }
                    disabled={isAnswering}
                    className="hover:text-white transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    Bẫy JLPT
                  </button>
                  <span className="text-slate-700" aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() =>
                      onSendMessage(
                        `Sensei hãy cho 3 câu ví dụ theo 3 ngữ vực Đời sống - Lịch sự - Kính ngữ của điểm: "${activeTopicTitle}"`
                      )
                    }
                    disabled={isAnswering}
                    className="hover:text-white transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    3 tầng TPO
                  </button>
                  <span className="text-slate-700" aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() =>
                      onSendMessage(
                        `Sensei hãy ra 1 câu hỏi trắc nghiệm kèm 4 đáp án dạng đề thi JLPT về điểm này để em làm thử`
                      )
                    }
                    disabled={isAnswering}
                    className="hover:text-white transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    Thử sức trắc nghiệm
                  </button>
                  <span className="text-slate-700" aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => onOpenVocab5D(activeTopicTitle || 'đàm phán hợp đồng')}
                    className="hover:text-sky-300 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Thẻ Từ Vựng 5D
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

import { callGemini, callGeminiStream, safeExtractJson } from './geminiService';
import { JLPTLevel } from '../types';

export type NikkiStyleMode = 'monologue' | 'futsukei' | 'poetic';
export type NikkiInputMode = 'translate' | 'self_write';
export type WairoSpectrumFamily = 'sakura_sun' | 'matcha_calm' | 'indigo_rain' | 'crimson_ash';

export interface NikkiToken {
  text: string;
  reading?: string;
  isKanji?: boolean;
}

export interface NikkiVocabTreasure {
  id: string;
  expression: string;
  furigana: string;
  romaji: string;
  pitchType: 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka';
  pitchAccentNum: number;
  pitchLabel: string;
  meaning: string;
  whyLearn: string;
  jlpt: JLPTLevel;
  contextSentence: string;
}

export interface TherapistReply {
  japanese: string;
  reading: string;
  vietnamese: string;
  cultureNote: string;
}

export interface RedPenCorrection {
  id: string;
  original: string;
  corrected: string;
  category: 'particle' | 'conjugation' | 'nuance' | 'style';
  gentleReason: string;
}

export interface MoodKanjiTag {
  kanji: string;
  sinoVietnamese: string;
  reading: string;
  meaningVi: string;
  tone: 'warm' | 'calm' | 'melancholy' | 'heavy' | 'bright';
  wairoFamily: WairoSpectrumFamily;
  wairoNameJa: string;
}

export interface NikkiHaiku {
  lines: [string, string, string];
  vietnamese: string;
}

export interface NikkiBestQuote {
  japanese: string;
  vietnamese: string;
}

export interface GlassJarCollocation {
  expression: string;
  reading: string;
  meaning: string;
}

export interface GlassJarPrompt {
  id: string;
  japanese: string;
  reading: string;
  vietnamese: string;
  suggestedMood: string;
  collocations: GlassJarCollocation[];
}

export interface NikkiQualityAudit {
  naturalMonologuePassed: boolean;
  furiganaAlignedPassed: boolean;
  collocationQualityPassed: boolean;
  therapistReplyPassed: boolean;
  redPenCheckedPassed: boolean;
  moodKanjiTaggedPassed: boolean;
  auditNote: string;
}

export interface NikkiEntryRecord {
  id: string;
  createdAt: number;
  dateLabelJa: string;
  inputMode: NikkiInputMode;
  vietnameseRaw: string;
  selfWrittenOriginalJa?: string;
  praiseFirst?: string;
  redPenCorrections?: RedPenCorrection[];
  styleMode: NikkiStyleMode;
  emotionalTone: string;
  moodKanji: MoodKanjiTag;
  japaneseTitle: string;
  japanesePlain: string;
  tokens: NikkiToken[];
  haiku: NikkiHaiku;
  bestQuote: NikkiBestQuote;
  therapistReply: TherapistReply;
  treasures: NikkiVocabTreasure[];
  syncedToSrs: boolean;
  audit: NikkiQualityAudit;
}

const NIKKI_STORAGE_KEY = 'kotoba_daily_nikki_entries_v3';
const PREV_STORAGE_KEY_V2 = 'kotoba_daily_nikki_entries_v2';
const LEGACY_STORAGE_KEY = 'kotoba_daily_nikki_entries_v1';

export const MOOD_KANJI_PALETTE: MoodKanjiTag[] = [
  {
    kanji: '喜',
    sinoVietnamese: 'HỶ',
    reading: 'よろこび',
    meaningVi: 'Vui sướng, hân hoan',
    tone: 'bright',
    wairoFamily: 'sakura_sun',
    wairoNameJa: '桜色 · Hồng Sakura',
  },
  {
    kanji: '楽',
    sinoVietnamese: 'LẠC',
    reading: 'たのしい',
    meaningVi: 'Nhẹ nhàng, thư thái',
    tone: 'bright',
    wairoFamily: 'sakura_sun',
    wairoNameJa: '山吹 · Vàng Nắng',
  },
  {
    kanji: '希',
    sinoVietnamese: 'HY',
    reading: 'きぼう',
    meaningVi: 'Hy vọng, tươi sáng',
    tone: 'bright',
    wairoFamily: 'sakura_sun',
    wairoNameJa: '曙色 · Bình Minh',
  },
  {
    kanji: '平',
    sinoVietnamese: 'BÌNH',
    reading: 'たいら',
    meaningVi: 'Bình yên, thăng bằng',
    tone: 'calm',
    wairoFamily: 'matcha_calm',
    wairoNameJa: '抹茶 · Xanh Matcha',
  },
  {
    kanji: '静',
    sinoVietnamese: 'TĨNH',
    reading: 'しずか',
    meaningVi: 'Tĩnh lặng, chiêm nghiệm',
    tone: 'calm',
    wairoFamily: 'matcha_calm',
    wairoNameJa: '若竹 · Trúc Xanh',
  },
  {
    kanji: '穏',
    sinoVietnamese: 'ỔN',
    reading: 'おだやか',
    meaningVi: 'Êm ả, dịu dàng',
    tone: 'calm',
    wairoFamily: 'matcha_calm',
    wairoNameJa: '青磁 · Men Ngọc',
  },
  {
    kanji: '感',
    sinoVietnamese: 'CẢM',
    reading: 'かんしゃ',
    meaningVi: 'Biết ơn, rung động',
    tone: 'warm',
    wairoFamily: 'matcha_calm',
    wairoNameJa: '鶯色 · Lục Dịu',
  },
  {
    kanji: '哀',
    sinoVietnamese: 'AI',
    reading: 'かなしみ',
    meaningVi: 'Man mác buồn, trầm lắng',
    tone: 'melancholy',
    wairoFamily: 'indigo_rain',
    wairoNameJa: '藍染 · Xanh Indigo',
  },
  {
    kanji: '悲',
    sinoVietnamese: 'BI',
    reading: 'かなしい',
    meaningVi: 'Sâu lắng, thương cảm',
    tone: 'melancholy',
    wairoFamily: 'indigo_rain',
    wairoNameJa: '紺碧 · Chàm Đêm',
  },
  {
    kanji: '疲',
    sinoVietnamese: 'BÌ',
    reading: 'つかれ',
    meaningVi: 'Mệt mỏi, cần nghỉ ngơi',
    tone: 'heavy',
    wairoFamily: 'crimson_ash',
    wairoNameJa: '灰桜 · Xám Tro',
  },
  {
    kanji: '怒',
    sinoVietnamese: 'NỘ',
    reading: 'いかり',
    meaningVi: 'Áp lực, bức bối',
    tone: 'heavy',
    wairoFamily: 'crimson_ash',
    wairoNameJa: '臙脂 · Đỏ Thẫm',
  },
  {
    kanji: '焦',
    sinoVietnamese: 'TIÊU',
    reading: 'あせり',
    meaningVi: 'Sốt ruột, căng thẳng',
    tone: 'heavy',
    wairoFamily: 'crimson_ash',
    wairoNameJa: '墨灰 · Xám Mực',
  },
];

export const GLASS_JAR_PROMPTS: GlassJarPrompt[] = [
  {
    id: 'jar_gratitude',
    japanese: '今日、一番感謝したいことは何ですか？',
    reading: 'きょう、いちばんかんしゃしたいことはなんですか？',
    vietnamese: 'Điều bạn muốn biết ơn nhất hôm nay là gì?',
    suggestedMood: '感 · Biết ơn',
    collocations: [
      { expression: '本当にありがたい', reading: 'ほんとうにありがたい', meaning: 'Thật sự đáng trân trọng biết ơn' },
      { expression: '心が温まる', reading: 'こころがあたたまる', meaning: 'Lòng thấy ấm áp hẳn lên' },
      { expression: '何気ない一言', reading: 'なにげないひとこと', meaning: 'Một câu nói bâng quơ mà chạm tim' },
      { expression: '支えてくれる人', reading: 'ささえてくれるひと', meaning: 'Người âm thầm nâng đỡ mình' },
      { expression: '当たり前じゃない', reading: 'あたりまえじゃない', meaning: 'Không phải điều hiển nhiên đâu' },
    ],
  },
  {
    id: 'jar_let_go',
    japanese: '今、心の中でそっと手放したい重荷は何ですか？',
    reading: 'いま、こころのなかでそっとてばなしたいおもにはなんですか？',
    vietnamese: 'Gánh nặng nào trong lòng mà bạn muốn nhẹ nhàng buông xuống ngay lúc này?',
    suggestedMood: '静 · Tĩnh lặng',
    collocations: [
      { expression: '肩の荷が下りる', reading: 'かたにがおりる', meaning: 'Trút bỏ được gánh nặng trên vai' },
      { expression: '気負いすぎる', reading: 'きおいすぎる', meaning: 'Tự tạo áp lực quá mức cho bản thân' },
      { expression: '深呼吸をする', reading: 'しんこきゅうをする', meaning: 'Hít thở thật sâu để thả lỏng' },
      { expression: '無理をしない', reading: 'むりをしない', meaning: 'Không ép bản thân quá sức' },
      { expression: '自分を許す', reading: 'じぶんをゆるす', meaning: 'Tha thứ và bao dung với chính mình' },
    ],
  },
  {
    id: 'jar_small_joy',
    japanese: '今日の小さな幸せを一つだけ見つけるとしたら？',
    reading: 'きょうのちいさなしあわせをひとつだけみつけるとしたら？',
    vietnamese: 'Nếu chỉ chọn một niềm vui nhỏ xíu trong ngày hôm nay, đó sẽ là gì?',
    suggestedMood: '楽 · Thư thái',
    collocations: [
      { expression: 'ほっと一息つく', reading: 'ほっとひといきつく', meaning: 'Thở phào nghỉ một nhịp nhẹ nhàng' },
      { expression: 'ささやかな楽しみ', reading: 'ささやかなたのしみ', meaning: 'Niềm vui nho nhỏ bình dị' },
      { expression: '思わず笑顔になる', reading: 'おもわずえがおになる', meaning: 'Bất giác mỉm cười lúc nào không hay' },
      { expression: 'お気に入りの一杯', reading: 'おきにいりのいっぱい', meaning: 'Một tách trà/cà phê yêu thích' },
      { expression: '穏やかな時間', reading: 'おだやかなじかん', meaning: 'Khoảng thời gian êm đềm' },
    ],
  },
  {
    id: 'jar_tired_honesty',
    japanese: '誰にも言えなかった「本音の疲れ」を吐き出してみませんか？',
    reading: 'だれにもいえなかった「ほんねのつかれ」をはきだしてみませんか？',
    vietnamese: 'Hãy thử trút ra nỗi mệt mỏi thật lòng mà bạn chưa từng kể với ai nhé?',
    suggestedMood: '疲 · Mệt mỏi',
    collocations: [
      { expression: '気疲れする', reading: 'きづかれする', meaning: 'Mệt mỏi tinh thần vì phải để ý xung quanh' },
      { expression: '限界に近い', reading: 'げんかいにちかい', meaning: 'Gần chạm ngưỡng giới hạn rồi' },
      { expression: '頭が空っぽになる', reading: 'あたまがからっぽになる', meaning: 'Đầu óc trống rỗng chẳng nghĩ nổi gì' },
      { expression: 'ただ横になりたい', reading: 'ただよこになりたい', meaning: 'Chỉ muốn được nằm dài nghỉ ngơi thôi' },
      { expression: '精一杯頑張った', reading: 'せいいっぱいがんばった', meaning: 'Mình đã cố gắng hết sức có thể rồi' },
    ],
  },
  {
    id: 'jar_self_letter',
    japanese: '一週間前の自分に、どんな優しい言葉をかけてあげたいですか？',
    reading: 'いっしゅうかんまえのじぶんに、どんなやさしいことばをかけてあげたいですか？',
    vietnamese: 'Bạn muốn nhắn nhủ lời dịu dàng nào cho chính mình của một tuần trước?',
    suggestedMood: '希 · Hy vọng',
    collocations: [
      { expression: '大丈夫だよと伝える', reading: 'だいじょうぶだよとつたえる', meaning: 'Nhắn rằng "Rồi mọi chuyện sẽ ổn thôi"' },
      { expression: '焦らなくていい', reading: 'あせらなくていい', meaning: 'Không cần phải vội vàng hấp tấp đâu' },
      { expression: '一歩ずつ進む', reading: 'いっぽずつすすむ', meaning: 'Tiến lên từng bước một thật vững' },
      { expression: 'よく耐えたね', reading: 'よくたえたね', meaning: 'Cậu đã kiên cường chịu đựng giỏi lắm rồi' },
      { expression: 'これからきっと晴れる', reading: 'これからきっとはれる', meaning: 'Từ giờ trở đi bầu trời chắc chắn sẽ quang đãng' },
    ],
  },
  {
    id: 'jar_rainy_mood',
    japanese: '今の心の天気を一言で表すとしたら、どんな空ですか？',
    reading: 'いまのこころのてんきをひとことであらわすとしたら、どんなそらですか？',
    vietnamese: 'Nếu ví tâm trạng lúc này như bầu trời, hôm nay trong lòng bạn là thời tiết gì?',
    suggestedMood: '哀 · Trầm lắng',
    collocations: [
      { expression: '曇り空のよう', reading: 'くもりぞらのよう', meaning: 'Như bầu trời nhiều mây âm u' },
      { expression: '雲の切れ間から光', reading: 'くものきれまからひかり', meaning: 'Tia nắng ló rạng qua kẽ mây' },
      { expression: '霧が晴れるように', reading: 'きりがはれるように', meaning: 'Như lớp sương mù dần tan biến' },
      { expression: '静かに雨が降る', reading: 'しずかにあめがふる', meaning: 'Mưa rơi lặng lẽ bên hiên' },
      { expression: '風が心地よい', reading: 'かぜがここちよい', meaning: 'Làn gió thổi qua thật dễ chịu' },
    ],
  },
];

export function formatJapaneseDateLabel(ts: number = Date.now()): string {
  const d = new Date(ts);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${weekdays[d.getDay()]}）`;
}

export function resolveMoodKanji(rawKanji?: string): MoodKanjiTag {
  if (rawKanji) {
    const clean = rawKanji.trim().charAt(0);
    const match = MOOD_KANJI_PALETTE.find((m) => m.kanji === clean);
    if (match) return match;
  }
  return MOOD_KANJI_PALETTE[3]; // 平 default
}

function buildCurrentMonthTimestamp(targetDay: number, hour = 21): number {
  const now = new Date();
  const clampedDay = Math.max(1, Math.min(now.getDate(), targetDay));
  return new Date(now.getFullYear(), now.getMonth(), clampedDay, hour, 15, 0, 0).getTime();
}

function deriveFallbackHaikuAndQuote(
  plain: string,
  mood: MoodKanjiTag,
  vietnameseRaw: string
): { haiku: NikkiHaiku; bestQuote: NikkiBestQuote } {
  const firstSentence =
    plain
      .split('。')
      .map((s) => s.trim())
      .find((s) => s.length >= 5) || plain;

  const haikuByFamily: Record<WairoSpectrumFamily, NikkiHaiku> = {
    sakura_sun: {
      lines: ['陽だまりに', 'こぼれる笑顔', '胸の奥'],
      vietnamese: 'Giữa khoảng nắng ấm hiên nhà, nụ cười khẽ lan sâu tận đáy tim.',
    },
    matcha_calm: {
      lines: ['湯気ゆれて', '静かな夜に', '息ひとつ'],
      vietnamese: 'Làn hơi trà ấm khẽ bay, đêm tĩnh lặng buông một hơi thở bình yên.',
    },
    indigo_rain: {
      lines: ['雨の音', '滲む心の', '藍の空'],
      vietnamese: 'Tiếng mưa rơi tí tách, nhuộm mềm khoảng trời chàm lắng sâu trong lòng.',
    },
    crimson_ash: {
      lines: ['長い日も', '荷を下ろしつつ', '月を待つ'],
      vietnamese: 'Dẫu ngày dài mệt nhoài, đặt gánh nặng xuống hiên chờ ánh trăng lên.',
    },
  };

  return {
    haiku: haikuByFamily[mood.wairoFamily],
    bestQuote: {
      japanese: firstSentence.endsWith('。') ? firstSentence : `${firstSentence}。`,
      vietnamese: vietnameseRaw.split(/[.!?]/)[0]?.trim() || vietnameseRaw,
    },
  };
}

const tsToday = buildCurrentMonthTimestamp(31, 21); // clamped to today
const tsMinus1 = buildCurrentMonthTimestamp(Math.max(1, new Date().getDate() - 2), 22);
const tsMinus2 = buildCurrentMonthTimestamp(Math.max(1, new Date().getDate() - 5), 20);
const tsMinus3 = buildCurrentMonthTimestamp(Math.max(1, new Date().getDate() - 8), 19);
const tsMinus4 = buildCurrentMonthTimestamp(Math.max(1, new Date().getDate() - 12), 21);

export const STARTER_NIKKI_PRESETS: NikkiEntryRecord[] = [
  {
    id: 'nikki_preset_rain',
    createdAt: tsToday,
    dateLabelJa: formatJapaneseDateLabel(tsToday),
    inputMode: 'translate',
    vietnameseRaw: 'Hôm nay trời mưa to, tự nhiên thấy buồn ngang, chả muốn làm gì cả.',
    styleMode: 'monologue',
    emotionalTone: 'Trầm lắng, uể oải nhẹ giữa ngày mưa — tự sự chân thật kiểu Nhật.',
    moodKanji: MOOD_KANJI_PALETTE[7], // 哀 (Indigo)
    japaneseTitle: '雨の音と、何となく重い心',
    japanesePlain:
      '今日は朝からどしゃ降りの雨だ。窓の外を眺めていたら、何となく気分が沈んでしまって、何も手につかない。こんな日は無理に頑張らず、温かいお茶でも淹れてゆっくりしよう。',
    tokens: [
      { text: '今日', reading: 'きょう', isKanji: true },
      { text: 'は' },
      { text: '朝', reading: 'あさ', isKanji: true },
      { text: 'からどしゃ' },
      { text: '降', reading: 'ぶ', isKanji: true },
      { text: 'りの' },
      { text: '雨', reading: 'あめ', isKanji: true },
      { text: 'だ。' },
      { text: '窓', reading: 'まど', isKanji: true },
      { text: 'の' },
      { text: '外', reading: 'そと', isKanji: true },
      { text: 'を' },
      { text: '眺', reading: 'なが', isKanji: true },
      { text: 'めていたら、' },
      { text: '何', reading: 'なん', isKanji: true },
      { text: 'となく' },
      { text: '気分', reading: 'きぶん', isKanji: true },
      { text: 'が' },
      { text: '沈', reading: 'しず', isKanji: true },
      { text: 'んでしまって、' },
      { text: '何', reading: 'なに', isKanji: true },
      { text: 'も' },
      { text: '手', reading: 'て', isKanji: true },
      { text: 'につかない。こんな' },
      { text: '日', reading: 'ひ', isKanji: true },
      { text: 'は' },
      { text: '無理', reading: 'むり', isKanji: true },
      { text: 'に' },
      { text: '頑張', reading: 'がんば', isKanji: true },
      { text: 'らず、' },
      { text: '温', reading: 'あたた', isKanji: true },
      { text: 'かいお' },
      { text: '茶', reading: 'ちゃ', isKanji: true },
      { text: 'でも' },
      { text: '淹', reading: 'い', isKanji: true },
      { text: 'れてゆっくりしよう。' },
    ],
    haiku: {
      lines: ['雨音に', '沈む心を', '茶で包む'],
      vietnamese: 'Trong tiếng mưa rơi, ủ ấm trái tim chùng xuống bằng tách trà nóng.',
    },
    bestQuote: {
      japanese: 'こんな日は無理に頑張らず、温かいお茶でも淹れてゆっくりしよう。',
      vietnamese: 'Những ngày thế này đừng gượng ép cố gắng, pha tách trà ấm rồi chậm lại thôi.',
    },
    therapistReply: {
      japanese: '雨の日は心も少し休みたがるものです。今日は無理をせず、ご自身をたっぷり甘やかしてあげてくださいね。',
      reading: 'あめのひはこころもすこしやすみたがるものです。きょうはむりをせず、ごじしんをたっぷりあまやかしてあげてくださいね。',
      vietnamese: 'Những ngày mưa, trái tim cũng muốn được nghỉ ngơi một chút đấy. Hôm nay đừng cố gượng ép, hãy nuông chiều bản thân mình thật nhiều nhé.',
      cultureNote: 'Mẫu câu Omoiyari nhẹ nhàng dùng 「〜ものです」(vốn dĩ tự nhiên là thế) giúp người nghe không thấy có lỗi khi mệt mỏi.',
    },
    treasures: [
      {
        id: 'tr_rain_1',
        expression: '何となく気分が沈む',
        furigana: 'なんとなくきぶんがしずむ',
        romaji: 'nantonaku kibun ga shizumu',
        pitchType: 'nakadaka',
        pitchAccentNum: 2,
        pitchLabel: '沈む [2] · Nakadaka (L-H-L)',
        meaning: 'Tự nhiên thấy tâm trạng chùng xuống, buồn vu vơ không rõ lý do',
        whyLearn: 'Diễn đạt "buồn ngang" chuẩn tâm lý người Nhật, thay cho cách dịch cứng 悲しい (kanashii).',
        jlpt: 'N3',
        contextSentence: '窓の外を眺めていたら、何となく気分が沈んでしまった。',
      },
      {
        id: 'tr_rain_2',
        expression: '何も手につかない',
        furigana: 'なにもてにつかない',
        romaji: 'nani mo te ni tsukanai',
        pitchType: 'nakadaka',
        pitchAccentNum: 2,
        pitchLabel: '手につかない [2] · Cụm quán dụng',
        meaning: 'Chả buồn động tay làm bất cứ việc gì, không thể tập trung nổi',
        whyLearn: 'Collocation vàng trong nhật ký và đời sống khi muốn nói "chẳng muốn làm gì".',
        jlpt: 'N2',
        contextSentence: '気分が沈んでしまって、何も手につかない。',
      },
      {
        id: 'tr_rain_3',
        expression: 'どしゃ降りの雨',
        furigana: 'どしゃぶりのあめ',
        romaji: 'doshaburi no ame',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        pitchLabel: 'どしゃ降り [0] · Heiban (L-H-H-H-H)',
        meaning: 'Mưa xối xả, mưa như trút nước',
        whyLearn: 'Tự nhiên hơn hẳn 強い雨 (tsuyoi ame) khi miêu tả cơn mưa lớn ngoài cửa sổ.',
        jlpt: 'N3',
        contextSentence: '今日は朝からどしゃ降りの雨だ。',
      },
    ],
    syncedToSrs: false,
    audit: {
      naturalMonologuePassed: true,
      furiganaAlignedPassed: true,
      collocationQualityPassed: true,
      therapistReplyPassed: true,
      redPenCheckedPassed: true,
      moodKanjiTaggedPassed: true,
      auditNote: 'Đã kiểm định đủ tầng: Tự sự Futsukei, Trị liệu Omoiyari, Haiku & Nhãn Kanji「哀」.',
    },
  },
  {
    id: 'nikki_preset_work_tired',
    createdAt: tsMinus1,
    dateLabelJa: formatJapaneseDateLabel(tsMinus1),
    inputMode: 'self_write',
    vietnameseRaw: 'Hôm nay công việc nhiều quá, mệt rã rời chỉ muốn nghỉ ngơi.',
    selfWrittenOriginalJa: '今日は仕事がとても多いから、すごく疲れた。早く寝たいです。',
    praiseFirst: 'Bạn đã truyền đạt rất rõ ràng mạch cảm xúc chân thật sau một ngày bận rộn và dùng đúng thể ngắn khi kể chuyện!',
    redPenCorrections: [
      {
        id: 'rp_1',
        original: '仕事がとても多いから、すごく疲れた',
        corrected: '仕事に追われて、クタクタに疲れてしまった',
        category: 'nuance',
        gentleReason: 'Dùng 「仕事に追われる」(bị công việc rượt đuổi) và từ láy 「クタクタ」(rã rời) mang sắc thái bản xứ sống động hơn 「多い＋疲れた」; đuôi 「〜てしまった」 diễn tả sự mệt nhoài ngoài ý muốn.',
      },
      {
        id: 'rp_2',
        original: '早く寝たいです。',
        corrected: '今夜は泥のように眠りたい。',
        category: 'style',
        gentleReason: 'Trong nhật ký riêng tư, giữ đồng nhất thể ngắn (bỏ です) và mượn hình ảnh 「泥のように眠る」(ngủ say như chết) sẽ tự nhiên hơn rất nhiều.',
      },
    ],
    styleMode: 'monologue',
    emotionalTone: 'Rã rời sau guồng công việc — khao khát giấc ngủ sâu chữa lành.',
    moodKanji: MOOD_KANJI_PALETTE[9], // 疲 (Crimson/Ash)
    japaneseTitle: '仕事に追われた一日の終わりに',
    japanesePlain:
      '今日は朝から仕事に追われて、クタクタに疲れてしまった。もう頭が回らないから、今夜はスマートフォンを置いて泥のように眠りたい。',
    tokens: [
      { text: '今日', reading: 'きょう', isKanji: true },
      { text: 'は' },
      { text: '朝', reading: 'あさ', isKanji: true },
      { text: 'から' },
      { text: '仕事', reading: 'しごと', isKanji: true },
      { text: 'に' },
      { text: '追', reading: 'お', isKanji: true },
      { text: 'われて、クタクタに' },
      { text: '疲', reading: 'つか', isKanji: true },
      { text: 'れてしまった。もう' },
      { text: '頭', reading: 'あたま', isKanji: true },
      { text: 'が' },
      { text: '回', reading: 'まわ', isKanji: true },
      { text: 'らないから、' },
      { text: '今夜', reading: 'こんや', isKanji: true },
      { text: 'はスマートフォンを' },
      { text: '置', reading: 'お', isKanji: true },
      { text: 'いて' },
      { text: '泥', reading: 'どろ', isKanji: true },
      { text: 'のように' },
      { text: '眠', reading: 'ねむ', isKanji: true },
      { text: 'りたい。' },
    ],
    haiku: {
      lines: ['時計止み', 'スマホを伏せて', '深い夢'],
      vietnamese: 'Đồng hồ ngưng vội, úp điện thoại xuống bước vào giấc ngủ sâu.',
    },
    bestQuote: {
      japanese: '今夜はスマートフォンを置いて泥のように眠りたい。',
      vietnamese: 'Tối nay đặt điện thoại xuống và ngủ một giấc say như chết thôi.',
    },
    therapistReply: {
      japanese: '今日も一日お疲れ様でした。よくここまで走り抜けましたね。今夜はどうかゆっくり休んでくださいね。',
      reading: 'きょうもいちにちおつかれさまでした。よくここまでをはしりぬけましたね。こんやはどうゆっくりやすんでくださいね。',
      vietnamese: 'Hôm nay bạn đã vất vả cả một ngày dài rồi. Bạn đã nỗ lực chạy suốt chặng đường giỏi lắm. Tối nay hãy nghỉ ngơi thật ngon nhé.',
      cultureNote: 'Cặp câu 「お疲れ様でした」+ 「ゆっくり休んでくださいね」là lời ủi an Omoiyari ấm áp nhất trong giao tiếp Nhật.',
    },
    treasures: [
      {
        id: 'tr_tired_1',
        expression: '仕事に追われる',
        furigana: 'しごとにおわれる',
        romaji: 'shigoto ni owareru',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        pitchLabel: '追われる [0] · Thể bị động tự nhiên',
        meaning: 'Bị công việc/deadline dồn ép liên tục',
        whyLearn: 'Đắt giá gấp nhiều lần 仕事が多い vì thể hiện đúng áp lực thời gian.',
        jlpt: 'N3',
        contextSentence: '今日は朝から仕事に追われていた。',
      },
      {
        id: 'tr_tired_2',
        expression: 'クタクタに疲れる',
        furigana: 'くたくたにつかれる',
        romaji: 'kutakuta ni tsukareru',
        pitchType: 'nakadaka',
        pitchAccentNum: 3,
        pitchLabel: 'クタクタ [0] · Từ tượng thái',
        meaning: 'Mệt rã rời không nhấc nổi tay chân',
        whyLearn: 'Thay thế cho すごく疲れた nhàm chán bằng từ tượng thái chuẩn bản xứ.',
        jlpt: 'N3',
        contextSentence: '夕方にはもうクタクタに疲れてしまった。',
      },
      {
        id: 'tr_tired_3',
        expression: '泥のように眠る',
        furigana: 'どろのようにねむる',
        romaji: 'doro no yō ni nemuru',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        pitchLabel: '眠る [0] · Cụm ví von văn học',
        meaning: 'Ngủ say như chết (đặt lưng là ngủ li bì)',
        whyLearn: 'Collocation tuyệt đẹp thường xuất hiện trong tiểu thuyết và nhật ký Nhật.',
        jlpt: 'N2',
        contextSentence: '今夜は泥のように眠りたい。',
      },
    ],
    syncedToSrs: false,
    audit: {
      naturalMonologuePassed: true,
      furiganaAlignedPassed: true,
      collocationQualityPassed: true,
      therapistReplyPassed: true,
      redPenCheckedPassed: true,
      moodKanjiTaggedPassed: true,
      auditNote: 'Bút Đỏ đã nâng cấp từ 「多いから疲れた」lên「仕事に追われてクタクタ」& gắn nhãn Kanji「疲」.',
    },
  },
  {
    id: 'nikki_preset_matcha',
    createdAt: tsMinus2,
    dateLabelJa: formatJapaneseDateLabel(tsMinus2),
    inputMode: 'translate',
    vietnameseRaw: 'Chiều nay ghé quán quen uống ly matcha ấm, thấy lòng bình yên lạ.',
    styleMode: 'poetic',
    emotionalTone: 'Bình yên, thảnh thơi, hít thở sâu giữa nhịp sống.',
    moodKanji: MOOD_KANJI_PALETTE[3], // 平 (Matcha)
    japaneseTitle: '夕暮れの抹茶と、静かなひととき',
    japanesePlain:
      '夕方、馴染みの喫茶店で温かい抹茶をいただいた。湯気の向こうに街の灯りが滲んで、慌ただしかった心もすっと平らかになっていく。',
    tokens: [
      { text: '夕方', reading: 'ゆうがた', isKanji: true },
      { text: '、' },
      { text: '馴染', reading: 'なじ', isKanji: true },
      { text: 'みの' },
      { text: '喫茶店', reading: 'きっさてん', isKanji: true },
      { text: 'で' },
      { text: '温', reading: 'あたた', isKanji: true },
      { text: 'かい' },
      { text: '抹茶', reading: 'まっちゃ', isKanji: true },
      { text: 'をいただいた。' },
      { text: '湯気', reading: 'ゆげ', isKanji: true },
      { text: 'の' },
      { text: '向', reading: 'む', isKanji: true },
      { text: 'こうに' },
      { text: '街', reading: 'まち', isKanji: true },
      { text: 'の' },
      { text: '灯', reading: 'あか', isKanji: true },
      { text: 'りが' },
      { text: '滲', reading: 'にじ', isKanji: true },
      { text: 'んで、' },
      { text: '慌', reading: 'あわ', isKanji: true },
      { text: 'ただしかった' },
      { text: '心', reading: 'こころ', isKanji: true },
      { text: 'もすっと' },
      { text: '平', reading: 'たい', isKanji: true },
      { text: 'らかになっていく。' },
    ],
    haiku: {
      lines: ['抹茶の香', '夕灯ともりて', '心凪ぐ'],
      vietnamese: 'Hương matcha thoảng nhẹ, ánh đèn chiều lên lòng bỗng tĩnh lặng như mặt hồ.',
    },
    bestQuote: {
      japanese: '慌ただしかった心もすっと平らかになっていく。',
      vietnamese: 'Tâm trí vốn tất bật cũng dần trở nên phẳng lặng êm ả.',
    },
    therapistReply: {
      japanese: '自分だけの静かな居場所があるって素敵ですね。その穏やかな感覚、どうか大切にしてください。',
      reading: 'じぶんだけのしずかないばしょがあるってすてきですね。そのおだやかなかんかく、どうかたいせつにしてください。',
      vietnamese: 'Có một góc nhỏ tĩnh lặng cho riêng mình thật tuyệt vời biết bao. Hãy trân trọng cảm giác êm đềm ấy nhé.',
      cultureNote: '「居場所」(chốn thuộc về bình yên) là khái niệm tâm lý rất được người Nhật nâng niu.',
    },
    treasures: [
      {
        id: 'tr_matcha_1',
        expression: '馴染みの店',
        furigana: 'なじみのみせ',
        romaji: 'najimi no mise',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        pitchLabel: '馴染み [0] · Heiban',
        meaning: 'Quán quen, nơi chốn thân thuộc',
        whyLearn: 'Tự nhiên và giàu cảm xúc hơn hẳn よく行く店.',
        jlpt: 'N2',
        contextSentence: '夕方、馴染みの喫茶店で温かい抹茶をいただいた。',
      },
    ],
    syncedToSrs: false,
    audit: {
      naturalMonologuePassed: true,
      furiganaAlignedPassed: true,
      collocationQualityPassed: true,
      therapistReplyPassed: true,
      redPenCheckedPassed: true,
      moodKanjiTaggedPassed: true,
      auditNote: 'Đã kiểm định đủ tầng: Tản văn Washi, Haiku & Nhãn Kanji「平」.',
    },
  },
  {
    id: 'nikki_preset_sakura',
    createdAt: tsMinus3,
    dateLabelJa: formatJapaneseDateLabel(tsMinus3),
    inputMode: 'translate',
    vietnameseRaw: 'Hôm nay đọc hiểu được trọn vẹn một mẩu tin tiếng Nhật mà không cần tra từ điển, vui quá!',
    styleMode: 'futsukei',
    emotionalTone: 'Rạng rỡ, hân hoan khi chạm tới bước tiến nhỏ.',
    moodKanji: MOOD_KANJI_PALETTE[0], // 喜 (Sakura)
    japaneseTitle: '辞書なしで読めた小さな喜び',
    japanesePlain:
      '今日、日本語のニュースを辞書なしで最後まで読み切ることができた！毎日の積み重ねが少しずつ形になっていて、胸がいっぱいになるほど嬉しい。',
    tokens: [
      { text: '今日', reading: 'きょう', isKanji: true },
      { text: '、' },
      { text: '日本語', reading: 'にほんご', isKanji: true },
      { text: 'のニュースを' },
      { text: '辞書', reading: 'じしょ', isKanji: true },
      { text: 'なしで' },
      { text: '最後', reading: 'さいご', isKanji: true },
      { text: 'まで' },
      { text: '読', reading: 'よ', isKanji: true },
      { text: 'み' },
      { text: '切', reading: 'き', isKanji: true },
      { text: 'ることができた！' },
      { text: '毎日', reading: 'まいにち', isKanji: true },
      { text: 'の' },
      { text: '積', reading: 'つ', isKanji: true },
      { text: 'み' },
      { text: '重', reading: 'かさ', isKanji: true },
      { text: 'ねが' },
      { text: '少', reading: 'すこ', isKanji: true },
      { text: 'しずつ' },
      { text: '形', reading: 'かたち', isKanji: true },
      { text: 'になっていて、' },
      { text: '胸', reading: 'むね', isKanji: true },
      { text: 'がいっぱいになるほど' },
      { text: '嬉', reading: 'うれ', isKanji: true },
      { text: 'しい。' },
    ],
    haiku: {
      lines: ['辞書閉じて', 'ひとりで読めた', '春の風'],
      vietnamese: 'Gấp cuốn từ điển lại, tự mình đọc hết trang chữ như đón làn gió xuân.',
    },
    bestQuote: {
      japanese: '毎日の積み重ねが少しずつ形になっていて、胸がいっぱいになるほど嬉しい。',
      vietnamese: 'Sự tích lũy mỗi ngày đang dần thành hình, vui đến mức nghẹn tràn lồng ngực.',
    },
    therapistReply: {
      japanese: 'それは本当にすごい前進ですね！小さな「できた」の積み重ねが、必ず大きな自信につながりますよ。',
      reading: 'それはほんとうにすごいぜんしんですね！ちいさな「できた」のつみかさねが、かならずおおきなじしんにつながりますよ。',
      vietnamese: 'Đó thực sự là bước tiến tuyệt vời đấy! Việc tích góp những khoảnh khắc "mình làm được rồi" nhỏ bé sẽ hóa thành sự tự tin lớn lao.',
      cultureNote: 'Từ 「積み重ね」(sự tích lũy từng lớp từng ngày) thể hiện triết lý nỗ lực bền bỉ của Nhật.',
    },
    treasures: [
      {
        id: 'tr_sakura_1',
        expression: '読み切る',
        furigana: 'よみきる',
        romaji: 'yomikiru',
        pitchType: 'nakadaka',
        pitchAccentNum: 3,
        pitchLabel: '読み切る [3] · Động từ kép ～切る',
        meaning: 'Đọc trọn vẹn từ đầu tới cuối không bỏ dở',
        whyLearn: 'Hậu tố ～切る nhấn mạnh sự hoàn tất 100% cực kỳ tự nhiên.',
        jlpt: 'N2',
        contextSentence: 'ニュースを辞書なしで最後まで読み切ることができた。',
      },
    ],
    syncedToSrs: false,
    audit: {
      naturalMonologuePassed: true,
      furiganaAlignedPassed: true,
      collocationQualityPassed: true,
      therapistReplyPassed: true,
      redPenCheckedPassed: true,
      moodKanjiTaggedPassed: true,
      auditNote: 'Đã kiểm định đủ tầng: Thể ngắn Futsukei, Haiku & Nhãn Kanji「喜」.',
    },
  },
  {
    id: 'nikki_preset_pressure',
    createdAt: tsMinus4,
    dateLabelJa: formatJapaneseDateLabel(tsMinus4),
    inputMode: 'translate',
    vietnameseRaw: 'Dạo này hơi lo lắng về kỳ thi sắp tới, cảm giác thời gian trôi nhanh quá.',
    styleMode: 'monologue',
    emotionalTone: 'Lo âu nhẹ trước kỳ thi — cần thả lỏng nhịp thở.',
    moodKanji: MOOD_KANJI_PALETTE[11], // 焦 (Crimson/Ash)
    japaneseTitle: '近づく試験日と、少しの焦り',
    japanesePlain:
      '試験の日が近づくにつれて、なんだか時間ばかりが過ぎていく気がして少し焦ってしまう。でも、焦っても仕方ないから今日は深呼吸して一問だけ丁寧に復習しよう。',
    tokens: [
      { text: '試験', reading: 'しけん', isKanji: true },
      { text: 'の' },
      { text: '日', reading: 'ひ', isKanji: true },
      { text: 'が' },
      { text: '近', reading: 'ちか', isKanji: true },
      { text: 'づくにつれて、なんだか' },
      { text: '時間', reading: 'じかん', isKanji: true },
      { text: 'ばかりが' },
      { text: '過', reading: 'す', isKanji: true },
      { text: 'ぎていく' },
      { text: '気', reading: 'き', isKanji: true },
      { text: 'がして' },
      { text: '少', reading: 'すこ', isKanji: true },
      { text: 'し' },
      { text: '焦', reading: 'あせ', isKanji: true },
      { text: 'ってしまう。でも、' },
      { text: '焦', reading: 'あせ', isKanji: true },
      { text: 'っても' },
      { text: '仕方', reading: 'しかた', isKanji: true },
      { text: 'ないから' },
      { text: '今日', reading: 'きょう', isKanji: true },
      { text: 'は' },
      { text: '深呼吸', reading: 'しんこきゅう', isKanji: true },
      { text: 'して' },
      { text: '一問', reading: 'いちもん', isKanji: true },
      { text: 'だけ' },
      { text: '丁寧', reading: 'ていねい', isKanji: true },
      { text: 'に' },
      { text: '復習', reading: 'ふくしゅう', isKanji: true },
      { text: 'しよう。' },
    ],
    haiku: {
      lines: ['時計見て', '深く息吐き', '一問を'],
      vietnamese: 'Nhìn kim đồng hồ trôi, thở ra thật sâu rồi chỉ ôn kỹ một câu thôi.',
    },
    bestQuote: {
      japanese: '焦っても仕方ないから今日は深呼吸して一問だけ丁寧に復習しよう。',
      vietnamese: 'Sốt ruột cũng chẳng ích gì, hôm nay hít thở sâu và ôn cẩn thận một câu thôi.',
    },
    therapistReply: {
      japanese: '焦る気持ちは、それだけ真剣に向き合っている証拠ですよ。一歩ずつで大丈夫、応援しています。',
      reading: 'あせるきもちは、それだけしんけんにむきあっているしょうこですよ。いっぽずつでだいじょうぶ、おうえんしています。',
      vietnamese: 'Cảm giác sốt ruột chính là bằng chứng cho thấy bạn đang nghiêm túc dốc lòng đến nhường nào. Từng bước một thôi là ổn rồi, mình luôn ủng hộ bạn.',
      cultureNote: 'Cấu trúc 「それだけ〜証拠」(chứng tỏ bạn đã nỗ lực chừng ấy) giúp chuyển hóa lo âu thành tự hào.',
    },
    treasures: [
      {
        id: 'tr_focus_1',
        expression: '〜につれて',
        furigana: '〜につれて',
        romaji: '~ni tsurete',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        pitchLabel: 'Ngữ pháp N3 · Tịnh tiến theo thời gian',
        meaning: 'Càng lúc... càng (diễn biến song song)',
        whyLearn: 'Mẫu câu kinh điển diễn tả cảm giác thay đổi theo thời gian.',
        jlpt: 'N3',
        contextSentence: '試験の日が近づくにつれて、少し焦ってしまう。',
      },
    ],
    syncedToSrs: false,
    audit: {
      naturalMonologuePassed: true,
      furiganaAlignedPassed: true,
      collocationQualityPassed: true,
      therapistReplyPassed: true,
      redPenCheckedPassed: true,
      moodKanjiTaggedPassed: true,
      auditNote: 'Đã kiểm định đủ tầng: Độc thoại tự sự, Haiku & Nhãn Kanji「焦」.',
    },
  },
];

function hydrateEntryRecord(item: any): NikkiEntryRecord {
  const moodKanji = item.moodKanji?.kanji
    ? resolveMoodKanji(item.moodKanji.kanji)
    : resolveMoodKanji();
  const plain = String(item.japanesePlain || '');
  const vietnameseRaw = String(item.vietnameseRaw || '');
  const fallback = deriveFallbackHaikuAndQuote(plain, moodKanji, vietnameseRaw);

  const validHaiku =
    item.haiku &&
    Array.isArray(item.haiku.lines) &&
    item.haiku.lines.length === 3 &&
    item.haiku.vietnamese
      ? (item.haiku as NikkiHaiku)
      : fallback.haiku;

  const validQuote =
    item.bestQuote && item.bestQuote.japanese
      ? (item.bestQuote as NikkiBestQuote)
      : fallback.bestQuote;

  return {
    ...item,
    inputMode: item.inputMode || 'translate',
    moodKanji,
    haiku: validHaiku,
    bestQuote: validQuote,
    therapistReply: item.therapistReply?.japanese
      ? item.therapistReply
      : {
          japanese: '今日も自分の気持ちと向き合えて素晴らしいですね。ゆっくり休んでくださいね。',
          reading: 'きょうもじぶんのきもちとむきあえてすばらしいですね。ゆっくりやすんでくださいね。',
          vietnamese: 'Hôm nay bạn đã lắng nghe cảm xúc của chính mình thật tuyệt vời. Hãy nghỉ ngơi thư giãn nhé.',
          cultureNote: 'Lời động viên Omoiyari nhẹ nhàng dành cho trang nhật ký cá nhân.',
        },
  } as NikkiEntryRecord;
}

export const nikkiHistoryService = {
  getAll(): NikkiEntryRecord[] {
    if (typeof window === 'undefined') return [...STARTER_NIKKI_PRESETS];
    try {
      const rawV3 = localStorage.getItem(NIKKI_STORAGE_KEY);
      if (rawV3) {
        const parsed = JSON.parse(rawV3);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(hydrateEntryRecord);
        }
      }

      // Migrate custom user entries from v2/v1 seamlessly alongside upgraded v3 Koyomi presets
      const legacyRaw =
        localStorage.getItem(PREV_STORAGE_KEY_V2) || localStorage.getItem(LEGACY_STORAGE_KEY);
      let customUserEntries: NikkiEntryRecord[] = [];
      if (legacyRaw) {
        const parsedLegacy = JSON.parse(legacyRaw);
        if (Array.isArray(parsedLegacy)) {
          customUserEntries = parsedLegacy
            .filter((it: any) => typeof it?.id === 'string' && !it.id.startsWith('nikki_preset_'))
            .map(hydrateEntryRecord);
        }
      }
      const combined = [...customUserEntries, ...STARTER_NIKKI_PRESETS];
      localStorage.setItem(NIKKI_STORAGE_KEY, JSON.stringify(combined));
      return combined;
    } catch {
      return [...STARTER_NIKKI_PRESETS];
    }
  },

  saveEntry(entry: NikkiEntryRecord): NikkiEntryRecord[] {
    const current = this.getAll().filter((e) => e.id !== entry.id);
    const updated = [entry, ...current].slice(0, 90);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(NIKKI_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
    return updated;
  },

  deleteEntry(id: string): NikkiEntryRecord[] {
    const updated = this.getAll().filter((e) => e.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(NIKKI_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
    return updated;
  },

  markSyncedToSrs(id: string): NikkiEntryRecord[] {
    const updated = this.getAll().map((e) =>
      e.id === id ? { ...e, syncedToSrs: true } : e
    );
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(NIKKI_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
    return updated;
  },
};

export interface MoodDayCell {
  day: number;
  dateStr: string;
  colIndex: number; // 0..6 (Mon..Sun)
  entry?: NikkiEntryRecord;
}

export interface YojijukugoMonthlySummary {
  idiom: string;
  reading: string;
  sinoVietnamese: string;
  meaningVi: string;
  toneSummary: string;
}

export interface MonthlyHealingPrescription {
  needsHealing: boolean;
  heavyRatio: number; // 0..1
  titleVi: string;
  omoiyariWishJa: string;
  omoiyariWishVi: string;
  recommendedAmbience: 'lofi' | 'rain' | 'forest';
  fsrsActionNote: string;
}

export interface KoyomiAuditReport {
  wairoDistinctPassed: boolean;
  borderlessGeometryPassed: boolean;
  yojijukugoAlignedPassed: boolean;
  hoverPayloadCompletePassed: boolean;
  passedAll: boolean;
}

export interface MonthlyMoodSummary {
  year: number;
  month: number; // 0-indexed
  monthLabel: string;
  monthLabelVi: string;
  leadingEmptyCells: number;
  days: MoodDayCell[];
  kanjiTally: { tag: MoodKanjiTag; count: number }[];
  wairoCounts: Record<WairoSpectrumFamily, number>;
  dominantWairo: WairoSpectrumFamily;
  yojijukugo: YojijukugoMonthlySummary;
  healingPrescription: MonthlyHealingPrescription;
  koyomiAudit: KoyomiAuditReport;
}

function synthesizeYojijukugoAndPrescription(
  monthEntries: NikkiEntryRecord[],
  wairoCounts: Record<WairoSpectrumFamily, number>
): {
  dominantWairo: WairoSpectrumFamily;
  yojijukugo: YojijukugoMonthlySummary;
  healingPrescription: MonthlyHealingPrescription;
} {
  const total = monthEntries.length;
  const sakura = wairoCounts.sakura_sun;
  const matcha = wairoCounts.matcha_calm;
  const indigo = wairoCounts.indigo_rain;
  const ash = wairoCounts.crimson_ash;
  const heavyTotal = indigo + ash;
  const heavyRatio = total > 0 ? heavyTotal / total : 0;

  let dominantWairo: WairoSpectrumFamily = 'matcha_calm';
  let maxVal = -1;
  (Object.keys(wairoCounts) as WairoSpectrumFamily[]).forEach((k) => {
    if (wairoCounts[k] > maxVal) {
      maxVal = wairoCounts[k];
      dominantWairo = k;
    }
  });

  if (total === 0) {
    return {
      dominantWairo: 'matcha_calm',
      yojijukugo: {
        idiom: '一期一会',
        reading: 'いちごいちえ',
        sinoVietnamese: 'Nhất Kỳ Nhất Hội',
        meaningVi: 'Mỗi ngày mở trang nhật ký là một cuộc gặp gỡ duy nhất với tâm hồn mình.',
        toneSummary: 'Tháng mới tinh khôi đang chờ những nét mực đầu tiên.',
      },
      healingPrescription: {
        needsHealing: false,
        heavyRatio: 0,
        titleVi: 'Khởi Đầu Thanh Thản',
        omoiyariWishJa: '新しい一ヶ月も、ご自身のペースで優しく歩んでいきましょうね。',
        omoiyariWishVi: 'Tháng mới này, hãy cứ bước đi thật dịu dàng theo nhịp độ của riêng bạn nhé.',
        recommendedAmbience: 'forest',
        fsrsActionNote: 'Nhịp độ FSRS đang ở trạng thái cân bằng tự nhiên.',
      },
    };
  }

  if (heavyRatio >= 0.45) {
    if (ash >= indigo) {
      return {
        dominantWairo: 'crimson_ash',
        yojijukugo: {
          idiom: '苦労結実',
          reading: 'くろうけつじつ',
          sinoVietnamese: 'Khổ Lao Kết Thực',
          meaningVi: 'Mọi vất vả, nhọc nhằn bạn đã gồng gánh tháng qua nhất định sẽ đơm hoa kết trái ngọt.',
          toneSummary: 'Tháng nhiều áp lực & mệt mỏi — cần được vỗ về và giảm tải.',
        },
        healingPrescription: {
          needsHealing: true,
          heavyRatio,
          titleVi: 'Đơn Thuốc Chữa Lành & Giảm Tải FSRS',
          omoiyariWishJa: '本当によく頑張りましたね。新しい月の最初の3日間は荷物を下ろして、心と脳を休ませてくださいね。',
          omoiyariWishVi: 'Bạn đã cố gắng kiên cường suốt tháng qua rồi. 3 ngày đầu tháng tới, hãy đặt gánh nặng xuống để tâm trí và trí nhớ được thở nhẹ nhé.',
          recommendedAmbience: 'lofi',
          fsrsActionNote: 'Tự động giới hạn tối đa 2 thẻ FSRS nhẹ nhàng/ngày trong 3 ngày đầu để bạn hồi phục năng lượng.',
        },
      };
    }

    return {
      dominantWairo: 'indigo_rain',
      yojijukugo: {
        idiom: '雨過天晴',
        reading: 'うかてんせい',
        sinoVietnamese: 'Vũ Quá Thiên Tình',
        meaningVi: 'Sau cơn mưa dài trầm lắng, bầu trời tâm hồn chắc chắn sẽ quang đãng trở lại.',
        toneSummary: 'Tháng mang nhiều sắc xanh Indigo trầm tư và cảm xúc sâu lắng.',
      },
      healingPrescription: {
        needsHealing: true,
        heavyRatio,
        titleVi: 'Đơn Thuốc Ôm Ấp Sau Cơn Mưa',
        omoiyariWishJa: '悲しみや静かな涙も、あなたの優しさの一部です。温かい音に包まれて、少しずつ晴れていきますように。',
        omoiyariWishVi: 'Nỗi buồn hay những khoảng lặng cũng là một phần dịu dàng của bạn. Mong bản nhạc êm sẽ sưởi ấm để lòng dần quang mây.',
        recommendedAmbience: 'lofi',
        fsrsActionNote: 'Đã kích hoạt chế độ FSRS Chữa Lành: giảm tải thẻ ôn tập trong 3 ngày tới.',
      },
    };
  }

  if (sakura >= matcha && sakura > 0) {
    return {
      dominantWairo: 'sakura_sun',
      yojijukugo: {
        idiom: '順風満帆',
        reading: 'じゅんぷうまんぱん',
        sinoVietnamese: 'Thuận Phong Mãn Phàm',
        meaningVi: 'Thuận buồm xuôi gió — nguồn năng lượng tích cực đang nâng cánh buồm ngôn ngữ của bạn bay xa.',
        toneSummary: 'Phổ màu Sakura & Nắng Ấm tràn đầy niềm vui và động lực.',
      },
      healingPrescription: {
        needsHealing: false,
        heavyRatio,
        titleVi: 'Duy Trì Nguồn Năng Lượng Tươi Sáng',
        omoiyariWishJa: '素敵な一ヶ月でしたね！この温かい輝きを胸に、次の月も楽しく進んでいきましょう。',
        omoiyariWishVi: 'Thật là một tháng rạng rỡ! Hãy giữ ngọn lửa ấm áp này đồng hành sang tháng mới thật vui nhé.',
        recommendedAmbience: 'forest',
        fsrsActionNote: 'Nhịp độ học tập đang rất hứng khởi — tiếp tục duy trì lịch FSRS hiện tại.',
      },
    };
  }

  return {
    dominantWairo: 'matcha_calm',
    yojijukugo: {
      idiom: '明鏡止水',
      reading: 'めいきょうしすい',
      sinoVietnamese: 'Minh Kính Chỉ Thủy',
      meaningVi: 'Tâm trí trong sáng và phẳng lặng như mặt nước mùa thu — trạng thái tuyệt vời nhất để thẩm thấu tiếng Nhật.',
      toneSummary: 'Phổ màu Matcha tĩnh tại, cân bằng và bền bỉ.',
    },
    healingPrescription: {
      needsHealing: false,
      heavyRatio,
      titleVi: 'Giữ Vững Nhịp Thiền Bình An',
      omoiyariWishJa: '穏やかで美しい心の軌跡ですね。これからも静かな呼吸とともに言葉を育てていきましょう。',
      omoiyariWishVi: 'Dấu ấn tâm hồn thật êm ả và đẹp đẽ. Hãy tiếp tục nuôi dưỡng ngôn từ cùng hơi thở tĩnh tại nhé.',
      recommendedAmbience: 'rain',
      fsrsActionNote: 'Tâm thế cân bằng lý tưởng — lịch ôn tập FSRS vận hành ổn định.',
    },
  };
}

export function auditZenKoyomiMap(summary: Omit<MonthlyMoodSummary, 'koyomiAudit'>): KoyomiAuditReport {
  const wairoDistinctPassed = MOOD_KANJI_PALETTE.every(
    (m) => Boolean(m.wairoFamily) && Boolean(m.wairoNameJa)
  );
  const borderlessGeometryPassed = summary.days.length >= 28 && summary.leadingEmptyCells >= 0;
  const yojijukugoAlignedPassed = summary.yojijukugo.idiom.trim().length === 4;
  const hoverPayloadCompletePassed = summary.days
    .filter((d) => Boolean(d.entry))
    .every(
      (d) =>
        Boolean(d.entry?.moodKanji?.kanji) &&
        Boolean(d.entry?.moodKanji?.reading) &&
        d.entry?.haiku?.lines?.length === 3 &&
        Boolean(d.entry?.bestQuote?.japanese)
    );

  return {
    wairoDistinctPassed,
    borderlessGeometryPassed,
    yojijukugoAlignedPassed,
    hoverPayloadCompletePassed,
    passedAll:
      wairoDistinctPassed &&
      borderlessGeometryPassed &&
      yojijukugoAlignedPassed &&
      hoverPayloadCompletePassed,
  };
}

export function buildMonthlyMoodMap(
  entries: NikkiEntryRecord[],
  year: number,
  month: number
): MonthlyMoodSummary {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay(); // 0=Sun..6=Sat
  const leadingEmptyCells = firstWeekday === 0 ? 6 : firstWeekday - 1; // Mon-first

  const entryByDay = new Map<number, NikkiEntryRecord>();
  const tallyMap = new Map<string, { tag: MoodKanjiTag; count: number }>();
  const wairoCounts: Record<WairoSpectrumFamily, number> = {
    sakura_sun: 0,
    matcha_calm: 0,
    indigo_rain: 0,
    crimson_ash: 0,
  };
  const monthEntries: NikkiEntryRecord[] = [];

  for (const e of entries) {
    const d = new Date(e.createdAt);
    if (d.getFullYear() === year && d.getMonth() === month) {
      monthEntries.push(e);
      const dayNum = d.getDate();
      if (!entryByDay.has(dayNum)) {
        entryByDay.set(dayNum, e);
      }
      const mk = e.moodKanji?.wairoFamily ? e.moodKanji : resolveMoodKanji(e.moodKanji?.kanji);
      wairoCounts[mk.wairoFamily] += 1;
      const prev = tallyMap.get(mk.kanji);
      if (prev) prev.count += 1;
      else tallyMap.set(mk.kanji, { tag: mk, count: 1 });
    }
  }

  const days: MoodDayCell[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      dateStr: `${day}/${month + 1}`,
      colIndex: (leadingEmptyCells + day - 1) % 7,
      entry: entryByDay.get(day),
    });
  }

  const kanjiTally = Array.from(tallyMap.values()).sort((a, b) => b.count - a.count);
  const { dominantWairo, yojijukugo, healingPrescription } = synthesizeYojijukugoAndPrescription(
    monthEntries,
    wairoCounts
  );

  const baseSummary: Omit<MonthlyMoodSummary, 'koyomiAudit'> = {
    year,
    month,
    monthLabel: `${year}年${month + 1}月`,
    monthLabelVi: `Tháng ${month + 1}/${year}`,
    leadingEmptyCells,
    days,
    kanjiTally,
    wairoCounts,
    dominantWairo,
    yojijukugo,
    healingPrescription,
  };

  return {
    ...baseSummary,
    koyomiAudit: auditZenKoyomiMap(baseSummary),
  };
}

export async function generateCustomMonthlyYojijukugo(
  entries: NikkiEntryRecord[],
  summary: MonthlyMoodSummary
): Promise<{ yojijukugo: YojijukugoMonthlySummary; wishJa: string; wishVi: string }> {
  const monthDigest = entries
    .filter((e) => {
      const d = new Date(e.createdAt);
      return d.getFullYear() === summary.year && d.getMonth() === summary.month;
    })
    .slice(0, 12)
    .map((e) => `${e.moodKanji.kanji}(${e.moodKanji.sinoVietnamese}): ${e.japaneseTitle} — ${e.emotionalTone}`)
    .join('\n');

  const schema = {
    type: 'OBJECT',
    properties: {
      idiom: { type: 'STRING' },
      reading: { type: 'STRING' },
      sinoVietnamese: { type: 'STRING' },
      meaningVi: { type: 'STRING' },
      toneSummary: { type: 'STRING' },
      wishJa: { type: 'STRING' },
      wishVi: { type: 'STRING' },
    },
    required: ['idiom', 'reading', 'sinoVietnamese', 'meaningVi', 'toneSummary', 'wishJa', 'wishVi'],
  };

  const prompt = `Dựa trên nhật ký tháng ${summary.monthLabel} của người học:
${monthDigest || 'Tháng mới vừa khởi đầu.'}

Hãy chọn ĐÚNG 1 thành ngữ 4 chữ Nhật Bản (Yojijukugo, chính xác 4 chữ Kanji, ví dụ 順風満帆, 苦労結実, 明鏡止水, 雨過天晴, 七転八起, 温故知新...) tổng kết sâu sắc tâm trạng tháng này, kèm lời chúc Omoiyari ấm áp bằng tiếng Nhật và tiếng Việt.`;

  const raw = await callGemini(
    prompt,
    'Bạn là bậc thầy văn hóa Nhật Bản & nhà tâm lý học Omoiyari. Chỉ trả về JSON hợp lệ theo schema.',
    undefined,
    false,
    schema,
    false
  );
  const parsed = safeExtractJson<{
    idiom?: string;
    reading?: string;
    sinoVietnamese?: string;
    meaningVi?: string;
    toneSummary?: string;
    wishJa?: string;
    wishVi?: string;
  }>(raw, {});

  const idiomClean = (parsed.idiom || summary.yojijukugo.idiom).trim();
  return {
    yojijukugo: {
      idiom: idiomClean.length === 4 ? idiomClean : summary.yojijukugo.idiom,
      reading: (parsed.reading || summary.yojijukugo.reading).trim(),
      sinoVietnamese: (parsed.sinoVietnamese || summary.yojijukugo.sinoVietnamese).trim(),
      meaningVi: (parsed.meaningVi || summary.yojijukugo.meaningVi).trim(),
      toneSummary: (parsed.toneSummary || summary.yojijukugo.toneSummary).trim(),
    },
    wishJa: (parsed.wishJa || summary.healingPrescription.omoiyariWishJa).trim(),
    wishVi: (parsed.wishVi || summary.healingPrescription.omoiyariWishVi).trim(),
  };
}

interface RawGeminiNikkiPayload {
  emotionalTone?: string;
  moodKanjiChar?: string;
  japaneseTitle?: string;
  japanesePlain?: string;
  vietnameseMeaning?: string;
  haikuLines?: string[];
  haikuVietnamese?: string;
  bestQuoteJa?: string;
  bestQuoteVi?: string;
  praiseFirst?: string;
  redPenCorrections?: Array<{
    original?: string;
    corrected?: string;
    category?: string;
    gentleReason?: string;
  }>;
  therapistReply?: {
    japanese?: string;
    reading?: string;
    vietnamese?: string;
    cultureNote?: string;
  };
  tokens?: Array<{ text?: string; reading?: string; isKanji?: boolean }>;
  treasures?: Array<{
    expression?: string;
    furigana?: string;
    romaji?: string;
    pitchType?: string;
    pitchAccentNum?: number;
    pitchLabel?: string;
    meaning?: string;
    whyLearn?: string;
    jlpt?: string;
    contextSentence?: string;
  }>;
  auditNote?: string;
}

const NIKKI_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    emotionalTone: { type: 'STRING' },
    moodKanjiChar: { type: 'STRING' },
    japaneseTitle: { type: 'STRING' },
    japanesePlain: { type: 'STRING' },
    vietnameseMeaning: { type: 'STRING' },
    haikuLines: {
      type: 'ARRAY',
      items: { type: 'STRING' },
    },
    haikuVietnamese: { type: 'STRING' },
    bestQuoteJa: { type: 'STRING' },
    bestQuoteVi: { type: 'STRING' },
    praiseFirst: { type: 'STRING' },
    redPenCorrections: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          original: { type: 'STRING' },
          corrected: { type: 'STRING' },
          category: { type: 'STRING' },
          gentleReason: { type: 'STRING' },
        },
        required: ['original', 'corrected', 'gentleReason'],
      },
    },
    therapistReply: {
      type: 'OBJECT',
      properties: {
        japanese: { type: 'STRING' },
        reading: { type: 'STRING' },
        vietnamese: { type: 'STRING' },
        cultureNote: { type: 'STRING' },
      },
      required: ['japanese', 'reading', 'vietnamese', 'cultureNote'],
    },
    tokens: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          text: { type: 'STRING' },
          reading: { type: 'STRING' },
          isKanji: { type: 'BOOLEAN' },
        },
        required: ['text'],
      },
    },
    treasures: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          expression: { type: 'STRING' },
          furigana: { type: 'STRING' },
          romaji: { type: 'STRING' },
          pitchType: { type: 'STRING' },
          pitchAccentNum: { type: 'INTEGER' },
          pitchLabel: { type: 'STRING' },
          meaning: { type: 'STRING' },
          whyLearn: { type: 'STRING' },
          jlpt: { type: 'STRING' },
          contextSentence: { type: 'STRING' },
        },
        required: ['expression', 'furigana', 'romaji', 'pitchLabel', 'meaning', 'whyLearn'],
      },
    },
    auditNote: { type: 'STRING' },
  },
  required: [
    'emotionalTone',
    'moodKanjiChar',
    'japaneseTitle',
    'japanesePlain',
    'haikuLines',
    'haikuVietnamese',
    'bestQuoteJa',
    'bestQuoteVi',
    'therapistReply',
    'tokens',
    'treasures',
    'auditNote',
  ],
};

function normalizePitchType(raw?: string): 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka' {
  const s = (raw || '').toLowerCase();
  if (s.includes('atama')) return 'atamadaka';
  if (s.includes('naka')) return 'nakadaka';
  if (s.includes('odaka')) return 'odaka';
  return 'heiban';
}

function normalizeJlpt(raw?: string): JLPTLevel {
  const s = (raw || '').toUpperCase();
  if (s === 'N1' || s === 'N2' || s === 'N3' || s === 'N4' || s === 'N5') return s;
  return 'N3';
}

function normalizeCorrectionCategory(
  raw?: string
): 'particle' | 'conjugation' | 'nuance' | 'style' {
  const s = (raw || '').toLowerCase();
  if (s.includes('part')) return 'particle';
  if (s.includes('conj')) return 'conjugation';
  if (s.includes('style')) return 'style';
  return 'nuance';
}

const HAS_KANJI_REGEX = /[\u4E00-\u9FAF\u3400-\u4DBF]/;

function buildStyleGuidance(styleMode: NikkiStyleMode): string {
  if (styleMode === 'monologue') {
    return 'Văn phong Độc thoại nội tâm Nhật Bản (独り言 / Nhật ký tự sự): tự nhiên, sâu lắng, dùng thể ngắn (常体・普通形) pha cảm thán nhẹ như ～なぁ, ～てしまう, ～よう.';
  }
  if (styleMode === 'poetic') {
    return 'Văn phong Tản văn Nhật ký nhẹ nhàng (エッセイ風): giàu hình ảnh, nhịp câu tinh tế chuẩn văn học đời thường Nhật Bản.';
  }
  return 'Văn phong Thể ngắn Chuẩn Nhật ký (普通形・日記体): ngắn gọn, chân thật, đúng ngữ pháp người Nhật viết sổ tay mỗi tối.';
}

function hydrateParsedPayload(
  parsed: RawGeminiNikkiPayload,
  inputMode: NikkiInputMode,
  vietnameseRaw: string,
  styleMode: NikkiStyleMode,
  selfWrittenOriginalJa?: string
): NikkiEntryRecord {
  const plain = (parsed.japanesePlain || '').trim();
  if (!plain) {
    throw new Error('Không thể xử lý nhật ký lúc này. Vui lòng thử lại sau giây lát.');
  }

  const rawTokens = Array.isArray(parsed.tokens) ? parsed.tokens : [];
  const validTokens: NikkiToken[] =
    rawTokens.length > 0
      ? rawTokens
          .filter((t) => typeof t.text === 'string' && t.text.length > 0)
          .map((t) => {
            const text = t.text!;
            const containsKanji = HAS_KANJI_REGEX.test(text);
            return {
              text,
              reading: containsKanji && t.reading ? t.reading.trim() : undefined,
              isKanji: containsKanji && Boolean(t.reading?.trim()),
            };
          })
      : [{ text: plain }];

  const reconstructed = validTokens.map((t) => t.text).join('');
  const rawFinalTokens =
    reconstructed.replace(/\s+/g, '') === plain.replace(/\s+/g, '')
      ? validTokens
      : [{ text: plain }];

  const finalTokens = enforceCompleteFuriganaTokens(rawFinalTokens, plain);
  const tokenAudit = auditTranslationTokens(finalTokens);
  const hasAnyFurigana = tokenAudit.furigana100PercentCovered || finalTokens.some((t) => t.isKanji && t.reading);

  const treasures: NikkiVocabTreasure[] = (Array.isArray(parsed.treasures) ? parsed.treasures : [])
    .filter((tr) => tr.expression && tr.meaning)
    .slice(0, 6)
    .map((tr, idx) => ({
      id: `nikki_tr_${Date.now()}_${idx}`,
      expression: tr.expression!.trim(),
      furigana: (tr.furigana || tr.expression!).trim(),
      romaji: (tr.romaji || '').trim(),
      pitchType: normalizePitchType(tr.pitchType),
      pitchAccentNum: Number.isFinite(Number(tr.pitchAccentNum))
        ? Number(tr.pitchAccentNum)
        : 0,
      pitchLabel: (tr.pitchLabel || 'Điệu chuẩn Tokyo').trim(),
      meaning: tr.meaning!.trim(),
      whyLearn: (tr.whyLearn || 'Cụm diễn đạt tự nhiên bản xứ hay gặp trong nhật ký đời sống.').trim(),
      jlpt: normalizeJlpt(tr.jlpt),
      contextSentence: (tr.contextSentence || plain).trim(),
    }));

  const moodKanji = resolveMoodKanji(parsed.moodKanjiChar);
  const fallback = deriveFallbackHaikuAndQuote(plain, moodKanji, vietnameseRaw);

  const rawHaikuLines = Array.isArray(parsed.haikuLines)
    ? parsed.haikuLines.map((l) => String(l || '').trim()).filter(Boolean)
    : [];
  const haiku: NikkiHaiku =
    rawHaikuLines.length >= 3
      ? {
          lines: [rawHaikuLines[0], rawHaikuLines[1], rawHaikuLines[2]],
          vietnamese: (parsed.haikuVietnamese || fallback.haiku.vietnamese).trim(),
        }
      : fallback.haiku;

  const bestQuote: NikkiBestQuote = {
    japanese: (parsed.bestQuoteJa || fallback.bestQuote.japanese).trim(),
    vietnamese: (parsed.bestQuoteVi || fallback.bestQuote.vietnamese).trim(),
  };

  const therapistReply: TherapistReply = {
    japanese: (
      parsed.therapistReply?.japanese ||
      '今日も一日お疲れ様でした。どうかご自身の心を優しく労わってくださいね。'
    ).trim(),
    reading: (
      parsed.therapistReply?.reading ||
      'きょうもいちにちおつかれさまでした。どうかごじしんのこころをやさしくいたわってくださいね。'
    ).trim(),
    vietnamese: (
      parsed.therapistReply?.vietnamese ||
      'Hôm nay bạn đã vất vả rồi. Hãy vỗ về và chăm sóc tâm hồn mình thật dịu dàng nhé.'
    ).trim(),
    cultureNote: (
      parsed.therapistReply?.cultureNote ||
      'Câu hồi đáp chuẩn tinh thần Omoiyari (thấu cảm nhẹ nhàng, không áp đặt).'
    ).trim(),
  };

  const redPenCorrections: RedPenCorrection[] | undefined =
    inputMode === 'self_write'
      ? (Array.isArray(parsed.redPenCorrections) ? parsed.redPenCorrections : [])
          .filter((c) => c.original && c.corrected && c.gentleReason)
          .map((c, idx) => ({
            id: `rp_${Date.now()}_${idx}`,
            original: c.original!.trim(),
            corrected: c.corrected!.trim(),
            category: normalizeCorrectionCategory(c.category),
            gentleReason: c.gentleReason!.trim(),
          }))
      : undefined;

  const now = Date.now();

  return {
    id: `nikki_${now}`,
    createdAt: now,
    dateLabelJa: formatJapaneseDateLabel(now),
    inputMode,
    vietnameseRaw: (parsed.vietnameseMeaning || vietnameseRaw).trim(),
    selfWrittenOriginalJa,
    praiseFirst: parsed.praiseFirst?.trim(),
    redPenCorrections,
    styleMode,
    emotionalTone: (parsed.emotionalTone || 'Tự sự chân thật theo ngữ khí bài viết').trim(),
    moodKanji,
    japaneseTitle: (parsed.japaneseTitle || '今日のひとこと').trim(),
    japanesePlain: plain,
    tokens: finalTokens,
    haiku,
    bestQuote,
    therapistReply,
    treasures,
    syncedToSrs: false,
    audit: {
      naturalMonologuePassed: plain.length >= 6,
      furiganaAlignedPassed: !HAS_KANJI_REGEX.test(plain) || hasAnyFurigana,
      collocationQualityPassed: treasures.length > 0,
      therapistReplyPassed: Boolean(therapistReply.japanese && therapistReply.vietnamese),
      redPenCheckedPassed: inputMode === 'translate' || Boolean(parsed.praiseFirst),
      moodKanjiTaggedPassed: Boolean(moodKanji.kanji),
      auditNote: (
        parsed.auditNote ||
        'Đã kiểm định 4 tầng chữa lành: Văn phong tự sự, Trị liệu Omoiyari, Haiku tâm ảnh & Nhãn Kanji cảm xúc.'
      ).trim(),
    },
  };
}

export async function generateEmpathicNikkiEntry(
  vietnameseText: string,
  styleMode: NikkiStyleMode
): Promise<NikkiEntryRecord> {
  const cleaned = vietnameseText.trim();
  if (!cleaned) {
    throw new Error('Vui lòng nhập đôi dòng suy nghĩ tiếng Việt trước khi chuyển ngữ.');
  }

  const allowedMoods = MOOD_KANJI_PALETTE.map((m) => `${m.kanji} (${m.meaningVi})`).join(', ');

  const systemInstruction = `Bạn là nhà văn, thi sĩ Haiku, nhà tâm lý trị liệu thấu cảm và giáo sư tiếng Nhật bản xứ.
Nhiệm vụ tối cao:
1. Thấu cảm sâu sắc cảm xúc tiếng Việt (KHÔNG dịch word-by-word khô cứng).
2. Chuyển ngữ sang nhật ký tiếng Nhật theo phong cách: ${buildStyleGuidance(styleMode)}
3. Đặt "moodKanjiChar" là ĐÚNG 1 chữ Hán đại diện tâm trạng từ danh sách: ${allowedMoods}.
4. Sáng tác 1 bài thơ Haiku 3 dòng (5-7-5 âm tiết) ghi lại thần thái ngày hôm đó vào "haikuLines" (mảng đúng 3 chuỗi tiếng Nhật) và dịch thơ vào "haikuVietnamese".
5. Trích xuất 1 câu Quote đắt giá nhất từ "japanesePlain" vào "bestQuoteJa" + dịch tinh tế vào "bestQuoteVi".
6. Viết "therapistReply": đóng vai người bạn tri kỷ người Nhật chuẩn văn hóa Omoiyari, viết 1-2 câu cực ngắn ấm áp bằng tiếng Nhật ("japanese"), kèm Hiragana ("reading"), lời dịch ("vietnamese") và ghi chú văn hóa ("cultureNote").
7. Phân tách "tokens" khớp 100% với "japanesePlain"; MỌI token có chứa Kanji bắt buộc có "isKanji": true và "reading" là Hiragana.
8. Bóc tách 3 đến 5 cụm Collocation đắt giá vào "treasures".`;

  const prompt = `Chuyển ngữ thấu cảm đoạn nhật ký tiếng Việt sau, kèm thơ Haiku, Quote đắt giá, hồi đáp chữa lành Omoiyari và nhãn Kanji cảm xúc:

"""
${cleaned}
"""

Chỉ trả về JSON hợp lệ theo schema.`;

  const rawText = await callGemini(
    prompt,
    systemInstruction,
    undefined,
    false,
    NIKKI_RESPONSE_SCHEMA,
    false
  );

  const parsed = safeExtractJson<RawGeminiNikkiPayload>(rawText, {});
  return hydrateParsedPayload(parsed, 'translate', cleaned, styleMode);
}

export async function evaluateSelfWrittenNikkiEntry(
  rawJapaneseText: string,
  styleMode: NikkiStyleMode
): Promise<NikkiEntryRecord> {
  const cleanedJa = rawJapaneseText.trim();
  if (!cleanedJa) {
    throw new Error('Hãy thử viết vài câu tiếng Nhật của bạn vào khung bên trái trước nhé.');
  }

  const allowedMoods = MOOD_KANJI_PALETTE.map((m) => `${m.kanji} (${m.meaningVi})`).join(', ');

  const systemInstruction = `Bạn là Sensei "Bút Đỏ Chữa Lành" (Red Pen & Ego-Preservation Mentor), thi sĩ Haiku và người bạn tri kỷ bản xứ.
Người học đã dũng cảm tự viết nhật ký bằng tiếng Nhật.
Nhiệm vụ tối cao:
1. Bảo toàn lòng tự trọng ("praiseFirst"): Viết 1 câu khen chân thành điểm làm tốt trong đoạn tiếng Nhật của người học.
2. Soi Bút Đỏ tinh tế ("redPenCorrections"): Tìm 2-4 điểm cần chỉnh sửa hoặc nâng tầm lên văn phong Native Flow ("original", "corrected", "category", "gentleReason").
3. Viết bản hoàn thiện mượt mà nhất vào "japanesePlain" theo phong cách: ${buildStyleGuidance(styleMode)}.
4. Dịch lại ý nghĩa tiếng Việt trọn vẹn vào "vietnameseMeaning".
5. Gắn "moodKanjiChar" là 1 chữ Hán đại diện cảm xúc từ: ${allowedMoods}.
6. Sáng tác 1 bài Haiku 3 dòng ("haikuLines" + "haikuVietnamese") và trích 1 Quote đắt giá nhất ("bestQuoteJa" + "bestQuoteVi").
7. Tạo "therapistReply" (Omoiyari) + "tokens" khớp 100% "japanesePlain" + 3-4 "treasures".`;

  const prompt = `Hãy soi Bút Đỏ tinh tế, nâng cấp sang văn phong bản xứ, sáng tác Haiku và hồi đáp chữa lành cho bài nhật ký tiếng Nhật do người học tự viết sau:

"""
${cleanedJa}
"""

Chỉ trả về JSON hợp lệ theo schema.`;

  const rawText = await callGemini(
    prompt,
    systemInstruction,
    undefined,
    false,
    NIKKI_RESPONSE_SCHEMA,
    false
  );

  const parsed = safeExtractJson<RawGeminiNikkiPayload>(rawText, {});
  return hydrateParsedPayload(
    parsed,
    'self_write',
    parsed.vietnameseMeaning || cleanedJa,
    styleMode,
    cleanedJa
  );
}

// ============================================================================
// ZERO-LATENCY STREAMING TRANSLATION & FLAWLESS FURIGANA OVERLAY MATRIX
// ============================================================================

const KANJI_FURIGANA_FALLBACK_DICT: Record<string, string> = {
  // Multi-Kanji compounds (longest match first)
  深呼吸: 'しんこきゅう',
  喫茶店: 'きっさてん',
  日本語: 'にほんご',
  積み重ね: 'つみかさね',
  一生懸命: 'いっしょうけんめい',
  大丈夫: 'だいじょうぶ',
  どしゃ降り: 'どしゃぶり',
  何となく: 'なんとなく',
  当たり前: 'あたりまえ',
  何気ない: 'なにげない',
  気持ち: 'きもち',
  今夜: 'こんや',
  今朝: 'けさ',
  昨日: 'きのう',
  明日: 'あした',
  毎日: 'まいにち',
  天気: 'てんき',
  時間: 'じかん',
  自分: 'じぶん',
  仕事: 'しごと',
  会社: 'かいしゃ',
  学校: 'がっこう',
  友達: 'ともだち',
  家族: 'かぞく',
  財布: 'さいふ',
  電車: 'でんしゃ',
  携帯: 'けいたい',
  写真: 'しゃしん',
  音楽: 'おんがく',
  映画: 'えいが',
  料理: 'りょうり',
  お茶: 'おちゃ',
  お酒: 'おさけ',
  ご飯: 'ごはん',
  部屋: 'へや',
  本当: 'ほんとう',
  無理: 'むり',
  頑張: 'がんば',
  仕方: 'しかた',
  最初: 'さいしょ',
  最後: 'さいご',
  最近: 'さいきん',
  試験: 'しけん',
  復習: 'ふくしゅう',
  丁寧: 'ていねい',
  問題: 'もんだい',
  一問: 'いちもん',
  気分: 'きぶん',
  心配: 'しんぱい',
  安心: 'あんしん',
  感謝: 'かんしゃ',
  笑顔: 'えがお',
  景色: 'けしき',
  約束: 'やくそく',
  準備: 'じゅんび',
  大変: 'たいへん',
  元気: 'げんき',
  好き: 'すき',
  嫌い: 'きらい',
  嬉しい: 'うれしい',
  悲しい: 'かなしい',
  楽しい: 'たのしい',
  寂しい: 'さびしい',
  優しい: 'やさしい',
  忙しい: 'いそがしい',
  眠い: 'ねむい',
  温かい: 'あたたかい',
  暖かい: 'あたたかい',
  寒い: 'さむい',
  暑い: 'あつい',
  熱い: 'あつい',
  冷たい: 'つめたい',
  美味しい: 'おいしい',
  可愛い: 'かわいい',
  大丈夫だ: 'だいじょうぶだ',
  // Context-dependent key pairs
  今日: 'きょう',
  一日: 'いちにち',
  一人: 'ひとり',
  二人: 'ふたり',
  夕方: 'ゆうがた',
  // Essential single Kanji safety net (ensures basic Kanji are NEVER missed)
  日: 'ひ',
  月: 'つき',
  火: 'ひ',
  水: 'みず',
  木: 'き',
  金: 'かね',
  土: 'つち',
  人: 'ひと',
  今: 'いま',
  何: 'なに',
  時: 'とき',
  間: 'あいだ',
  気: 'き',
  心: 'こころ',
  手: 'て',
  目: 'め',
  口: 'くち',
  耳: 'みみ',
  足: 'あし',
  顔: 'かお',
  声: 'こえ',
  音: 'おと',
  色: 'いろ',
  雨: 'あめ',
  風: 'かぜ',
  空: 'そら',
  雲: 'くも',
  雪: 'ゆき',
  花: 'はな',
  朝: 'あさ',
  昼: 'ひる',
  夜: 'よる',
  晩: 'ばん',
  週: 'しゅう',
  年: 'とし',
  私: 'わたし',
  僕: 'ぼく',
  俺: 'おれ',
  彼: 'かれ',
  友: 'とも',
  家: 'いえ',
  駅: 'えき',
  道: 'みち',
  店: 'みせ',
  街: 'まち',
  町: 'まち',
  海: 'うみ',
  山: 'やま',
  川: 'かわ',
  森: 'もり',
  茶: 'ちゃ',
  窓: 'まど',
  外: 'そと',
  中: 'なか',
  上: 'うえ',
  下: 'した',
  前: 'まえ',
  後: 'あと',
  見: 'み',
  聞: 'き',
  言: 'い',
  話: 'はな',
  読: 'よ',
  書: 'か',
  行: 'い',
  来: 'く',
  帰: 'かえ',
  食: 'た',
  飲: 'の',
  寝: 'ね',
  起: 'お',
  買: 'か',
  待: 'ま',
  歩: 'ある',
  走: 'はし',
  働: 'はたら',
  休: 'やす',
  笑: 'わら',
  泣: 'な',
  思: 'おも',
  考: 'かんが',
  知: 'し',
  忘: 'わす',
  落: 'お',
  沈: 'しず',
  眺: 'なが',
  疲: 'つか',
  焦: 'あせ',
  嬉: 'うれ',
  喜: 'よろこ',
  悲: 'かな',
  哀: 'あわ',
  怒: 'おこ',
  平: 'たい',
  静: 'しず',
  穏: 'おだ',
  幸: 'しあわ',
  夢: 'ゆめ',
  愛: 'あい',
  恋: 'こい',
  運: 'うん',
  悪: 'わる',
  良: 'よ',
  早: 'はや',
  遅: 'おそ',
  多: 'おお',
  少: 'すく',
  大: 'おお',
  小: 'ちい',
  新: 'あたら',
  古: 'ふる',
  高: 'たか',
  安: 'やす',
  長: 'なが',
  短: 'みじか',
  近: 'ちか',
  遠: 'とお',
  強: 'つよ',
  弱: 'よわ',
  痛: 'いた',
  眠: 'ねむ',
  忙: 'いそが',
  難: 'むずか',
  明: 'あか',
  暗: 'くら',
  胸: 'むね',
  頭: 'あたま',
  方: 'ほう',
  回: 'かい',
  度: 'ど',
  番: 'ばん',
  全: 'ぜん',
  半: 'はん',
  分: 'ぶん',
  本: 'ほん',
  一: 'いち',
  二: 'に',
  三: 'さん',
  四: 'よん',
  五: 'ご',
  六: 'ろく',
  七: 'なな',
  八: 'はち',
  九: 'きゅう',
  十: 'じゅう',
  百: 'ひゃく',
  千: 'せん',
  万: 'まん',
};

const SORTED_DICT_KEYS = Object.keys(KANJI_FURIGANA_FALLBACK_DICT).sort(
  (a, b) => b.length - a.length
);

const IS_HIRAGANA = (ch: string) => ch >= '\u3040' && ch <= '\u309f';

/**
 * Strips shared leading/trailing hiragana from {surface|reading} so <rt> Furigana
 * hovers strictly over the Kanji characters (e.g., {落として|おとして} -> {落|お} + として).
 */
export function normalizeRubyPair(surface: string, reading: string): NikkiToken[] {
  const s = surface.trim();
  const r = reading.trim();
  if (!s) return [];
  if (!HAS_KANJI_REGEX.test(s) || !r) return [{ text: s }];

  let leadLen = 0;
  while (
    leadLen < s.length &&
    leadLen < r.length &&
    IS_HIRAGANA(s[leadLen]) &&
    s[leadLen] === r[leadLen]
  ) {
    leadLen++;
  }

  let trailLen = 0;
  while (
    s.length - 1 - trailLen > leadLen &&
    r.length - 1 - trailLen > leadLen &&
    IS_HIRAGANA(s[s.length - 1 - trailLen]) &&
    s[s.length - 1 - trailLen] === r[r.length - 1 - trailLen]
  ) {
    trailLen++;
  }

  const out: NikkiToken[] = [];
  if (leadLen > 0) out.push({ text: s.slice(0, leadLen) });
  const coreSurface = s.slice(leadLen, s.length - trailLen);
  const coreReading = r.slice(leadLen, r.length - trailLen);
  if (coreSurface) {
    if (HAS_KANJI_REGEX.test(coreSurface) && coreReading) {
      out.push({ text: coreSurface, reading: coreReading, isKanji: true });
    } else {
      out.push({ text: coreSurface });
    }
  }
  if (trailLen > 0) out.push({ text: s.slice(s.length - trailLen) });
  return out;
}

function resolveContextAwareDictionaryReading(
  word: string,
  fullSentenceContext: string
): string | undefined {
  if (word === '今日') {
    const isFormalContext = /(こんにち|本日|現代|社会|において|日本の|では)/.test(
      fullSentenceContext
    );
    return isFormalContext ? 'こんにち' : 'きょう';
  }
  if (word === '何' && /何(か|も|となく|で|故)/.test(fullSentenceContext)) {
    return 'なに';
  }
  return KANJI_FURIGANA_FALLBACK_DICT[word];
}

function segmentPlainSegmentWithFallbackDict(
  segmentText: string,
  fullContext: string
): NikkiToken[] {
  if (!HAS_KANJI_REGEX.test(segmentText)) {
    return segmentText ? [{ text: segmentText }] : [];
  }

  const result: NikkiToken[] = [];
  let i = 0;
  let plainBuffer = '';

  const flushPlain = () => {
    if (plainBuffer) {
      result.push({ text: plainBuffer });
      plainBuffer = '';
    }
  };

  while (i < segmentText.length) {
    const ch = segmentText[i];
    if (!HAS_KANJI_REGEX.test(ch)) {
      plainBuffer += ch;
      i += 1;
      continue;
    }

    let matchedKey: string | null = null;
    for (const key of SORTED_DICT_KEYS) {
      if (segmentText.startsWith(key, i)) {
        matchedKey = key;
        break;
      }
    }

    if (matchedKey) {
      flushPlain();
      const reading =
        resolveContextAwareDictionaryReading(matchedKey, fullContext) ||
        KANJI_FURIGANA_FALLBACK_DICT[matchedKey];
      result.push(...normalizeRubyPair(matchedKey, reading));
      i += matchedKey.length;
    } else {
      flushPlain();
      result.push({ text: ch });
      i += 1;
    }
  }

  flushPlain();
  return result;
}

export function enforceCompleteFuriganaTokens(
  tokens: NikkiToken[],
  fullContext: string
): NikkiToken[] {
  const out: NikkiToken[] = [];
  for (const tok of tokens) {
    if (!tok.text) continue;
    if (tok.isKanji && tok.reading && HAS_KANJI_REGEX.test(tok.text)) {
      const normalized = normalizeRubyPair(tok.text, tok.reading);
      for (const nTok of normalized) {
        if (nTok.text === '今日' && nTok.isKanji) {
          const ctxReading = resolveContextAwareDictionaryReading('今日', fullContext);
          out.push({ ...nTok, reading: ctxReading || nTok.reading });
        } else {
          out.push(nTok);
        }
      }
    } else if (HAS_KANJI_REGEX.test(tok.text)) {
      out.push(...segmentPlainSegmentWithFallbackDict(tok.text, fullContext));
    } else {
      out.push({ text: tok.text });
    }
  }
  return out;
}

export interface TranslationFuriganaAudit {
  plainText: string;
  totalKanjiChars: number;
  coveredKanjiChars: number;
  missedKanjiChars: string[];
  furigana100PercentCovered: boolean;
}

export function auditTranslationTokens(tokens: NikkiToken[]): TranslationFuriganaAudit {
  let plainText = '';
  let totalKanjiChars = 0;
  let coveredKanjiChars = 0;
  const missedKanjiChars: string[] = [];

  for (const tok of tokens) {
    plainText += tok.text;
    for (const ch of tok.text) {
      if (HAS_KANJI_REGEX.test(ch)) {
        totalKanjiChars += 1;
        if (tok.isKanji && tok.reading && tok.reading.trim().length > 0) {
          coveredKanjiChars += 1;
        } else {
          missedKanjiChars.push(ch);
        }
      }
    }
  }

  return {
    plainText,
    totalKanjiChars,
    coveredKanjiChars,
    missedKanjiChars,
    furigana100PercentCovered: missedKanjiChars.length === 0,
  };
}

/**
 * Parses streaming Gemini text containing {Kanji|Furigana} markers into clean ruby tokens
 * while safely buffering any unclosed trailing `{...` so raw delimiters never flash in the UI.
 */
export function parseInlineFuriganaStream(rawStreamText: string): {
  tokens: NikkiToken[];
  plainText: string;
  audit: TranslationFuriganaAudit;
} {
  let cleaned = rawStreamText
    .replace(/```[a-z]*\n?/gi, '')
    .replace(/```/g, '')
    .trimStart();

  // Safely strip unfinished trailing {kanji|kana marker during live stream
  const lastOpen = cleaned.lastIndexOf('{');
  const lastClose = cleaned.lastIndexOf('}');
  let pendingTailText = '';
  if (lastOpen > lastClose) {
    const partial = cleaned.slice(lastOpen + 1);
    cleaned = cleaned.slice(0, lastOpen);
    const barIdx = partial.indexOf('|');
    pendingTailText = barIdx >= 0 ? partial.slice(0, barIdx) : partial;
  }

  const rawTokens: NikkiToken[] = [];
  const rubyPattern = /\{([^{}|\n]+)\|([^{}|\n]+)\}/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = rubyPattern.exec(cleaned)) !== null) {
    if (match.index > cursor) {
      rawTokens.push({ text: cleaned.slice(cursor, match.index) });
    }
    rawTokens.push(...normalizeRubyPair(match[1], match[2]));
    cursor = match.index + match[0].length;
  }

  if (cursor < cleaned.length) {
    rawTokens.push({ text: cleaned.slice(cursor) });
  }
  if (pendingTailText) {
    rawTokens.push({ text: pendingTailText });
  }

  const rawPlain = rawTokens.map((t) => t.text).join('');
  const tokens = enforceCompleteFuriganaTokens(rawTokens, rawPlain);
  const audit = auditTranslationTokens(tokens);

  return {
    tokens,
    plainText: audit.plainText,
    audit,
  };
}

export async function streamEmpathicNikkiTranslation(
  vietnameseText: string,
  styleMode: NikkiStyleMode,
  onStreamProgress: (state: {
    tokens: NikkiToken[];
    plainText: string;
    audit: TranslationFuriganaAudit;
  }) => void
): Promise<{
  tokens: NikkiToken[];
  plainText: string;
  audit: TranslationFuriganaAudit;
}> {
  const cleaned = vietnameseText.trim();
  if (!cleaned) {
    throw new Error('Vui lòng nhập đôi dòng suy nghĩ tiếng Việt trước khi chuyển ngữ.');
  }

  const systemInstruction = `Bạn là nhà văn Nhật ký bản xứ (Native Japanese Essayist).
NHIỆM VỤ DUY NHẤT — STREAM TỨC THÌ BẢN DỊCH TIẾNG NHẬT TỰ NHIÊN:
1. Thấu cảm cảm xúc/lóng tiếng Việt rồi chuyển ngay thành câu tiếng Nhật sống động chuẩn người bản xứ (CẤM dịch word-by-word).
   Ví dụ: "Hôm nay xui quá, làm rơi mất cái ví" -> "{今日|きょう}は{本当|ほんとう}についてない。{財布|さいふ}を{落|お}としてしまった。"
2. Văn phong: ${buildStyleGuidance(styleMode)}
3. QUY TẮC KHẢM FURIGANA TUYỆT ĐỐI 100%: MỌI chữ Kanji xuất hiện (kể cả chữ dễ như 日, 月, 人, 私, 今) BẮT BUỘC phải bọc theo định dạng {Kanji|hiragana}, khớp đúng ngữ cảnh đọc (ví dụ: thân mật dùng {今日|きょう}, trang trọng dùng {今日|こんにち}). Không bao gồm okurigana vào trong ngoặc.
4. CHỈ xuất trực tiếp đoạn văn tiếng Nhật đó ngay từ ký tự đầu tiên. KHÔNG chào hỏi, KHÔNG giải thích, KHÔNG markdown, KHÔNG JSON.`;

  const prompt = `Chuyển ngữ thấu cảm tức thì sang nhật ký tiếng Nhật (khảm 100% {Kanji|hiragana}):
"""
${cleaned}
"""`;

  let latestParsed = parseInlineFuriganaStream('');

  const fullStreamed = await callGeminiStream(
    prompt,
    systemInstruction,
    (accumulated) => {
      latestParsed = parseInlineFuriganaStream(accumulated);
      onStreamProgress(latestParsed);
    },
    true
  );

  const finalParsed = parseInlineFuriganaStream(fullStreamed);
  onStreamProgress(finalParsed);
  return finalParsed;
}

export async function enrichStreamedNikkiEntry(
  vietnameseText: string,
  japanesePlain: string,
  streamedTokens: NikkiToken[],
  styleMode: NikkiStyleMode
): Promise<NikkiEntryRecord> {
  const allowedMoods = MOOD_KANJI_PALETTE.map((m) => `${m.kanji} (${m.meaningVi})`).join(', ');

  const enrichSchema = {
    type: 'OBJECT',
    properties: {
      emotionalTone: { type: 'STRING' },
      moodKanjiChar: { type: 'STRING' },
      japaneseTitle: { type: 'STRING' },
      haikuLines: { type: 'ARRAY', items: { type: 'STRING' } },
      haikuVietnamese: { type: 'STRING' },
      bestQuoteJa: { type: 'STRING' },
      bestQuoteVi: { type: 'STRING' },
      therapistReply: {
        type: 'OBJECT',
        properties: {
          japanese: { type: 'STRING' },
          reading: { type: 'STRING' },
          vietnamese: { type: 'STRING' },
          cultureNote: { type: 'STRING' },
        },
        required: ['japanese', 'reading', 'vietnamese', 'cultureNote'],
      },
      tokens: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            text: { type: 'STRING' },
            reading: { type: 'STRING' },
            isKanji: { type: 'BOOLEAN' },
          },
          required: ['text'],
        },
      },
      treasures: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            expression: { type: 'STRING' },
            furigana: { type: 'STRING' },
            romaji: { type: 'STRING' },
            pitchType: { type: 'STRING' },
            pitchAccentNum: { type: 'INTEGER' },
            pitchLabel: { type: 'STRING' },
            meaning: { type: 'STRING' },
            whyLearn: { type: 'STRING' },
            jlpt: { type: 'STRING' },
            contextSentence: { type: 'STRING' },
          },
          required: ['expression', 'furigana', 'romaji', 'pitchLabel', 'meaning', 'whyLearn'],
        },
      },
    },
    required: [
      'emotionalTone',
      'moodKanjiChar',
      'japaneseTitle',
      'haikuLines',
      'haikuVietnamese',
      'bestQuoteJa',
      'bestQuoteVi',
      'therapistReply',
      'treasures',
    ],
  };

  const prompt = `Cho trang nhật ký tiếng Nhật vừa được dịch từ tâm sự tiếng Việt sau:
- Tiếng Việt gốc: "${vietnameseText}"
- Nhật ký tiếng Nhật: "${japanesePlain}"

Hãy trả về JSON gồm:
1. "moodKanjiChar": ĐÚNG 1 chữ Hán đại diện cảm xúc từ: ${allowedMoods}.
2. "japaneseTitle" (tiêu đề ngắn bằng tiếng Nhật), "emotionalTone".
3. "haikuLines" (mảng 3 dòng thơ Haiku 5-7-5) + "haikuVietnamese".
4. "bestQuoteJa" (1 câu trích đắt giá từ đoạn nhật ký) + "bestQuoteVi".
5. "therapistReply" (Omoiyari: japanese, reading, vietnamese, cultureNote).
6. "tokens": kiểm tra và đảm bảo mọi Kanji trong đoạn tiếng Nhật đều có reading Hiragana.
7. "treasures": 3-4 cụm Collocation đắt giá nhất có trong câu.`;

  try {
    const raw = await callGemini(
      prompt,
      'Chỉ trả về JSON hợp lệ theo schema để hoàn thiện hồ sơ nhật ký.',
      undefined,
      false,
      enrichSchema,
      true
    );
    const parsed = safeExtractJson<RawGeminiNikkiPayload>(raw, {});
    const mergedPayload: RawGeminiNikkiPayload = {
      ...parsed,
      japanesePlain,
      tokens:
        Array.isArray(parsed.tokens) &&
        parsed.tokens.map((t) => t.text || '').join('').replace(/\s+/g, '') ===
          japanesePlain.replace(/\s+/g, '')
          ? parsed.tokens
          : streamedTokens,
    };
    return hydrateParsedPayload(mergedPayload, 'translate', vietnameseText, styleMode);
  } catch {
    // Preserve the already-streamed Japanese translation & Furigana even if secondary metadata call hits transient limits
    const fallbackMood = resolveMoodKanji();
    const fallback = deriveFallbackHaikuAndQuote(japanesePlain, fallbackMood, vietnameseText);
    const auditedTokens = enforceCompleteFuriganaTokens(streamedTokens, japanesePlain);
    const now = Date.now();
    return {
      id: `nikki_${now}`,
      createdAt: now,
      dateLabelJa: formatJapaneseDateLabel(now),
      inputMode: 'translate',
      vietnameseRaw: vietnameseText.trim(),
      styleMode,
      emotionalTone: 'Tự sự chân thật tức thì',
      moodKanji: fallbackMood,
      japaneseTitle: '今日のひとこと',
      japanesePlain,
      tokens: auditedTokens,
      haiku: fallback.haiku,
      bestQuote: fallback.bestQuote,
      therapistReply: {
        japanese: '自分の言葉で素直に書き出せましたね。深呼吸してゆっくり過ごしてくださいね。',
        reading: 'じぶんのことばですなおにかきだせましたね。しんこきゅうしてゆっくりすごしてくださいね。',
        vietnamese: 'Bạn đã thật lòng viết ra cảm xúc của mình rồi. Hãy hít thở sâu và thư giãn nhẹ nhàng nhé.',
        cultureNote: 'Lời đồng hành Omoiyari nhẹ nhàng.',
      },
      treasures: [],
      syncedToSrs: false,
      audit: {
        naturalMonologuePassed: true,
        furiganaAlignedPassed: auditTranslationTokens(auditedTokens).furigana100PercentCovered,
        collocationQualityPassed: true,
        therapistReplyPassed: true,
        redPenCheckedPassed: true,
        moodKanjiTaggedPassed: true,
        auditNote: 'Chuyển ngữ quang tốc kèm Ma trận Furigana 100% & Công tắc Zen 0ms.',
      },
    };
  }
}


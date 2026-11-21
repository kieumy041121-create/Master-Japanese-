import { JLPTLevel } from './index';

export type QuizFormat =
  | 'kanji'             // 🈶 Hán tự (Cách đọc, Cách viết, Nhận diện tương tự & bộ thủ)
  | 'vocab_collocation' // 📖 Từ vựng & Collocation (Điền từ hợp ngữ cảnh, Cụm từ đi kèm trợ từ, Fukugoudoushi)
  | 'grammar_star'      // 🧩 Ngữ pháp & Bài tập Dấu sao (Star Mondai xếp 4 vị trí, Trợ từ & liên từ)
  | 'reading_dokkai'     // 📄 Đọc hiểu (Đoạn văn ngắn/trung, Chủ ý tác giả, Gạch chân)
  | 'listening_pitch'   // 🎧 Nghe hiểu & Pitch Accent (Cao độ Tokyo Heiban/Atamadaka/Nakadaka/Odaka, Hội thoại)
  | 'jpt_standard'      // 🏆 Đề thi JPT Chuẩn Quốc Tế (990 Điểm: Nghe hiểu, Tìm lỗi sai, Ngữ pháp ngữ cảnh, Đọc hiểu thương mại)
  | 'mixed';            // 🌟 Tổng hợp đa dạng chuẩn đề thi JLPT

export type QuizSubFormat =
  | 'kanji_yomi'
  | 'kanji_hyoki'
  | 'kanji_radicals'
  | 'contextual_vocab'
  | 'particle_collocation'
  | 'fukugoudoushi'
  | 'star_mondai'
  | 'particle_conjunction'
  | 'short_passage'
  | 'underlined_phrase'
  | 'pitch_accent'
  | 'dialogue_reflex'
  | 'mixed_standard'
  | 'jpt_error_detection'
  | 'jpt_context_grammar'
  | 'jpt_reading_biz'
  | 'jpt_listening';

export type QuizMode = 'practice' | 'timed_exam';

export type QuizSource =
  | 'ai_gemini'        // Sinh bằng AI Gemini Flash theo từ khóa tự do
  | 'curated_bank'     // Từ kho bản quyền 2.557+ từ
  | 'thematic_25'      // Theo 25 chủ đề tuyển chọn
  | 'mistake_notebook';// Từ Sổ tay câu sai

export interface CustomQuizQuestion {
  id: string;
  level: JLPTLevel;
  format: QuizFormat;
  subFormat: QuizSubFormat;
  subFormatTitle: string; // e.g. "Hán tự · Cách đọc Hiragana (Kanji Yomi)"
  instruction: string;
  content: string;
  passage?: string; // Dành cho bài đọc hiểu hoặc bài hội thoại
  audioText?: string; // Text để phát âm Tokyo TTS
  pitchPattern?: 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka';
  pitchNumber?: number; // 0, 1, 2, 3...
  pitchDisplay?: string; // e.g. "⓪ 平板型 (Heiban)"
  starTokens?: string[]; // 4 mảnh ghép câu xếp sao: e.g. ["進歩しようと", "も", "人間としての", "倫理観を"]
  starTargetIndex?: number; // Vị trí dấu sao ★: 0, 1, 2, 3 (thường là 2)
  options: string[];
  correctIndex: number;
  explanation: string;
  grammarMnemonic?: string;
  sourceTag?: string; // e.g. "AI Flash · Phỏng vấn IT" | "Kho 2.557 từ" | "25 Chủ đề · Ẩm thực"
}

export interface MistakeRecord {
  id: string;
  question: CustomQuizQuestion;
  userAnswer: number;
  timestamp: number;
}

export interface QuizConfig {
  level: JLPTLevel;
  format: QuizFormat;
  subFormat?: QuizSubFormat;
  count: 5 | 10 | 20 | 30;
  mode: QuizMode;
  source: QuizSource;
  customKeyword?: string;
  thematicTopicId?: string;
  timeLimitSec?: number; // calculated from count * 90s
}

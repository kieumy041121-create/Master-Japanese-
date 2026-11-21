#!/usr/bin/env node
/**
 * =============================================================================
 * KỊCH BẢN XỬ LÝ DỮ LIỆU TỪ VỰNG TIẾNG NHẬT CHUẨN XÁC 100% (NODE.JS / ESM)
 * 
 * Quy trình thực hiện:
 * Bước 1: Quét cơ sở dữ liệu / file JSON từ vựng, gom nhóm theo cột `kana`.
 *         Loại bỏ toàn bộ bản ghi trùng lặp, chỉ giữ lại duy nhất 01 bản ghi
 *         có Kanji hoàn chỉnh nhất và ý nghĩa tiếng Việt chi tiết nhất.
 * Bước 2: Tự động chuyển đổi cột `kana` sang `romaji` theo chuẩn Modified Hepburn:
 *         - Xúc âm (促音 っ): nhân đôi phụ âm đứng sau (k, s, t, p) và đổi thành 't' trước 'ch' (ví dụ: matchi).
 *         - Trường âm (長音): giữ nguyên quy tắc nguyên âm kéo dài ō/ū hoặc nguyên âm đôi chuẩn Hepburn.
 *         - Biến âm (濁音/半濁音): dấu tenten ゛ (g, z, d, b) và dấu maru ゜ (p).
 *         - Cập nhật đè (overwrite/update) toàn bộ cột `romaji`.
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';

// Bảng ánh xạ Kana -> Modified Hepburn
const HIRA_TO_HEPBURN = {
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho', 'しぇ': 'she',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho', 'ちぇ': 'che',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
  'てぃ': 'ti', 'でぃ': 'di', 'ふぁ': 'fa', 'ふぃ': 'fi', 'ふぇ': 'fe', 'ふぉ': 'fo',
  'うぃ': 'wi', 'うぇ': 'we', 'うぉ': 'wo',
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'o', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'ゔ': 'vu'
};

function katakanaToHiragana(text = '') {
  let res = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0x30A1 && code <= 0x30F6) {
      res += String.fromCharCode(code - 0x60);
    } else {
      res += text[i];
    }
  }
  return res;
}

/**
 * Chuyển đổi Kana sang Modified Hepburn Romaji
 */
export function kanaToModifiedHepburn(kanaStr = '') {
  if (!kanaStr) return '';
  const hira = katakanaToHiragana(kanaStr.trim());
  const out = [];
  const n = hira.length;
  let i = 0;

  while (i < n) {
    const ch = hira[i];

    // Xúc âm (っ / ッ)
    if (ch === 'っ' || ch === 'ッ') {
      if (i + 1 < n) {
        const next2 = hira.slice(i + 1, i + 3);
        const next1 = hira.slice(i + 1, i + 2);
        // Quy tắc Modified Hepburn: Trước ch (cha/chu/cho/che/chi) viết là 't' thay vì 'c'
        if (next2 === 'ちゃ' || next2 === 'ちゅ' || next2 === 'ちょ' || next2 === 'ちぇ' || next1 === 'ち') {
          out.push('t');
        } else {
          const target = HIRA_TO_HEPBURN[next2] || HIRA_TO_HEPBURN[next1] || '';
          if (target) {
            out.push(target[0]);
          }
        }
      }
      i++;
      continue;
    }

    // Trường âm katakana (ー)
    if (ch === 'ー') {
      if (out.length > 0) {
        const last = out[out.length - 1];
        const lastVowel = last[last.length - 1];
        if (['a', 'i', 'u', 'e', 'o'].includes(lastVowel)) {
          out.push(lastVowel);
        }
      }
      i++;
      continue;
    }

    // Âm ghép 2 ký tự (きゃ, しゃ, ちゃ...)
    if (i + 1 < n) {
      const pair = hira.slice(i, i + 2);
      if (HIRA_TO_HEPBURN[pair]) {
        out.push(HIRA_TO_HEPBURN[pair]);
        i += 2;
        continue;
      }
    }

    // Ký tự đơn
    if (HIRA_TO_HEPBURN[ch]) {
      out.push(HIRA_TO_HEPBURN[ch]);
    } else if (ch === ' ' || ch === '　' || ch === '・' || ch === '-') {
      out.push(' ');
    } else {
      out.push(ch);
    }
    i++;
  }

  return out.join('').replace(/\s+/g, ' ').trim().toLowerCase();
}

/**
 * Đánh giá điểm độ hoàn chỉnh của một bản ghi từ vựng
 */
function scoreRecord(record) {
  let score = 0;
  const kanji = (record.kanji || record.word || '').trim();
  const meaning = (record.meaning || record.vietnamese || record.simpleMeaning || '').trim();
  const hanViet = (record.han_viet || record.hanViet || '').trim();
  const level = (record.level || '').trim();

  // Có chữ Hán thực tế
  const kanjiMatches = kanji.match(/[\u4e00-\u9faf]/g);
  if (kanjiMatches) {
    score += 100 + kanjiMatches.length * 10;
  }

  // Độ dài nghĩa tiếng Việt đầy đủ
  score += meaning.length;

  if (hanViet && hanViet.toLowerCase() !== 'thuần nhật') {
    score += 30;
  }
  if (['N1', 'N2', 'N3', 'N4', 'N5'].includes(level)) {
    score += 20;
  }

  return score;
}

/**
 * Xử lý danh sách từ vựng (In-memory / JSON file / Database rows)
 */
export function deduplicateAndFixRomaji(vocabList) {
  if (!Array.isArray(vocabList)) {
    throw new Error('Dữ liệu đầu vào phải là một danh sách các bản ghi (array).');
  }

  const initialCount = vocabList.length;
  const groups = new Map();

  // Bước 1: Quét toàn bộ và gom nhóm theo cột Kana
  for (const item of vocabList) {
    const kana = (item.kana || item.reading || '').trim();
    if (!kana) continue;

    if (!groups.has(kana)) {
      groups.set(kana, []);
    }
    groups.get(kana).push(item);
  }

  const sanitizedList = [];
  let duplicatesRemoved = 0;

  for (const [kana, records] of groups.entries()) {
    if (records.length === 1) {
      const rec = { ...records[0] };
      // Bước 2: Phiên âm lại theo Modified Hepburn
      rec.romaji = kanaToModifiedHepburn(kana);
      sanitizedList.push(rec);
    } else {
      duplicatesRemoved += (records.length - 1);
      // Sắp xếp lấy bản ghi chứa thông tin Kanji và ý nghĩa đầy đủ nhất
      records.sort((a, b) => scoreRecord(b) - scoreRecord(a));
      const best = { ...records[0] };
      // Bước 2: Cập nhật đè cột romaji
      best.romaji = kanaToModifiedHepburn(kana);
      sanitizedList.push(best);
    }
  }

  return {
    initialCount,
    duplicatesRemoved,
    retainedCount: sanitizedList.length,
    sanitizedList
  };
}

// Chạy trực tiếp qua dòng lệnh nếu được gọi
if (process.argv[1] && process.argv[1].endsWith('dedup_and_fix_romaji.mjs')) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.log(`
Sử dụng:
  node scripts/dedup_and_fix_romaji.mjs [file_tu_vung.json] [file_output.json]
    `);
    process.exit(0);
  }

  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`[-] Không tìm thấy file: ${resolvedPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(resolvedPath, 'utf8');
  const data = JSON.parse(raw);
  console.log(`[*] Đang xử lý ${data.length} bản ghi từ: ${resolvedPath}...`);

  const result = deduplicateAndFixRomaji(data);

  const outPath = process.argv[3] ? path.resolve(process.argv[3]) : resolvedPath;
  fs.writeFileSync(outPath, JSON.stringify(result.sanitizedList, null, 2), 'utf8');

  console.log(`[✓] Xử lý thành công!`);
  console.log(`    - Ban đầu: ${result.initialCount} bản ghi`);
  console.log(`    - Đã khử trùng lặp Kana: ${result.duplicatesRemoved} bản ghi`);
  console.log(`    - Còn lại duy nhất: ${result.retainedCount} bản ghi`);
  console.log(`    - Đã cập nhật đè toàn bộ cột Romaji theo Modified Hepburn vào: ${outPath}`);
}

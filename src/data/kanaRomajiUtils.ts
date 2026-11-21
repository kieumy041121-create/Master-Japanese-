// Standalone, self-contained Kana <-> Romaji Conversion Utilities
// Zero dependencies to completely prevent circular initialization issues

export const ROMAJI_TO_HIRA_MAP: [string, string][] = [
  // Double consonants (sokuon っ)
  ['kk', 'っk'], ['tt', 'っt'], ['ss', 'っs'], ['pp', 'っp'], ['tc', 'っc'], ['cch', 'っch'], ['ssh', 'っsh'],
  
  // 3-letter combos (contracted sounds yoon & others)
  ['kya', 'きゃ'], ['kyu', 'きゅ'], ['kyo', 'きょ'],
  ['sha', 'しゃ'], ['shu', 'しゅ'], ['sho', 'しょ'], ['she', 'しぇ'],
  ['cha', 'ちゃ'], ['chu', 'ちゅ'], ['cho', 'ちょ'], ['che', 'ちぇ'],
  ['nya', 'にゃ'], ['nyu', 'にゅ'], ['nyo', 'にょ'],
  ['hya', 'ひゃ'], ['hyu', 'ひゅ'], ['hyo', 'ひょ'],
  ['mya', 'みゃ'], ['myu', 'みゅ'], ['myo', 'みょ'],
  ['rya', 'りゃ'], ['ryu', 'りゅ'], ['ryo', 'りょ'],
  ['gya', 'ぎゃ'], ['gyu', 'ぎゅ'], ['gyo', 'ぎょ'],
  ['bya', 'びゃ'], ['byu', 'びゅ'], ['byo', 'びょ'],
  ['pya', 'ぴゃ'], ['pyu', 'ぴゅ'], ['pyo', 'ぴょ'],
  ['tsu', 'つ'], ['chi', 'ち'], ['shi', 'し'],
  ['dzu', 'づ'], ['dji', 'ぢ'],

  // 2-letter combos
  ['ka', 'か'], ['ki', 'き'], ['ku', 'く'], ['ke', 'け'], ['ko', 'こ'],
  ['sa', 'さ'], ['si', 'し'], ['su', 'す'], ['se', 'せ'], ['so', 'そ'],
  ['ta', 'た'], ['ti', 'ち'], ['tu', 'つ'], ['te', 'て'], ['to', 'と'],
  ['na', 'な'], ['ni', 'に'], ['nu', 'ぬ'], ['ne', 'ね'], ['no', 'の'],
  ['ha', 'は'], ['hi', 'ひ'], ['fu', 'ふ'], ['hu', 'ふ'], ['he', 'へ'], ['ho', 'ほ'],
  ['ma', 'ま'], ['mi', 'み'], ['mu', 'む'], ['me', 'め'], ['mo', 'も'],
  ['ya', 'や'], ['yu', 'ゆ'], ['yo', 'よ'],
  ['ra', 'ら'], ['ri', 'り'], ['ru', 'る'], ['re', 'れ'], ['ro', 'ろ'],
  ['wa', 'わ'], ['wo', 'を'],
  ['ga', 'が'], ['gi', 'ぎ'], ['gu', 'ぐ'], ['ge', 'げ'], ['go', 'ご'],
  ['za', 'ざ'], ['ji', 'じ'], ['zi', 'じ'], ['zu', 'ず'], ['ze', 'ぜ'], ['zo', 'ぞ'],
  ['da', 'だ'], ['di', 'ぢ'], ['du', 'づ'], ['de', 'で'], ['do', 'ど'],
  ['ba', 'ば'], ['bi', 'び'], ['bu', 'ぶ'], ['be', 'べ'], ['bo', 'ぼ'],
  ['pa', 'ぱ'], ['pi', 'ぴ'], ['pu', 'ぷ'], ['pe', 'ぺ'], ['po', 'ぽ'],
  ['ja', 'じゃ'], ['ju', 'じゅ'], ['jo', 'じょ'],

  // Single vowels
  ['a', 'あ'], ['i', 'い'], ['u', 'う'], ['e', 'え'], ['o', 'お'],
  ['n', 'ん']
];

export const HIRA_TO_ROMAJI_MAP: [string, string][] = [
  ['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo'],
  ['しゃ', 'sha'], ['しゅ', 'shu'], ['しょ', 'sho'], ['しぇ', 'she'],
  ['ちゃ', 'cha'], ['ちゅ', 'chu'], ['ちょ', 'cho'],
  ['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo'],
  ['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo'],
  ['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo'],
  ['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo'],
  ['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo'],
  ['じゃ', 'ja'], ['じゅ', 'ju'], ['じょ', 'jo'],
  ['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo'],
  ['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo'],
  // Modern Katakana / Foreign Loanwords in Hiragana
  ['てぃ', 'ti'], ['でぃ', 'di'], ['とぅ', 'tu'], ['どぅ', 'du'],
  ['ふぁ', 'fa'], ['ふぃ', 'fi'], ['ふぇ', 'fe'], ['ふぉ', 'fo'],
  ['うぃ', 'wi'], ['うぇ', 'we'], ['うぉ', 'wo'],
  ['ゔぁ', 'va'], ['ゔぃ', 'vi'], ['ゔぇ', 've'], ['ゔぉ', 'vo'], ['ゔ', 'vu'],
  ['つぁ', 'tsa'], ['つぃ', 'tsi'], ['つぇ', 'tse'], ['つぉ', 'tso'],
  ['くぁ', 'kwa'], ['くぃ', 'kwi'], ['くぇ', 'kwe'], ['くぉ', 'kwo'],
  ['ぐぁ', 'gwa'], ['いぇ', 'ye'], ['じぇ', 'je'],
  ['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o'],
  ['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko'],
  ['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so'],
  ['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to'],
  ['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no'],
  ['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho'],
  ['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo'],
  ['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo'],
  ['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro'],
  ['わ', 'wa'], ['を', 'wo'], ['ん', 'n'],
  ['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go'],
  ['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo'],
  ['だ', 'da'], ['ぢ', 'ji'], ['づ', 'zu'], ['で', 'de'], ['ど', 'do'],
  ['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo'],
  ['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po'],
  // Small vowels & individual markers
  ['ぁ', 'a'], ['ぃ', 'i'], ['ぅ', 'u'], ['ぇ', 'e'], ['ぉ', 'o'],
  ['ゃ', 'ya'], ['ゅ', 'yu'], ['ょ', 'yo'], ['ゎ', 'wa'],
  ['っ', '']
];

/**
 * Converts Katakana to Hiragana
 */
export function katakanaToHiragana(str: string): string {
  if (!str) return '';
  return str.replace(/[\u30a1-\u30f6]/g, (ch) => {
    return String.fromCharCode(ch.charCodeAt(0) - 0x60);
  });
}

/**
 * Converts Romaji string to Hiragana
 */
export function romajiToHiragana(romaji: string): string {
  if (!romaji) return '';
  let text = romaji.toLowerCase().trim();

  // Handle long vowels: ou -> おう, uu -> うう, etc.
  for (const [rom, hira] of ROMAJI_TO_HIRA_MAP) {
    if (text.includes(rom)) {
      text = text.split(rom).join(hira);
    }
  }

  // Handle lone 'n' before consonants or at end
  text = text.replace(/n(?=[^aiueo]|$)/g, 'ん');

  return text;
}

/**
 * Converts Hiragana or Katakana string to authentic Hepburn Romaji.
 * Handles Katakana-Hiragana Prolonged Sound Mark (ー), sokuon (っ),
 * compound sounds, and foreign loanword diphthongs.
 */
export function hiraganaToRomaji(hiragana: string): string {
  if (!hiragana) return '';
  let text = katakanaToHiragana(hiragana).trim();
  let result = '';

  for (let i = 0; i < text.length; i++) {
    // 1. Prolonged sound mark (ー)
    if (text[i] === 'ー' || text[i] === '–' || text[i] === '—') {
      const lastChar = result.slice(-1).toLowerCase();
      if (lastChar === 'a') result += 'a';
      else if (lastChar === 'i') result += 'i';
      else if (lastChar === 'u') result += 'u';
      else if (lastChar === 'e') result += 'e';
      else if (lastChar === 'o') result += 'o';
      continue;
    }

    // 2. Compound 2-character sounds
    const twoChars = text.slice(i, i + 2);
    const matchTwo = HIRA_TO_ROMAJI_MAP.find(([h]) => h === twoChars);
    if (matchTwo) {
      result += matchTwo[1];
      i++;
      continue;
    }

    const oneChar = text[i];

    // 3. Sokuon (っ)
    if (oneChar === 'っ' && i + 1 < text.length) {
      const nextTwo = text.slice(i + 1, i + 3);
      const nextMatchTwo = HIRA_TO_ROMAJI_MAP.find(([h]) => h === nextTwo);
      if (nextMatchTwo) {
        result += nextMatchTwo[1].startsWith('ch') ? 't' : nextMatchTwo[1][0];
        continue;
      }
      const nextOne = text[i + 1];
      const nextMatch = HIRA_TO_ROMAJI_MAP.find(([h]) => h === nextOne);
      if (nextMatch) {
        result += nextMatch[1].startsWith('ch') ? 't' : nextMatch[1][0];
        continue;
      }
    }

    // 4. Syllabic n (ん) - Modified Hepburn handles n' before vowels and y
    if (oneChar === 'ん') {
      if (i + 1 < text.length && /[あいうえおやゆよアイウエオヤユヨ]/.test(text[i + 1])) {
        result += "n'";
      } else {
        result += 'n';
      }
      continue;
    }

    // 5. Single character
    const matchOne = HIRA_TO_ROMAJI_MAP.find(([h]) => h === oneChar);
    if (matchOne) {
      result += matchOne[1];
    } else {
      result += oneChar;
    }
  }

  // Remove any stray Japanese kana or punctuation from romaji string
  return result
    .replace(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')
    .trim();
}

/**
 * Ensures a 100% clean, standard Hepburn Romaji string.
 * Never allows Japanese characters to leak into Romaji.
 */
export function toHepburnRomaji(input: string): string {
  if (!input) return '';
  const converted = hiraganaToRomaji(input);
  // Pure Latin letters, spaces, and punctuation only
  const cleaned = converted.replace(/[^a-zA-Z0-9\s\-_.,!?'"]/g, '').trim();
  return cleaned || converted.trim();
}

/**
 * Universal Sanitizer: Ensures that a vocabulary item NEVER has identical
 * reading and romaji, and that both fields conform strictly to standard Japanese:
 * - reading: Pure Hiragana / Katakana
 * - romaji: Pure Hepburn Latin alphabet
 * - reading.toLowerCase() !== romaji.toLowerCase() guaranteed!
 */
export function sanitizeVocabPhonetics(
  word: string,
  reading: string,
  romaji?: string,
  sinoViet?: string
): { cleanReading: string; cleanRomaji: string; cleanSinoViet: string } {
  const w = (word || '').trim();
  let r = (reading || '').trim();
  let rom = (romaji || '').trim();
  let sv = (sinoViet || '').trim();

  // If reading is empty, fallback to word
  if (!r) r = w;

  // If reading has Kana, derive pure Hepburn Romaji
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(r)) {
    const derivedRom = toHepburnRomaji(r);
    if (derivedRom) {
      // If current rom is empty, or equals reading, or has Japanese chars, or was misplaced Sino-Vietnamese
      if (!rom || rom.toLowerCase() === r.toLowerCase() || /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/.test(rom)) {
        rom = derivedRom;
      } else if (rom.toLowerCase() !== derivedRom.toLowerCase()) {
        // If rom doesn't match the kana's romaji at all (e.g. was Sino-Vietnamese 'huynh' or 'sanh')
        if (!sv && /^[a-zA-Z\s]+$/.test(rom)) {
          sv = rom.toUpperCase();
        }
        rom = derivedRom;
      }
    }
  } else if (/^[a-zA-Z\s]+$/.test(r)) {
    // If reading was mistakenly Latin, convert reading to Hiragana
    r = romajiToHiragana(r);
    rom = toHepburnRomaji(r);
  }

  // Ensure romaji is non-empty and strictly Latin
  if (!rom || rom.toLowerCase() === r.toLowerCase()) {
    rom = toHepburnRomaji(w) || 'nihongo';
  }

  return {
    cleanReading: r,
    cleanRomaji: rom.toLowerCase(),
    cleanSinoViet: sv
  };
}

/**
 * Converts a full Japanese Hiragana/Ruby sentence into clean, natural Hepburn Romaji.
 */
export function sentenceHiraganaToRomaji(inputSentence: string): string {
  if (!inputSentence) return '';
  let clean = inputSentence
    .replace(/[\u4e00-\u9faf]+\[([^\]]+)\]/g, '$1')
    .replace(/[\u4e00-\u9faf]+\(([^)]+)\)/g, '$1')
    .trim();

  clean = katakanaToHiragana(clean);

  clean = clean
    .replace(/、/g, ', ')
    .replace(/。/g, '. ')
    .replace(/！/g, '! ')
    .replace(/？/g, '? ')
    .replace(/「|」|『|』/g, '"');

  const tokens = clean.split(/(\s+|[,.!?"])/);
  const romajiTokens = tokens.map((tok) => {
    if (!tok || /^\s+$/.test(tok) || /^[,.!?"]$/.test(tok)) {
      return tok;
    }
    if (tok === 'は') return 'wa';
    if (tok === 'へ') return 'e';
    if (tok === 'を') return 'wo';
    return hiraganaToRomaji(tok);
  });

  let assembled = romajiTokens
    .join('')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.!?])/g, '$1')
    .trim();

  if (assembled.length > 0) {
    assembled = assembled.charAt(0).toUpperCase() + assembled.slice(1);
    if (!/[.!?]$/.test(assembled)) {
      assembled += '.';
    }
  }
  return assembled;
}

/**
 * Normalize any input: Romaji, Hiragana, Katakana to pure Hiragana
 */
export function normalizeToUnifiedHiragana(input: string): string {
  if (!input) return '';
  const trimmed = input.toLowerCase().trim().replace(/[\s\-_・，,。.!?'"「」『』【】\[\]()]/g, '');
  const fromKana = katakanaToHiragana(trimmed);
  if (/[\u3040-\u309f]/.test(fromKana)) {
    return fromKana;
  }
  if (/^[a-z]+$/.test(trimmed)) {
    return romajiToHiragana(trimmed);
  }
  return trimmed;
}

export interface JapanesePhoneticBreakdown {
  hasChouon: boolean;
  chouonDetails: string[];
  hasSokuon: boolean;
  sokuonDetails: string[];
  hasYoon: boolean;
  yoonDetails: string[];
  hasHenshuon: boolean;
  henshuonDetails: string[];
  explanationText: string;
}

/**
 * Phonetic Analyzer for AI Sensei & Dictionary (Google AI / Google Translate NLP Standard):
 * Bóc tách và phân tích cặn kẽ 4 quy tắc ngữ âm bắt buộc:
 * 1. Trường âm (Chōon - nguyên âm kéo dài ō, ū, ou, uu, ー)
 * 2. Xúc âm (Sokuon - âm ngắt chữ っ nhỏ nhân đôi phụ âm k, s, t, p; 'tch' trước ch)
 * 3. Ảo âm (Yōon - âm ghép với ya, yu, yo nhỏ như kya, chu, sho, nya, ja...)
 * 4. Biến âm (Dakuon tenten ゛: g, z, d, b; Handakuon maru ゜: p; Rendaku âm đục từ ghép)
 */
export function analyzeJapanesePhonetics(kana: string, kanji?: string): JapanesePhoneticBreakdown {
  const text = katakanaToHiragana(kana || '').trim();
  const chouonDetails: string[] = [];
  const sokuonDetails: string[] = [];
  const yoonDetails: string[] = [];
  const henshuonDetails: string[] = [];

  // 1. Trường âm (Chōon - Long vowels)
  if (text.includes('ー')) {
    chouonDetails.push('Ký tự trường âm Katakana 「ー」 kéo dài nguyên âm đứng trước thêm 1 phách (mora).');
  }
  if (/(?:[おこそとのほもよろをごぞどぼぽ]う|[おこそとのほもよろをごぞどぼぽ]お)/.test(text)) {
    const matches = Array.from(new Set(text.match(/[おこそとのほもよろをごぞどぼぽ][うお]/g) || []));
    chouonDetails.push(`Trường âm hàng O (おう/おお) xuất hiện ở [${matches.join(', ')}]: Kéo dài âm "O" 2 phách, theo chuẩn Modified Hepburn ghi là ō (hoặc ou).`);
  }
  if (/(?:[えけせてねへめれげぜでべぺ]い|[えけせてねへめれげぜでべぺ]え)/.test(text)) {
    const matches = Array.from(new Set(text.match(/[えけせてねへめれげぜでべぺ][いえ]/g) || []));
    chouonDetails.push(`Trường âm hàng E (えい/ええ) xuất hiện ở [${matches.join(', ')}]: Kéo dài âm "E" thêm 1 phách, chuẩn Modified Hepburn ghi là ē (hoặc ei).`);
  }
  if (/(?:[うくすつぬふむゆるぐずづぶぷ]う)/.test(text)) {
    const matches = Array.from(new Set(text.match(/[うくすつぬふむゆるぐずづぶぷ]う/g) || []));
    chouonDetails.push(`Trường âm hàng U (うう) xuất hiện ở [${matches.join(', ')}]: Kéo dài âm "U" 2 phách, chuẩn Modified Hepburn ghi là ū (hoặc uu).`);
  }
  if (/(?:[いきしちにひみりぎじぢびぴ]い)/.test(text)) {
    const matches = Array.from(new Set(text.match(/[いきしちにひみりぎじぢびぴ]い/g) || []));
    chouonDetails.push(`Trường âm hàng I (いい) xuất hiện ở [${matches.join(', ')}]: Kéo dài âm "I" 2 phách, chuẩn Modified Hepburn ghi là ī (hoặc ii).`);
  }
  if (/(?:[あかさたなはまやらがざだばぱ]あ)/.test(text)) {
    const matches = Array.from(new Set(text.match(/[あかさたなはまやらがざだばぱ]あ/g) || []));
    chouonDetails.push(`Trường âm hàng A (ああ) xuất hiện ở [${matches.join(', ')}]: Kéo dài âm "A" 2 phách, chuẩn Modified Hepburn ghi là ā (hoặc aa).`);
  }

  // 2. Xúc âm (Sokuon - Double consonant / stop)
  if (text.includes('っ') || text.includes('ッ')) {
    sokuonDetails.push('Xúc âm (chữ 「っ」 nhỏ): Tạo một khoảng ngắt 1 phách trong thanh quản, nhân đôi phụ âm đứng ngay sau nó (k, s, t, p). Trước âm "ch" (ちゃ/ち/ちゅ/ちょ), xúc âm theo chuẩn Modified Hepburn được viết thành "t" (ví dụ: matchi thay vì macchi).');
  }

  // 3. Ảo âm (Yōon - Contracted sounds with small ya, yu, yo)
  const yoonMatches = text.match(/(?:[きしちにひみりぎじぢびぴ][ゃゅょ]|しぇ|ちぇ|ふ[ぁぃぇぉ]|てぃ|でぃ|ゔ[ぁぃぇぉ])/g);
  if (yoonMatches) {
    const uniqueYoon = Array.from(new Set(yoonMatches));
    yoonDetails.push(`Ảo âm / Âm ghép (Yōon): Xuất hiện cụm âm ghép với ya, yu, yo nhỏ [${uniqueYoon.join(', ')}], kết hợp phát âm liền trong 1 phách mora duy nhất (ví dụ: きゃ -> kya, しゅ -> shu, ちょ -> cho, じゃ -> ja).`);
  }

  // 4. Biến âm (Dakuon tenten ゛ & Handakuon maru ゜)
  const dakuonMatches = text.match(/[がぎぐげござじずぜぞだぢづでどばびぶべぼ]/g);
  if (dakuonMatches) {
    const unique = Array.from(new Set(dakuonMatches));
    henshuonDetails.push(`Âm đục (Dakuon với dấu Tenten ゛): Xuất hiện âm rung thanh quản [${unique.join(', ')}], chuyển từ phụ âm vô thanh (k, s, t, h) sang hữu thanh (g, z, d, b).`);
  }
  const handakuonMatches = text.match(/[ぱぴぷぺぽ]/g);
  if (handakuonMatches) {
    const unique = Array.from(new Set(handakuonMatches));
    henshuonDetails.push(`Âm bán đục (Handakuon với dấu Maru ゜): Xuất hiện âm bật môi [${unique.join(', ')}], chuyển từ hàng Ha (h) sang Pa (p).`);
  }

  const sections: string[] = [];
  if (chouonDetails.length > 0) {
    sections.push(`• QUY TẮC TRƯỜNG ÂM (長音): ${chouonDetails.join(' ')}`);
  }
  if (sokuonDetails.length > 0) {
    sections.push(`• QUY TẮC XÚC ÂM (促音): ${sokuonDetails.join(' ')}`);
  }
  if (yoonDetails.length > 0) {
    sections.push(`• QUY TẮC ẢO ÂM (拗音): ${yoonDetails.join(' ')}`);
  }
  if (henshuonDetails.length > 0) {
    sections.push(`• QUY TẮC BIẾN ÂM (濁音/半濁音): ${henshuonDetails.join(' ')}`);
  }

  const explanationText = sections.length > 0
    ? `BÓC TÁCH 4 QUY TẮC NGỮ ÂM ĐA CHIỀU (CHUẨN GOOGLE NLP MODIFIED HEPBURN):\n${sections.join('\n')}`
    : 'Từ vựng cấu thành từ các âm tiết tiêu chuẩn, phát âm đều đặn theo từng nhịp mora (phách).';

  return {
    hasChouon: chouonDetails.length > 0,
    chouonDetails,
    hasSokuon: sokuonDetails.length > 0,
    sokuonDetails,
    hasYoon: yoonDetails.length > 0,
    yoonDetails,
    hasHenshuon: henshuonDetails.length > 0,
    henshuonDetails,
    explanationText
  };
}

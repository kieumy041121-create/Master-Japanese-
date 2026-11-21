/**
 * Tiện ích Xuất File, Nhập File & Tải Tài Liệu Từ Vựng Bộ Thủ Hán Tự
 * Hỗ trợ các định dạng:
 * 1. CSV / Excel Unicode UTF-8 (BOM \uFEFF chống lỗi font tiếng Nhật & tiếng Việt)
 * 2. Thẻ ghi nhớ Anki Flashcards (.txt / TSV) nhập trực tiếp vào Anki
 * 3. File chuẩn JSON Data (.json) lưu trữ & đồng bộ
 * 4. Trình đọc & Phân tích File nhập (Import CSV / JSON)
 * 5. Định dạng sao chép văn bản đẹp mắt vào Clipboard
 */

import { RadicalItem, RadicalVocabApplication } from '../data/radicals214Database';

function triggerBrowserDownload(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeCsvCell(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * 1. Xuất file CSV từ vựng của 1 bộ thủ cụ thể (Hỗ trợ Excel hiển thị chuẩn tiếng Nhật & tiếng Việt)
 */
export function downloadRadicalCSV(
  radical: RadicalItem,
  customVocabs: RadicalVocabApplication[] = []
): void {
  const allVocabs = [...radical.relatedVocab, ...customVocabs];
  const header = [
    'STT Bộ',
    'Bộ Thủ',
    'Biến Thể',
    'Tên Hán Việt',
    'Nghĩa Bộ Thủ',
    'Số Nét',
    'Từ Vựng Kanji',
    'Hiragana / Romaji',
    'Âm Hán Việt',
    'Cấp Độ JLPT',
    'Nghĩa Tiếng Việt',
    'Cấu Thành Triết Tự',
    'Mẹo Nhớ Liên Tưởng',
  ];

  const rows = allVocabs.map((v) => [
    radical.stt,
    radical.radical,
    radical.variants ? radical.variants.join('; ') : '',
    radical.name,
    radical.meaning,
    radical.strokeCount,
    v.kanji,
    v.hiragana,
    v.sinoVietnamese,
    v.level,
    v.meaning,
    v.breakdown,
    v.mnemonic,
  ]);

  // Thêm UTF-8 BOM \uFEFF để Excel tự nhận UTF-8 không bị vỡ font
  const csvContent =
    '\uFEFF' +
    [
      header.map(escapeCsvCell).join(','),
      ...rows.map((row) => row.map(escapeCsvCell).join(',')),
    ].join('\r\n');

  const safeName = radical.name.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');
  const filename = `BoThu_${String(radical.stt).padStart(3, '0')}_${safeName}_TuVung.csv`;
  triggerBrowserDownload(filename, csvContent, 'text/csv;charset=utf-8;');
}

/**
 * 2. Xuất file CSV trọn bộ 214 Bộ Thủ & Toàn bộ từ vựng liên quan
 */
export function downloadAllRadicalsCSV(
  radicals: RadicalItem[],
  customVocabsMap: Record<number, RadicalVocabApplication[]> = {}
): void {
  const header = [
    'STT Bộ',
    'Bộ Thủ',
    'Biến Thể',
    'Tên Hán Việt',
    'Nghĩa Bộ Thủ',
    'Số Nét',
    'Mẹo Nhớ Bộ Thủ',
    'Từ Vựng Kanji',
    'Hiragana',
    'Âm Hán Việt',
    'Cấp Độ JLPT',
    'Nghĩa Tiếng Việt',
    'Cấu Thành Triết Tự',
    'Mẹo Nhớ Từ Vựng',
  ];

  const rows: (string | number)[][] = [];

  for (const rad of radicals) {
    const combined = [...rad.relatedVocab, ...(customVocabsMap[rad.stt] || [])];
    if (combined.length === 0) {
      rows.push([
        rad.stt,
        rad.radical,
        rad.variants ? rad.variants.join('; ') : '',
        rad.name,
        rad.meaning,
        rad.strokeCount,
        rad.mnemonic,
        '(Chưa có từ)',
        '',
        '',
        '',
        '',
        '',
        '',
      ]);
    } else {
      for (const v of combined) {
        rows.push([
          rad.stt,
          rad.radical,
          rad.variants ? rad.variants.join('; ') : '',
          rad.name,
          rad.meaning,
          rad.strokeCount,
          rad.mnemonic,
          v.kanji,
          v.hiragana,
          v.sinoVietnamese,
          v.level,
          v.meaning,
          v.breakdown,
          v.mnemonic,
        ]);
      }
    }
  }

  const csvContent =
    '\uFEFF' +
    [
      header.map(escapeCsvCell).join(','),
      ...rows.map((row) => row.map(escapeCsvCell).join(',')),
    ].join('\r\n');

  triggerBrowserDownload(
    'TronBo_214_BoThu_Va_DanhSach_TuVung_JLPT.csv',
    csvContent,
    'text/csv;charset=utf-8;'
  );
}

/**
 * 3. Xuất file Thẻ Anki Flashcards (.txt / TSV) cho 1 bộ thủ cụ thể
 * Cột 1 (Mặt trước): Ký tự từ vựng / Chữ Hán
 * Cột 2 (Mặt sau): Hiragana <br> [Hán Việt] <br> Nghĩa <br> Bộ thủ: ... <br> Triết tự: ... <br> Mẹo nhớ: ...
 * Cột 3 (Thẻ Tag): Tag JLPT & Bộ Thủ
 */
export function downloadRadicalAnkiDeck(
  radical: RadicalItem,
  customVocabs: RadicalVocabApplication[] = []
): void {
  const allVocabs = [...radical.relatedVocab, ...customVocabs];

  const lines = [
    '#separator:tab',
    '#html:true',
    '#tags column:3',
    // Dòng thẻ của chính Bộ Thủ
    `${radical.radical}\t` +
      `<b>Bộ ${radical.name}</b> (${radical.strokeCount} nét)<br>` +
      `<i>Nghĩa:</i> ${radical.meaning}<br>` +
      (radical.variants ? `<i>Biến thể:</i> ${radical.variants.join(', ')}<br>` : '') +
      `<div style="color: #d97706; margin-top: 6px;">💡 Mẹo nhớ: ${radical.mnemonic}</div>\t` +
      `BoThu 214_Radicals BoThu_${radical.stt}`,
  ];

  for (const v of allVocabs) {
    const front = `<div style="font-size: 28px; font-weight: bold;">${v.kanji}</div>`;
    const back =
      `<div style="font-size: 18px; color: #4338ca;"><b>${v.hiragana}</b> <span style="color: #b45309;">[${v.sinoVietnamese}]</span></div>` +
      `<div style="margin: 6px 0; font-size: 16px;"><b>Nghĩa:</b> ${v.meaning}</div>` +
      `<div style="font-size: 13px; color: #0284c7;"><b>Bộ thủ:</b> ${radical.radical} (${radical.name})</div>` +
      `<div style="font-size: 13px; color: #475569;"><b>Cấu thành:</b> ${v.breakdown}</div>` +
      `<div style="font-size: 13px; color: #d97706; margin-top: 4px;">💡 Mẹo: ${v.mnemonic}</div>`;
    const tags = `JLPT_${v.level} BoThu_${radical.stt}`;
    lines.push(`${front}\t${back}\t${tags}`);
  }

  const safeName = radical.name.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');
  const filename = `Anki_BoThu_${String(radical.stt).padStart(3, '0')}_${safeName}.txt`;
  triggerBrowserDownload(filename, lines.join('\n'), 'text/tab-separated-values;charset=utf-8;');
}

/**
 * 4. Xuất file Thẻ Anki Flashcards cho trọn bộ 214 Bộ Thủ & Toàn bộ từ vựng
 */
export function downloadAllRadicalsAnkiDeck(
  radicals: RadicalItem[],
  customVocabsMap: Record<number, RadicalVocabApplication[]> = {}
): void {
  const lines = [
    '#separator:tab',
    '#html:true',
    '#tags column:3',
  ];

  for (const radical of radicals) {
    // Thẻ của chính bộ thủ
    lines.push(
      `${radical.radical}\t` +
        `<b>Bộ ${radical.name}</b> (${radical.strokeCount} nét)<br>` +
        `<i>Nghĩa:</i> ${radical.meaning}<br>` +
        (radical.variants ? `<i>Biến thể:</i> ${radical.variants.join(', ')}<br>` : '') +
        `<div style="color: #d97706; margin-top: 6px;">💡 Mẹo nhớ: ${radical.mnemonic}</div>\t` +
        `BoThu 214_Radicals BoThu_${radical.stt}`
    );

    const combined = [...radical.relatedVocab, ...(customVocabsMap[radical.stt] || [])];
    for (const v of combined) {
      const front = `<div style="font-size: 28px; font-weight: bold;">${v.kanji}</div>`;
      const back =
        `<div style="font-size: 18px; color: #4338ca;"><b>${v.hiragana}</b> <span style="color: #b45309;">[${v.sinoVietnamese}]</span></div>` +
        `<div style="margin: 6px 0; font-size: 16px;"><b>Nghĩa:</b> ${v.meaning}</div>` +
        `<div style="font-size: 13px; color: #0284c7;"><b>Bộ thủ:</b> ${radical.radical} (${radical.name})</div>` +
        `<div style="font-size: 13px; color: #475569;"><b>Cấu thành:</b> ${v.breakdown}</div>` +
        `<div style="font-size: 13px; color: #d97706; margin-top: 4px;">💡 Mẹo: ${v.mnemonic}</div>`;
      const tags = `JLPT_${v.level} BoThu_${radical.stt}`;
      lines.push(`${front}\t${back}\t${tags}`);
    }
  }

  triggerBrowserDownload(
    'Anki_TronBo_214_BoThu_Va_TuVung.txt',
    lines.join('\n'),
    'text/tab-separated-values;charset=utf-8;'
  );
}

/**
 * 5. Xuất file JSON của 1 bộ thủ và danh sách từ vựng đi kèm
 */
export function downloadRadicalJSON(
  radical: RadicalItem,
  customVocabs: RadicalVocabApplication[] = []
): void {
  const data = {
    metadata: {
      generatedAt: new Date().toISOString(),
      source: 'Kotoba Infinity 214 Radicals Database',
      radicalStt: radical.stt,
      radicalName: radical.name,
      totalVocabCount: radical.relatedVocab.length + customVocabs.length,
    },
    radical: {
      ...radical,
      customVocabs,
      allVocabs: [...radical.relatedVocab, ...customVocabs],
    },
  };

  const jsonContent = JSON.stringify(data, null, 2);
  const safeName = radical.name.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');
  const filename = `BoThu_${String(radical.stt).padStart(3, '0')}_${safeName}_Data.json`;
  triggerBrowserDownload(filename, jsonContent, 'application/json;charset=utf-8;');
}

/**
 * 6. Xuất file JSON trọn bộ 214 Bộ Thủ & toàn bộ danh sách từ vựng
 */
export function downloadAllRadicalsJSON(
  radicals: RadicalItem[],
  customVocabsMap: Record<number, RadicalVocabApplication[]> = {}
): void {
  const data = {
    metadata: {
      generatedAt: new Date().toISOString(),
      source: 'Kotoba Infinity 214 Radicals Encyclopedia',
      totalRadicals: radicals.length,
      description: 'Dữ liệu chuẩn 214 Bộ Thủ Hán Tự & Danh sách từ vựng JLPT N5-N1 ứng dụng',
    },
    radicals: radicals.map((r) => ({
      ...r,
      customVocabs: customVocabsMap[r.stt] || [],
      allVocabs: [...r.relatedVocab, ...(customVocabsMap[r.stt] || [])],
    })),
  };

  const jsonContent = JSON.stringify(data, null, 2);
  triggerBrowserDownload(
    'TronBo_214_BoThu_Va_TuVung_Data.json',
    jsonContent,
    'application/json;charset=utf-8;'
  );
}

/**
 * 7. Phân tích nội dung file tải lên (Import File: JSON hoặc CSV)
 */
export function parseImportVocabFile(fileContent: string, fileName: string): RadicalVocabApplication[] {
  const isJson = fileName.toLowerCase().endsWith('.json') || fileContent.trim().startsWith('{') || fileContent.trim().startsWith('[');

  if (isJson) {
    try {
      const parsed = JSON.parse(fileContent);
      let list: any[] = [];
      if (Array.isArray(parsed)) {
        list = parsed;
      } else if (parsed.allVocabs && Array.isArray(parsed.allVocabs)) {
        list = parsed.allVocabs;
      } else if (parsed.relatedVocab && Array.isArray(parsed.relatedVocab)) {
        list = parsed.relatedVocab;
      } else if (parsed.customVocabs && Array.isArray(parsed.customVocabs)) {
        list = parsed.customVocabs;
      } else if (parsed.radical?.relatedVocab && Array.isArray(parsed.radical.relatedVocab)) {
        list = parsed.radical.relatedVocab;
      }

      return list
        .filter((item) => item && (item.kanji || item.word))
        .map((item) => ({
          kanji: item.kanji || item.word || '',
          hiragana: item.hiragana || item.reading || '',
          sinoVietnamese: item.sinoVietnamese || item.hanViet || '',
          meaning: item.meaning || item.nghia || '',
          level: (['N5', 'N4', 'N3', 'N2', 'N1'].includes(item.level) ? item.level : 'N5') as any,
          breakdown: item.breakdown || item.chietTu || '',
          mnemonic: item.mnemonic || item.meoNho || '',
        }));
    } catch (err) {
      throw new Error('Định dạng file JSON không hợp lệ. Vui lòng kiểm tra lại cấu trúc file.');
    }
  }

  // Parse CSV
  const cleanContent = fileContent.replace(/^\uFEFF/, '').trim();
  const lines = cleanContent.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1) {
    throw new Error('File CSV không có dữ liệu từ vựng.');
  }

  const results: RadicalVocabApplication[] = [];

  // Bỏ qua dòng tiêu đề nếu có
  const startIdx = lines[0].toLowerCase().includes('kanji') || lines[0].toLowerCase().includes('từ vựng') || lines[0].toLowerCase().includes('bộ') ? 1 : 0;

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    // Split theo dấu phẩy hoặc tab (TSV) có xét tới ngoặc kép
    const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((p) => p.replace(/^"|"$/g, '').trim());

    if (parts.length >= 4) {
      // Trường hợp file CSV xuất từ hệ thống có nhiều cột:
      // index 6: kanji, 7: hiragana, 8: sinoVietnamese, 9: level, 10: meaning, 11: breakdown, 12: mnemonic
      if (parts.length >= 12 && parts[6]) {
        results.push({
          kanji: parts[6] || '',
          hiragana: parts[7] || '',
          sinoVietnamese: parts[8] || '',
          level: (['N5', 'N4', 'N3', 'N2', 'N1'].includes(parts[9]) ? parts[9] : 'N5') as any,
          meaning: parts[10] || '',
          breakdown: parts[11] || '',
          mnemonic: parts[12] || '',
        });
      } else {
        // Trường hợp file CSV giản lược: Kanji, Hiragana, Hán Việt, Nghĩa, Level, Breakdown, Mnemonic
        results.push({
          kanji: parts[0] || '',
          hiragana: parts[1] || '',
          sinoVietnamese: parts[2] || '',
          meaning: parts[3] || '',
          level: (parts[4] && ['N5', 'N4', 'N3', 'N2', 'N1'].includes(parts[4]) ? parts[4] : 'N5') as any,
          breakdown: parts[5] || '',
          mnemonic: parts[6] || '',
        });
      }
    }
  }

  if (results.length === 0) {
    throw new Error('Không trích xuất được từ vựng nào từ file CSV. Vui lòng kiểm tra các cột.');
  }

  return results;
}

/**
 * 8. Định dạng danh sách từ vựng dạng văn bản sạch đẹp để sao chép vào Clipboard
 */
export function formatVocabForClipboard(
  radical: RadicalItem,
  vocabs: RadicalVocabApplication[]
): string {
  const lines: string[] = [
    `═══════════════════════════════════════════════════════════`,
    `📖 BỘ THỦ #${String(radical.stt).padStart(3, '0')}:【${radical.radical}】· BỘ ${radical.name.toUpperCase()}`,
    `Số nét: ${radical.strokeCount} nét` + (radical.variants ? ` · Biến thể: ${radical.variants.join(', ')}` : ''),
    `Ý nghĩa cốt lõi: ${radical.meaning}`,
    `Mẹo nhớ tượng hình: ${radical.mnemonic}`,
    `═══════════════════════════════════════════════════════════`,
    `DANH SÁCH TỪ VỰNG LIÊN QUAN (${vocabs.length} TỪ):`,
    `───────────────────────────────────────────────────────────`,
  ];

  vocabs.forEach((v, idx) => {
    lines.push(
      `${idx + 1}. ${v.kanji} (${v.hiragana}) [${v.sinoVietnamese}] - JLPT ${v.level}`,
      `   ➔ Nghĩa: ${v.meaning}`,
      `   ➔ Cấu thành: ${v.breakdown}`,
      `   ➔ Mẹo nhớ: ${v.mnemonic}`,
      `───────────────────────────────────────────────────────────`
    );
  });

  lines.push(`Kotoba Infinity - Nền tảng 214 Bộ Thủ & Luyện thi JLPT Toàn diện`);
  return lines.join('\n');
}

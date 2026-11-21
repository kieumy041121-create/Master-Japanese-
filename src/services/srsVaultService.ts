/**
 * Kotoba Infinity - Omnipresent SRS Vault & Personal Encyclopedia Service
 * Implements SuperMemo SM-2 Algorithm, Ebbinghaus Forgetting Curve Schedule,
 * 1-Touch Universal Bookmarking, Anki .tsv/.apkg export, and 1-Page Cheat-Sheet generation.
 */

export interface SrsCardItem {
  id: string;
  japanese: string;
  reading: string;
  vietnamese: string;
  type: 'vocab' | 'kanji' | 'phrase' | 'news' | 'email' | 'grammar' | 'idiom';
  level: 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | 'General';
  contextSentence: string;
  contextTranslation: string;
  source: string;
  tags: string[];
  repetition: number;
  interval: number; // in days
  easeFactor: number; // SM-2 default 2.5
  nextReviewDate: number; // timestamp
  lastReviewedAt?: number;
  historyQuality: number[];
  createdAt: number;
}

const STORAGE_KEY = 'kotoba_omnipresent_srs_vault_v1';

// Initial pre-seeded elite master cards across categories
const SEED_SRS_CARDS: SrsCardItem[] = [
  {
    id: 'srs_seed_1',
    japanese: '躊躇',
    reading: 'ちゅうちょ (chūcho)',
    vietnamese: 'Ngập ngừng, do dự, chần chừ không dứt khoát',
    type: 'kanji',
    level: 'N1',
    contextSentence: '改革の断行を少しでも躊躇すれば、市場の信頼を失うことになる。',
    contextTranslation: 'Nếu do dự dù chỉ một chút trong việc quyết đoán cải cách, chúng ta sẽ đánh mất niềm tin của thị trường.',
    source: 'Báo chí Nikkei & Hán tự N1',
    tags: ['N1', 'Kanji', 'Nikkei', 'Tư duy quyết đoán'],
    repetition: 1,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: Date.now() - 3600000, // Due today
    historyQuality: [4],
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'srs_seed_2',
    japanese: '忖度',
    reading: 'そんたく (sontaku)',
    vietnamese: 'Phỏng đoán ý tứ cấp trên để hành xử vừa lòng (Văn hóa tâm lý ngầm Nhật Bản)',
    type: 'phrase',
    level: 'N1',
    contextSentence: '官僚たちが上層部の意向を忖度して動いた結果、大きな社会問題へと発展した。',
    contextTranslation: 'Hệ quả từ việc các quan chức ngầm đoán ý tứ cấp trên đã thổi bùng lên một vấn đề xã hội nghiêm trọng.',
    source: 'Văn hóa & Xã luận Mainichi',
    tags: ['N1', 'Tâm lý học', 'Chính trị', 'Báo chí'],
    repetition: 0,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: Date.now() - 7200000, // Due today
    historyQuality: [],
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'srs_seed_3',
    japanese: '頭を抱える',
    reading: 'あたまをかかえる (atama o kakaeru)',
    vietnamese: 'Ôm đầu bế tắc, đau đầu tìm phương án giải quyết',
    type: 'idiom',
    level: 'N2',
    contextSentence: '円安による原材料の高騰に、多くの中小企業経営者が頭を抱えている。',
    contextTranslation: 'Đồng Yên mất giá đẩy giá nguyên vật liệu tăng vọt khiến nhiều chủ doanh nghiệp vừa và nhỏ phải ôm đầu bế tắc.',
    source: 'Quán dụng ngữ & Thời sự Asahi',
    tags: ['N2', 'Kotowaza', 'Kinh tế', 'Collocation'],
    repetition: 2,
    interval: 6,
    easeFactor: 2.6,
    nextReviewDate: Date.now() + 86400000 * 2,
    historyQuality: [4, 5],
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'srs_seed_4',
    japanese: '〜を皮切りに',
    reading: '〜をかわきりに (o kawakiri ni)',
    vietnamese: 'Khởi đầu với..., mở màn bằng... (sau đó hàng loạt sự việc tương tự nối tiếp)',
    type: 'grammar',
    level: 'N1',
    contextSentence: '東京公演を皮切りに、全国１０都市を巡るドームツアーが幕を開けた。',
    contextTranslation: 'Mở màn với đêm diễn tại Tokyo, chuyến lưu diễn mái vòm qua 10 thành phố lớn toàn quốc đã chính thức khai màn.',
    source: 'Giải mã Ngữ pháp Kakikotoba JLPT N1',
    tags: ['N1', 'Ngữ pháp', 'Kakikotoba', 'Báo chí'],
    repetition: 0,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: Date.now() - 10000, // Due now
    historyQuality: [],
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'srs_seed_5',
    japanese: '大変恐縮ではございますが',
    reading: 'たいへんきょうしゅくではございますが',
    vietnamese: 'Muôn phần áy náy / Rất lấy làm tiếc và ngại ngùng khi phải làm phiền quý khách...',
    type: 'email',
    level: 'N2',
    contextSentence: '大変恐縮ではございますが、本件について今週中にお返事を頂戴できれば幸いに存じます。',
    contextTranslation: 'Dù vô cùng áy náy khi làm phiền, chúng tôi rất lấy làm vinh hạnh nếu có thể nhận được hồi âm của quý ngài trong tuần này.',
    source: 'Kho Keigo & Thư tín Thương mại B2B',
    tags: ['B2B', 'Keigo', 'Đệm lời', 'Kushon Kotoba'],
    repetition: 1,
    interval: 3,
    easeFactor: 2.5,
    nextReviewDate: Date.now() + 86400000,
    historyQuality: [4],
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'srs_seed_6',
    japanese: '臥薪嘗胆',
    reading: 'がしんしょうたん (gashin shōtan)',
    vietnamese: 'Nằm gai nếm mật, kiên trì nhẫn nhục chịu đựng gian khổ để chờ ngày phục hận phục thù',
    type: 'idiom',
    level: 'N1',
    contextSentence: '前回の屈辱的な敗北以来、チームは臥薪嘗胆の思いで過酷な特訓を重ねてきた。',
    contextTranslation: 'Kể từ thất bại cay đắng lần trước, toàn đội đã nằm gai nếm mật, kiên trì luyện tập khổ hạnh để chuẩn bị cho ngày trở lại.',
    source: 'Bách khoa Yojijukugo & Điển tích Koji',
    tags: ['N1', 'Yojijukugo', 'Điển tích', 'Đời sống'],
    repetition: 3,
    interval: 14,
    easeFactor: 2.7,
    nextReviewDate: Date.now() + 86400000 * 10,
    historyQuality: [5, 5, 5],
    createdAt: Date.now() - 86400000 * 15,
  }
];

class SrsVaultService {
  private items: SrsCardItem[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') {
      this.items = [...SEED_SRS_CARDS];
      return;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.items = parsed;
          return;
        }
      }
      this.items = [...SEED_SRS_CARDS];
      this.saveToStorage();
    } catch {
      this.items = [...SEED_SRS_CARDS];
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      // Dispatch custom event for cross-component reactive UI updates
      window.dispatchEvent(new CustomEvent('kotoba_srs_updated', { detail: { count: this.items.length } }));
    } catch {
      // Storage quota or disabled
    }
  }

  public getAll(): SrsCardItem[] {
    return [...this.items];
  }

  public getDueCards(): SrsCardItem[] {
    const now = Date.now();
    return this.items.filter((item) => item.nextReviewDate <= now);
  }

  public getUpcomingCards(): SrsCardItem[] {
    const now = Date.now();
    return this.items.filter((item) => item.nextReviewDate > now);
  }

  public isBookmarked(japanese: string): boolean {
    return this.items.some((it) => it.japanese.trim() === japanese.trim());
  }

  public toggleBookmark(cardData: Partial<SrsCardItem> & { japanese: string; vietnamese: string }): boolean {
    const existingIndex = this.items.findIndex(
      (it) => it.japanese.trim() === cardData.japanese.trim()
    );

    if (existingIndex >= 0) {
      // Remove
      this.items.splice(existingIndex, 1);
      this.saveToStorage();
      return false; // Not bookmarked now
    } else {
      // Add
      const newItem: SrsCardItem = {
        id: cardData.id || `srs_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        japanese: cardData.japanese.trim(),
        reading: cardData.reading || '',
        vietnamese: cardData.vietnamese.trim(),
        type: cardData.type || 'vocab',
        level: cardData.level || 'N2',
        contextSentence: cardData.contextSentence || cardData.japanese,
        contextTranslation: cardData.contextTranslation || cardData.vietnamese,
        source: cardData.source || 'Sổ tay cá nhân hóa Kotoba',
        tags: cardData.tags && cardData.tags.length > 0 ? cardData.tags : ['SRS Vault', cardData.level || 'N2'],
        repetition: 0,
        interval: 1,
        easeFactor: 2.5,
        nextReviewDate: Date.now(), // Due immediately
        historyQuality: [],
        createdAt: Date.now(),
      };
      this.items.unshift(newItem);
      this.saveToStorage();
      return true; // Bookmarked now
    }
  }

  public addBookmark(cardData: Partial<SrsCardItem> & { japanese: string; vietnamese: string }): SrsCardItem {
    const existing = this.items.find((it) => it.japanese.trim() === cardData.japanese.trim());
    if (existing) {
      return existing;
    }
    const newItem: SrsCardItem = {
      id: cardData.id || `srs_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      japanese: cardData.japanese.trim(),
      reading: cardData.reading || '',
      vietnamese: cardData.vietnamese.trim(),
      type: cardData.type || 'vocab',
      level: cardData.level || 'N2',
      contextSentence: cardData.contextSentence || cardData.japanese,
      contextTranslation: cardData.contextTranslation || cardData.vietnamese,
      source: cardData.source || 'Sổ tay cá nhân hóa Kotoba',
      tags: cardData.tags && cardData.tags.length > 0 ? cardData.tags : ['SRS Vault', cardData.level || 'N2'],
      repetition: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: Date.now(),
      historyQuality: [],
      createdAt: Date.now(),
    };
    this.items.unshift(newItem);
    this.saveToStorage();
    return newItem;
  }

  public removeCard(id: string) {
    this.items = this.items.filter((it) => it.id !== id);
    this.saveToStorage();
  }

  public getHealingPacingStatus(): {
    active: boolean;
    until: number;
    deferredCount: number;
    previousDueCount: number;
    newDueCount: number;
  } {
    const empty = {
      active: false,
      until: 0,
      deferredCount: 0,
      previousDueCount: this.getDueCards().length,
      newDueCount: this.getDueCards().length,
    };
    if (typeof window === 'undefined') return empty;
    try {
      const raw = localStorage.getItem('kotoba_fsrs_healing_pacing_v1');
      if (!raw) return empty;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.until === 'number' && parsed.until > Date.now()) {
        return {
          active: true,
          until: parsed.until,
          deferredCount: Number(parsed.deferredCount) || 0,
          previousDueCount: Number(parsed.previousDueCount) || this.getDueCards().length,
          newDueCount: this.getDueCards().length,
        };
      }
    } catch {
      // ignore
    }
    return empty;
  }

  /**
   * AI Healing Prescription: reduces FSRS due pressure for the next 3 days
   * by keeping at most `maxDueKeep` gentle cards active today and smoothly
   * rescheduling excess due cards to days +4..+7 (with backup for 1-click undo).
   */
  public applyGentleHealingPacing(maxDueKeep = 2): {
    applied: boolean;
    previousDueCount: number;
    newDueCount: number;
    deferredCount: number;
    until: number;
  } {
    const now = Date.now();
    const due = this.getDueCards();
    const previousDueCount = due.length;

    if (typeof window !== 'undefined') {
      const existing = this.getHealingPacingStatus();
      if (existing.active) {
        return {
          applied: false,
          previousDueCount: existing.previousDueCount,
          newDueCount: due.length,
          deferredCount: existing.deferredCount,
          until: existing.until,
        };
      }
    }

    const until = now + 3 * 24 * 60 * 60 * 1000;
    if (previousDueCount <= maxDueKeep) {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            'kotoba_fsrs_healing_pacing_v1',
            JSON.stringify({
              until,
              deferredCount: 0,
              previousDueCount,
              backups: [],
            })
          );
        } catch {
          // ignore
        }
      }
      return {
        applied: true,
        previousDueCount,
        newDueCount: previousDueCount,
        deferredCount: 0,
        until,
      };
    }

    const toDefer = due.slice(maxDueKeep);
    const backups: Array<{ id: string; nextReviewDate: number }> = [];

    toDefer.forEach((card, idx) => {
      backups.push({ id: card.id, nextReviewDate: card.nextReviewDate });
      const deferDays = 4 + (idx % 4); // spread across days +4..+7
      card.nextReviewDate = now + deferDays * 24 * 60 * 60 * 1000;
    });

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'kotoba_fsrs_healing_pacing_v1',
          JSON.stringify({
            until,
            deferredCount: toDefer.length,
            previousDueCount,
            backups,
          })
        );
      } catch {
        // ignore
      }
    }

    this.saveToStorage();
    return {
      applied: true,
      previousDueCount,
      newDueCount: this.getDueCards().length,
      deferredCount: toDefer.length,
      until,
    };
  }

  public restoreFromHealingPacing(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const raw = localStorage.getItem('kotoba_fsrs_healing_pacing_v1');
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      const backups: Array<{ id: string; nextReviewDate: number }> = Array.isArray(parsed?.backups)
        ? parsed.backups
        : [];
      for (const b of backups) {
        const card = this.items.find((it) => it.id === b.id);
        if (card && typeof b.nextReviewDate === 'number') {
          card.nextReviewDate = b.nextReviewDate;
        }
      }
      localStorage.removeItem('kotoba_fsrs_healing_pacing_v1');
      this.saveToStorage();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * SuperMemo SM-2 Algorithm update
   * @param id Card ID
   * @param quality Rating 0 to 5:
   * 0: Blackout, 1: Wrong, 2: Hard, 3: Pass with effort, 4: Good, 5: Perfect ease
   */
  public reviewCard(id: string, quality: number): SrsCardItem | null {
    const card = this.items.find((it) => it.id === id);
    if (!card) return null;

    const clampedQuality = Math.max(0, Math.min(5, Math.round(quality)));
    card.historyQuality.push(clampedQuality);
    card.lastReviewedAt = Date.now();

    if (clampedQuality < 3) {
      // Repeat next day or restart cycle
      card.repetition = 0;
      card.interval = 1;
    } else {
      // Calculate interval
      if (card.repetition === 0) {
        card.interval = 1;
      } else if (card.repetition === 1) {
        card.interval = 6;
      } else {
        card.interval = Math.round(card.interval * card.easeFactor);
      }
      card.repetition += 1;

      // Update EF
      const newEf =
        card.easeFactor +
        (0.1 - (5 - clampedQuality) * (0.08 + (5 - clampedQuality) * 0.02));
      card.easeFactor = Math.max(1.3, Number(newEf.toFixed(2)));
    }

    // Schedule next review date (in ms)
    card.nextReviewDate = Date.now() + card.interval * 24 * 60 * 60 * 1000;

    this.saveToStorage();
    return card;
  }

  /**
   * 1-Click Export to Anki Deck (.tsv / .txt format compatible with Anki Desktop and AnkiMobile)
   */
  public exportToAnkiTsv(): string {
    const header = [
      '#separator:tab',
      '#html:true',
      '#tags column:5',
      '#deck:Kotoba_Infinity_Mastery_SRS',
      'Front\tBack\tContext\tMeaning\tTags',
    ].join('\n');

    const rows = this.items.map((card) => {
      const front = `<div style="font-size:28px;font-weight:bold;color:#1e293b;">${card.japanese}</div><div style="font-size:16px;color:#6366f1;">${card.reading}</div>`;
      const back = `<div style="font-size:20px;font-weight:600;color:#0f172a;">${card.vietnamese}</div><div style="margin-top:8px;font-size:14px;color:#64748b;">[${card.level}] · ${card.type}</div>`;
      const context = `<div style="font-style:italic;color:#334155;">「${card.contextSentence}」</div><div style="font-size:13px;color:#059669;">👉 ${card.contextTranslation}</div>`;
      const meaning = card.vietnamese.replace(/\t/g, ' ');
      const tags = [...card.tags, card.level, card.type].join(' ');

      return `${front}\t${back}\t${context}\t${meaning}\t${tags}`;
    });

    return `${header}\n${rows.join('\n')}`;
  }

  /**
   * Generates a printable, dense 1-Page Exam Cheat Sheet (Bí Kíp 1 Trang PDF)
   */
  public generateCheatSheetHtml(): string {
    const list = this.items.slice(0, 80); // top 80 essential cards
    const rows = list
      .map(
        (c, idx) => `
      <tr class="item-row">
        <td class="idx">${idx + 1}</td>
        <td class="kanji-col">
          <strong>${c.japanese}</strong>
          <span class="reading">(${c.reading})</span>
        </td>
        <td class="level-col"><span class="badge ${c.level.toLowerCase()}">${c.level}</span></td>
        <td class="meaning-col">${c.vietnamese}</td>
        <td class="context-col">
          <em>${c.contextSentence}</em>
        </td>
      </tr>
    `
      )
      .join('');

    return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bí Kíp 1 Trang Kotoba Infinity - Tinh Hoa JLPT & Thực Chiến</title>
  <style>
    @page { size: A4 portrait; margin: 8mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans JP", sans-serif; font-size: 10px; color: #1e293b; margin: 0; padding: 10px; background: #fff; }
    .header { text-align: center; border-bottom: 2px solid #312e81; padding-bottom: 8px; margin-bottom: 8px; }
    .header h1 { margin: 0; font-size: 16px; color: #312e81; text-transform: uppercase; letter-spacing: 1px; }
    .header p { margin: 2px 0 0 0; font-size: 9px; color: #64748b; }
    table { width: 100%; border-collapse: collapse; font-size: 9.5px; }
    th { background: #312e81; color: #fff; font-weight: bold; text-align: left; padding: 4px 6px; border: 1px solid #312e81; }
    td { padding: 3px 5px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
    .idx { width: 20px; text-align: center; color: #94a3b8; font-weight: bold; }
    .kanji-col { width: 22%; font-size: 11px; }
    .reading { font-size: 9px; color: #4338ca; display: block; }
    .level-col { width: 35px; text-align: center; }
    .badge { display: inline-block; padding: 1px 4px; border-radius: 3px; font-weight: bold; font-size: 8px; color: #fff; background: #4f46e5; }
    .badge.n1 { background: #e11d48; }
    .badge.n2 { background: #d97706; }
    .badge.n3 { background: #7c3aed; }
    .meaning-col { width: 32%; color: #0f172a; font-weight: 500; }
    .context-col { width: 36%; color: #475569; font-size: 8.5px; }
    tr:nth-child(even) { background: #f8fafc; }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>KOTOBA INFINITY · BÍ KÍP TRỌNG TÂM TRƯỚC GIỜ THI (SRS VAULT)</h1>
    <p>Tổng hợp các từ vựng, Hán tự, ngữ pháp & câu TPO ghim chặt vào trí nhớ dài hạn · Ngày in: ${new Date().toLocaleDateString('vi-VN')}</p>
  </div>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Chữ Hán / Mục từ</th>
        <th>Cấp</th>
        <th>Ý nghĩa tiếng Việt</th>
        <th>Câu văn thực tế trong bối cảnh</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <script>
    window.onload = function() { window.print(); }
  </script>
</body>
</html>
`;
  }
}

export const srsVaultService = new SrsVaultService();

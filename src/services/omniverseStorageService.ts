/**
 * Kotoba Infinity — Omniverse Sanctuaries IndexedDB Persistence & Zero-Duplication Hash Registry
 * Supports full local-first storage across all 5 sanctuaries + 1-click `.mainichi.json` Export/Import.
 */

export type OmniverseDomain =
  | 'kissaten_persona'
  | 'kissaten_aizuchi'
  | 'bunko_work'
  | 'bunko_metaphor'
  | 'vinyl_track'
  | 'vinyl_colloquial'
  | 'post_jiko'
  | 'post_scenario'
  | 'conservatory_word';

export interface RubyToken {
  text: string;
  reading?: string; // hiragana furigana when text contains kanji
}

export interface KissatenPersona {
  id: string;
  name: string;
  japaneseName: string;
  role: string;
  region: string;
  speechRegister: 'Teineigo trầm ấm' | 'Tameguchi thân thiện' | 'Kansai-ben nhẹ' | 'Cổ điển lịch thiệp' | 'Đời thường Tokyo';
  favoriteDrink: string;
  avatarKanji: string;
  accentColor: string;
  bio: string;
  openingGreeting: string;
  openingTokens?: RubyToken[];
  openingReading: string;
  openingVietnamese: string;
  systemPersonaPrompt: string;
  isCustom?: boolean;
  createdAt: number;
}

export interface KissatenMessage {
  id: string;
  sender: 'user' | 'persona';
  japanese: string;
  tokens?: RubyToken[];
  reading?: string;
  vietnamese?: string;
  uchiSotoNote?: string; // Subtle nuance note when persona reacts to distance/keigo
  status?: 'sent' | 'failed';
  errorReason?: string;
  timestamp: number;
}

export interface PragmaticReceiptItem {
  userPhrase: string;
  pragmaticNote: string;
  nativeUpgrade: string;
  nativeReading: string;
  omoiyariMeaning: string;
}

export interface KissatenReceipt {
  id: string;
  personaName: string;
  dateIso: string;
  atmosphereSummary: string;
  warmthScoreLabel: string; // Qualitative label, never harsh grade
  items: PragmaticReceiptItem[];
}

export interface SyntaxSegment {
  text: string;
  reading?: string;
  role: 'subject' | 'predicate' | 'modifier' | 'object' | 'particle' | 'conjunction' | 'other';
  labelVi: string;
  explanationVi: string;
}

export interface BunkoSentence {
  id: string;
  japanese: string;
  tokens: RubyToken[];
  vietnamese: string;
  syntaxSegments: SyntaxSegment[];
  structureSummaryVi: string;
}

export interface BunkoMetaphorNote {
  term: string;
  reading: string;
  category: 'Mỹ học Nhật Bản' | 'Từ tượng thanh / tượng hình' | 'Ẩn dụ văn học';
  aestheticTag: string; // e.g., Mono no aware, Wabi-sabi, Yūgen, Gitaigo
  explanationVi: string;
  exampleInText: string;
}

export type BunkoLevel = 'N4' | 'N3' | 'N2' | 'N1';

export interface BunkoWork {
  id: string;
  titleJp: string;
  titleReading: string;
  titleVi: string;
  authorJp: string;
  authorVi: string;
  eraTag: string;
  genre: 'Zuihitsu (Tùy bút)' | 'Short-short (Truyện cực ngắn)' | 'Kinh điển cận đại' | 'Cổ văn trích đoạn';
  moodDescription: string;
  levels: Record<BunkoLevel, BunkoSentence[]>;
  metaphors: BunkoMetaphorNote[];
  createdAt: number;
}

export interface MoraCell {
  kana: string;
  type: 'normal' | 'long' | 'sokuon' | 'nasal';
}

export interface DualPitchWord {
  word: string;
  reading: string;
  meaningVi: string;
  pitchPatternLabel: string; // e.g. 平板型 (0), 頭高型 (1), 中高型 (2), 尾高型 (3)
  morae: MoraCell[];
  sungPitch: number[]; // 0 = low, 1 = mid, 2 = high (melody contour)
  tokyoPitch: number[]; // 0 = low, 1 = high (NHK standard)
  contrastNoteVi: string;
}

export interface LyricDecompileRow {
  id: string;
  originalLyric: string;
  reading: string;
  spokenColloquial: string;
  textbookGrammar: string;
  phenomenonTag: string; // e.g. 縮約形 (Shukuyakukei), 倒置法 (Đảo ngữ), Lược trợ từ
  nuanceVi: string;
  colloquialApplications?: Array<{
    japanese: string;
    reading: string;
    vietnamese: string;
    context: string;
  }>;
}

export interface VinylTrack {
  id: string;
  titleJp: string;
  titleVi: string;
  artistOrPoet: string;
  kind: 'City Pop' | 'J-Pop Ballad' | 'Anime OST' | 'Thơ Tanka (5-7-5-7-7)';
  mood: 'Đêm mưa Tokyo' | 'Hoài niệm Showa' | 'Tĩnh lặng chiều thu' | 'Hy vọng sớm mai';
  vinylColor: string;
  bpmLabel: string;
  rows: LyricDecompileRow[];
  pitchWords: DualPitchWord[];
  createdAt: number;
}

export interface KeigoPivot {
  tameguchi: string;
  teineigo: string;
  keigo: string;
  keigoType: 'Sonkeigo (Tôn kính ngữ)' | 'Kenjōgo (Khiêm nhường ngữ)' | 'Teineigo (Lịch sự ngữ)';
  explanationVi: string;
}

export interface LetterPrismResult {
  tameguchi: string;
  teineigo: string;
  keigo: string;
  pivots: KeigoPivot[];
}

export interface SealedTimeLetter {
  id: string;
  title: string;
  recipientLabel: string;
  stationeryId: string;
  stampKanji: string;
  stampLabel: string;
  sekkiName: string;
  jikoGreeting: string;
  originalDraft: string;
  prism: LetterPrismResult;
  activeTier: 'tameguchi' | 'teineigo' | 'keigo';
  createdAt: number;
  unlockAt: number; // timestamp
  isOpenedEarly?: boolean;
}

export interface ConservatoryExhibit {
  id: string;
  wordJp: string;
  reading: string;
  romaji: string;
  hanViet?: string;
  meaningVi: string;
  seasonTag: string;
  pitchLabel: string;
  pitchContour: number[]; // 0 or 1 per mora
  morae: string[];
  etymologyLayerVi: string;
  kanjiStructureNote: string;
  collocations: Array<{ jp: string; reading: string; vi: string }>;
  literaryUsage: { jp: string; reading: string; vi: string };
  conversationUsage: { jp: string; reading: string; vi: string };
  relatedKotowaza: { jp: string; reading: string; vi: string; nuance: string };
  microExercise: {
    promptVi: string;
    choices: Array<{ labelJp: string; reading: string; isIdeal: boolean; gentleNoteVi: string }>;
  };
  goshuinKanji: string;
  goshuinMottoJp: string;
}

export interface GoshuinStamp {
  id: string;
  exhibitId: string;
  wordJp: string;
  reading: string;
  meaningVi: string;
  goshuinKanji: string;
  goshuinMottoJp: string;
  microSeasonJp: string;
  microSeasonVi: string;
  stampedAt: number;
}

export interface OmniverseProfileState {
  version: 1;
  exportedAt?: number;
  seenHashes: Record<OmniverseDomain, string[]>;
  kissatenPersonas: KissatenPersona[];
  kissatenChats: Record<string, KissatenMessage[]>;
  kissatenReceipts: KissatenReceipt[];
  bunkoWorks: BunkoWork[];
  vinylTracks: VinylTrack[];
  sealedLetters: SealedTimeLetter[];
  goshuinStamps: GoshuinStamp[];
  conservatoryExhibits: ConservatoryExhibit[];
}

const DB_NAME = 'kotoba_sanctuaries_omniverse_v1';
const DB_VERSION = 1;
const STORE_NAME = 'omniverse_state';
const STATE_KEY = 'singleton_profile';
const LS_FALLBACK_KEY = 'kotoba_omniverse_fallback_v1';

export function createEmptySeenHashes(): Record<OmniverseDomain, string[]> {
  return {
    kissaten_persona: [],
    kissaten_aizuchi: [],
    bunko_work: [],
    bunko_metaphor: [],
    vinyl_track: [],
    vinyl_colloquial: [],
    post_jiko: [],
    post_scenario: [],
    conservatory_word: [],
  };
}

/**
 * Deterministic canonical fingerprint for zero-duplication `[+3]` checking.
 */
export function computeContentHash(raw: string): string {
  const normalized = (raw || '')
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[\s・·「」『』()（）\-_.,!?、。]/g, '')
    .trim();
  let hash = 2166136261;
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `${normalized.slice(0, 24)}_${(hash >>> 0).toString(36)}`;
}

class OmniverseStorageService {
  private memoryState: OmniverseProfileState | null = null;

  private isIndexedDbAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';
  }

  private openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('IndexedDB open error'));
    });
  }

  public createDefaultState(): OmniverseProfileState {
    return {
      version: 1,
      seenHashes: createEmptySeenHashes(),
      kissatenPersonas: [],
      kissatenChats: {},
      kissatenReceipts: [],
      bunkoWorks: [],
      vinylTracks: [],
      sealedLetters: [],
      goshuinStamps: [],
      conservatoryExhibits: [],
    };
  }

  public async loadState(): Promise<OmniverseProfileState> {
    if (this.memoryState) {
      return this.memoryState;
    }

    if (this.isIndexedDbAvailable()) {
      try {
        const db = await this.openDb();
        const stored = await new Promise<OmniverseProfileState | undefined>((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const req = store.get(STATE_KEY);
          req.onsuccess = () => resolve(req.result as OmniverseProfileState | undefined);
          req.onerror = () => reject(req.error);
        });
        db.close();
        if (stored && stored.version === 1) {
          this.memoryState = this.normalizeState(stored);
          return this.memoryState;
        }
      } catch {
        // Fall through to localStorage fallback
      }
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(LS_FALLBACK_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as OmniverseProfileState;
          this.memoryState = this.normalizeState(parsed);
          return this.memoryState;
        }
      } catch {
        // Ignore parse issues
      }
    }

    this.memoryState = this.createDefaultState();
    return this.memoryState;
  }

  private normalizeState(input: Partial<OmniverseProfileState>): OmniverseProfileState {
    const base = this.createDefaultState();
    return {
      version: 1,
      seenHashes: { ...base.seenHashes, ...(input.seenHashes || {}) },
      kissatenPersonas: Array.isArray(input.kissatenPersonas) ? input.kissatenPersonas : [],
      kissatenChats: input.kissatenChats && typeof input.kissatenChats === 'object' ? input.kissatenChats : {},
      kissatenReceipts: Array.isArray(input.kissatenReceipts) ? input.kissatenReceipts : [],
      bunkoWorks: Array.isArray(input.bunkoWorks) ? input.bunkoWorks : [],
      vinylTracks: Array.isArray(input.vinylTracks) ? input.vinylTracks : [],
      sealedLetters: Array.isArray(input.sealedLetters) ? input.sealedLetters : [],
      goshuinStamps: Array.isArray(input.goshuinStamps) ? input.goshuinStamps : [],
      conservatoryExhibits: Array.isArray(input.conservatoryExhibits) ? input.conservatoryExhibits : [],
    };
  }

  public async saveState(state: OmniverseProfileState): Promise<void> {
    this.memoryState = this.normalizeState(state);

    if (this.isIndexedDbAvailable()) {
      try {
        const db = await this.openDb();
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const req = store.put(this.memoryState, STATE_KEY);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
        db.close();
      } catch {
        // Fallback below
      }
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(this.memoryState));
      } catch {
        // Quota exceeded safe ignore when IndexedDB already succeeded
      }
    }
  }

  /**
   * Checks if any candidate items are already in the seen hash registry and returns only strictly new items,
   * while registering their hashes persistently.
   */
  public async filterAndRegisterUnique<T>(
    domain: OmniverseDomain,
    candidates: T[],
    keyExtractor: (item: T) => string
  ): Promise<T[]> {
    const state = await this.loadState();
    const existingSet = new Set(state.seenHashes[domain] || []);
    const accepted: T[] = [];

    for (const item of candidates) {
      const h = computeContentHash(keyExtractor(item));
      if (!existingSet.has(h)) {
        existingSet.add(h);
        accepted.push(item);
      }
    }

    state.seenHashes[domain] = Array.from(existingSet);
    await this.saveState(state);
    return accepted;
  }

  public async registerSeedHashes(domain: OmniverseDomain, keys: string[]): Promise<void> {
    const state = await this.loadState();
    const existingSet = new Set(state.seenHashes[domain] || []);
    let changed = false;
    for (const key of keys) {
      const h = computeContentHash(key);
      if (!existingSet.has(h)) {
        existingSet.add(h);
        changed = true;
      }
    }
    if (changed) {
      state.seenHashes[domain] = Array.from(existingSet);
      await this.saveState(state);
    }
  }

  public async exportMainichiBundle(): Promise<string> {
    const state = await this.loadState();
    const payload: OmniverseProfileState = {
      ...state,
      version: 1,
      exportedAt: Date.now(),
    };
    return JSON.stringify(payload, null, 2);
  }

  public async importMainichiBundle(jsonText: string): Promise<{
    ok: boolean;
    message: string;
    state?: OmniverseProfileState;
  }> {
    try {
      const parsed = JSON.parse(jsonText) as Partial<OmniverseProfileState>;
      if (!parsed || typeof parsed !== 'object' || parsed.version !== 1) {
        return { ok: false, message: 'Tệp .mainichi.json không đúng định dạng phiên bản 1.' };
      }

      const current = await this.loadState();
      const incoming = this.normalizeState(parsed);

      // Deduplicated union merge so existing memories are never lost
      const mergeById = <T extends { id: string }>(a: T[], b: T[]): T[] => {
        const map = new Map<string, T>();
        for (const item of a) map.set(item.id, item);
        for (const item of b) map.set(item.id, item);
        return Array.from(map.values());
      };

      const mergedHashes = createEmptySeenHashes();
      (Object.keys(mergedHashes) as OmniverseDomain[]).forEach((domain) => {
        const set = new Set([...(current.seenHashes[domain] || []), ...(incoming.seenHashes[domain] || [])]);
        mergedHashes[domain] = Array.from(set);
      });

      const mergedChats: Record<string, KissatenMessage[]> = { ...current.kissatenChats };
      for (const [personaId, msgs] of Object.entries(incoming.kissatenChats)) {
        const existingMsgs = mergedChats[personaId] || [];
        mergedChats[personaId] = mergeById(existingMsgs, msgs).sort((x, y) => x.timestamp - y.timestamp);
      }

      const mergedState: OmniverseProfileState = {
        version: 1,
        seenHashes: mergedHashes,
        kissatenPersonas: mergeById(current.kissatenPersonas, incoming.kissatenPersonas),
        kissatenChats: mergedChats,
        kissatenReceipts: mergeById(current.kissatenReceipts, incoming.kissatenReceipts),
        bunkoWorks: mergeById(current.bunkoWorks, incoming.bunkoWorks),
        vinylTracks: mergeById(current.vinylTracks, incoming.vinylTracks),
        sealedLetters: mergeById(current.sealedLetters, incoming.sealedLetters),
        goshuinStamps: mergeById(current.goshuinStamps, incoming.goshuinStamps),
        conservatoryExhibits: mergeById(current.conservatoryExhibits, incoming.conservatoryExhibits),
      };

      await this.saveState(mergedState);
      return {
        ok: true,
        message: `Đã khôi phục hồ sơ thành công (${mergedState.sealedLetters.length} bức thư, ${mergedState.goshuinStamps.length} dấu Goshuin, ${mergedState.kissatenPersonas.length} vị khách).`,
        state: mergedState,
      };
    } catch {
      return { ok: false, message: 'Không thể đọc tệp JSON. Hãy kiểm tra lại tệp .mainichi.json.' };
    }
  }
}

export const omniverseStorageService = new OmniverseStorageService();

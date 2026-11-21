// Centralized History Tracking Service for JLPT Master Platform
// Stores and retrieves recently viewed items per section in localStorage

export interface HistoryItem {
  id: string;
  title: string;
  subtitle?: string;
  level?: string;
  category: 'kanji' | 'vocab' | 'grammar' | 'exam' | 'reading' | 'news' | 'yojijukugo' | 'confusing_grammar' | 'onomatopoeia' | 'speed_dokkai' | 'interview';
  viewedAt: number; // timestamp
  extra?: Record<string, any>;
}

const STORAGE_KEY_PREFIX = 'jlpt_viewed_history_';

export const historyService = {
  getHistory(category: HistoryItem['category']): HistoryItem[] {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${category}`);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  addItem(category: HistoryItem['category'], item: Omit<HistoryItem, 'viewedAt' | 'category'>): HistoryItem[] {
    try {
      const current = this.getHistory(category);
      // Remove duplicates by id
      const filtered = current.filter((h) => h.id !== item.id);
      const newItem: HistoryItem = {
        ...item,
        category,
        viewedAt: Date.now(),
      };
      // Keep up to 50 most recent items
      const updated = [newItem, ...filtered].slice(0, 50);
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${category}`, JSON.stringify(updated));
      // Dispatch custom event for reactive updates in other components
      window.dispatchEvent(new CustomEvent('jlpt_history_updated', { detail: { category } }));
      return updated;
    } catch {
      return [];
    }
  },

  clearHistory(category: HistoryItem['category']) {
    try {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${category}`);
      window.dispatchEvent(new CustomEvent('jlpt_history_updated', { detail: { category } }));
    } catch {
      // Ignore
    }
  },
};

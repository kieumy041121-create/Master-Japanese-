const COMPLETED_DATES_KEY = 'kotoba_daily_completed_dates';
const BOOKMARKS_KEY = 'kotoba_daily_bookmarks';
const NOTES_KEY = 'kotoba_daily_notes';

export interface DailyBookmark {
  id: string; // dateStr_type
  dateStr: string;
  type: 'kanji' | 'grammar' | 'philosophy';
  title: string;
  subtitle: string;
  savedAt: string;
}

export interface DailyNote {
  dateStr: string;
  note: string;
  updatedAt: string;
}

export const dailyRitualStorage = {
  getCompletedDates(): string[] {
    try {
      const data = localStorage.getItem(COMPLETED_DATES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isDateCompleted(dateStr: string): boolean {
    const list = this.getCompletedDates();
    return list.includes(dateStr);
  },

  toggleDateCompleted(dateStr: string): boolean {
    const list = this.getCompletedDates();
    const index = list.indexOf(dateStr);
    let isCompleted = false;

    if (index >= 0) {
      list.splice(index, 1);
      isCompleted = false;
    } else {
      list.push(dateStr);
      isCompleted = true;
    }

    try {
      localStorage.setItem(COMPLETED_DATES_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }

    return isCompleted;
  },

  getBookmarks(): DailyBookmark[] {
    try {
      const data = localStorage.getItem(BOOKMARKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isBookmarked(dateStr: string, type: 'kanji' | 'grammar' | 'philosophy'): boolean {
    const bookmarks = this.getBookmarks();
    return bookmarks.some((b) => b.dateStr === dateStr && b.type === type);
  },

  toggleBookmark(
    dateStr: string,
    type: 'kanji' | 'grammar' | 'philosophy',
    title: string,
    subtitle: string
  ): boolean {
    const bookmarks = this.getBookmarks();
    const existingIndex = bookmarks.findIndex((b) => b.dateStr === dateStr && b.type === type);
    let isNowBookmarked = false;

    if (existingIndex >= 0) {
      bookmarks.splice(existingIndex, 1);
      isNowBookmarked = false;
    } else {
      bookmarks.unshift({
        id: `${dateStr}_${type}`,
        dateStr,
        type,
        title,
        subtitle,
        savedAt: new Date().toISOString()
      });
      isNowBookmarked = true;
    }

    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn(e);
    }

    return isNowBookmarked;
  },

  getDayNote(dateStr: string): string {
    try {
      const data = localStorage.getItem(NOTES_KEY);
      if (!data) return '';
      const notes: Record<string, string> = JSON.parse(data);
      return notes[dateStr] || '';
    } catch {
      return '';
    }
  },

  saveDayNote(dateStr: string, note: string): void {
    try {
      const data = localStorage.getItem(NOTES_KEY);
      const notes: Record<string, string> = data ? JSON.parse(data) : {};
      if (!note.trim()) {
        delete notes[dateStr];
      } else {
        notes[dateStr] = note.trim();
      }
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.warn(e);
    }
  },

  calculateStats() {
    const completed = this.getCompletedDates();
    const bookmarks = this.getBookmarks();
    return {
      totalCompletedDays: completed.length,
      totalBookmarks: bookmarks.length
    };
  }
};

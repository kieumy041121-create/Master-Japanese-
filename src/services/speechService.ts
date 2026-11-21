/**
 * Web Speech API and Web Audio synthesizer for Kotoba Infinity
 * High-reliability engine with garbage-collection protection,
 * automatic bracket/ruby furigana cleaning, and Fast Mode acceleration.
 */

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private audioCtx: AudioContext | null = null;
  private jaVoice: SpeechSynthesisVoice | null = null;
  private activeUtterances = new Set<SpeechSynthesisUtterance>();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }

      // Unlock AudioContext on first user interaction to comply with autoplay policies
      const unlockAudio = () => {
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume().catch(() => {});
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('click', unlockAudio);
      window.addEventListener('touchstart', unlockAudio);
      window.addEventListener('keydown', unlockAudio);
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    try {
      const voices = this.synth.getVoices();
      // Prioritize natural Japanese voices
      this.jaVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('ja') &&
            (v.name.includes('Google') ||
              v.name.includes('Natural') ||
              v.name.includes('Kyoko') ||
              v.name.includes('Otoya') ||
              v.name.includes('Sayaka'))
        ) ||
        voices.find((v) => v.lang.startsWith('ja')) ||
        null;
    } catch {
      // Fallback
    }
  }

  /**
   * Cleans Japanese text before feeding to speech synthesizer:
   * Strips ruby brackets (Kanji[furigana] -> furigana for 100% accurate pronunciation),
   * removes editorial brackets 【】, quotes 「」, and punctuation noise.
   */
  public cleanJapaneseForSpeech(text: string): string {
    if (!text) return '';
    return text
      // Replace Kanji[furigana] -> keep furigana for accurate phonetic vocalization
      .replace(/[^\[\]\s]+\[([^\]]+)\]/g, '$1')
      .replace(/[【】「」『』（）()[\]]/g, ' ')
      .replace(/[・·•]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  public speak(text: string, rate?: number, pitch: number = 1.0) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this environment');
      return;
    }

    const cleanText = this.cleanJapaneseForSpeech(text);
    if (!cleanText) return;

    try {
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.cancel(); // Stop any active playback cleanly
    } catch {
      // Ignore
    }

    let effectiveRate = rate;
    if (effectiveRate === undefined) {
      try {
        const isFast = typeof window !== 'undefined' && localStorage.getItem('kotoba_fast_mode') === 'true';
        const saved = typeof window !== 'undefined' ? localStorage.getItem('kotoba_speech_rate') : null;
        if (saved) {
          effectiveRate = parseFloat(saved);
        } else {
          // In Fast Mode, rate is slightly brisk (1.15x) for maximum efficiency
          effectiveRate = isFast ? 1.15 : 1.0;
        }
      } catch {
        effectiveRate = 1.0;
      }
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = effectiveRate;
    utterance.pitch = pitch;

    if (this.jaVoice) {
      utterance.voice = this.jaVoice;
    }

    // Retain in Set to prevent Chrome/Safari garbage collection dropouts
    this.activeUtterances.add(utterance);
    utterance.onend = () => {
      this.activeUtterances.delete(utterance);
    };
    utterance.onerror = () => {
      this.activeUtterances.delete(utterance);
    };

    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('[SpeechService] speak error:', e);
    }
  }

  public speakJapanese(text: string, rate?: number) {
    this.speak(text, rate);
  }

  /**
   * Smart Audio Trimmer: strips leading/trailing pauses, middots, hyphens,
   * brackets, and trailing particles/punctuation so native audio attacks the
   * first syllable immediately with zero dead-air buffer.
   */
  public speakExactPhrase(text: string, rate?: number) {
    if (!text) return;
    const trimmedPhrase = this.cleanJapaneseForSpeech(text)
      .replace(/^[\s\-・〜～、。,.!?「」『』()（）【】]+/, '')
      .replace(/[\s\-・〜～、。,.!?「」『』()（）【】]+$/, '')
      .replace(/\s+/g, '')
      .trim();
    if (!trimmedPhrase) return;
    this.speak(trimmedPhrase, rate);
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignore
      }
    }
    this.activeUtterances.clear();
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        try {
          this.audioCtx = new AudioContextClass();
        } catch {
          return null;
        }
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  // Play pleasant chime for correct answer
  public playSuccessSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // AudioContext play fallback
    }
  }

  // Play soft tone for incorrect answer
  public playErrorSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.setValueAtTime(261.63, now + 0.12); // C4
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // AudioContext play fallback
    }
  }

  // Aliases for compatibility
  public playCorrectSound() {
    this.playSuccessSound();
  }

  public playIncorrectSound() {
    this.playErrorSound();
  }

  // Synthesize ambient noise (station noise, izakaya chatter, supermarket)
  public playAmbientBurst(type: 'station' | 'supermarket' | 'izakaya' | 'shibuya') {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const bufferSize = Math.floor(ctx.sampleRate * 1.5);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.04;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'station' ? 'bandpass' : 'lowpass';
      filter.frequency.value = type === 'station' ? 800 : 400;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch {
      // Safe fallback
    }
  }
}

export const speechService = new SpeechService();

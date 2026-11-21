/**
 * Zen Audio Playback Radio Service
 * Combines gentle native Japanese narration (Gemini TTS with Web Speech API fallback)
 * layered over procedural Web Audio API Zen background soundscapes (Rain, Forest Rustle, Lofi Zen).
 */

import { speechService } from './speechService';

export type ZenAmbienceType = 'rain' | 'forest' | 'lofi' | 'none';

class ZenAudioRadioService {
  private ctx: AudioContext | null = null;
  private ambienceNodes: AudioNode[] = [];
  private ambienceTimers: number[] = [];
  private masterGain: GainNode | null = null;
  private currentAudioEl: HTMLAudioElement | null = null;
  private ttsCache = new Map<string, string>(); // key -> data URL
  private isPlayingState = false;
  private onEndCallback: (() => void) | null = null;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public startAmbience(type: ZenAmbienceType, volume = 0.32) {
    this.stopAmbience();
    if (type === 'none') return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.001, ctx.currentTime);
    master.gain.linearRampToValueAtTime(Math.max(0.02, Math.min(0.8, volume)) * 0.45, ctx.currentTime + 0.8);
    master.connect(ctx.destination);
    this.masterGain = master;

    if (type === 'rain') {
      // Soft pink/brown filtered rain texture
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.997 * b0 + white * 0.029;
        b1 = 0.985 * b1 + white * 0.032;
        b2 = 0.950 * b2 + white * 0.048;
        data[i] = (b0 + b1 + b2 + white * 0.015) * 0.28;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 1150;

      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 180;

      noise.connect(highpass);
      highpass.connect(lowpass);
      lowpass.connect(master);
      noise.start();
      this.ambienceNodes.push(noise, lowpass, highpass);
    } else if (type === 'forest') {
      // Gentle swaying wind through bamboo leaves + soft bird-like harmonic bell
      const bufferSize = ctx.sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 0.55;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 540;
      bandpass.Q.value = 1.4;

      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.14;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 210;
      lfo.connect(lfoGain);
      lfoGain.connect(bandpass.frequency);

      noise.connect(bandpass);
      bandpass.connect(master);
      noise.start();
      lfo.start();
      this.ambienceNodes.push(noise, bandpass, lfo, lfoGain);
    } else if (type === 'lofi') {
      // Warm meditative Japanese pentatonic chord cycle (D - F# - A - B - E)
      const chords = [
        [293.66, 369.99, 440.0, 523.25], // Dmaj7 warmth
        [246.94, 293.66, 369.99, 440.0], // Bm7
        [196.0, 246.94, 293.66, 369.99], // Gmaj7
        [220.0, 277.18, 329.63, 440.0],  // A6
      ];
      let step = 0;
      const playChord = () => {
        if (!this.masterGain || !this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = chords[step % chords.length];
        step += 1;
        notes.forEach((freq) => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          noteGain.gain.setValueAtTime(0.0001, now);
          noteGain.gain.linearRampToValueAtTime(0.08, now + 0.9);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + 4.4);
          osc.connect(noteGain);
          noteGain.connect(this.masterGain);
          osc.start(now);
          osc.stop(now + 4.5);
        });
      };
      playChord();
      const id = window.setInterval(playChord, 4200);
      this.ambienceTimers.push(id);
    }
  }

  public setAmbienceVolume(volume: number) {
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.setTargetAtTime(
      Math.max(0.01, Math.min(0.8, volume)) * 0.45,
      this.ctx.currentTime,
      0.12
    );
  }

  public stopAmbience() {
    this.ambienceTimers.forEach((t) => window.clearInterval(t));
    this.ambienceTimers = [];

    this.ambienceNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.ambienceNodes = [];

    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch {
        // ignore
      }
      this.masterGain = null;
    }
  }

  public async playDiaryRadio(options: {
    text: string;
    ambience: ZenAmbienceType;
    ambienceVolume: number;
    playbackRate: number;
    onEnded?: () => void;
  }): Promise<'gemini_tts' | 'web_speech'> {
    this.stopAll();
    this.isPlayingState = true;
    this.onEndCallback = options.onEnded || null;

    this.startAmbience(options.ambience, options.ambienceVolume);

    const cacheKey = `${options.text.trim()}`;
    let dataUrl = this.ttsCache.get(cacheKey);

    if (!dataUrl) {
      try {
        const res = await fetch('/api/gemini/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: options.text,
            voiceName: 'Kore',
            stylePrompt:
              'Read this personal Japanese diary gently, slowly, and warmly like a calming late-night radio host',
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.audioBase64) {
            const mime = data.mimeType || 'audio/wav';
            dataUrl = `data:${mime};base64,${data.audioBase64}`;
            this.ttsCache.set(cacheKey, dataUrl);
          }
        }
      } catch {
        // Silent fallback to Web Speech API
      }
    }

    if (!this.isPlayingState) {
      return 'web_speech';
    }

    if (dataUrl) {
      try {
        const audio = new Audio(dataUrl);
        audio.playbackRate = Math.max(0.75, Math.min(1.25, options.playbackRate));
        this.currentAudioEl = audio;
        audio.onended = () => {
          this.stopAll();
        };
        audio.onerror = () => {
          this.playViaWebSpeech(options.text, options.playbackRate);
        };
        await audio.play();
        return 'gemini_tts';
      } catch {
        // Fallback below
      }
    }

    this.playViaWebSpeech(options.text, options.playbackRate);
    return 'web_speech';
  }

  private playViaWebSpeech(text: string, rate: number) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.stopAll();
      return;
    }
    speechService.speak(text, rate);

    // Poll cleanly until Web Speech finishes so UI and ambience stop gracefully
    const poll = window.setInterval(() => {
      if (!this.isPlayingState) {
        window.clearInterval(poll);
        return;
      }
      if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
        window.clearInterval(poll);
        this.stopAll();
      }
    }, 350);
    this.ambienceTimers.push(poll);
  }

  public stopAll() {
    this.isPlayingState = false;
    if (this.currentAudioEl) {
      try {
        this.currentAudioEl.pause();
        this.currentAudioEl.currentTime = 0;
      } catch {
        // ignore
      }
      this.currentAudioEl = null;
    }
    speechService.stop();
    this.stopAmbience();

    const cb = this.onEndCallback;
    this.onEndCallback = null;
    cb?.();
  }
}

export const zenAudioRadio = new ZenAudioRadioService();

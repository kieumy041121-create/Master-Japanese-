/**
 * Headless Spatial Audio Engine for the 5 Japanese Cultural Sanctuaries
 * Procedurally synthesizes 5 independent real-time ambient acoustic channels using Web Audio API:
 * - rain: Soft raindrops tapping against Showa glass panes
 * - cupClink: Occasional resonant porcelain teacup clinks
 * - grinder: Warm rhythmic antique manual coffee burr grinder texture
 * - vinylCrackle: Cozy analog vinyl surface warmth & gentle dust pops
 * - zenLofi: Meditative Japanese Hirajōshi pentatonic acoustic pad
 */

export type SpatialChannelId = 'rain' | 'cupClink' | 'grinder' | 'vinylCrackle' | 'zenLofi';

export interface SpatialAudioState {
  isPlaying: boolean;
  masterVolume: number; // 0..1
  channels: Record<SpatialChannelId, number>; // 0..1 per layer
}

export const SPATIAL_CHANNEL_META: Array<{
  id: SpatialChannelId;
  labelVi: string;
  labelJp: string;
}> = [
  { id: 'rain', labelVi: 'Mưa gõ kính', labelJp: '雨音' },
  { id: 'cupClink', labelVi: 'Tách sứ chạm nhẹ', labelJp: '磁器' },
  { id: 'grinder', labelVi: 'Cối xay cà phê cổ', labelJp: '珈琲ミル' },
  { id: 'vinylCrackle', labelVi: 'Tiếng rè đĩa than', labelJp: '盤面ノイズ' },
  { id: 'zenLofi', labelVi: 'Hòa âm Thiền đêm', labelJp: '夜禅音' },
];

type StateListener = (state: SpatialAudioState) => void;

class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private channelGains: Partial<Record<SpatialChannelId, GainNode>> = {};
  private stopNodes: Array<() => void> = [];
  private timers: number[] = [];
  private listeners = new Set<StateListener>();

  private state: SpatialAudioState = {
    isPlaying: false,
    masterVolume: 0.72,
    channels: {
      rain: 0.45,
      cupClink: 0.25,
      grinder: 0.18,
      vinylCrackle: 0.3,
      zenLofi: 0.35,
    },
  };

  public getState(): SpatialAudioState {
    return {
      isPlaying: this.state.isPlaying,
      masterVolume: this.state.masterVolume,
      channels: { ...this.state.channels },
    };
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private emit() {
    const snap = this.getState();
    this.listeners.forEach((fn) => fn(snap));
  }

  public applyScenePreset(scene: 'kissaten' | 'bunko' | 'vinyl' | 'postoffice' | 'conservatory') {
    const presets: Record<typeof scene, Record<SpatialChannelId, number>> = {
      kissaten: { rain: 0.5, cupClink: 0.35, grinder: 0.25, vinylCrackle: 0.22, zenLofi: 0.32 },
      bunko: { rain: 0.38, cupClink: 0.12, grinder: 0.0, vinylCrackle: 0.08, zenLofi: 0.48 },
      vinyl: { rain: 0.2, cupClink: 0.0, grinder: 0.0, vinylCrackle: 0.52, zenLofi: 0.42 },
      postoffice: { rain: 0.3, cupClink: 0.1, grinder: 0.0, vinylCrackle: 0.18, zenLofi: 0.44 },
      conservatory: { rain: 0.42, cupClink: 0.08, grinder: 0.0, vinylCrackle: 0.0, zenLofi: 0.5 },
    };
    const next = presets[scene];
    (Object.keys(next) as SpatialChannelId[]).forEach((ch) => {
      this.setChannelVolume(ch, next[ch], false);
    });
    this.emit();
  }

  public setMasterVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.state.masterVolume = clamped;
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(clamped * 0.65, this.ctx.currentTime, 0.08);
    }
    this.emit();
  }

  public setChannelVolume(channel: SpatialChannelId, vol: number, notify = true) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.state.channels[channel] = clamped;
    const node = this.channelGains[channel];
    if (this.ctx && node) {
      node.gain.setTargetAtTime(this.scaleChannelGain(channel, clamped), this.ctx.currentTime, 0.1);
    }
    if (notify) this.emit();
  }

  private scaleChannelGain(channel: SpatialChannelId, vol: number): number {
    switch (channel) {
      case 'rain':
        return vol * 0.28;
      case 'cupClink':
        return vol * 0.24;
      case 'grinder':
        return vol * 0.22;
      case 'vinylCrackle':
        return vol * 0.18;
      case 'zenLofi':
        return vol * 0.2;
    }
  }

  public togglePlay() {
    if (this.state.isPlaying) {
      this.stopAll();
    } else {
      this.start();
    }
  }

  public start() {
    if (typeof window === 'undefined') return;
    if (this.state.isPlaying) return;

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    try {
      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(
        Math.max(0.001, this.state.masterVolume * 0.65),
        this.ctx.currentTime + 0.6
      );
      this.masterGain.connect(this.ctx.destination);

      // Build channel buses
      (Object.keys(this.state.channels) as SpatialChannelId[]).forEach((ch) => {
        if (!this.ctx || !this.masterGain) return;
        const gain = this.ctx.createGain();
        gain.gain.value = this.scaleChannelGain(ch, this.state.channels[ch]);
        gain.connect(this.masterGain);
        this.channelGains[ch] = gain;
      });

      this.setupRainChannel();
      this.setupVinylCrackleChannel();
      this.setupGrinderChannel();
      this.setupCupClinkScheduler();
      this.setupZenPentatonicScheduler();

      this.state.isPlaying = true;
      this.emit();
    } catch {
      this.stopAll();
    }
  }

  private createNoiseBuffer(seconds: number, pink: boolean): AudioBuffer | null {
    if (!this.ctx) return null;
    const sr = this.ctx.sampleRate;
    const length = Math.floor(sr * seconds);
    const buffer = this.ctx.createBuffer(2, length, sr);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        if (pink) {
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
          b6 = white * 0.115926;
        } else {
          data[i] = white * 0.2;
        }
      }
    }
    return buffer;
  }

  private setupRainChannel() {
    if (!this.ctx || !this.channelGains.rain) return;
    const buf = this.createNoiseBuffer(4, true);
    if (!buf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1150;
    bandpass.Q.value = 0.65;

    const highshelf = this.ctx.createBiquadFilter();
    highshelf.type = 'lowpass';
    highshelf.frequency.value = 3400;

    src.connect(bandpass);
    bandpass.connect(highshelf);
    highshelf.connect(this.channelGains.rain);
    src.start();
    this.stopNodes.push(() => {
      try { src.stop(); } catch { /* ignore */ }
    });
  }

  private setupVinylCrackleChannel() {
    if (!this.ctx || !this.channelGains.vinylCrackle) return;
    const sr = this.ctx.sampleRate;
    const length = sr * 5;
    const buffer = this.ctx.createBuffer(1, length, sr);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      // Soft floor hiss + occasional warm dust pop
      let sample = (Math.random() * 2 - 1) * 0.025;
      if (Math.random() < 0.00055) {
        sample += (Math.random() * 2 - 1) * 0.45;
      }
      data[i] = sample;
    }

    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1400;

    src.connect(hp);
    hp.connect(this.channelGains.vinylCrackle);
    src.start();
    this.stopNodes.push(() => {
      try { src.stop(); } catch { /* ignore */ }
    });
  }

  private setupGrinderChannel() {
    if (!this.ctx || !this.channelGains.grinder) return;
    const buf = this.createNoiseBuffer(3, true);
    if (!buf) return;

    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'bandpass';
    lp.frequency.value = 260;
    lp.Q.value = 1.4;

    // Slow hand-crank LFO modulation
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 1.35;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 95;
    lfo.connect(lfoGain);
    lfoGain.connect(lp.frequency);

    src.connect(lp);
    lp.connect(this.channelGains.grinder);
    src.start();
    lfo.start();

    this.stopNodes.push(() => {
      try { src.stop(); } catch { /* ignore */ }
      try { lfo.stop(); } catch { /* ignore */ }
    });
  }

  private setupCupClinkScheduler() {
    const triggerClink = () => {
      if (!this.ctx || !this.channelGains.cupClink || !this.state.isPlaying) return;
      if (this.state.channels.cupClink <= 0.01) return;

      const now = this.ctx.currentTime;
      const freqs = [2480 + Math.random() * 220, 3920 + Math.random() * 260];
      freqs.forEach((f, idx) => {
        if (!this.ctx || !this.channelGains.cupClink) return;
        const osc = this.ctx.createOscillator();
        const env = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        env.gain.setValueAtTime(0.0001, now);
        env.gain.exponentialRampToValueAtTime(idx === 0 ? 0.14 : 0.07, now + 0.008);
        env.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

        osc.connect(env);
        env.connect(this.channelGains.cupClink);
        osc.start(now);
        osc.stop(now + 0.46);
      });
    };

    const id = window.setInterval(() => {
      if (Math.random() < 0.55) triggerClink();
    }, 5200);
    this.timers.push(id);
  }

  private setupZenPentatonicScheduler() {
    // Japanese Hirajōshi scale (D, E, F, A, Bb) in mellow octaves
    const notes = [293.66, 329.63, 349.23, 440.0, 466.16, 587.33, 659.25];
    let step = 0;

    const playNote = () => {
      if (!this.ctx || !this.channelGains.zenLofi || !this.state.isPlaying) return;
      if (this.state.channels.zenLofi <= 0.01) return;

      const now = this.ctx.currentTime;
      const root = notes[step % notes.length];
      step += Math.random() < 0.65 ? 1 : 2;

      const osc = this.ctx.createOscillator();
      const sub = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const env = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(root, now);
      sub.type = 'sine';
      sub.frequency.setValueAtTime(root * 0.5, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(920, now);

      env.gain.setValueAtTime(0.0001, now);
      env.gain.linearRampToValueAtTime(0.18, now + 0.65);
      env.gain.exponentialRampToValueAtTime(0.0001, now + 4.4);

      osc.connect(filter);
      sub.connect(filter);
      filter.connect(env);
      env.connect(this.channelGains.zenLofi);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 4.6);
      sub.stop(now + 4.6);
    };

    playNote();
    const id = window.setInterval(playNote, 3900);
    this.timers.push(id);
  }

  public stopAll() {
    this.timers.forEach((id) => window.clearInterval(id));
    this.timers = [];
    this.stopNodes.forEach((stopFn) => stopFn());
    this.stopNodes = [];
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
    this.masterGain = null;
    this.channelGains = {};
    this.state.isPlaying = false;
    this.emit();
  }
}

export const spatialAudioEngine = new SpatialAudioEngine();

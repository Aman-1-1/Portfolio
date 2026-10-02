/**
 * ByteBound OS — Web Audio Sound Engine
 * All sounds synthesized via Web Audio API. No external audio files needed.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'square',
  volume = 0.15,
  delay = 0
): void {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

  gain.gain.setValueAtTime(0, ctx.currentTime + delay);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + delay + duration);

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.05);
}

// ─── Sound Effects ────────────────────────────────────────────────────────────

export function playMenuMove(): void {
  playTone(440, 0.06, 'square', 0.1);
}

export function playMenuSelect(): void {
  playTone(523, 0.08, 'square', 0.12);
  playTone(659, 0.12, 'square', 0.12, 0.08);
}

export function playMenuBack(): void {
  playTone(330, 0.12, 'square', 0.1);
  playTone(262, 0.1, 'square', 0.1, 0.1);
}

export function playButtonPress(): void {
  playTone(880, 0.04, 'square', 0.08);
}

export function playTransition(): void {
  [0, 0.04, 0.08, 0.12].forEach((delay, i) => {
    playTone(220 + i * 110, 0.06, 'square', 0.08, delay);
  });
}

export function playBoot(): void {
  // Ascending 3-note jingle
  playTone(262, 0.15, 'square', 0.2, 0.0);
  playTone(330, 0.15, 'square', 0.2, 0.18);
  playTone(392, 0.15, 'square', 0.2, 0.36);
  playTone(523, 0.3, 'square', 0.25, 0.54);
}

export function playNotification(): void {
  playTone(784, 0.08, 'square', 0.12);
  playTone(988, 0.12, 'square', 0.12, 0.1);
}

export function playError(): void {
  playTone(220, 0.15, 'square', 0.15);
  playTone(196, 0.2, 'square', 0.15, 0.18);
}

// ─── Sound Manager ────────────────────────────────────────────────────────────

type SoundFn = () => void;

let _soundEnabled = true;

export const soundManager = {
  setEnabled(val: boolean) {
    _soundEnabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('gba-sound', String(val));
    }
  },
  play(fn: SoundFn) {
    if (!_soundEnabled) return;
    try {
      fn();
    } catch {
      // AudioContext may be blocked until user interaction — silently fail
    }
  },
};

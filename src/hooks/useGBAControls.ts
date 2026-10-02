'use client';

import { useEffect, useCallback } from 'react';
import { useGBA } from '@/lib/gba-state';
import { soundManager, playMenuMove, playMenuSelect, playMenuBack, playButtonPress } from '@/lib/sound-engine';
import type { GBAButton } from '@/types/portfolio';

const KEY_MAP: Record<string, GBAButton> = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  Enter: 'A',
  z: 'A',
  Z: 'A',
  Escape: 'B',
  x: 'B',
  X: 'B',
  ' ': 'START',
  Shift: 'SELECT',
};

// Map button to sound
function getSoundForButton(button: GBAButton, screen: string): void {
  switch (button) {
    case 'UP':
    case 'DOWN':
    case 'LEFT':
    case 'RIGHT':
      if (screen === 'menu' || screen === 'projects' || screen === 'achievements' || screen === 'contact' || screen === 'resume') {
        soundManager.play(playMenuMove);
      }
      break;
    case 'A':
    case 'START':
      soundManager.play(playMenuSelect);
      break;
    case 'B':
      soundManager.play(playMenuBack);
      break;
    default:
      soundManager.play(playButtonPress);
  }
}

export function useGBAControls() {
  const { state, pressButton } = useGBA();

  const handleButton = useCallback((button: GBAButton) => {
    getSoundForButton(button, state.screen);
    pressButton(button);
  }, [pressButton, state.screen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const button = KEY_MAP[e.key];
      if (!button) return;

      // Prevent default browser scroll behavior for arrow keys and space
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      handleButton(button);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleButton]);

  return { handleButton };
}

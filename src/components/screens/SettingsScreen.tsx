'use client';

import React from 'react';
import { useGBA } from '@/lib/gba-state';
import ScreenContainer from './ScreenContainer';
import { soundManager } from '@/lib/sound-engine';

export default function SettingsScreen() {
  const { state, dispatch } = useGBA();

  const toggleSound = () => {
    dispatch({ type: 'TOGGLE_SOUND' });
    soundManager.setEnabled(!state.soundEnabled);
  };

  const toggleMusic = () => {
    dispatch({ type: 'TOGGLE_MUSIC' });
  };

  return (
    <ScreenContainer
      title="CONFIG"
      subtitle="SYSTEM"
      footerHints={[
        { key: 'A', label: 'TOGGLE' },
        { key: 'B', label: 'MENU' },
      ]}
    >
      <div className="flex flex-col gap-2 py-1">
        <div
          onClick={toggleSound}
          className="flex justify-between items-center p-1.5 bg-[#171A24] border border-[#252A38] rounded cursor-pointer"
        >
          <span className="pixel-text text-[6px] text-[#F1E7C8]">SOUND EFFECTS</span>
          <span
            className={`pixel-text text-[6px] font-bold ${
              state.soundEnabled ? 'text-[#8FA878]' : 'text-[#C96B3B]'
            }`}
          >
            {state.soundEnabled ? 'ENABLED' : 'MUTED'}
          </span>
        </div>

        <div
          onClick={toggleMusic}
          className="flex justify-between items-center p-1.5 bg-[#171A24] border border-[#252A38] rounded cursor-pointer"
        >
          <span className="pixel-text text-[6px] text-[#F1E7C8]">BACKGROUND MUSIC</span>
          <span
            className={`pixel-text text-[6px] font-bold ${
              state.musicEnabled ? 'text-[#8FA878]' : 'text-[#C96B3B]'
            }`}
          >
            {state.musicEnabled ? 'ENABLED' : 'MUTED'}
          </span>
        </div>

        <div className="p-1 bg-[#171A24]/50 border border-[#252A38]/40 rounded text-[5px] text-[#527A8A]">
          <p>BYTEBOUND OS v1.0.4</p>
          <p>BUILT WITH NEXT.JS + TAILWIND</p>
        </div>
      </div>
    </ScreenContainer>
  );
}

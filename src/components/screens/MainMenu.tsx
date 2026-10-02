'use client';

import React from 'react';
import { useGBA, MENU_ITEMS } from '@/lib/gba-state';
import ScreenContainer from './ScreenContainer';
import AnimatedAvatar from '@/components/gba/AnimatedAvatar';

export default function MainMenu() {
  const { state, pressButton } = useGBA();

  return (
    <ScreenContainer
      title="MAIN MENU"
      subtitle="SYSTEM READY"
      footerHints={[
        { key: '▲▼', label: 'MOVE' },
        { key: 'A', label: 'ENTER' },
        { key: 'B', label: 'TITLE' },
      ]}
    >
      <div className="flex gap-4 items-center h-full py-1">
        {/* Left Side: Animated Emotion Avatar */}
        <div className="hidden sm:flex flex-col items-center justify-center p-3 bg-[#131722] border-2 border-[#252A38] rounded-lg shadow-inner">
          <AnimatedAvatar size={92} />
          <span className="pixel-text text-[9px] font-mono text-[#8FA878] mt-2 font-bold tracking-wider">
            STATUS: ACTIVE
          </span>
        </div>

        {/* Right Side: Menu Items */}
        <div className="flex-1 flex flex-col gap-1">
          {MENU_ITEMS.map((item, idx) => {
            const isSelected = state.menuIndex === idx;
            return (
              <div
                key={item.screen}
                onClick={() => {
                  pressButton('A');
                }}
                className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#252A38] text-[#F1E7C8] border border-[#C96B3B]/60'
                    : 'text-[#8FA878] hover:text-[#C7D49A] hover:bg-[#1f2430]'
                }`}
              >
                <span
                  className={`pixel-text text-xs ${
                    isSelected ? 'text-[#C96B3B] animate-pulse font-bold' : 'opacity-0'
                  }`}
                >
                  ▶
                </span>
                <span className="pixel-text text-xs tracking-wider font-bold">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </ScreenContainer>
  );
}

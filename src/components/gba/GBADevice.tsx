'use client';

import React from 'react';
import { useGBAControls } from '@/hooks/useGBAControls';
import { DPad, ActionButtons, SystemButtons } from './GBAButtons';
import GBAScreen from './GBAScreen';

export default function GBADevice() {
  const { handleButton } = useGBAControls();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-[#0a0c10] py-6 px-4"
      style={{
        background: 'radial-gradient(ellipse at center, #1b202e 0%, #08090d 100%)',
      }}
    >
      {/* Top Bar Switch to Pro Portfolio — Arrow Button icon style */}
      <div className="w-full max-w-3xl flex justify-end items-center mb-3">
        <a
          href="/portfolio"
          title="Switch to Portfolio Mode"
          className="group flex items-center gap-2 text-xs font-mono font-bold text-[#F1E7C8] bg-[#1e2433] hover:bg-[#C96B3B] hover:text-[#171A24] border border-[#527A8A]/40 px-3 py-1.5 rounded-full transition-all shadow-md active:scale-95"
        >
          <span className="text-[11px] tracking-wider">PORTFOLIO</span>
          <span className="w-5 h-5 rounded-full bg-[#131620] group-hover:bg-[#171A24] text-[#C96B3B] group-hover:text-[#F1E7C8] flex items-center justify-center text-xs font-black transition-colors shadow-inner">
            ➔
          </span>
        </a>
      </div>

      {/* Main Console Frame */}
      <div
        className="gba-device-desktop"
        role="main"
        aria-label="Aman Regmi Portfolio Console"
        style={{ touchAction: 'none' }}
      >
        {/* SCREEN SECTION */}
        <div className="gba-screen-housing">
          {/* Left Speaker */}
          <div className="gba-speaker-array" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="speaker-hole" />
            ))}
          </div>

          {/* Screen Bezel */}
          <div className="gba-bezel-large">
            {/* Top Bar with Clean Battery Indicator */}
            <div className="bezel-top-bar">
              <span className="text-[10px] font-mono font-bold text-[#8FA878] tracking-widest">
                AMAN REGMI
              </span>

              {/* Battery Indicator */}
              <div className="flex items-center gap-1.5" title="Battery: 100%">
                <div className="w-6 h-3 border border-[#8FA878] rounded-[2px] p-[1px] flex items-center relative">
                  <div className="h-full w-full bg-[#8FA878] rounded-[1px]" />
                  <div className="absolute -right-[3px] top-[2px] bottom-[2px] w-[2px] bg-[#8FA878] rounded-r-[1px]" />
                </div>
              </div>
            </div>

            {/* Inner Screen Viewport */}
            <div className="gba-screen-viewport" style={{ touchAction: 'pan-y' }}>
              <GBAScreen />
            </div>
          </div>

          {/* Right Speaker */}
          <div className="gba-speaker-array" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="speaker-hole" />
            ))}
          </div>
        </div>

        {/* CONTROLS SECTION */}
        <div className="gba-controls-deck">
          {/* Left: Directional Pad */}
          <DPad onPress={handleButton} />

          {/* Center: System Buttons */}
          <SystemButtons onPress={handleButton} />

          {/* Right: Action Buttons */}
          <ActionButtons onPress={handleButton} />
        </div>
      </div>

      {/* Bottom Controls Reference — simple, mobile-friendly */}
      <div className="mt-4 text-center select-none" aria-label="Control guide">
        <p className="font-mono text-[11px] text-[#527A8A] tracking-widest uppercase">
          <span className="text-[#8FA878]">ARROWS</span>
          {' '}MOVE
          {'  '}
          <span className="text-[#C96B3B]">A</span>
          {' '}OK
          {'  '}
          <span className="text-[#8FA878]">B</span>
          {' '}BACK
        </p>
      </div>
    </div>
  );
}

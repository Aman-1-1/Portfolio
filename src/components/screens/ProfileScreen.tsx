'use client';

import React from 'react';
import ScreenContainer from './ScreenContainer';
import { usePortfolioData } from '@/lib/portfolio-context';

export default function ProfileScreen() {
  const { profile } = usePortfolioData();

  return (
    <ScreenContainer
      title="PROFILE"
      subtitle={`LVL ${profile.level}`}
      footerHints={[{ key: 'B', label: 'MENU' }]}
    >
      <div className="flex gap-4 items-start py-2">
        {/* Character avatar using pixelart1.jpeg */}
        <div className="flex flex-col items-center gap-1.5 bg-[#171A24] p-2 border-2 border-[#252A38] rounded-md shadow-md shrink-0">
          <div className="w-20 h-20 rounded overflow-hidden border border-[#38435c] bg-[#11141c] flex items-center justify-center">
            <img
              src="/art/pixelart1.jpeg"
              alt="Aman Regmi Pixel Art"
              className="w-full h-full object-cover"
              style={{ imageRendering: 'pixelated', maxWidth: '80px', maxHeight: '80px', display: 'block' }}
            />
          </div>
          <span className="pixel-text text-[9px] font-mono font-bold text-[#C7D49A]">ID: #001</span>
        </div>

        {/* Stats card */}
        <div className="flex-1 flex flex-col gap-1.5">
          <div>
            <span className="pixel-text text-base sm:text-lg text-[#F1E7C8] font-black tracking-wide block">
              {profile.name}
            </span>
            <span className="pixel-text text-xs font-mono font-bold text-[#C96B3B] block mt-0.5">
              {profile.class}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 bg-[#171A24] p-2.5 border border-[#252A38] rounded text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-[#527A8A] font-bold">LOC:</span>
              <span className="text-[#8FA878] font-semibold">{profile.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#527A8A] font-bold">STATUS:</span>
              <span className="text-[#C7D49A] font-semibold">{profile.status || 'Active'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio / Quote Box */}
      <div className="mt-2 bg-[#171A24] p-3 border-2 border-[#252A38] rounded-md shadow-inner">
        <p className="pixel-text text-xs leading-relaxed text-[#F1E7C8]">
          &ldquo;{profile.bio}&rdquo;
        </p>
      </div>
    </ScreenContainer>
  );
}

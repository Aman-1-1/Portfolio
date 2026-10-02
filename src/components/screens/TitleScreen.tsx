'use client';

import React, { useEffect, useState } from 'react';
import { useGBA } from '@/lib/gba-state';
import PixelCharacter from '@/components/gba/PixelCharacter';
import { usePortfolioData } from '@/lib/portfolio-context';

export default function TitleScreen() {
  const { pressButton } = useGBA();
  const portfolioData = usePortfolioData();
  const [blink, setBlink] = useState(true);
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setDateStr(
        now.toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' })
      );
    };

    updateDateTime();
    const clockInterval = setInterval(updateDateTime, 1000);
    const blinkInterval = setInterval(() => setBlink((b) => !b), 500);

    return () => {
      clearInterval(clockInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  const characterConfig = portfolioData.profile?.character;
  const isCharacterEnabled = characterConfig ? characterConfig.enabled !== false : true;

  return (
    <div
      onClick={() => pressButton('START')}
      className="screen-base flex flex-col items-center justify-between p-4 cursor-pointer select-none"
    >
      {/* Top Header with live local date and time */}
      <div className="w-full flex justify-between items-center pb-1.5 border-b border-[#252A38]">
        <div className="pixel-text text-[#8FA878] text-[10px] font-mono font-bold">
          {dateStr || 'TODAY'}
        </div>
        <div className="pixel-text text-[#527A8A] text-[10px] font-mono font-bold tracking-wider">
          {timeStr || 'LIVE CLOCK'}
        </div>
      </div>

      {/* Center content: Name, configurable small pixel character, and prompt */}
      <div className="flex flex-col items-center justify-center gap-1.5 flex-1 my-auto">
        {/* Name */}
        <h1 className="pixel-text text-[#F1E7C8] text-base sm:text-lg tracking-wider font-black leading-tight">
          {portfolioData.profile.name.toUpperCase()}
        </h1>

        {/* Configurable Pixel Character Sprite */}
        {isCharacterEnabled && (
          <div className="my-1">
            <PixelCharacter
              neutralSprite={characterConfig?.neutralSprite || '/art/neutral.jpg'}
              happySprite={characterConfig?.happySprite || '/art/happy.png'}
              animationEnabled={characterConfig?.animationEnabled !== false}
              frameDuration={characterConfig?.frameDuration || 1000}
              width={76}
              height={76}
            />
          </div>
        )}

        {/* Subtitle / Prompt */}
        <p className="pixel-text text-[#8FA878] text-[11px] tracking-wide font-mono font-semibold">
          WELCOME TO MY SAVE FILE.
        </p>
      </div>

      {/* Press Start Prompt */}
      <div className="mb-1 text-center pt-2 border-t border-[#252A38] w-full">
        <p
          className="pixel-text text-[#C96B3B] text-xs sm:text-sm tracking-[0.2em] font-black"
          style={{ opacity: blink ? 1 : 0.2, transition: 'opacity 0.1s' }}
        >
          PRESS START
        </p>
      </div>
    </div>
  );
}

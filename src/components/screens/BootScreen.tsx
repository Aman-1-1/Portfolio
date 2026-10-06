'use client';

import React, { useEffect, useState } from 'react';
import { useGBA } from '@/lib/gba-state';
import { soundManager, playBoot } from '@/lib/sound-engine';

const BOOT_STEPS = [
  { text: 'STARTING...', delay: 350 },
  { text: 'LOADING PORTFOLIO...', delay: 450 },
  { text: 'READY', delay: 400 },
];

export default function BootScreen() {
  const { navigateTo } = useGBA();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    soundManager.play(playBoot);

    let timeout: ReturnType<typeof setTimeout>;

    const runStep = (idx: number) => {
      if (idx >= BOOT_STEPS.length) {
        timeout = setTimeout(() => navigateTo('title'), 400);
        return;
      }
      setStep(idx);
      timeout = setTimeout(() => runStep(idx + 1), BOOT_STEPS[idx].delay);
    };

    let pInterval: ReturnType<typeof setInterval>;
    pInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(pInterval);
          return 100;
        }
        return p + 5;
      });
    }, 45);

    runStep(0);
    return () => {
      clearTimeout(timeout);
      clearInterval(pInterval);
    };
  }, [navigateTo]);

  return (
    <div
      onClick={() => navigateTo('title')}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center cursor-pointer select-none bg-[#171A24] p-6"
    >
      {/* Middle-aligned (center-aligned) text container with stable vertical height */}
      <div className="w-full max-w-xs flex flex-col items-center justify-center space-y-2 text-center">
        {BOOT_STEPS.map((s, i) => {
          const isVisible = i <= step;
          return (
            <p
              key={i}
              className={`pixel-text text-sm font-mono tracking-wider text-center transition-opacity duration-150 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              } ${s.text === 'READY' ? 'text-[#F1E7C8] font-bold' : 'text-[#C7D49A]'}`}
            >
              {s.text}
            </p>
          );
        })}
      </div>

      {/* Progress bar centered right below the text */}
      <div className="w-full max-w-[240px] mt-4">
        <div className="w-full h-2.5 bg-[#11141c] border border-[#252A38] rounded-sm p-0.5">
          <div
            className="h-full bg-[#C96B3B] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { useGBA } from '@/lib/gba-state';
import { soundManager, playBoot } from '@/lib/sound-engine';

const BOOT_STEPS = [
  { text: 'STARTING...', delay: 300 },
  { text: 'LOADING PORTFOLIO...', delay: 400 },
  { text: 'READY', delay: 400 },
];

export default function BootScreen() {
  const { navigateTo } = useGBA();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    soundManager.play(playBoot);

    let timeout: ReturnType<typeof setTimeout>;

    const runStep = (idx: number) => {
      if (idx >= BOOT_STEPS.length) {
        setDone(true);
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
        return p + 10;
      });
    }, 50);

    runStep(0);
    return () => {
      clearTimeout(timeout);
      clearInterval(pInterval);
    };
  }, [navigateTo]);

  const visibleLines = BOOT_STEPS.slice(0, step + 1);

  return (
    <div
      onClick={() => navigateTo('title')}
      className="screen-base flex flex-col justify-center items-center gap-4 p-6 cursor-pointer"
    >
      <div className="w-full max-w-xs space-y-2 text-center">
        {visibleLines.map((s, i) => (
          <p
            key={i}
            className="pixel-text text-sm font-mono tracking-wider text-[#C7D49A]"
          >
            {s.text}
          </p>
        ))}
      </div>

      <div className="w-full max-w-xs mt-2">
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

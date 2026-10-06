'use client';

import React, { useEffect, useRef } from 'react';
import { useGBA } from '@/lib/gba-state';
import ScreenContainer from './ScreenContainer';
import { usePortfolioData } from '@/lib/portfolio-context';

export default function ResumeScreen() {
  const { state } = useGBA();
  const { resume } = usePortfolioData();

  const options = [
    { label: 'VIEW RESUME (PDF)', action: 'view' },
    { label: 'DOWNLOAD RESUME (PDF)', action: 'download' },
  ];

  const handleAction = (idx?: number) => {
    const targetIdx = typeof idx === 'number' ? idx : state.resumeIndex;
    const selected = options[targetIdx];
    if (!selected) return;

    if (selected.action === 'view') {
      window.open(resume.viewUrl, '_blank', 'noopener,noreferrer');
    } else {
      const a = document.createElement('a');
      a.href = resume.downloadUrl;
      a.download = 'Aman_Regmi_Resume.pdf';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // React to A button press via actionTrigger
  const prevTrigger = useRef(state.actionTrigger);
  useEffect(() => {
    if (state.screen === 'resume' && state.actionTrigger !== prevTrigger.current) {
      prevTrigger.current = state.actionTrigger;
      handleAction();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.actionTrigger, state.screen]);

  return (
    <ScreenContainer
      title="RESUME"
      subtitle="DOCUMENT"
      footerHints={[
        { key: '▲▼', label: 'SELECT' },
        { key: 'A', label: 'EXECUTE' },
        { key: 'B', label: 'MENU' },
      ]}
    >
      <div className="flex flex-col items-center justify-center gap-3 py-3 font-mono">
        <div className="bg-[#171A24] p-3.5 border-2 border-[#252A38] rounded-md text-center w-full shadow-md">
          <span className="pixel-text text-base sm:text-lg text-[#F1E7C8] block font-black mb-1">
            AMAN REGMI
          </span>
          <span className="pixel-text text-xs text-[#527A8A] font-bold">
            DOCUMENT STATUS: READY • LAST UPDATED: {resume.lastUpdated}
          </span>
        </div>

        <div className="flex flex-col gap-2.5 w-full mt-2">
          {options.map((opt, idx) => {
            const isSelected = state.resumeIndex === idx;
            return (
              <button
                key={opt.action}
                type="button"
                aria-label={opt.label}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleAction(idx);
                }}
                className={`flex items-center gap-2 p-3 rounded-md cursor-pointer border-2 transition-all w-full text-left ${
                  isSelected
                    ? 'bg-[#252A38] border-[#C96B3B] text-[#F1E7C8] shadow-md'
                    : 'bg-[#171A24]/60 border-[#252A38]/50 text-[#8FA878] hover:bg-[#1f2430]'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
              >
                <span
                  className={`pixel-text text-sm ${
                    isSelected ? 'text-[#C96B3B] animate-pulse font-bold' : 'opacity-0'
                  }`}
                >
                  ▶
                </span>
                <span className="pixel-text text-xs sm:text-sm font-bold tracking-wide">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </ScreenContainer>
  );
}

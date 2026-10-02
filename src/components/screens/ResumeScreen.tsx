'use client';

import React from 'react';
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
    if (selected.action === 'view') {
      window.open(resume.viewUrl, '_blank', 'noopener,noreferrer');
    } else {
      const a = document.createElement('a');
      a.href = resume.downloadUrl;
      a.download = 'Aman_Regmi_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

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
              <div
                key={opt.action}
                onClick={() => handleAction(idx)}
                className={`flex items-center gap-2 p-3 rounded-md cursor-pointer border-2 transition-all ${
                  isSelected
                    ? 'bg-[#252A38] border-[#C96B3B] text-[#F1E7C8] shadow-md'
                    : 'bg-[#171A24]/60 border-[#252A38]/50 text-[#8FA878] hover:bg-[#1f2430]'
                }`}
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
              </div>
            );
          })}
        </div>
      </div>
    </ScreenContainer>
  );
}

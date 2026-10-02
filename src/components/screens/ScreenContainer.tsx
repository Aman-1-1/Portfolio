'use client';

import React from 'react';

interface ScreenContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerHints?: Array<{ key: string; label: string }>;
}

export default function ScreenContainer({
  title,
  subtitle,
  children,
  footerHints = [
    { key: 'A', label: 'SELECT' },
    { key: 'B', label: 'BACK' },
  ],
}: ScreenContainerProps) {
  return (
    <div className="screen-base flex flex-col justify-between h-full w-full p-3 sm:p-4 select-none">
      {/* Header */}
      <header className="border-b-2 border-[#252A38] pb-1.5 mb-2">
        <div className="flex justify-between items-center px-1">
          <span className="pixel-text text-[#C96B3B] text-[13px] sm:text-[14px] tracking-wider uppercase font-black">
            {title}
          </span>
          {subtitle && (
            <span className="pixel-text text-[#8FA878] text-[10px] sm:text-[11px] font-mono tracking-widest">
              {subtitle}
            </span>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-1 py-1 custom-pixel-scrollbar">
        {children}
      </main>

      {/* Footer Hints */}
      <footer className="border-t-2 border-[#252A38] pt-2 mt-2 flex justify-between items-center px-1">
        <div className="flex gap-3 flex-wrap">
          {footerHints.map((hint, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="pixel-badge text-[9px] sm:text-[10px] bg-[#171A24] text-[#C7D49A] px-1.5 py-0.5 rounded font-mono font-bold border border-[#384156]">
                [{hint.key}]
              </span>
              <span className="pixel-text text-[#8FA878] text-[9px] sm:text-[10px] font-mono tracking-wide">
                {hint.label}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

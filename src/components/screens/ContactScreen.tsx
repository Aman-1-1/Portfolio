'use client';

import React, { useState } from 'react';
import { useGBA } from '@/lib/gba-state';
import ScreenContainer from './ScreenContainer';
import { usePortfolioData } from '@/lib/portfolio-context';

export default function ContactScreen() {
  const { state } = useGBA();
  const { contact } = usePortfolioData();
  const [copied, setCopied] = useState(false);

  const contactOptions = [
    { label: 'SEND DIRECT EMAIL', type: 'email', val: contact.email },
    { label: 'VISIT GITHUB PROFILE', type: 'url', val: contact.github },
    { label: 'COPY EMAIL ADDRESS', type: 'copy', val: contact.email },
  ];

  const selectedIndex =
    ((state.contactIndex % contactOptions.length) + contactOptions.length) %
    contactOptions.length;

  const handleAction = (idx?: number) => {
    const targetIdx = typeof idx === 'number' ? idx : selectedIndex;
    const item = contactOptions[targetIdx];
    if (item.type === 'email') {
      window.location.href = `mailto:${item.val}`;
    } else if (item.type === 'url') {
      window.open(item.val, '_blank', 'noopener,noreferrer');
    } else if (item.type === 'copy') {
      navigator.clipboard.writeText(item.val);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ScreenContainer
      title="COMMS"
      subtitle="ONLINE"
      footerHints={[
        { key: '▲▼', label: 'SELECT' },
        { key: 'A', label: 'EXEC' },
        { key: 'B', label: 'MENU' },
      ]}
    >
      <div className="flex flex-col gap-3 py-1 font-mono">
        <div className="bg-[#171A24] p-3 border-2 border-[#252A38] rounded-md shadow-md">
          <span className="pixel-text text-xs text-[#527A8A] font-bold block mb-1">
            PRIMARY FREQUENCY
          </span>
          <span className="pixel-text text-sm sm:text-base text-[#C7D49A] font-bold block truncate">
            {contact.email}
          </span>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          {contactOptions.map((opt, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <div
                key={opt.label}
                onClick={() => handleAction(idx)}
                className={`flex items-center gap-2 p-2.5 rounded-md cursor-pointer border-2 transition-all ${
                  isSelected
                    ? 'bg-[#252A38] border-[#C96B3B] text-[#F1E7C8] shadow-md'
                    : 'bg-[#171A24]/60 border-[#252A38]/50 text-[#8FA878] hover:bg-[#1f2430]'
                }`}
              >
                <span
                  className={`pixel-text text-xs ${
                    isSelected ? 'text-[#C96B3B] animate-pulse font-bold' : 'opacity-0'
                  }`}
                >
                  ▶
                </span>
                <span className="pixel-text text-xs sm:text-[13px] font-bold tracking-wide">
                  {opt.label}
                </span>
              </div>
            );
          })}
        </div>

        {copied && (
          <div className="text-center mt-2">
            <span className="pixel-text text-xs font-mono font-bold text-[#171A24] bg-[#8FA878] px-3 py-1 rounded shadow">
              ✓ COPIED TO CLIPBOARD!
            </span>
          </div>
        )}
      </div>
    </ScreenContainer>
  );
}

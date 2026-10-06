'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGBA } from '@/lib/gba-state';
import ScreenContainer from './ScreenContainer';
import { usePortfolioData } from '@/lib/portfolio-context';

// Robust clipboard copy with textarea fallback for browsers that block navigator.clipboard
function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for HTTP or unsupported browsers
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
  return Promise.resolve();
}

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
    if (!item?.val) return;

    if (item.type === 'email') {
      window.location.href = `mailto:${item.val}`;
    } else if (item.type === 'url') {
      window.open(item.val, '_blank', 'noopener,noreferrer');
    } else if (item.type === 'copy') {
      copyToClipboard(item.val).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        // Last resort: show the value in an alert so user can copy manually
        alert(`Email: ${item.val}`);
      });
    }
  };

  // React to A button press via actionTrigger — fires handleAction for selected item
  const prevTrigger = useRef(state.actionTrigger);
  useEffect(() => {
    if (state.screen === 'contact' && state.actionTrigger !== prevTrigger.current) {
      prevTrigger.current = state.actionTrigger;
      handleAction();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.actionTrigger, state.screen]);

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
            {contact.email || 'amanregmi10@gmail.com'}
          </span>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          {contactOptions.map((opt, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={opt.label}
                type="button"
                aria-label={opt.label}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleAction(idx);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-md cursor-pointer border-2 transition-all w-full text-left ${
                  isSelected
                    ? 'bg-[#252A38] border-[#C96B3B] text-[#F1E7C8] shadow-md'
                    : 'bg-[#171A24]/60 border-[#252A38]/50 text-[#8FA878] hover:bg-[#1f2430]'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
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
              </button>
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

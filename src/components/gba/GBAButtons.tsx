'use client';

import React from 'react';
import type { GBAButton } from '@/types/portfolio';

interface DPadProps {
  onPress: (button: GBAButton) => void;
}

export function DPad({ onPress }: DPadProps) {
  return (
    <div className="flex items-center justify-center select-none" aria-label="Directional pad">
      {/* Outer recessed well ring */}
      <div className="w-[140px] h-[140px] rounded-full bg-[#11141c] border-2 border-[#1c2230] shadow-[inset_0_4px_12px_rgba(0,0,0,0.95),0_2px_4px_rgba(255,255,255,0.06)] flex items-center justify-center p-3">
        {/* Crisp 3x3 Grid with zero overlap */}
        <div className="grid grid-cols-3 grid-rows-3 w-[114px] h-[114px]">
          {/* Row 1, Col 1: Empty */}
          <div />

          {/* Row 1, Col 2: UP */}
          <button
            type="button"
            aria-label="Move up"
            onPointerDown={(e) => {
              e.preventDefault();
              onPress('UP');
            }}
            className="w-full h-full bg-gradient-to-b from-[#2a3245] to-[#1a202c] border-t border-x border-[#38435c] rounded-t-md flex items-center justify-center text-[#8FA878] hover:text-[#C7D49A] active:bg-[#C96B3B] active:text-[#171A24] transition-colors shadow-sm cursor-pointer outline-none focus:outline-none focus:ring-0 select-none"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <span className="text-xs font-black drop-shadow pointer-events-none">▲</span>
          </button>

          {/* Row 1, Col 3: Empty */}
          <div />

          {/* Row 2, Col 1: LEFT */}
          <button
            type="button"
            aria-label="Move left"
            onPointerDown={(e) => {
              e.preventDefault();
              onPress('LEFT');
            }}
            className="w-full h-full bg-gradient-to-r from-[#2a3245] to-[#1a202c] border-l border-y border-[#38435c] rounded-l-md flex items-center justify-center text-[#8FA878] hover:text-[#C7D49A] active:bg-[#C96B3B] active:text-[#171A24] transition-colors shadow-sm cursor-pointer outline-none focus:outline-none focus:ring-0 select-none"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <span className="text-xs font-black drop-shadow pointer-events-none">◀</span>
          </button>

          {/* Row 2, Col 2: CENTER PIVOT */}
          <div className="w-full h-full bg-[#181e2a] flex items-center justify-center pointer-events-none">
            <div className="w-4 h-4 rounded-full bg-[#11141c] shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] border border-[#232a3a]" />
          </div>

          {/* Row 2, Col 3: RIGHT */}
          <button
            type="button"
            aria-label="Move right"
            onPointerDown={(e) => {
              e.preventDefault();
              onPress('RIGHT');
            }}
            className="w-full h-full bg-gradient-to-l from-[#2a3245] to-[#1a202c] border-r border-y border-[#38435c] rounded-r-md flex items-center justify-center text-[#8FA878] hover:text-[#C7D49A] active:bg-[#C96B3B] active:text-[#171A24] transition-colors shadow-sm cursor-pointer outline-none focus:outline-none focus:ring-0 select-none"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <span className="text-xs font-black drop-shadow pointer-events-none">▶</span>
          </button>

          {/* Row 3, Col 1: Empty */}
          <div />

          {/* Row 3, Col 2: DOWN */}
          <button
            type="button"
            aria-label="Move down"
            onPointerDown={(e) => {
              e.preventDefault();
              onPress('DOWN');
            }}
            className="w-full h-full bg-gradient-to-t from-[#2a3245] to-[#1a202c] border-b border-x border-[#38435c] rounded-b-md flex items-center justify-center text-[#8FA878] hover:text-[#C7D49A] active:bg-[#C96B3B] active:text-[#171A24] transition-colors shadow-sm cursor-pointer outline-none focus:outline-none focus:ring-0 select-none"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <span className="text-xs font-black drop-shadow pointer-events-none">▼</span>
          </button>

          {/* Row 3, Col 3: Empty */}
          <div />
        </div>
      </div>
    </div>
  );
}

interface ActionButtonsProps {
  onPress: (button: GBAButton) => void;
}

export function ActionButtons({ onPress }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center select-none" aria-label="Action Buttons">
      {/* Recessed well ring */}
      <div className="w-[148px] h-[86px] rounded-full bg-[#11141c] border-2 border-[#1c2230] shadow-[inset_0_4px_12px_rgba(0,0,0,0.95),0_2px_4px_rgba(255,255,255,0.06)] flex items-center justify-between px-3.5 rotate-[-22deg]">
        {/* B BUTTON */}
        <div className="flex flex-col items-center rotate-[22deg]">
          <button
            type="button"
            aria-label="B - Back"
            onPointerDown={(e) => {
              e.preventDefault();
              onPress('B');
            }}
            className="w-[48px] h-[48px] rounded-full bg-gradient-to-b from-[#3a4459] via-[#242b38] to-[#151a24] border border-[#505e7a] flex items-center justify-center shadow-[0_5px_8px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.25)] active:translate-y-1 active:shadow-[0_2px_3px_rgba(0,0,0,0.8)] transition-all cursor-pointer outline-none focus:outline-none focus:ring-0 select-none"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <span className="text-sm font-black text-[#8FA878] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] pointer-events-none">B</span>
          </button>
        </div>

        {/* A BUTTON */}
        <div className="flex flex-col items-center rotate-[22deg]">
          <button
            type="button"
            aria-label="A - OK"
            onPointerDown={(e) => {
              e.preventDefault();
              onPress('A');
            }}
            className="w-[48px] h-[48px] rounded-full bg-gradient-to-b from-[#d9733e] via-[#b55829] to-[#803512] border border-[#e88c5a] flex items-center justify-center shadow-[0_5px_8px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.3)] active:translate-y-1 active:shadow-[0_2px_3px_rgba(0,0,0,0.8)] transition-all cursor-pointer outline-none focus:outline-none focus:ring-0 select-none"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <span className="text-sm font-black text-[#F1E7C8] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] pointer-events-none">A</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface SystemButtonsProps {
  onPress: (button: GBAButton) => void;
}

export function SystemButtons({ onPress }: SystemButtonsProps) {
  return (
    <div className="flex items-center gap-6 select-none mt-2">
      {/* SELECT */}
      <div className="flex flex-col items-center gap-2 rotate-[-22deg]">
        <button
          type="button"
          aria-label="Select - Secondary action"
          onPointerDown={(e) => {
            e.preventDefault();
            onPress('SELECT');
          }}
          className="w-20 h-7 bg-gradient-to-b from-[#3a4a5e] via-[#1a202c] to-[#0f131a] border-2 border-[#4a5e78] rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)] active:translate-y-1 active:shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-all cursor-pointer outline-none focus:outline-none focus:ring-0 select-none"
          style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
        />
        <span className="text-[11px] font-mono text-[#6A9AAA] font-bold tracking-widest pointer-events-none">SELECT</span>
      </div>

      {/* START */}
      <div className="flex flex-col items-center gap-2 rotate-[-22deg]">
        <button
          type="button"
          aria-label="Start - Main menu"
          onPointerDown={(e) => {
            e.preventDefault();
            onPress('START');
          }}
          className="w-20 h-7 bg-gradient-to-b from-[#3a4a5e] via-[#1a202c] to-[#0f131a] border-2 border-[#4a5e78] rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)] active:translate-y-1 active:shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-all cursor-pointer outline-none focus:outline-none focus:ring-0 select-none"
          style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
        />
        <span className="text-[11px] font-mono text-[#6A9AAA] font-bold tracking-widest pointer-events-none">START</span>
      </div>
    </div>
  );
}

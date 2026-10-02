'use client';

import React from 'react';
import { useGBA } from '@/lib/gba-state';
import ScreenContainer from './ScreenContainer';
import { usePortfolioData } from '@/lib/portfolio-context';

export default function ProjectsScreen() {
  const { state, pressButton } = useGBA();
  const { projects } = usePortfolioData();

  const selectedIndex =
    ((state.projectIndex % projects.length) + projects.length) % projects.length;

  return (
    <ScreenContainer
      title="PROJECTS"
      subtitle={`${selectedIndex + 1}/${projects.length}`}
      footerHints={[
        { key: '▲▼', label: 'SELECT' },
        { key: 'A', label: 'VIEW' },
        { key: 'B', label: 'MENU' },
      ]}
    >
      <div className="flex flex-col gap-2 py-1">
        {projects.map((proj, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <div
              key={proj.id}
              onClick={() => {
                pressButton('A');
              }}
              className={`flex flex-col p-2.5 rounded cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-[#252A38] border-[#C96B3B] text-[#F1E7C8] shadow-md'
                  : 'bg-[#171A24]/60 border-transparent text-[#8FA878] hover:bg-[#1b202c]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`pixel-text text-xs ${
                    isSelected ? 'text-[#C96B3B] animate-pulse font-bold' : 'opacity-0'
                  }`}
                >
                  ▶
                </span>
                <span className="pixel-text text-xs sm:text-[13px] font-black tracking-wide">
                  {proj.title}
                </span>
              </div>
              <span className="pixel-text text-[10px] text-[#527A8A] font-mono pl-4 mt-0.5">
                {proj.type}
              </span>
            </div>
          );
        })}
      </div>
    </ScreenContainer>
  );
}

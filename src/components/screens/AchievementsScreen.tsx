'use client';

import React from 'react';
import { useGBA } from '@/lib/gba-state';
import ScreenContainer from './ScreenContainer';
import { usePortfolioData } from '@/lib/portfolio-context';

interface AchievementsScreenProps {
  showDetail?: boolean;
}

export default function AchievementsScreen({ showDetail = false }: AchievementsScreenProps) {
  const { state, pressButton } = useGBA();
  const { achievements } = usePortfolioData();

  const selectedIndex =
    ((state.achievementIndex % achievements.length) + achievements.length) % achievements.length;
  const currentAch = achievements[selectedIndex] || achievements[0];

  if (showDetail) {
    return (
      <ScreenContainer
        title="BADGE INFO"
        subtitle={currentAch.date}
        footerHints={[{ key: 'B', label: 'LIST' }]}
      >
        <div className="flex flex-col gap-3 py-1 font-mono">
          <div className="flex items-center gap-3 bg-[#171A24] p-3 border-2 border-[#252A38] rounded-md shadow-md">
            <span className="text-[#C96B3B] text-2xl">{currentAch.icon}</span>
            <div>
              <span className="pixel-text text-sm sm:text-base text-[#F1E7C8] font-black block">
                {currentAch.title}
              </span>
              <span className="pixel-text text-xs text-[#C7D49A] font-bold">
                UNLOCKED: {currentAch.date}
              </span>
            </div>
          </div>

          <div className="bg-[#171A24] p-3 border border-[#252A38] rounded-md">
            <span className="pixel-text text-[10px] text-[#527A8A] font-bold block mb-1">
              DESCRIPTION
            </span>
            <p className="pixel-text text-xs leading-relaxed text-[#8FA878]">
              {currentAch.description}
            </p>
          </div>
        </div>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      title="BADGES"
      subtitle={`${achievements.length} UNLOCKED`}
      footerHints={[
        { key: '▲▼', label: 'SELECT' },
        { key: 'A', label: 'VIEW' },
        { key: 'B', label: 'MENU' },
      ]}
    >
      <div className="flex flex-col gap-2 py-1 font-mono">
        {achievements.map((ach, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <div
              key={ach.id}
              onClick={() => pressButton('A')}
              className={`flex items-center justify-between p-2.5 rounded cursor-pointer border transition-colors ${
                isSelected
                  ? 'bg-[#252A38] border-[#C96B3B] text-[#F1E7C8] shadow-md'
                  : 'bg-[#171A24]/60 border-transparent text-[#8FA878] hover:bg-[#1f2430]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[#C96B3B] text-base">{ach.icon}</span>
                <span className="pixel-text text-xs sm:text-[13px] font-bold">{ach.title}</span>
              </div>
              <span className="pixel-text text-xs text-[#527A8A] font-bold">{ach.date}</span>
            </div>
          );
        })}
      </div>
    </ScreenContainer>
  );
}

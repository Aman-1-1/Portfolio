'use client';

import React from 'react';
import ScreenContainer from './ScreenContainer';
import { usePortfolioData } from '@/lib/portfolio-context';

export default function ExperienceScreen() {
  const { experience } = usePortfolioData();

  return (
    <ScreenContainer
      title="EXPERIENCE"
      subtitle="TIMELINE"
      footerHints={[{ key: 'B', label: 'MENU' }]}
    >
      <div className="flex flex-col gap-3 py-1 relative pl-3">
        {/* Retro vertical tree line */}
        <div className="absolute left-[6px] top-3 bottom-3 w-[2px] bg-[#527A8A]" />

        {experience.map((exp) => (
          <div key={exp.id} className="relative pl-4 flex flex-col gap-1">
            {/* Timeline node */}
            <div className="absolute left-[-2px] top-1.5 w-2.5 h-2.5 bg-[#C96B3B] border-2 border-[#F1E7C8] rounded-sm" />

            <div className="flex justify-between items-baseline">
              <span className="pixel-text text-xs sm:text-[13px] text-[#F1E7C8] font-black">
                {exp.role}
              </span>
              <span className="pixel-text text-[10px] text-[#C7D49A] font-mono font-bold">
                {exp.year}
              </span>
            </div>

            <span className="pixel-text text-[10px] text-[#C96B3B] font-mono font-semibold">
              {exp.company} • {exp.period}
            </span>

            <p className="pixel-text text-xs leading-relaxed text-[#8FA878] mt-0.5">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </ScreenContainer>
  );
}

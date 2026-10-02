'use client';

import React from 'react';
import ScreenContainer from './ScreenContainer';
import { usePortfolioData } from '@/lib/portfolio-context';

export default function EducationScreen() {
  const { education } = usePortfolioData();

  return (
    <ScreenContainer
      title="EDUCATION"
      subtitle="ACADEMIC"
      footerHints={[{ key: 'B', label: 'MENU' }]}
    >
      <div className="flex flex-col gap-3 py-1 font-mono">
        <div className="bg-[#171A24] p-3 border-2 border-[#252A38] rounded-md flex flex-col gap-1 shadow-md">
          <span className="pixel-text text-sm sm:text-base text-[#F1E7C8] font-black">
            {education.degree}
          </span>
          <span className="pixel-text text-xs text-[#C96B3B] font-bold">
            {education.university}
          </span>
          <div className="flex justify-between items-center text-xs mt-1 text-[#527A8A]">
            <span>{education.period}</span>
            {education.gpa && (
              <span className="text-[#C7D49A] font-bold">GPA: {education.gpa}</span>
            )}
          </div>
        </div>

        <div className="bg-[#171A24] p-3 border border-[#252A38] rounded-md">
          <span className="pixel-text text-xs text-[#8FA878] font-bold block mb-2">
            &gt; CORE DISCIPLINES
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {education.areas.map((area, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="text-[#C96B3B] text-[8px]">◆</span>
                <span className="pixel-text text-[#F1E7C8] font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

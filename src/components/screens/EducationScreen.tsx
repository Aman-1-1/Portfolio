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
        {education.map((edu, idx) => (
          <div key={edu.id ?? idx} className="flex flex-col gap-2">
            {/* Degree header card */}
            <div className="bg-[#171A24] p-3 border-2 border-[#252A38] rounded-md flex flex-col gap-1 shadow-md">
              {education.length > 1 && (
                <span className="pixel-text text-[9px] text-[#527A8A] font-bold tracking-widest uppercase mb-0.5">
                  #{idx + 1}
                </span>
              )}
              <span className="pixel-text text-sm sm:text-base text-[#F1E7C8] font-black">
                {edu.degree}
              </span>
              <span className="pixel-text text-xs text-[#C96B3B] font-bold">
                {edu.university}
              </span>
              <div className="flex justify-between items-center text-xs mt-1 text-[#527A8A]">
                <span>{edu.period}{edu.expectedGraduation && ` · Expected ${edu.expectedGraduation}`}</span>
                {edu.gpa && (
                  <span className="text-[#C7D49A] font-bold">GPA: {edu.gpa}</span>
                )}
              </div>
            </div>

            {/* Core disciplines */}
            {edu.areas && edu.areas.length > 0 && (
              <div className="bg-[#171A24] p-3 border border-[#252A38] rounded-md">
                <span className="pixel-text text-xs text-[#8FA878] font-bold block mb-2">
                  &gt; CORE DISCIPLINES
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {edu.areas.map((area, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-[#C96B3B] text-[8px]">◆</span>
                      <span className="pixel-text text-[#F1E7C8] font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Divider between entries */}
            {idx < education.length - 1 && (
              <div className="border-t border-[#252A38] my-1" />
            )}
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-[#527A8A] text-xs pixel-text text-center py-4">
            NO EDUCATION DATA LOADED
          </div>
        )}
      </div>
    </ScreenContainer>
  );
}

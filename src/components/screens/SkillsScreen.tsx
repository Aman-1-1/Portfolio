'use client';

import React from 'react';
import { useGBA } from '@/lib/gba-state';
import ScreenContainer from './ScreenContainer';
import { usePortfolioData } from '@/lib/portfolio-context';

export default function SkillsScreen() {
  const { state, dispatch } = useGBA();
  const { skills } = usePortfolioData();

  const currentTab = state.skillTab; // 0: Bars view, 1: Categorized view

  const renderMeter = (level: number) => {
    const totalBars = 12;
    const filledBars = Math.round((level / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return '█'.repeat(filledBars) + '░'.repeat(emptyBars);
  };

  return (
    <ScreenContainer
      title="SKILLS"
      subtitle={currentTab === 0 ? 'PAGE 1/2' : 'PAGE 2/2'}
      footerHints={[
        { key: '◄►', label: 'TAB' },
        { key: 'SEL', label: 'SWITCH' },
        { key: 'B', label: 'MENU' },
      ]}
    >
      {/* Tab Header */}
      <div className="flex justify-around border-b-2 border-[#252A38] pb-1.5 mb-2">
        <button
          onClick={() => dispatch({ type: 'SET_SKILL_TAB', tab: 0 })}
          className={`pixel-text text-xs font-mono font-bold cursor-pointer ${
            currentTab === 0 ? 'text-[#C96B3B] underline' : 'text-[#527A8A]'
          }`}
        >
          [ STATS ]
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_SKILL_TAB', tab: 1 })}
          className={`pixel-text text-xs font-mono font-bold cursor-pointer ${
            currentTab === 1 ? 'text-[#C96B3B] underline' : 'text-[#527A8A]'
          }`}
        >
          [ CATEGORIES ]
        </button>
      </div>

      {currentTab === 0 ? (
        /* Tab 1: Retro Stat Bars */
        <div className="flex flex-col gap-2 py-1">
          {skills.slice(0, 8).map((skill) => (
            <div key={skill.id} className="flex justify-between items-center text-xs font-mono">
              <span className="pixel-text text-[#F1E7C8] uppercase tracking-wide font-bold">
                {skill.name}
              </span>
              <span className="font-mono text-[#8FA878] tracking-widest text-xs font-bold">
                {renderMeter(skill.level)}
              </span>
            </div>
          ))}
          <p className="pixel-text text-[9px] text-[#527A8A] text-center mt-2 font-mono">
            *Visual representation only
          </p>
        </div>
      ) : (
        /* Tab 2: Categorized Tech Stack */
        <div className="flex flex-col gap-2 py-1">
          {['frontend', 'backend', 'database', 'tools'].map((cat) => {
            const items = skills.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="bg-[#171A24] p-2 rounded border border-[#252A38]">
                <span className="pixel-text text-[10px] text-[#C96B3B] uppercase font-bold block mb-1">
                  &gt; {cat}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((it) => (
                    <span
                      key={it.id}
                      className="pixel-text text-[10px] bg-[#252A38] text-[#C7D49A] px-2 py-0.5 rounded font-mono font-bold"
                    >
                      {it.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ScreenContainer>
  );
}

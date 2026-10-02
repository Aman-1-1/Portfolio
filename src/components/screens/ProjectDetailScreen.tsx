'use client';

import React from 'react';
import { useGBA } from '@/lib/gba-state';
import ScreenContainer from './ScreenContainer';
import { usePortfolioData } from '@/lib/portfolio-context';

export default function ProjectDetailScreen() {
  const { state, dispatch } = useGBA();
  const { projects } = usePortfolioData();

  const selectedIndex =
    ((state.projectIndex % projects.length) + projects.length) % projects.length;
  const project = projects[selectedIndex] || projects[0];

  const currentTab = state.projectDetailTab; // 0: Overview, 1: Deep Dive

  return (
    <ScreenContainer
      title={project.title.toUpperCase()}
      subtitle={currentTab === 0 ? 'OVERVIEW' : 'DETAILS'}
      footerHints={[
        { key: '◄►', label: 'PAGE' },
        ...(project.liveUrl ? [{ key: 'A', label: 'LIVE' }] : []),
        ...(project.githubUrl ? [{ key: 'SEL', label: 'CODE' }] : []),
        { key: 'B', label: 'BACK' },
      ]}
    >
      {/* Tab toggle */}
      <div className="flex justify-around border-b-2 border-[#252A38] pb-1 mb-2">
        <button
          onClick={() => dispatch({ type: 'SET_PROJECT_DETAIL_TAB', tab: 0 })}
          className={`pixel-text text-xs font-mono font-bold cursor-pointer ${
            currentTab === 0 ? 'text-[#C96B3B] underline' : 'text-[#527A8A]'
          }`}
        >
          [ 1. OVERVIEW ]
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_PROJECT_DETAIL_TAB', tab: 1 })}
          className={`pixel-text text-xs font-mono font-bold cursor-pointer ${
            currentTab === 1 ? 'text-[#C96B3B] underline' : 'text-[#527A8A]'
          }`}
        >
          [ 2. DEEP DIVE ]
        </button>
      </div>

      {currentTab === 0 ? (
        <div className="flex flex-col gap-2 text-xs font-mono">
          <div className="bg-[#171A24] p-2 border border-[#252A38] rounded">
            <span className="pixel-text text-[#527A8A] text-[10px] font-bold block mb-0.5">TYPE</span>
            <span className="pixel-text text-[#F1E7C8] text-xs font-bold">{project.type}</span>
          </div>

          <div className="bg-[#171A24] p-2 border border-[#252A38] rounded">
            <span className="pixel-text text-[#527A8A] text-[10px] font-bold block mb-1">TECH STACK</span>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="pixel-text text-[10px] bg-[#252A38] text-[#C7D49A] px-2 py-0.5 rounded font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#171A24] p-2.5 border border-[#252A38] rounded">
            <span className="pixel-text text-[#527A8A] text-[10px] font-bold block mb-1">DESCRIPTION</span>
            <p className="pixel-text text-xs leading-relaxed text-[#8FA878]">
              {project.description}
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex gap-2 mt-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-1.5 bg-[#252A38] hover:bg-[#C96B3B] hover:text-[#171A24] text-[#F1E7C8] text-[10px] font-bold rounded transition-colors"
              >
                GITHUB REPO ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-1.5 bg-[#8FA878] hover:bg-[#C7D49A] text-[#171A24] text-[10px] font-bold rounded transition-colors"
              >
                LIVE DEMO ↗
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 text-xs font-mono">
          {project.problem && (
            <div className="bg-[#171A24] p-2.5 border border-[#252A38] rounded">
              <span className="pixel-text text-[#C96B3B] text-[10px] font-bold block">PROBLEM STATEMENT</span>
              <p className="pixel-text text-xs text-[#F1E7C8] leading-relaxed mt-1">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div className="bg-[#171A24] p-2.5 border border-[#252A38] rounded">
              <span className="pixel-text text-[#8FA878] text-[10px] font-bold block">ENGINEERED SOLUTION</span>
              <p className="pixel-text text-xs text-[#C7D49A] leading-relaxed mt-1">{project.solution}</p>
            </div>
          )}

          {project.contribution && (
            <div className="bg-[#171A24] p-2.5 border border-[#252A38] rounded">
              <span className="pixel-text text-[#527A8A] text-[10px] font-bold block">MY CONTRIBUTION</span>
              <p className="pixel-text text-xs text-[#F1E7C8] leading-relaxed mt-1">{project.contribution}</p>
            </div>
          )}
        </div>
      )}
    </ScreenContainer>
  );
}

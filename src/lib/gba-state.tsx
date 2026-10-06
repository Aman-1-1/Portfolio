'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { GBAState, ScreenName, GBAButton } from '@/types/portfolio';

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: GBAState = {
  screen: 'boot',
  prevScreen: 'boot',
  menuIndex: 0,
  projectIndex: 0,
  projectDetailTab: 0,
  skillTab: 0,
  achievementIndex: 0,
  contactIndex: 0,
  resumeIndex: 0,
  soundEnabled: true,
  musicEnabled: false,
  transitioning: false,
  mode: 'gba',
  actionTrigger: 0,
};

// ─── Menu Items ───────────────────────────────────────────────────────────────

export const MENU_ITEMS: Array<{ label: string; screen: ScreenName }> = [
  { label: 'PROFILE', screen: 'profile' },
  { label: 'SKILLS', screen: 'skills' },
  { label: 'PROJECTS', screen: 'projects' },
  { label: 'EXPERIENCE', screen: 'experience' },
  { label: 'EDUCATION', screen: 'education' },
  { label: 'ACHIEVEMENTS', screen: 'achievements' },
  { label: 'RESUME', screen: 'resume' },
  { label: 'CONTACT', screen: 'contact' },
];

// ─── Action Types ─────────────────────────────────────────────────────────────

type Action =
  | { type: 'NAVIGATE_TO'; screen: ScreenName }
  | { type: 'GO_BACK' }
  | { type: 'SET_MENU_INDEX'; index: number }
  | { type: 'SET_PROJECT_INDEX'; index: number }
  | { type: 'SET_PROJECT_DETAIL_TAB'; tab: number }
  | { type: 'SET_SKILL_TAB'; tab: number }
  | { type: 'SET_ACHIEVEMENT_INDEX'; index: number }
  | { type: 'SET_CONTACT_INDEX'; index: number }
  | { type: 'SET_RESUME_INDEX'; index: number }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_MUSIC' }
  | { type: 'SET_TRANSITIONING'; value: boolean }
  | { type: 'SET_MODE'; mode: 'gba' | 'portfolio' }
  | { type: 'BUTTON_PRESS'; button: GBAButton };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function gbaReducer(state: GBAState, action: Action): GBAState {
  switch (action.type) {
    case 'NAVIGATE_TO':
      return {
        ...state,
        prevScreen: state.screen,
        screen: action.screen,
        transitioning: false,
      };

    case 'GO_BACK':
      return {
        ...state,
        prevScreen: state.screen,
        screen: state.prevScreen === state.screen ? 'menu' : state.prevScreen,
        transitioning: false,
      };

    case 'SET_MENU_INDEX':
      return { ...state, menuIndex: action.index };

    case 'SET_PROJECT_INDEX':
      return { ...state, projectIndex: action.index };

    case 'SET_PROJECT_DETAIL_TAB':
      return { ...state, projectDetailTab: action.tab };

    case 'SET_SKILL_TAB':
      return { ...state, skillTab: action.tab };

    case 'SET_ACHIEVEMENT_INDEX':
      return { ...state, achievementIndex: action.index };

    case 'SET_CONTACT_INDEX':
      return { ...state, contactIndex: action.index };

    case 'SET_RESUME_INDEX':
      return { ...state, resumeIndex: action.index };

    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };

    case 'TOGGLE_MUSIC':
      return { ...state, musicEnabled: !state.musicEnabled };

    case 'SET_TRANSITIONING':
      return { ...state, transitioning: action.value };

    case 'SET_MODE':
      return { ...state, mode: action.mode };

    case 'BUTTON_PRESS':
      return handleButtonPress(state, action.button);

    default:
      return state;
  }
}

// ─── Button Press Logic ───────────────────────────────────────────────────────

function handleButtonPress(state: GBAState, button: GBAButton): GBAState {
  const { screen } = state;

  switch (button) {
    case 'START':
      if (screen === 'title') {
        return { ...state, prevScreen: screen, screen: 'menu' };
      }
      if (screen === 'menu') {
        return { ...state, prevScreen: screen, screen: 'title' };
      }
      return { ...state, prevScreen: screen, screen: 'menu' };

    case 'B':
      if (screen === 'boot' || screen === 'title') return state;
      if (screen === 'menu') {
        return { ...state, prevScreen: screen, screen: 'title' };
      }
      if (screen === 'project-detail') {
        return { ...state, prevScreen: screen, screen: 'projects', projectDetailTab: 0 };
      }
      if (screen === 'achievement-detail') {
        return { ...state, prevScreen: screen, screen: 'achievements' };
      }
      return { ...state, prevScreen: screen, screen: 'menu' };

    case 'A':
      if (screen === 'title') {
        return { ...state, prevScreen: screen, screen: 'menu' };
      }
      if (screen === 'menu') {
        const target = MENU_ITEMS[state.menuIndex]?.screen ?? 'profile';
        return { ...state, prevScreen: screen, screen: target };
      }
      if (screen === 'projects') {
        return { ...state, prevScreen: screen, screen: 'project-detail', projectDetailTab: 0 };
      }
      if (screen === 'achievements') {
        return { ...state, prevScreen: screen, screen: 'achievement-detail' };
      }
      // For contact and resume: don't navigate — just signal the screen to fire its action
      if (screen === 'contact' || screen === 'resume') {
        return { ...state, actionTrigger: state.actionTrigger + 1 };
      }
      return state;

    case 'UP':
      return handleDirectional(state, -1);

    case 'DOWN':
      return handleDirectional(state, 1);

    case 'LEFT':
      return handleHorizontal(state, -1);

    case 'RIGHT':
      return handleHorizontal(state, 1);

    case 'SELECT':
      if (screen === 'skills') {
        const tabs = 2;
        return { ...state, skillTab: (state.skillTab + 1) % tabs };
      }
      return state;

    default:
      return state;
  }
}

function handleDirectional(state: GBAState, dir: -1 | 1): GBAState {
  const { screen } = state;

  if (screen === 'menu') {
    const next = Math.max(0, Math.min(MENU_ITEMS.length - 1, state.menuIndex + dir));
    return { ...state, menuIndex: next };
  }
  if (screen === 'projects') {
    return { ...state, projectIndex: state.projectIndex + dir };
  }
  if (screen === 'achievements') {
    return { ...state, achievementIndex: state.achievementIndex + dir };
  }
  if (screen === 'contact') {
    return { ...state, contactIndex: state.contactIndex + dir };
  }
  if (screen === 'resume') {
    const next = Math.max(0, Math.min(1, state.resumeIndex + dir));
    return { ...state, resumeIndex: next };
  }
  return state;
}

function handleHorizontal(state: GBAState, dir: -1 | 1): GBAState {
  const { screen } = state;

  if (screen === 'skills') {
    const next = Math.max(0, Math.min(1, state.skillTab + dir));
    return { ...state, skillTab: next };
  }
  if (screen === 'project-detail') {
    const next = Math.max(0, Math.min(1, state.projectDetailTab + dir));
    return { ...state, projectDetailTab: next };
  }
  return state;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface GBAContextValue {
  state: GBAState;
  dispatch: React.Dispatch<Action>;
  pressButton: (button: GBAButton) => void;
  navigateTo: (screen: ScreenName) => void;
  goBack: () => void;
}

const GBAContext = createContext<GBAContextValue | null>(null);

export function GBAProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gbaReducer, initialState, (init) => {
    // Rehydrate sound preference from localStorage
    if (typeof window !== 'undefined') {
      const sound = localStorage.getItem('gba-sound');
      const music = localStorage.getItem('gba-music');
      return {
        ...init,
        soundEnabled: sound !== null ? sound === 'true' : true,
        musicEnabled: music !== null ? music === 'true' : false,
      };
    }
    return init;
  });

  const pressButton = useCallback((button: GBAButton) => {
    dispatch({ type: 'BUTTON_PRESS', button });
  }, []);

  const navigateTo = useCallback((screen: ScreenName) => {
    dispatch({ type: 'NAVIGATE_TO', screen });
  }, []);

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' });
  }, []);

  return (
    <GBAContext.Provider value={{ state, dispatch, pressButton, navigateTo, goBack }}>
      {children}
    </GBAContext.Provider>
  );
}

export function useGBA() {
  const ctx = useContext(GBAContext);
  if (!ctx) throw new Error('useGBA must be used within GBAProvider');
  return ctx;
}

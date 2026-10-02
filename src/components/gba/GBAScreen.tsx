'use client';

import React from 'react';
import { useGBA } from '@/lib/gba-state';
import { AnimatePresence, motion } from 'framer-motion';

// Screen imports
import BootScreen from '@/components/screens/BootScreen';
import TitleScreen from '@/components/screens/TitleScreen';
import MainMenu from '@/components/screens/MainMenu';
import ProfileScreen from '@/components/screens/ProfileScreen';
import SkillsScreen from '@/components/screens/SkillsScreen';
import ProjectsScreen from '@/components/screens/ProjectsScreen';
import ProjectDetailScreen from '@/components/screens/ProjectDetailScreen';
import ExperienceScreen from '@/components/screens/ExperienceScreen';
import EducationScreen from '@/components/screens/EducationScreen';
import AchievementsScreen from '@/components/screens/AchievementsScreen';
import ResumeScreen from '@/components/screens/ResumeScreen';
import ContactScreen from '@/components/screens/ContactScreen';
import SettingsScreen from '@/components/screens/SettingsScreen';

const screenVariants = {
  enter: { opacity: 0, y: 4 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

function renderScreen(screen: string) {
  switch (screen) {
    case 'boot': return <BootScreen />;
    case 'title': return <TitleScreen />;
    case 'menu': return <MainMenu />;
    case 'profile': return <ProfileScreen />;
    case 'skills': return <SkillsScreen />;
    case 'projects': return <ProjectsScreen />;
    case 'project-detail': return <ProjectDetailScreen />;
    case 'experience': return <ExperienceScreen />;
    case 'education': return <EducationScreen />;
    case 'achievements': return <AchievementsScreen />;
    case 'achievement-detail': return <AchievementsScreen showDetail />;
    case 'resume': return <ResumeScreen />;
    case 'contact': return <ContactScreen />;
    case 'settings': return <SettingsScreen />;
    default: return <TitleScreen />;
  }
}

export default function GBAScreen() {
  const { state } = useGBA();

  return (
    <div className="gba-screen">
      {/* Scanline overlay */}
      <div className="scanlines" aria-hidden="true" />
      {/* Screen glare */}
      <div className="screen-glare" aria-hidden="true" />

      <AnimatePresence mode="wait">
        <motion.div
          key={state.screen}
          variants={screenVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          {renderScreen(state.screen)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

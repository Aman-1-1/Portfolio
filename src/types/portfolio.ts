export interface CharacterConfig {
  enabled: boolean;
  neutralSprite: string;
  happySprite: string;
  animationEnabled: boolean;
  frameDuration: number;
}

export interface Profile {
  name: string;
  tagline: string;
  class: string;
  level: number;
  location: string;
  bio: string;
  avatar: string;
  status: string;
  character?: CharacterConfig;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

export interface Project {
  id: string;
  title: string;
  type: string;
  stack: string[];
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  contribution: string;
  challenges: string;
  results: string;
  liveUrl: string;
  githubUrl: string;
  image: string | null;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  year: string;
  type: 'fulltime' | 'parttime' | 'freelance' | 'internship' | 'open-source' | 'academic';
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  university: string;
  period: string;
  expectedGraduation: string;
  areas: string[];
  gpa: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  date: string;
  shortDescription: string;
  description: string;
  unlocked: boolean;
}

export interface Resume {
  viewUrl: string;
  downloadUrl: string;
  lastUpdated: string;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string | null;
  other: Array<{ label: string; url: string }>;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education;
  achievements: Achievement[];
  resume: Resume;
  contact: Contact;
  seo: SEO;
}

// GBA State types
export type ScreenName =
  | 'boot'
  | 'title'
  | 'menu'
  | 'profile'
  | 'skills'
  | 'projects'
  | 'project-detail'
  | 'experience'
  | 'education'
  | 'achievements'
  | 'achievement-detail'
  | 'resume'
  | 'contact'
  | 'settings';

export type GBAButton = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'A' | 'B' | 'START' | 'SELECT';

export interface GBAState {
  screen: ScreenName;
  prevScreen: ScreenName;
  menuIndex: number;
  projectIndex: number;
  projectDetailTab: number;
  skillTab: number;
  achievementIndex: number;
  contactIndex: number;
  resumeIndex: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  transitioning: boolean;
  mode: 'gba' | 'portfolio';
  /** Increments each time A is pressed on contact or resume screen so those screens can fire their action */
  actionTrigger: number;
}

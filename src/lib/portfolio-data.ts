import { getSupabase } from './supabase';
import initialPortfolioData from '@/../data/portfolio-data.json';
import type {
  PortfolioData,
  Profile,
  Skill,
  Project,
  Experience,
  Education,
  Achievement,
  Contact,
  CharacterConfig,
} from '@/types/portfolio';

const DEFAULT_CHARACTER: CharacterConfig = {
  enabled: true,
  neutralSprite: '/art/neutral.jpg',
  happySprite: '/art/happy.png',
  animationEnabled: true,
  frameDuration: 1000,
};

// Safe fallback using the existing comprehensive portfolio-data.json
const FALLBACK: PortfolioData = (initialPortfolioData as unknown as PortfolioData) || {
  profile: {
    name: 'Aman Regmi',
    tagline: 'Full Stack Developer',
    class: 'Developer',
    level: 1,
    location: '',
    bio: '',
    avatar: '',
    status: 'Active',
    character: DEFAULT_CHARACTER,
  },
  skills: [],
  projects: [],
  experience: [],
  education: [{ id: '1', degree: '', university: '', period: '', expectedGraduation: '', areas: [], gpa: '' }],
  achievements: [],
  resume: { viewUrl: '/resume.pdf', downloadUrl: '/resume.pdf', lastUpdated: '2024' },
  contact: { email: '', github: '', linkedin: null, other: [] },
  seo: { title: 'Aman Regmi Portfolio', description: '', keywords: [], ogImage: '' },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProfile(row: any): Profile {
  return {
    name: row?.name ?? FALLBACK.profile.name,
    tagline: row?.tagline ?? FALLBACK.profile.tagline,
    class: row?.class ?? FALLBACK.profile.class,
    level: row?.level ?? FALLBACK.profile.level,
    location: row?.location ?? FALLBACK.profile.location,
    bio: row?.bio ?? FALLBACK.profile.bio,
    avatar: '',
    status: row?.status ?? FALLBACK.profile.status,
    character: (row?.character as CharacterConfig) ?? FALLBACK.profile.character ?? DEFAULT_CHARACTER,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSkill(s: any): Skill {
  return {
    id: s.id,
    name: s.name ?? '',
    level: s.level ?? 0,
    category: s.category ?? 'tools',
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProject(p: any): Project {
  return {
    id: p.id,
    title: p.title ?? '',
    type: p.type ?? '',
    stack: p.stack ?? [],
    shortDescription: p.short_description ?? '',
    description: p.description ?? '',
    problem: p.problem ?? '',
    solution: p.solution ?? '',
    features: p.features ?? [],
    contribution: p.contribution ?? '',
    challenges: p.challenges ?? '',
    results: p.results ?? '',
    liveUrl: p.live_url ?? '',
    githubUrl: p.github_url ?? '',
    image: p.image_url ?? null,
    featured: p.featured ?? false,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapExperience(e: any): Experience {
  return {
    id: e.id,
    role: e.role ?? '',
    company: e.company ?? '',
    period: e.period ?? '',
    year: e.year ?? '',
    type: e.type ?? 'fulltime',
    description: e.description ?? '',
    highlights: e.highlights ?? [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEducation(row: any): Education {
  return {
    id: String(row?.id ?? ''),
    degree: row?.degree ?? '',
    university: row?.university ?? '',
    period: row?.period ?? '',
    expectedGraduation: row?.expected_graduation ?? '',
    areas: row?.areas ?? [],
    gpa: row?.gpa ?? '',
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAchievement(a: any): Achievement {
  return {
    id: a.id,
    title: a.title ?? '',
    icon: a.icon ?? '★',
    date: a.date ?? '',
    shortDescription: a.short_description ?? '',
    description: a.description ?? '',
    unlocked: a.unlocked ?? true,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapContact(row: any): Contact {
  return {
    email: row?.email ?? FALLBACK.contact.email,
    github: row?.github ?? FALLBACK.contact.github,
    linkedin: row?.linkedin ?? FALLBACK.contact.linkedin,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    other: (row?.other as Array<{ label: string; url: string }>) ?? FALLBACK.contact.other,
  };
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn('[portfolio-data] Supabase is not configured or missing keys. Falling back to default data.');
    return FALLBACK;
  }

  try {
    const [
      profileRes,
      skillsRes,
      projectsRes,
      expRes,
      eduRes,
      achieveRes,
      contactRes,
      settingsRes,
    ] = await Promise.all([
      supabase.from('profile').select('*').eq('id', 1).maybeSingle(),
      supabase.from('skills').select('*').order('sort_order'),
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('experience').select('*').order('sort_order'),
      supabase.from('education').select('*').order('sort_order'),
      supabase.from('achievements').select('*').order('sort_order'),
      supabase.from('contact').select('*').eq('id', 1).maybeSingle(),
      supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
    ]);

    if (!profileRes.data && (!projectsRes.data || projectsRes.data.length === 0)) {
      console.warn('[portfolio-data] Supabase tables returned empty. Falling back to default data.');
      return FALLBACK;
    }

    const s = settingsRes.data;

    return {
      profile: profileRes.data ? mapProfile(profileRes.data) : FALLBACK.profile,
      skills: (skillsRes.data && skillsRes.data.length > 0) ? skillsRes.data.map(mapSkill) : FALLBACK.skills,
      projects: (projectsRes.data && projectsRes.data.length > 0) ? projectsRes.data.map(mapProject) : FALLBACK.projects,
      experience: (expRes.data && expRes.data.length > 0) ? expRes.data.map(mapExperience) : FALLBACK.experience,
      education: (eduRes.data && eduRes.data.length > 0) ? eduRes.data.map(mapEducation) : FALLBACK.education,
      achievements: (achieveRes.data && achieveRes.data.length > 0) ? achieveRes.data.map(mapAchievement) : FALLBACK.achievements,
      resume: {
        viewUrl: s?.resume_view_url ?? FALLBACK.resume.viewUrl,
        downloadUrl: s?.resume_download_url ?? FALLBACK.resume.downloadUrl,
        lastUpdated: s?.resume_last_updated ?? FALLBACK.resume.lastUpdated,
      },
      contact: contactRes.data ? mapContact(contactRes.data) : FALLBACK.contact,
      seo: {
        title: s?.site_title ?? FALLBACK.seo.title,
        description: s?.seo_description ?? FALLBACK.seo.description,
        keywords: s?.seo_keywords ?? FALLBACK.seo.keywords,
        ogImage: s?.seo_og_image ?? FALLBACK.seo.ogImage,
      },
    };
  } catch (error) {
    console.error('[portfolio-data] Error fetching from Supabase, serving fallback:', error);
    return FALLBACK;
  }
}

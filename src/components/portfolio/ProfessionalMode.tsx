'use client';

import React from 'react';
import type { PortfolioData } from '@/types/portfolio';

export default function ProfessionalMode({ data }: { data: PortfolioData }) {
  const { profile, skills, projects, experience, education, achievements, contact, resume } = data;

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#d1d5db] font-sans antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Bar */}
        <header className="flex justify-between items-center pb-6 border-b border-gray-800">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{profile.name}</h1>
            <p className="text-sm text-[#C96B3B] font-mono mt-0.5">{profile.class}</p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-[#F1E7C8] bg-[#252A38] border border-[#527A8A]/50 rounded hover:border-[#C96B3B] transition-colors"
          >
            🎮 GBA MODE
          </a>
        </header>

        {/* About / Profile */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white tracking-wide uppercase font-mono text-[#C96B3B]">
            About Me
          </h2>
          <p className="text-base text-gray-300 leading-relaxed max-w-3xl">
            {profile.bio}
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400">
            <span>📍 {profile.location}</span>
            <span>⚡ {profile.status}</span>
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white tracking-wide uppercase font-mono text-[#C96B3B]">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {skills.map((s) => (
              <div
                key={s.id}
                className="bg-[#171A24] p-3 rounded border border-gray-800 flex justify-between items-center"
              >
                <span className="text-sm font-medium text-gray-200">{s.name}</span>
                <span className="text-xs font-mono text-[#8FA878]">{s.level}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white tracking-wide uppercase font-mono text-[#C96B3B]">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#171A24] p-5 rounded-lg border border-gray-800 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold text-white">{proj.title}</h3>
                    <span className="text-xs text-gray-400 font-mono">{proj.type}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    {proj.shortDescription || proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] bg-[#252A38] text-[#C7D49A] px-2 py-0.5 rounded font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2 border-t border-gray-800/60 text-xs font-mono">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#527A8A] hover:text-[#C96B3B] transition-colors"
                    >
                      Source Code →
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8FA878] hover:text-[#C7D49A] transition-colors"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-wide uppercase font-mono text-[#C96B3B]">
              Experience
            </h2>
            <div className="space-y-4 border-l-2 border-gray-800 pl-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#C96B3B]" />
                  <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                  <div className="flex justify-between text-xs text-gray-400 font-mono mb-1">
                    <span>{exp.company}</span>
                    <span>{exp.period}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-wide uppercase font-mono text-[#C96B3B]">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={edu.id ?? idx} className="bg-[#171A24] p-4 rounded border border-gray-800 space-y-2">
                <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                <p className="text-xs text-[#C96B3B]">{edu.university}</p>
                <p className="text-xs text-gray-400 font-mono">{edu.period}{edu.expectedGraduation && ` · Expected ${edu.expectedGraduation}`}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                {edu.areas && edu.areas.length > 0 && (
                  <div className="pt-2 border-t border-gray-800">
                    <span className="text-xs font-mono text-gray-400 block mb-1">Key Disciplines:</span>
                    <div className="flex flex-wrap gap-1">
                      {edu.areas.map((a: string, i: number) => (
                        <span key={i} className="text-[10px] bg-[#252A38] text-gray-300 px-2 py-0.5 rounded font-mono">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white tracking-wide uppercase font-mono text-[#C96B3B]">
            Achievements & Milestones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-[#171A24] p-3 rounded border border-gray-800 flex gap-3 items-start"
              >
                <span className="text-base text-[#C96B3B]">{ach.icon}</span>
                <div>
                  <h3 className="text-xs font-bold text-white">{ach.title}</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Resume Footer */}
        <footer className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-400">
          <div className="flex gap-4">
            <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
              {contact.email}
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={resume.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C96B3B] hover:underline"
            >
              Resume (PDF)
            </a>
          </div>
          <p>© {new Date().getFullYear()} Aman Regmi. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

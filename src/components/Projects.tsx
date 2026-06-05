import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, FolderGit, LayoutDashboard, Brain, HelpCircle, X, Check, FileText } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';

const churnImg = new URL('../../Data4Website/P1ProjectCustomerChurnAnalysis/CustomerChurnImage.png', import.meta.url).href;
const hospitalImg = new URL('../../Data4Website/P2HospitalManagementAnalyticsDashboard/Hospital Management.png', import.meta.url).href;
const hrImg = new URL('../../Data4Website/P3HRAnalyticsDashboard/HR Analytics.png', import.meta.url).href;

interface ProjectsProps {
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
}

export default function Projects({
  selectedProjectId,
  setSelectedProjectId,
}: ProjectsProps) {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #7B2FF7, #F107A3)',
  };

  // Find active project details for modal display
  const activeProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return PROJECTS.find((p) => p.id === selectedProjectId) || null;
  }, [selectedProjectId]);

  // High fidelity project metadata for the STAR framework display
  const starData = useMemo(() => {
    return {
      'customer-churn': {
        situation: 'Deep physical contract reliance led to higher standard churn on Month-to-Month customers subscribing via digital checks.',
        task: 'Trace specific user attrition drivers and deliver an interactive alert dashboard detailing retention strategies.',
        action: 'Extracted and structured 10,000 logs in SQL. Built Random Forest recall arrays. Translated findings into distinct Power BI KPI pages.',
        result: 'Achieved an overall 84% churn recall, reducing forecast client drop rates by 18%.'
      },
      'hr-analytics': {
        situation: 'Corporate leadership had zero structural oversight on employee attrition trends, calculating HR metrics via manual logs.',
        task: 'Design an end-to-end analytical pipeline to automatically slice attrition rates across team nodes and tenures.',
        action: 'Loaded data via database bridges. Engineered unpivoting triggers. Developed clean calculation cards with custom DAX expressions.',
        result: 'Pinpointed 24% peak Sales attrition, and reduced manual HR accounting cycles by 60%.'
      },
      'hospital-management': {
        situation: 'Bed-inventory ratios and diagnostic therapeutic pipelines were highly disjointed, causing peak waiting delays.',
        task: 'Assemble a unified administrative portal detailing patient loads, treatment margins, and physician slots.',
        action: 'Querying internal SQLite files. Formulated scheduling routines in Python. Deployed custom slicer matrices.',
        result: 'Mapped peak admission streams, resulting in a 15% lower patient wait duration.'
      }
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left" id="projects-page-container">
      {/* 1. Header Information */}
      <section className="space-y-4 mt-4">
        <h1 className="text-4xl font-extrabold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight">
          Analytical <span className="text-transparent bg-clip-text" style={gradientStyle}>Case Studies</span>
        </h1>
        <p className="text-[#6B7280] dark:text-[#9CA3AF] max-w-2xl font-sans text-base leading-relaxed">
          Real-world data analytics projects resolving critical business operational problems. Explore detailed insights and source repositories.
        </p>
      </section>

      {/* 2. Primary Case Study Grid representation */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="projects-cards-list">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            id={`project-card-full-${project.id}`}
            className="group flex flex-col bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D] hover:border-[#D6536D] dark:hover:border-[#D6536D] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Structured gray cover frame placeholder with project name */}
            <div className="h-48 bg-gray-50 dark:bg-[#212121] flex flex-col items-center justify-center p-6 border-b border-[#E5E7EB] dark:border-[#2D2D2D] text-center relative overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={
                    project.id === 'customer-churn'
                      ? churnImg
                      : project.id === 'hr-analytics'
                      ? hrImg
                      : hospitalImg
                  }
                  alt={project.title}
                  style={{ objectFit: 'cover', width: '100%', height: '100%', opacity: 1, display: 'block' }}
                  className="group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7B2FF7]/5 to-[#F107A3]/5 opacity-40" />
              </div>
              
              <span className="text-[10px] font-mono tracking-widest text-[#D6536D] uppercase mb-1 font-bold z-10">
                CASE STUDY
              </span>
              <span className="text-lg font-sans font-extrabold text-[#1F2937] dark:text-[#F3F4F6] line-clamp-1 px-4 z-10">
                {project.title}
              </span>
              
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-xs z-10">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFA2B6]/15 text-[#D6536D] border border-[#FFA2B6]/20"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Card Context info */}
            <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-extrabold text-[#1F2937] dark:text-[#F3F4F6] group-hover:text-[#D6536D] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-sans text-gray-500 font-medium italic mt-1">
                    {project.summary}
                  </p>
                </div>

                {/* Problem Statement block */}
                <div className="p-4 bg-red-50/40 dark:bg-red-955/10 border-l-4 border-[#FFA2B6] rounded-r-2xl space-y-1.5 text-xs">
                  <div className="font-sans font-bold text-[#D6536D] uppercase tracking-wider flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Problem Statement
                  </div>
                  <p className="text-gray-650 dark:text-gray-400 font-sans leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Insights summary ticks */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    KEY OUTCOMES:
                  </div>
                  <ul className="space-y-2">
                    {project.insights.slice(0, 2).map((insight, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs font-sans text-[#6B7280] dark:text-[#9CA3AF]">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed font-sans font-medium">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation Action Buttons footer */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProjectId(project.id)}
                  className="flex-grow px-4 py-2.5 text-xs font-sans font-bold text-gray-800 dark:text-gray-200 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-gray-700 hover:border-[#D6536D] hover:text-[#D6536D] rounded-xl text-center transition-all focus:outline-none cursor-pointer"
                  id={`view-project-details-btn-${project.id}`}
                >
                  View Details
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-[#2D2D2D] hover:bg-[#D6536D] text-white text-xs font-sans font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  id={`project-github-repo-link-${project.id}`}
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Repo
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Detailed Modal Overlay Case Study */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            id="project-detail-modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white dark:bg-[#1A1A1A] max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-805 relative text-left"
            >
              {/* Colored top gradient decoration */}
              <div className="h-2 w-full" style={gradientStyle} />

              {/* Close Button Trigger header */}
              <button
                onClick={() => setSelectedProjectId(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-250 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:outline-none cursor-pointer"
                aria-label="Close details dialog"
                id="modal-close-trigger"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 space-y-8 max-h-[85vh] overflow-y-auto">
                {/* Title */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#D6536D] dark:text-[#FFA2B6] font-bold">
                    Interactive Portfolio Solution
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight">
                    {activeProject.title}
                  </h2>
                </div>

                {/* Tech Tags section */}
                <div className="flex flex-wrap gap-2">
                  {activeProject.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-sans font-bold tracking-wider text-[#1F2937] bg-[#FFA2B6] px-3 py-1 rounded-full uppercase"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Problem statement description callouts */}
                <div className="space-y-3 p-5 bg-red-50/40 dark:bg-red-955/10 border-l-4 border-[#FFA2B6] rounded-r-2xl">
                  <h4 className="font-sans font-bold text-[#D6536D] text-xs uppercase tracking-wide">
                    The Challenge (Problem)
                  </h4>
                  <p className="text-sm text-gray-755 dark:text-gray-300 font-sans leading-relaxed">
                    {activeProject.problem}
                  </p>
                </div>

                {/* Analytical framework STAR parameters */}
                {starData[activeProject.id as keyof typeof starData] && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#1F2937] dark:text-[#F3F4F6] border-b border-gray-200 dark:border-gray-800 pb-2">
                      STAR Framework Case Study
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#111111] space-y-1.5 border border-[#E5E7EB] dark:border-[#2D2D2D]">
                        <div className="font-black uppercase tracking-widest text-[#D6536D] text-[10px]">S — Situation</div>
                        <p className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                          {starData[activeProject.id as keyof typeof starData].situation}
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#111111] space-y-1.5 border border-[#E5E7EB] dark:border-[#2D2D2D]">
                        <div className="font-black uppercase tracking-widest text-[#D6536D] text-[10px]">T — Task</div>
                        <p className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                          {starData[activeProject.id as keyof typeof starData].task}
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#111111] space-y-1.5 border border-[#E5E7EB] dark:border-[#2D2D2D]">
                        <div className="font-black uppercase tracking-widest text-[#D6536D] text-[10px]">A — Action</div>
                        <p className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                          {starData[activeProject.id as keyof typeof starData].action}
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#111111] space-y-1.5 border border-[#E5E7EB] dark:border-[#2D2D2D]">
                        <div className="font-black uppercase tracking-widest text-[#D6536D] text-[10px]">R — Result</div>
                        <p className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                          {starData[activeProject.id as keyof typeof starData].result}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Outcomes Breakdown Details lists */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#1F2937] dark:text-[#F3F4F6] border-b border-gray-200 dark:border-gray-800 pb-2">
                    Key Outcomes & Core Insights
                  </h3>
                  <ul className="space-y-3 font-sans">
                    {activeProject.insights.map((insight, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                        <span className="w-6 h-6 rounded-full bg-[#FFA2B6]/15 hover:bg-[#FFA2B6]/25 text-[#D6536D] flex items-center justify-center font-bold text-xs shrink-0 select-none">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed font-sans">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer buttons links inside modal */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 items-center justify-end">
                  <button
                    onClick={() => setSelectedProjectId(null)}
                    className="px-5 py-2 text-sm font-sans font-bold text-gray-505 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 bg-[#EFB11D] hover:bg-[#EFB11D]/90 text-gray-905 font-sans font-bold rounded-xl shadow-sm transition-colors inline-flex items-center gap-2 text-sm"
                    id="modal-github-nav"
                  >
                    <Github className="w-4 h-4" />
                    Open GitHub Repo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

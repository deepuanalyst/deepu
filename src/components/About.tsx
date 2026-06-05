import { motion } from 'motion/react';
import {
  Database,
  BarChart3,
  FileSpreadsheet,
  Code,
  LineChart,
  LayoutDashboard,
  Eraser,
  TrendingUp,
  Layers,
  Sparkles,
  MapPin,
  Calendar,
  Award,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { EXPERIENCES, CERTIFICATIONS } from '../data';

// Custom skill visual parameters
const SKILLS_LIST = [
  {
    name: 'SQL',
    icon: Database,
    desc: 'Writing optimized recursive queries, high-performance window functions, and analytics schemas.'
  },
  {
    name: 'Power BI',
    icon: BarChart3,
    desc: 'Modeling multi-linked star schemas, tracking complex Dax logic context, and deploying dashboards.'
  },
  {
    name: 'Excel',
    icon: FileSpreadsheet,
    desc: 'Unlocking Pivot Tables, XLOOKUP functions, power query file loaders, and automated spreadsheets.'
  },
  {
    name: 'Python',
    icon: Code,
    desc: 'Wrangling dense arrays using Pandas and Numpy inside automated Jupyter environments.'
  },
  {
    name: 'Data Visualization',
    icon: LineChart,
    desc: 'Structuring neat visual guides and graphics to convey clear takeaways for key stakeholders.'
  },
  {
    name: 'Dashboard Development',
    icon: LayoutDashboard,
    desc: 'Designing highly interactive, corporate bento-grid templates tailored to business KPIs.'
  },
  {
    name: 'Data Cleaning',
    icon: Eraser,
    desc: 'Restoring missing keys, resolving format outliers, and scrubbing raw database pipelines.'
  },
  {
    name: 'Business Analytics',
    icon: TrendingUp,
    desc: 'Connecting statistical churn and performance equations with concrete monetary actions.'
  },
  {
    name: 'Data Modeling',
    icon: Layers,
    desc: 'Devising scalable relationship lines (1-to-Many models) to align disjointed tables.'
  },
  {
    name: 'Reporting Automation',
    icon: Sparkles,
    desc: 'Establishing automated schedules to cut repetitive administrative effort by 60%.'
  }
];

export default function About() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #7B2FF7, #F107A3)'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20 text-left" id="about-page-container">
      {/* 1. Hero Introduction Section */}
      <section className="mt-4" id="about-hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-4xl font-extrabold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight">
              About <span className="text-transparent bg-clip-text font-serif italic" style={gradientStyle}>Deepu</span>
            </h1>
            
            <div className="flex flex-wrap gap-4 items-center text-sm font-mono text-[#D6536D] dark:text-[#FFA2B6]">
              <span className="flex items-center gap-1.5 bg-[#FFA2B6]/15 border border-[#FFA2B6]/25 px-3.5 py-1.5 rounded-full">
                <MapPin className="w-4 h-4" />
                Delhi, India
              </span>
              <span className="flex items-center gap-1.5 bg-[#FFA2B6]/15 border border-[#FFA2B6]/25 px-3.5 py-1.5 rounded-full">
                <Briefcase className="w-4 h-4" />
                9+ Years Professional Experience
              </span>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-[#6B7280] dark:text-[#9CA3AF] text-base leading-relaxed font-sans">
              <p className="text-lg font-medium text-[#1F2937] dark:text-[#F3F4F6]">
                Results-driven Data Analyst with 9+ years of experience in reporting, data management, business analytics, MIS reporting, SQL, Python, Power BI, and Advanced Excel.
              </p>
              <p>
                Throughout my 9-year narrative in analytics, I have specialized in turning fragmented operational rows into robust corporate reports and visuals. Whether working alongside administrative teams at the <strong className="text-gray-900 dark:text-gray-100 font-semibold">Delhi Development Authority (DDA)</strong> auditing critical public records, or designing reporting dashboards at <strong className="text-gray-900 dark:text-gray-100 font-semibold">Intellipaat Software Solutions</strong>, I approach data with absolute diligence.
              </p>
              <p>
                My analytical philosophy centers on simplicity. I believe that most data questions can be answered clearly when the data pipelines are structured cleanly and the visualizations prioritize business-relevant KPIs. Beyond work, I run <strong className="text-gray-900 dark:text-gray-100 font-semibold">DataJourney.com</strong> to demystify complex formulas and database queries for aspiring data students.
              </p>
            </div>
          </div>

          {/* Quick Bio Card */}
          <div className="lg:col-span-4 bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D] hover:border-[#D6536D] dark:hover:border-[#D6536D] transition-all duration-300 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-[#1F2937] dark:text-[#F3F4F6] pb-2 border-b border-gray-200 dark:border-gray-800">
              Quick Highlights
            </h2>
            <ul className="space-y-4 text-sm font-sans text-gray-600 dark:text-gray-400">
              <li className="flex gap-2 items-start">
                <ChevronRight className="w-4.5 h-4.5 text-[#D6536D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Analytics Domain</strong>: Reporting, Automations, Attrition Modelling
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <ChevronRight className="w-4.5 h-4.5 text-[#D6536D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Primary Core</strong>: Power BI, SQL dialecting, SQLite, Excel Formula Modeling
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <ChevronRight className="w-4.5 h-4.5 text-[#D6536D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Key Education</strong>: MIS Office Automation, Data Analytics Specialties
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <ChevronRight className="w-4.5 h-4.5 text-[#D6536D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Delhi Reach</strong>: Deeply integrated across regional developer networks
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Skills & Tools Grid */}
      <section id="about-skills">
        <h2 className="text-3xl font-bold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight mb-8">
          Skills & Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {SKILLS_LIST.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                id={`skill-card-${index}`}
                className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E5E7EB] dark:border-[#2D2D2D] hover:border-[#D6536D] dark:hover:border-[#D6536D] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col space-y-3"
              >
                <div className="p-2 w-10 h-10 rounded-xl flex items-center justify-center bg-[#FFA2B6]/20 text-[#D6536D] ring-2 ring-[#FFA2B6]/10">
                  <IconComponent className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="text-base font-extrabold text-[#1F2937] dark:text-[#F3F4F6]">
                  {skill.name}
                </h3>
                <p className="text-xs font-sans text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Experience Vertical Timeline */}
      <section id="about-experience">
        <h2 className="text-3xl font-bold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight mb-10">
          Work Experience
        </h2>
        
        {/* Timeline representation structure */}
        <div className="relative border-l-2 border-gray-200 dark:border-gray-805 ml-4 pl-8 space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <div key={exp.id} className="relative" id={`timeline-item-${index}`}>
               {/* Timeline marker icon/circle */}
               <span className="absolute -left-12 top-1 w-8 h-8 rounded-full border-2 border-white dark:border-[#0F0F0F] bg-white dark:bg-[#111111] text-[#D6536D] flex items-center justify-center shadow-sm">
                <Briefcase className="w-4 h-4" />
              </span>

              {/* Card Container */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E5E7EB] dark:border-[#2D2D2D] hover:border-[#D6536D] dark:hover:border-[#D6536D] hover:shadow-md transition-all duration-300 text-left space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#1F2937] dark:text-[#F3F4F6]">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-sans font-bold text-[#D6536D]">
                      {exp.company}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FFA2B6]/15 border border-[#FFA2B6]/20 text-[#D6536D] self-start sm:self-center">
                    <Calendar className="w-3 h-3" />
                    {exp.duration}
                  </span>
                </div>

                <ul className="space-y-2 text-sm text-[#6B7280] dark:text-[#9CA3AF] list-disc list-inside font-sans pl-1">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Certifications Section */}
      <section id="about-certifications" className="pb-8">
        <h2 className="text-3xl font-bold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight mb-8">
          Certifications
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              id={`cert-item-${cert.id}`}
              className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E5E7EB] dark:border-[#2D2D2D] flex items-start gap-4 hover:border-[#D6536D] dark:hover:border-[#D6536D] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="p-3 rounded-xl bg-[#FFA2B6]/20 text-[#D6536D] shrink-0">
                <Award className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-extrabold text-[#1F2937] dark:text-[#F3F4F6]">
                  {cert.name}
                </h3>
                {cert.issuer && (
                  <p className="text-xs font-mono text-[#D6536D] dark:text-[#FFA2B6]">
                    {cert.issuer}
                  </p>
                )}
                <span className="inline-block mt-2 text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                  Verified Credential
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

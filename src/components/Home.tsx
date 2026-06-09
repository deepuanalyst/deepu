import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ArrowRight, Mail, BookOpen, Clock, Heart, Award, ArrowDownToLine } from 'lucide-react';
import { BlogPost, Project, PageId } from '../types';
import { BLOGS, PROJECTS } from '../data';
import { SubtleParticlesCanvas } from './SubtleParticlesCanvas';
const profileImg = "https://media.licdn.com/dms/image/v2/D5603AQHwWY7Ka9OagA/profile-displayphoto-crop_800_800/B56Z6bNR0nGsAI-/0/1780720413509?e=1782345600&v=beta&t=8irbILSz94k5O9HrZHt5yrrashMbr2AwtqHzkexfd2Y";

interface HomeProps {
  setCurrentPage: (page: PageId) => void;
  onSelectBlog: (blogId: string) => void;
  onSelectProject: (projectId: string) => void;
}

export default function Home({
  setCurrentPage,
  onSelectBlog,
  onSelectProject,
}: HomeProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const featuredBlogs = BLOGS.filter((b) => b.isFeatured !== false).slice(0, 5);
  const featuredProjects = PROJECTS.filter((p) => p.isFeatured !== false).slice(0, 3);

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #7B2FF7, #F107A3)',
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }
    setErrorMessage('');
    setIsSubscribed(true);
    setEmail('');
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = "https://docs.google.com/document/d/1QJ246newgERmVSX4Yos3-9gAumWOhMdz/edit?usp=sharing&ouid=116319800419542307577&rtpof=true&sd=true";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-20 py-8" id="home-page-container">
      {/* 1. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 overflow-hidden" id="hero-section">
        {/* Subtle Background Particles */}
        <SubtleParticlesCanvas />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Avatar Grid */}
          <div className="lg:col-span-12 xl:col-span-5 flex justify-center order-2 lg:order-1 relative">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-full flex justify-center"
            >
              <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20 dark:opacity-30 translate-x-1 translate-y-2 w-full h-full max-w-[440px]" style={gradientStyle} />
              
              {/* Continuous subtle floating animation wrapper */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                  {/* Premium modern professional portrait card - dynamically animated with spring hover scale and lift */}
                <motion.div 
                  className="relative w-full max-w-[440px] h-[400px] max-h-[400px] rounded-[32px] overflow-hidden bg-white/40 dark:bg-black/10 backdrop-blur-sm p-1.5 border border-gray-150/50 dark:border-zinc-800/30 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                  id="hero-portrait-card"
                >
                  {/* Rotating Gradient Border (Appears & fades out on hover) */}
                  <div className="premium-border-container shadow-inner">
                    <div className="premium-border-inner-conic" />
                  </div>

                  <div className="relative w-full h-[400px] max-h-[400px] rounded-[24px] overflow-hidden bg-transparent flex items-center justify-center">
                    
                   {/* Sharp high-quality portrait image rendering full head, shoulders, and background design without cut off */}
                    <img 
                      src={profileImg} 
                      alt="Deepu Sharma" 
                      className="w-full h-full object-cover max-h-[400px]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Subtle vignette layer only at bottom right to ground the tag, keeping the rest of the yellow/white design bright and unaltered */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-transparent opacity-40 pointer-events-none" />
                    
                    {/* Elegant floating location tag */}
                    <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-[#0F0F0F]/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200/80 dark:border-zinc-800/85 shadow-sm">
                      <span className="text-[#D6536D] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        New Delhi, IN
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Key Details */}
          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFA2B6]/20 dark:bg-[#FFA2B6]/10 text-[#D6536D]">
                <span className="w-2 h-2 rounded-full cursor-pointer" style={{ backgroundColor: '#D6536D' }} />
                <span className="text-xs font-sans font-semibold tracking-wide">AnalystJourney.com</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight">
                Hey, I'm <span className="text-transparent bg-clip-text" style={gradientStyle}>Deepu</span>
              </h1>
              
              <p className="text-2xl font-sans font-semibold text-[#D6536D] tracking-wide">
                Data Analyst
              </p>
              
              <h2 className="text-xl sm:text-2xl font-sans font-medium text-[#1F2937] dark:text-[#F3F4F6] leading-snug">
                Turning Data into Actionable Business Insights
              </h2>
              
              <p className="text-[#6B7280] dark:text-[#9CA3AF] text-base leading-relaxed max-w-2xl font-sans">
                Results-driven Data Analyst with <span style={{ color: '#D6536D', fontWeight: 500 }}>1 year</span> of hands-on experience and <span style={{ color: '#D6536D', fontWeight: 500 }}>8+ years</span> in reporting, data management, business analytics, and operational support across govt. and pvt. sectors. Proficient in Advanced Excel, SQL, Power BI, and Python for dashboard development, automation, and data analysis. Skilled at transforming raw data into actionable insights to support data-driven business decisions.
              </p>
            </motion.div>

            {/* Actions Panel */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-4"
              id="hero-actions"
            >
              <button
                onClick={handleDownloadResume}
                className="px-6 py-3 bg-[#EFB11D] hover:bg-[#EFB11D]/90 text-gray-900 font-sans font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 focus:outline-none cursor-pointer"
                id="hero-download-resume-btn"
              >
                <ArrowDownToLine className="w-4 h-4" />
                Download Resume
              </button>
              
              <button
                onClick={() => setCurrentPage('projects')}
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-[#D6536D] dark:hover:border-[#D6536D] text-[#1F2937] dark:text-[#F3F4F6] hover:text-[#D6536D] dark:hover:text-[#D6536D] font-sans font-medium rounded-lg transition-all focus:outline-none cursor-pointer"
                id="hero-view-projects-btn"
              >
                View Projects
              </button>

              <button
                onClick={() => setCurrentPage('blog')}
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-[#D6536D] dark:hover:border-[#D6536D] text-[#1F2937] dark:text-[#F3F4F6] hover:text-[#D6536D] dark:hover:text-[#D6536D] font-sans font-medium rounded-lg transition-all focus:outline-none cursor-pointer"
                id="hero-read-blogs-btn"
              >
                Read Blogs
              </button>
            </motion.div>

            {/* Social Connect Link Handles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center space-x-6 pt-4 text-gray-500 dark:text-gray-400"
              id="hero-social-links"
            >
              <span className="text-xs font-mono tracking-widest uppercase">Connect:</span>
              <a
                href="https://www.linkedin.com/in/deepu-sharma-1062282a3/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#D6536D] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/deepuanalyst"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#D6536D] transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:analystjourney1@gmail.com"
                className="hover:text-[#D6536D] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Quick Stats Ticker */}
      <section className="bg-white dark:bg-[#131313] py-6 border-y border-[#E5E7EB] dark:border-[#2D2D2D] transition-all animate-fade-in" id="stats-bar-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { label: '9+ Years', tech: 'Experience' },
              { label: 'SQL & Python', tech: 'Core Tools' },
              { label: 'Power BI', tech: 'Visualization' },
              { label: 'Excel & MIS', tech: 'Expertise' },
              { label: 'Interactive KPIs', tech: 'Dashboard Dev' },
              { label: 'Delhi, India', tech: 'Location' },
            ].map((stat, i) => (
              <div
                key={i}
                className="space-y-1 md:border-r border-gray-150 dark:border-[#2D2D2D] last:border-r-0 py-2 flex flex-col justify-center"
                id={`stat-chip-${i}`}
              >
                <div className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 font-mono">
                  {stat.tech}
                </div>
                <div className="text-sm sm:text-base font-extrabold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Blogs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-blogs-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight">
              Featured Articles
            </h2>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-sans mt-2">
              Practical tutorials to fast-track your path in Data Science and Analytics.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('blog')}
            className="flex items-center gap-1.5 text-sm font-sans font-semibold text-[#D6536D] hover:text-[#D6536D]/80 self-start transition-colors focus:outline-none cursor-pointer"
            id="view-all-blogs-btn"
          >
            See all articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Blog cards grid in modern bento architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="bento-blog-grid">
          {featuredBlogs.map((blog, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={blog.id}
                id={`featured-blog-card-${blog.id}`}
                className={`group flex flex-col justify-between bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D] overflow-hidden hover:border-[#D6536D] dark:hover:border-[#D6536D] transition-all duration-300 shadow-sm hover:shadow-md ${
                  isFirst ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Visual accent top line */}
                <div className="h-1.5 w-full" style={gradientStyle} />
                
                <div className="p-6 flex flex-col flex-grow text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[11px] font-sans font-bold tracking-wider text-[#1F2937] bg-[#FFA2B6] px-2.5 py-1 rounded-full uppercase" 
                      id={`featured-blog-tag-${idx}`}
                    >
                      {blog.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {blog.readTime}
                    </span>
                  </div>

                  <div className="flex-grow space-y-2">
                    <h3
                      onClick={() => onSelectBlog(blog.id)}
                      className={`font-sans font-extrabold text-[#1F2937] dark:text-[#F3F4F6] group-hover:text-[#D6536D] cursor-pointer transition-colors leading-snug line-clamp-2 ${
                        isFirst ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                      }`}
                    >
                      {blog.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-sans line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#2D2D2D] flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-500">{blog.publishedDate}</span>
                    <button
                      onClick={() => onSelectBlog(blog.id)}
                      className="text-xs font-sans font-bold text-[#D6536D] group-hover:underline flex items-center gap-1 focus:outline-none cursor-pointer"
                    >
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Projects Section */}
      <section className="bg-[#FFFDF9] dark:bg-[#111111] py-16 border-y border-[#E5E7EB] dark:border-[#2D2D2D] transition-colors duration-300" id="featured-projects-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="text-left">
              <h2 className="text-3xl font-bold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight">
                Featured Projects
              </h2>
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-sans mt-2">
                Detailed portfolio blueprints demonstrating analytics pipeline deployment.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('projects')}
              className="flex items-center gap-1.5 text-sm font-sans font-semibold text-[#D6536D] hover:text-[#D6536D]/80 self-start transition-colors focus:outline-none cursor-pointer"
              id="view-all-projects-btn"
            >
              See all case studies
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                id={`featured-project-card-${project.id}`}
                className="group flex flex-col bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D] hover:border-[#D6536D] dark:hover:border-[#D6536D] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Styled gray image box placeholder with section label */}
                <div className="h-44 bg-gray-50/50 dark:bg-[#212121] flex flex-col items-center justify-center p-6 border-b border-[#E5E7EB] dark:border-[#2D2D2D] group-hover:opacity-95 transition-all text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#D6536D]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#D6536D] uppercase mb-1">
                    PROJECT SYSTEM Blueprint
                  </span>
                  <span className="text-base font-sans font-extrabold text-[#1F2937] dark:text-[#F3F4F6] line-clamp-1 leading-snug px-2">
                    {project.title}
                  </span>
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {project.tools.slice(0, 3).map((tool, i) => (
                      <span key={i} className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FFA2B6] text-gray-905 font-bold">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 text-left flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-[#1F2937] dark:text-[#F3F4F6] line-clamp-1 group-hover:text-[#D6536D] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-sans line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/80">
                    <button
                      onClick={() => onSelectProject(project.id)}
                      className="text-xs font-sans font-bold text-[#D6536D] hover:underline focus:outline-none cursor-pointer"
                      id={`home-view-project-btn-${project.id}`}
                    >
                      View Details
                    </button>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans text-gray-550 hover:text-gray-900 dark:hover:text-white transition-colors"
                      id={`home-github-project-btn-${project.id}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      Repo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Newsletter Block */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-8" id="newsletter-section">
        <div className="bg-[#FFFDF9] dark:bg-[#151515] rounded-2xl p-8 md:p-12 border border-[#E5E7EB] dark:border-[#2D2D2D] hover:border-[#D6536D] dark:hover:border-[#D6536D] text-center shadow-sm relative overflow-hidden transition-all duration-300">
          {/* Subtle design gradient accent edge overlay */}
          <div className="absolute top-0 left-0 right-0 h-1.5" style={gradientStyle} />
          
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-extrabold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight">
              Join Analyst Journey
            </h2>
            <p className="text-base text-[#6B7280] dark:text-[#9CA3AF] font-sans leading-relaxed">
              Subscribe to receive advanced Excel, SQL, Power BI, and Python tutorial archives directly inside your inbox. No spam. Unsubscribe at any time.
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-6 rounded-xl inline-block"
                id="newsletter-success-notif"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">✓</span>
                  <div className="text-emerald-900 dark:text-emerald-100 font-sans font-bold">Successfully Subscribed!</div>
                  <div className="text-emerald-700 dark:text-emerald-400 text-xs font-mono">You are added to analystjourney1@gmail.com digest queue.</div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4 max-w-sm mx-auto" id="newsletter-form">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter business email"
                    className="flex-grow px-4 py-3 rounded-xl border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#111111] text-[#1F2937] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#D6536D] text-sm transition-all"
                    aria-label="Email Address"
                    id="newsletter-email-input"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#EFB11D] hover:bg-[#EFB11D]/90 text-gray-905 font-sans font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                    id="newsletter-submit-btn"
                  >
                    Subscribe
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-red-500 font-sans text-xs text-left px-1 mt-1" id="newsletter-error-msg">
                    {errorMessage}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

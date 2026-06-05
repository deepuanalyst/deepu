import { Github, Linkedin, Mail } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const logoStyle = {
    backgroundImage: 'linear-gradient(to right, #7B2FF7, #F107A3)',
  };

  const handleLinkClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-gray-300 py-12 border-t border-[#2D2D2D]" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#2D2D2D]">
          {/* Left Column: Logo & Tagline */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-2xl font-bold bg-clip-text text-transparent hover:opacity-90 transition-opacity self-start focus:outline-none cursor-pointer"
              style={logoStyle}
              id="footer-logo-btn"
            >
              DataJourney
            </button>
            <p className="text-sm text-gray-400 font-sans max-w-xs">
              Turning Data into Actionable Business Insights. Practical Excel, SQL, Power BI, and Python reviews.
            </p>
          </div>

          {/* Center Column: Quick Navigation Links */}
          <div className="flex flex-col space-y-2 md:items-center">
            <span className="text-white font-sans font-semibold text-sm tracking-wider uppercase mb-2">
              Quick Links
            </span>
            <div className="flex flex-col space-y-2 md:items-center">
              {(['home', 'about', 'blog', 'projects', 'contact'] as PageId[]).map((page) => (
                <button
                  key={page}
                  id={`footer-nav-${page}`}
                  onClick={() => handleLinkClick(page)}
                  className="text-gray-400 hover:text-white capitalize transition-colors text-sm focus:outline-none cursor-pointer"
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Social Connection Details */}
          <div className="flex flex-col space-y-4 md:items-end">
            <span className="text-white font-sans font-semibold text-sm tracking-wider uppercase">
              Connect With Me
            </span>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/deepu-sharma-1062282a3/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#2D2D2D] hover:bg-[#D6536D] text-white rounded-full transition-all"
                aria-label="LinkedIn Profile"
                id="footer-social-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/deepuanalyst"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#2D2D2D] hover:bg-[#D6536D] text-white rounded-full transition-all"
                aria-label="GitHub Profile"
                id="footer-social-github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:analystjourney1@gmail.com"
                className="p-2.5 bg-[#2D2D2D] hover:bg-[#D6536D] text-white rounded-full transition-all"
                aria-label="Email Address"
                id="footer-social-email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="text-sm font-mono text-gray-400 md:text-right space-y-1">
              <div>analystjourney1@gmail.com</div>
              <div className="text-xs text-gray-500">Delhi, India</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono">
          <div>© 2026 Deepu | Data Analyst</div>
          <div className="mt-2 sm:mt-0 italic">DataJourney.com</div>
        </div>
      </div>
    </footer>
  );
}

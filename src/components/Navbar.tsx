import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  isDarkMode,
  setIsDarkMode,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Blog' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const logoStyle = {
    backgroundImage: 'linear-gradient(to right, #7B2FF7, #F107A3)',
  };

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#E5E7EB] dark:border-[#2D2D2D] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="font-sans text-xl sm:text-2xl font-bold bg-clip-text text-transparent hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
              style={logoStyle}
              id="nav-logo-btn"
            >
              DataJourney
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-1 py-2 font-sans font-medium text-sm transition-all focus:outline-none cursor-pointer ${
                    isActive
                      ? 'bg-clip-text text-transparent font-bold'
                      : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#D6536D] dark:hover:text-[#D6536D]'
                  }`}
                  style={isActive ? logoStyle : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={logoStyle}
                    />
                  )}
                </button>
              );
            })}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 mr-1 rounded-lg text-[#6B7280] dark:text-[#9CA3AF] hover:bg-[#FFFDF9] dark:hover:bg-[#1A1A1A] border border-transparent hover:border-[#E5E7EB] dark:hover:border-[#2D2D2D] transition-all focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
              id="theme-toggle-desktop"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-[#D6536D]" />
              )}
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Dark Mode Toggle Mobile */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-[#6B7280] dark:text-[#9CA3AF] focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
              id="theme-toggle-mobile"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-[#D6536D]" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#1F2937] dark:text-[#F3F4F6] hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none cursor-pointer"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Main Menu"
              id="mobile-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1A1A1A] border-b border-[#E5E7EB] dark:border-[#2D2D2D] shadow-lg absolute left-0 right-0 py-2 px-4 transition-colors duration-300">
          <div className="space-y-1 mx-auto max-w-md pb-3 pt-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-sans font-medium text-base transition-colors duration-200 focus:outline-none cursor-pointer ${
                    isActive
                      ? 'bg-clip-text text-transparent font-bold border-l-4'
                      : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#D6536D] hover:bg-[#FFFDF9] dark:hover:bg-[#212121]'
                  }`}
                  style={
                    isActive
                      ? {
                          ...logoStyle,
                          borderLeftColor: '#D6536D',
                        }
                      : undefined
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

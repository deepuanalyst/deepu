import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { PageId } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Synchronise dark mode state with document class list
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Support direct route queries e.g. /?blog=some-id or /?project=some-id
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const blogIdVal = params.get('blog');
    const projectIdVal = params.get('project');
    const tabVal = params.get('tab');

    if (blogIdVal) {
      setSelectedPostId(blogIdVal);
      setCurrentPage('blog');
    } else if (projectIdVal) {
      setSelectedProjectId(projectIdVal);
      setCurrentPage('projects');
    } else if (tabVal && ['home', 'about', 'blog', 'projects', 'contact'].includes(tabVal)) {
      setCurrentPage(tabVal as PageId);
    }
  }, []);

  // Intercept blog selections from external elements/home grid
  const handleSelectBlog = (blogId: string) => {
    setSelectedPostId(blogId);
    setCurrentPage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Intercept project selections from external elements/home grid
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('projects');
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            setCurrentPage={setCurrentPage}
            onSelectBlog={handleSelectBlog}
            onSelectProject={handleSelectProject}
          />
        );
      case 'about':
        return <About />;
      case 'blog':
        return (
          <Blog
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        );
      case 'projects':
        return (
          <Projects
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
          />
        );
      case 'contact':
        return <Contact />;
      default:
        return (
          <Home
            setCurrentPage={setCurrentPage}
            onSelectBlog={handleSelectBlog}
            onSelectProject={handleSelectProject}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-[#0F0F0F] text-[#1F2937] dark:text-[#F3F4F6] transition-colors duration-300">
      {/* Navigation Headers Bar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          // If we navigate to Blog via main tabs, clear any isolated post filter standard views
          if (page === 'blog') {
            setSelectedPostId(null);
          }
          if (page === 'projects') {
            setSelectedProjectId(null);
          }
        }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Container Content */}
      <main className="flex-grow pt-16" id="main-content-layout">
        <div className="bg-white dark:bg-[#0F0F0F] transition-colors duration-300">
          {renderActivePage()}
        </div>
      </main>

      {/* Primary Footer Coordinates */}
      <Footer
        setCurrentPage={(page) => {
          setCurrentPage(page);
          if (page === 'blog') {
            setSelectedPostId(null);
          }
          if (page === 'projects') {
            setSelectedProjectId(null);
          }
        }}
      />
    </div>
  );
}

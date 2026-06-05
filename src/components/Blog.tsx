import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Clock,
  ArrowRight,
  Share2,
  Linkedin,
  Twitter,
  Copy,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Heart,
  BookOpen,
  ArrowUp
} from 'lucide-react';
import { BlogPost } from '../types';
import { BLOGS } from '../data';

const getCategoryGradient = (category: string) => {
  switch (category) {
    case 'Excel':
      return { from: '#16a34a', to: '#15803d' };
    case 'SQL':
      return { from: '#1d4ed8', to: '#1e40af' };
    case 'Power BI':
      return { from: '#d97706', to: '#b45309' };
    case 'Python':
      return { from: '#7c3aed', to: '#6d28d9' };
    case 'Career Guidance':
      return { from: '#db2777', to: '#be185d' };
    default:
      return { from: '#1e293b', to: '#0f172a' };
  }
};

const getCategoryEmoji = (category: string) => {
  switch (category) {
    case 'Excel':
      return '📊';
    case 'SQL':
      return '🗄️';
    case 'Power BI':
      return '📈';
    case 'Python':
      return '🐍';
    case 'Career Guidance':
      return '🚀';
    default:
      return '📝';
  }
};

function PlaceholderSvg({ category, title }: { category: string; title: string }) {
  const grad = getCategoryGradient(category);
  const emoji = getCategoryEmoji(category);
  const words = title.split(/\s+/).slice(0, 4).join(' ');
  const gradientId = `grad-${category.replace(/\s+/g, '-').toLowerCase()}-${title.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8)}`;

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 400 250" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={grad.from} />
          <stop offset="100%" stopColor={grad.to} />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
      
      <text 
        x="50%" 
        y="60" 
        textAnchor="middle" 
        fill="#ffffff" 
        opacity="0.8" 
        fontSize="12" 
        fontWeight="bold" 
        letterSpacing="2"
        fontFamily="sans-serif"
      >
        {category.toUpperCase()}
      </text>
      
      <text 
        x="50%" 
        y="135" 
        textAnchor="middle" 
        fontSize="48"
        fontFamily="sans-serif"
      >
        {emoji}
      </text>
      
      <text 
        x="50%" 
        y="190" 
        textAnchor="middle" 
        fill="#ffffff" 
        fontSize="15" 
        fontWeight="bold" 
        fontFamily="sans-serif"
      >
        {words}
      </text>
    </svg>
  );
}

interface BlogProps {
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
}

export default function Blog({ selectedPostId, setSelectedPostId }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copySuccess, setCopySuccess] = useState(false);

  const blogsWithImages = useMemo(() => {
    return BLOGS.map((blog) => ({
      ...blog,
      image: blog.image || '',
    }));
  }, []);

  // Filter Categories
  const categories = ['All', 'Excel', 'SQL', 'Power BI', 'Python', 'Career Guidance'];

  // Handle auto scroll-to-top when opening post details
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPostId]);

  // Filtered post listings
  const filteredBlogs = useMemo(() => {
    return blogsWithImages.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const cleanQuery = searchQuery.toLowerCase().trim();
      const matchesSearch =
        post.title.toLowerCase().includes(cleanQuery) ||
        post.excerpt.toLowerCase().includes(cleanQuery) ||
        post.content.toLowerCase().includes(cleanQuery) ||
        post.category.toLowerCase().includes(cleanQuery);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, blogsWithImages]);

  // Featured Hero Article (displays the first featured post in results)
  const heroPost = useMemo(() => {
    return blogsWithImages.find((p) => p.isFeatured) || blogsWithImages[0];
  }, [blogsWithImages]);

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #7B2FF7, #F107A3)',
  };

  const handleCopyLink = (postId: string) => {
    const url = `${window.location.origin}/?blog=${postId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  // Find currently active post details
  const activePost = useMemo(() => {
    if (!selectedPostId) return null;
    return blogsWithImages.find((p) => p.id === selectedPostId) || null;
  }, [selectedPostId, blogsWithImages]);

  // Extract table of contents headings (lines beginning with '##' or '###')
  const tocItems = useMemo(() => {
    if (!activePost) return [];
    const lines = activePost.content.split('\n');
    return lines
      .filter((line) => line.startsWith('## ') || line.startsWith('### '))
      .map((line) => {
        const isSub = line.startsWith('### ');
        const text = line.replace(/^##* /, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { text, id, isSub };
      });
  }, [activePost]);

  // Render processed markdown segments
  const renderContentHtml = (text: string) => {
    const lines = text.split('\n');
    let insideTable = false;
    let tableRows: string[][] = [];

    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Handle images e.g. ![Alt Text](url)
      if (trimmed.startsWith('![') && trimmed.includes('](')) {
        insideTable = false;
        const altText = trimmed.substring(trimmed.indexOf('[') + 1, trimmed.indexOf(']'));
        const imageUrl = trimmed.substring(trimmed.indexOf('](') + 2, trimmed.lastIndexOf(')'));
        return (
          <div key={idx} className="my-6 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm max-w-3xl mx-auto">
            <img 
              src={imageUrl} 
              alt={altText} 
              className="w-full h-auto object-contain mx-auto select-none" 
              referrerPolicy="no-referrer"
            />
          </div>
        );
      }

      // Handle custom headings
      if (trimmed.startsWith('## ')) {
        insideTable = false;
        const headingText = trimmed.replace('## ', '');
        const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return (
          <h2
            key={idx}
            id={id}
            className="text-2xl font-bold font-sans text-gray-950 dark:text-gray-50 mt-10 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800 scroll-mt-20 text-left"
          >
            {headingText}
          </h2>
        );
      }

      if (trimmed.startsWith('### ')) {
        const headingText = trimmed.replace('### ', '');
        const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return (
          <h3
            key={idx}
            id={id}
            className="text-lg font-bold font-sans text-gray-900 dark:text-gray-100 mt-6 mb-3 scroll-mt-20 text-left"
          >
            {headingText}
          </h3>
        );
      }

      // Handle table structures
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const rowData = trimmed
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());

        // Skip divider rows e.g. | :--- | :--- |
        if (rowData.every((cell) => cell.startsWith(':') || cell.startsWith('-') || cell === '')) {
          return null;
        }

        if (!insideTable) {
          insideTable = true;
          tableRows = [rowData];
          return null;
        } else {
          tableRows.push(rowData);
          // If the next line is not a table row, render accumulated table
          const isLastRow = idx === lines.length - 1 || !lines[idx + 1].trim().startsWith('|');
          if (isLastRow) {
            insideTable = false;
            const headers = tableRows[0];
            const bodies = tableRows.slice(1);
            return (
              <div key={idx} className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <table className="w-full text-left text-sm border-collapse font-sans">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-gray-800">
                      {headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {bodies.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-gray-50/50 dark:hover:bg-[#111111]">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-gray-700 dark:text-gray-300">
                            {cell.startsWith('`') && cell.endsWith('`') ? (
                              <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs text-[#D6536D]">
                                {cell.slice(1, -1)}
                              </code>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return null;
        }
      }

      // Handle standalone table states
      insideTable = false;

      // Code snippets
      if (trimmed.startsWith('```')) {
        return null;
      }
      const isSqlCode = trimmed.includes('SELECT') && trimmed.includes('FROM');
      const isDaxCode = trimmed.includes('CALCULATE') || trimmed.includes('SUMX');
      const isExcelCode = trimmed.startsWith('=');
      if (isSqlCode || isDaxCode || isExcelCode) {
        return (
          <pre
            key={idx}
            className="p-4 rounded-lg bg-gray-50 dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800 overflow-x-auto my-4 text-left"
          >
            <code className="font-mono text-xs text-[#D6536D]">{trimmed}</code>
          </pre>
        );
      }

      // List Bullets
      if (trimmed.startsWith('- ')) {
        return (
          <ul key={idx} className="list-disc list-inside pl-4 my-2 text-gray-700 dark:text-gray-300 text-left font-sans">
            <li>{trimmed.slice(2)}</li>
          </ul>
        );
      }

      if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ')) {
        return (
          <ol key={idx} className="list-decimal list-inside pl-4 my-2 text-gray-700 dark:text-gray-300 text-left font-sans">
            <li>{trimmed.slice(3)}</li>
          </ol>
        );
      }

      // Plain paragraphs which might contain inline code blocks
      if (trimmed === '') return <div key={idx} className="h-2" />;

      // Regex replace to add tag code colors dynamically
      const cleanParagraph = trimmed.split('`').map((part, i) => {
        if (i % 2 !== 0) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs text-[#D6536D]">
              {part}
            </code>
          );
        }
        return part;
      });

      return (
        <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed font-sans text-left mt-2 mb-4">
          {cleanParagraph}
        </p>
      );
    });
  };

  // Select Related Articles
  const relatedArticles = useMemo(() => {
    if (!activePost) return [];
    return blogsWithImages.filter((p) => p.category === activePost.category && p.id !== activePost.id).slice(0, 3);
  }, [activePost, blogsWithImages]);

  return (
    <div className="py-8" id="blog-root">
      <AnimatePresence mode="wait">
        {!activePost ? (
          // ================= VIEW A: MEDIUM-STYLE LISTING =================
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="blog-listing-view"
            className="space-y-12"
          >
            {/* Header section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left mt-4 space-y-4">
              <h1 className="text-4xl font-extrabold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight">
                Deepu's <span className="text-transparent bg-clip-text" style={gradientStyle}>Analytics Blog</span>
              </h1>
              <p className="text-[#6B7280] dark:text-[#9CA3AF] max-w-2xl font-sans text-base leading-relaxed">
                Tutorials and deep-dives detailing Power BI parameters, Excel formulas, Python datasets, and technical SQL setups.
              </p>

              {/* Live search input + category filters */}
              <div className="flex flex-col lg:flex-row gap-6 pt-4 items-stretch lg:items-center justify-between" id="search-filter-panel">
                {/* Search Bar */}
                <div className="relative max-w-md w-full">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Search className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, concepts, keywords..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] text-[#1F2937] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#D6536D] text-sm shadow-sm transition-all"
                    aria-label="Search Blog Posts"
                    id="blog-search-bar"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 animate-fade-in" id="category-pills-bar">
                  {categories.map((cat) => {
                    const isPipeActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        id={`cat-filter-btn-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 text-xs font-sans font-bold rounded-full border transition-all whitespace-nowrap focus:outline-none cursor-pointer ${
                          isPipeActive
                            ? 'bg-[#FFA2B6] text-[#1F2937] border-transparent shadow-sm'
                            : 'bg-white dark:bg-[#1A1A1A] text-[#6B7280] dark:text-[#9CA3AF] border-gray-200 dark:border-[#2D2D2D] hover:border-[#D6536D] hover:text-[#D6536D]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Featured Article Spot (only display when categories are "All" and no search queries exist) */}
            {selectedCategory === 'All' && !searchQuery && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 animate-fade-in" id="hero-featured-article">
                <div className="group relative bg-[#FFFDF9] dark:bg-[#151515] rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D] hover:border-[#D6536D] dark:hover:border-[#D6536D] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="h-1.5 w-full" style={gradientStyle} />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 items-center">
                    {/* Left block cover design accent */}
                    <div 
                      className="lg:col-span-4 h-48 sm:h-64 rounded-2xl flex flex-col items-center justify-center text-center border border-gray-200 dark:border-[#2D2D2D] overflow-hidden relative"
                      style={{ backgroundColor: '#1e293b' }}
                    >
                      <div className="absolute inset-0 w-full h-full">
                        {heroPost.image ? (
                          <img
                            src={heroPost.image}
                            alt={heroPost.title}
                            style={{
                              objectFit: 'cover',
                              width: '100%',
                              height: '100%',
                              opacity: 1,
                              display: 'block'
                            }}
                            className="select-none transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <PlaceholderSvg category={heroPost.category} title={heroPost.title} />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/45 dark:bg-black/55 backdrop-blur-[0.5px] group-hover:bg-black/25 group-hover:backdrop-blur-none transition-all duration-300" />
                      <span className="text-[10px] font-mono font-bold text-[#FFA2B6] uppercase tracking-widest mb-1 z-10">
                        FEATURED DEEP DIVE
                      </span>
                      <span className="text-lg font-sans font-extrabold text-white line-clamp-2 px-4 leading-snug z-10 shadow-sm">
                        {heroPost.title}
                      </span>
                      <span className="mt-4 text-[10px] uppercase font-mono px-3 py-1 rounded-full bg-[#FFA2B6] text-gray-950 font-extrabold z-10 shadow-sm">
                        {heroPost.category}
                      </span>
                    </div>

                    {/* Right core copy details */}
                    <div className="lg:col-span-8 space-y-4 text-left flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                        <span className="px-3 py-1 tracking-wider text-[#1F2937] bg-[#FFA2B6] font-bold rounded-full uppercase text-[10px]">
                          {heroPost.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {heroPost.readTime}
                        </span>
                      </div>

                      <h2
                        onClick={() => setSelectedPostId(heroPost.id)}
                        className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] dark:text-[#F3F4F6] hover:text-[#D6536D] transition-colors cursor-pointer tracking-tight group-hover:text-[#D6536D]"
                      >
                        {heroPost.title}
                      </h2>
                      
                      <p className="text-[#6B7280] dark:text-[#9CA3AF] font-sans text-sm sm:text-base leading-relaxed line-clamp-3">
                        {heroPost.excerpt}
                      </p>

                      <div className="pt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7B2FF7] to-[#F107A3] text-white flex items-center justify-center font-bold font-sans text-xs select-none">
                            DS
                          </div>
                          <div>
                            <p className="text-xs font-sans font-bold text-[#1F2937] dark:text-[#F3F4F6]">Deepu</p>
                            <p className="text-[10px] font-mono text-gray-500">{heroPost.publishedDate}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedPostId(heroPost.id)}
                          className="px-5 py-2.5 text-xs font-sans font-bold bg-[#EFB11D] hover:bg-[#EFB11D]/90 text-gray-905 rounded-xl shadow-sm transition-transform hover:-translate-y-0.5 focus:outline-none cursor-pointer"
                        >
                          Read Article
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Standard Article Grid Listing */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6" id="blogs-grid-section">
              <h2 className="text-2xl font-bold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight mb-8 text-left">
                {searchQuery || selectedCategory !== 'All' ? `Search Results (${filteredBlogs.length})` : 'All Articles'}
              </h2>

              {filteredBlogs.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 dark:bg-[#151515] rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D]" id="no-search-results">
                  <p className="text-lg text-gray-500 font-sans">No matching tutorials search keys found.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-4 px-4 py-2 bg-[#D6536D] text-white text-xs font-sans font-bold rounded-xl cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      id={`blog-card-grid-${blog.id}`}
                      className="group flex flex-col h-full bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D] hover:border-[#D6536D] dark:hover:border-[#D6536D] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="h-1.5 w-full" style={gradientStyle} />
                      
                      {/* Blog Header Image */}
                      <div 
                        className="h-44 w-full overflow-hidden relative border-b border-gray-150 dark:border-[#2A2A2A]"
                        style={{ backgroundColor: '#1e293b' }}
                      >
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            style={{
                              objectFit: 'cover',
                              width: '100%',
                              height: '100%',
                              opacity: 1,
                              display: 'block'
                            }}
                            className="select-none transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <PlaceholderSvg category={blog.category} title={blog.title} />
                        )}
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow text-left justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1F2937] bg-[#FFA2B6] px-2.5 py-1 rounded-full">
                              {blog.category}
                            </span>
                            <span className="text-xs font-mono text-gray-400 dark:text-gray-550 flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {blog.readTime}
                            </span>
                          </div>

                          <h3
                            onClick={() => setSelectedPostId(blog.id)}
                            className="text-lg font-extrabold text-[#1F2937] dark:text-[#F3F4F6] group-hover:text-[#D6536D] cursor-pointer transition-colors leading-snug line-clamp-2"
                          >
                            {blog.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] font-sans line-clamp-3 leading-relaxed">
                            {blog.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#2D2D2D] flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#7B2FF7] to-[#F107A3] text-white flex items-center justify-center font-bold text-[10px]">
                              DS
                            </div>
                            <span className="text-[11px] font-sans font-semibold text-[#1F2937] dark:text-[#F3F4F6]">
                              Deepu
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedPostId(blog.id)}
                            className="text-xs font-sans font-bold text-[#D6536D] group-hover:underline flex items-center gap-1 focus:outline-none cursor-pointer"
                          >
                            Read Article
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </motion.div>
        ) : (
          // ================= VIEW B: INDIVIDUAL DETAILED ARTICLE =================
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            id="blog-detail-view"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12"
          >
            {/* Back to Blog Button */}
            <div className="mt-4">
              <button
                onClick={() => setSelectedPostId(null)}
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#D6536D] hover:text-[#D6536D]/80 focus:outline-none cursor-pointer"
                id="blog-details-back-btn"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to all articles
              </button>
            </div>

            {/* Layout Split: Left Main article, Right Sticky TOC & Shares */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Main Column */}
              <article className="lg:col-span-8 space-y-8" id="blog-detailed-body">
                {/* Meta block */}
                <div className="space-y-4">
                  <span className="inline-block text-xs font-sans font-semibold tracking-wider text-gray-900 bg-[#FFA2B6] px-3 py-1 rounded">
                    {activePost.category}
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight leading-tight">
                    {activePost.title}
                  </h1>
                  
                  {/* Author Header details */}
                  <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-200 dark:border-gray-800 text-sm font-sans" id="blog-author-meta">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7B2FF7] to-[#F107A3] text-white flex items-center justify-center font-bold font-sans text-sm select-none">
                        DS
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">{activePost.author.name}</p>
                        <p className="text-xs text-gray-500">Delhi, India | Creator of DataJourney.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500 ml-0 sm:ml-auto">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {activePost.publishedDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {activePost.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cover graphic loaded from assets */}
                <div 
                  className="h-60 sm:h-96 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 relative"
                  style={{ backgroundColor: '#1e293b' }}
                >
                  {activePost.image ? (
                    <img
                      src={activePost.image}
                      alt={activePost.title}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        opacity: 1
                      }}
                      className="w-full h-full select-none"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <PlaceholderSvg category={activePost.category} title={activePost.title} />
                  )}
                </div>

                {/* Rendered content */}
                <div className="article-body-wrapper">
                  {renderContentHtml(activePost.content)}
                </div>
              </article>

              {/* Sidebar Column: Sticky items */}
              <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-8" id="blog-detailed-sidebar">
                {/* Table of Contents */}
                {tocItems.length > 0 && (
                  <div className="bg-[#FFFDF9] dark:bg-[#1A1A1A] p-6 rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D]">
                    <h3 className="text-base font-sans font-bold text-gray-900 dark:text-gray-100 pb-3 border-b border-gray-200 dark:border-gray-800 mb-4">
                      Table of Contents
                    </h3>
                    <nav className="space-y-3">
                      {tocItems.map((item, index) => (
                        <a
                          key={index}
                          href={`#${item.id}`}
                          className={`block text-sm font-sans transition-colors ${
                            item.isSub
                              ? 'pl-4 text-xs text-gray-500 hover:text-[#D6536D]'
                              : 'text-gray-700 dark:text-gray-300 hover:text-[#D6536D] font-medium'
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Share Block details */}
                <div className="bg-[#FFFDF9] dark:bg-[#1A1A1A] p-6 rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D] space-y-4">
                  <h3 className="text-base font-sans font-bold text-gray-900 dark:text-gray-100">
                    Share this article
                  </h3>
                  
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `Check out this portfolio guide on DataJourney.com: "${activePost.title}"`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 p-3 bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-800 hover:bg-[#D6536D] hover:text-white rounded-xl text-gray-600 dark:text-gray-300 transition-colors flex items-center justify-center gap-2 text-xs font-sans font-bold focus:outline-none"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter / X
                    </a>
                    
                    <a
                      href="https://www.linkedin.com/in/deepu-sharma-1062282a3/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 p-3 bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-800 hover:bg-[#D6536D] hover:text-white rounded-xl text-gray-600 dark:text-gray-300 transition-colors flex items-center justify-center gap-2 text-xs font-sans font-bold focus:outline-none"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </div>

                  <button
                    onClick={() => handleCopyLink(activePost.id)}
                    className="w-full p-3 bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-800 hover:border-[#D6536D] rounded-xl text-gray-700 dark:text-gray-300 hover:text-[#D6536D] transition-all flex items-center justify-center gap-2 text-xs font-sans font-bold focus:outline-none cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    {copySuccess ? 'Copied to Clipboard!' : 'Copy Private Link'}
                  </button>
                  
                  {copySuccess && (
                    <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 text-center animate-pulse">
                      ✓ Target URL copied successfully!
                    </p>
                  )}
                </div>
              </aside>
            </div>

            {/* Related Articles Bottom Spot */}
            {relatedArticles.length > 0 && (
              <section className="pt-12 border-t border-gray-200 dark:border-gray-800" id="related-articles-section">
                <h3 className="text-xl font-bold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight mb-8">
                  Related Articles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => setSelectedPostId(rel.id)}
                      className="group p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E5E7EB] dark:border-[#2D2D2D] hover:border-[#D6536D] dark:hover:border-[#D6536D] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="space-y-3">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1F2937] bg-[#FFA2B6] px-2.5 py-1 rounded-full">
                          {rel.category}
                        </span>
                        <h4 className="text-base font-extrabold text-[#1F2937] dark:text-[#F3F4F6] group-hover:text-[#D6536D] transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-sans line-clamp-2">
                          {rel.excerpt}
                        </p>
                        <div className="flex items-center gap-1.5 pt-2 text-[10px] font-mono text-gray-400">
                          <Clock className="w-3.5 h-3.5 text-[#D6536D]" />
                          <span>{rel.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

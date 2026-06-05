export interface BlogPost {
  id: string;
  title: string;
  category: 'Excel' | 'SQL' | 'Power BI' | 'Python' | 'Career Guidance';
  readTime: string;
  excerpt: string;
  content: string; // Markdown or rich formatted structured content
  publishedDate: string;
  author: {
    name: string;
    avatar: string;
  };
  isFeatured?: boolean;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  problem: string;
  tools: string[];
  insights: string[];
  githubUrl: string;
  isFeatured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  bullets: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer?: string;
}

export type PageId = 'home' | 'about' | 'blog' | 'projects' | 'contact';

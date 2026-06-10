
export interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  thumbnail: string;
  description: string;
  workTime: string;
  projectType?: string;
  toolsUsed: string[];
  detailRenders: string[];
  clayRenders: string[];
  wireframes: string[];
  uvLayouts: string[];
  references: string[];
  mainVideoUrl?: string;
  additionalVideoUrls?: string[];
  turntableVideoUrl?: string;
  technicalBreakdown?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  location?: string;
}

export interface ToolCategory {
  category: string;
  items: string[];
}

export interface AboutData {
  intro: string;
  profileImage: string;
  tools: ToolCategory[];
  experience: Experience[];
  education: {
    degree: string;
    institution: string;
    year: string;
    location?: string;
  }[];
}

export interface HomeData {
  name: string;
  professionalTitle: string;
  description: string;
  heroVideoUrl: string;
  portfolioPdfUrl: string;
  resumePdfUrl: string;
  backgroundGifUrl?: string;
}

export interface ContactData {
  email: string;
  artstationUrl: string;
  linkedinUrl: string;
}

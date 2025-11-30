
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'content_creator';
  joinedDate: string;
}

export type Subject = 'Biology' | 'Physics' | 'Chemistry' | 'Combined Maths' | 'ICT';

export interface BlogPost {
  id: string;
  title: string;
  content: string; // Markdown/Text
  subject: Subject;
  author: string;
  date: string;
  imageUrl?: string;
  likes: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'link';
  size: string;
  downloads: number;
  url?: string;
  description?: string;
  author?: string;
}

export interface ResourceCategory {
  category: Subject;
  items: ResourceItem[];
}

export interface AdConfig {
  enabled: boolean;
  placementId: string;
  format: 'banner' | 'sidebar' | 'native';
}

export interface StatCardProps {
  title: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
}

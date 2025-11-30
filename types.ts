export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'content_creator';
  joinedDate: string;
}

export type Subject = 'Biology' | 'Physics' | 'Chemistry' | 'Combined Maths' | 'ICT';

export interface Course {
  id: string;
  title: string;
  subject: Subject;
  progress: number;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  syllabusUrl: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'link';
  size: string;
  downloads: number;
  url?: string;
}

export interface ResourceCategory {
  category: Subject;
  items: ResourceItem[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string; // Slide text content or video URL
  slideUrl: string;
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface StatCardProps {
  title: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
}
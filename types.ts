export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface Course {
  id: string;
  title: string;
  subject: 'Biology' | 'Physics' | 'Chemistry';
  progress: number;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  syllabusUrl: string;
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
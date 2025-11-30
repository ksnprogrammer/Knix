import { Course, Lesson } from './types';
import { FileText, Video, Book, Download } from 'lucide-react';

// Mock Data matching the aesthetic and subjects
export const COURSES: Course[] = [
  {
    id: 'bio-101',
    title: 'Cell Structure & Function',
    subject: 'Biology',
    progress: 60,
    description: 'Dive into the study of life, from cellular processes to complex ecosystems.',
    thumbnail: 'https://picsum.photos/400/225?random=1',
    instructor: 'Dr. A. Perera',
    duration: '4 Weeks',
    syllabusUrl: '#'
  },
  {
    id: 'chem-201',
    title: 'Organic Compounds',
    subject: 'Chemistry',
    progress: 40,
    description: 'Understand matter, its properties, and how substances interact.',
    thumbnail: 'https://picsum.photos/400/225?random=2',
    instructor: 'Prof. S. Silva',
    duration: '6 Weeks',
    syllabusUrl: '#'
  },
  {
    id: 'phy-301',
    title: 'Quantum Mechanics',
    subject: 'Physics',
    progress: 20,
    description: 'Explore the fundamental principles governing the universe.',
    thumbnail: 'https://picsum.photos/400/225?random=3',
    instructor: 'Dr. R. Fernando',
    duration: '8 Weeks',
    syllabusUrl: '#'
  },
  {
    id: 'bio-102',
    title: 'Genetics & Evolution',
    subject: 'Biology',
    progress: 0,
    description: 'Understanding DNA, inheritance, and evolutionary biology.',
    thumbnail: 'https://picsum.photos/400/225?random=4',
    instructor: 'Ms. K. Jayasinghe',
    duration: '5 Weeks',
    syllabusUrl: '#'
  }
];

export const MOCK_LESSON: Lesson = {
  id: 'lesson-1',
  courseId: 'bio-101',
  title: '1.1 Introduction to Neural Networks (Bio-Analogies)',
  content: 'Neural networks are inspired by the human brain. They consist of layers of interconnected nodes (neurons).',
  slideUrl: 'https://picsum.photos/800/450?random=10',
  notes: `• Neural networks are inspired by the human brain.
• They consist of layers of interconnected nodes (neurons).
• Key for deep learning applications.
• Input layer receives data, hidden layers process it, output layer gives prediction.`
};

export const RECENT_ACTIVITY = [
  { text: 'New Subject "Advanced Python" created', time: '3 hours ago', type: 'create' },
  { text: 'AI content generated for "World History"', time: '2 hours ago', type: 'ai' },
  { text: 'AI content generated for "Subject!"', time: '2 hours ago', type: 'edit' },
  { text: 'AI content generated for "WordAI"', time: '2 hours ago', type: 'user' },
];

export const RESOURCES = [
  {
    category: "Biology",
    items: [
      { title: "2023 A/L Biology Past Paper (Part I & II)", type: "pdf", size: "4.2 MB", downloads: 1240 },
      { title: "Resource Book: Unit 5 - Animal Form and Function", type: "pdf", size: "12.5 MB", downloads: 850 },
      { title: "Marking Scheme 2022", type: "pdf", size: "1.1 MB", downloads: 2300 }
    ]
  },
  {
    category: "Physics",
    items: [
      { title: "2023 A/L Physics Past Paper", type: "pdf", size: "3.8 MB", downloads: 1500 },
      { title: "Electronics: Logic Gates Summary", type: "pdf", size: "0.5 MB", downloads: 540 },
      { title: "Mechanics: Newton's Laws Deep Dive", type: "pdf", size: "2.1 MB", downloads: 900 }
    ]
  },
  {
    category: "Chemistry",
    items: [
      { title: "2023 A/L Chemistry Past Paper", type: "pdf", size: "4.5 MB", downloads: 1100 },
      { title: "Industrial Chemistry Chart", type: "image", size: "2.5 MB", downloads: 3200 },
      { title: "Organic Conversions Mind Map", type: "image", size: "1.8 MB", downloads: 4100 }
    ]
  }
];
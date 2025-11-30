import { Course, Lesson, ResourceCategory, User } from './types';

// Initial Data for the DB Service
export const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Alex Perera', email: 'alex@knix.lk', role: 'student', joinedDate: '2024-01-15' },
  { id: 'u2', name: 'Saman Silva', email: 'admin@knix.lk', role: 'admin', joinedDate: '2023-11-01' },
  { id: 'u3', name: 'Dr. Jayasinghe', email: 'tutor@knix.lk', role: 'content_creator', joinedDate: '2024-02-20' },
  { id: 'u4', name: 'Kasun De Silva', email: 'kasun@gmail.com', role: 'student', joinedDate: '2025-01-10' },
];

export const INITIAL_COURSES: Course[] = [
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
    id: 'maths-401',
    title: 'Integration & Differentiation',
    subject: 'Combined Maths',
    progress: 15,
    description: 'Master Calculus fundamentals for the A/L examination.',
    thumbnail: 'https://picsum.photos/400/225?random=5',
    instructor: 'Mr. K. Amal',
    duration: '10 Weeks',
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

export const INITIAL_RESOURCES: ResourceCategory[] = [
  {
    category: "Biology",
    items: [
      { id: 'r1', title: "2023 A/L Biology Past Paper (Part I & II)", type: "pdf", size: "4.2 MB", downloads: 1240 },
      { id: 'r2', title: "Resource Book: Unit 5 - Animal Form", type: "pdf", size: "12.5 MB", downloads: 850 },
    ]
  },
  {
    category: "Combined Maths",
    items: [
      { id: 'r3', title: "2023 A/L Combined Maths Past Paper", type: "pdf", size: "5.1 MB", downloads: 1800 },
      { id: 'r4', title: "Pure Maths: Trigonometry Formulas", type: "image", size: "1.2 MB", downloads: 3400 },
    ]
  },
  {
    category: "Physics",
    items: [
      { id: 'r5', title: "2023 A/L Physics Past Paper", type: "pdf", size: "3.8 MB", downloads: 1500 },
      { id: 'r6', title: "Mechanics: Newton's Laws Deep Dive", type: "pdf", size: "2.1 MB", downloads: 900 }
    ]
  },
  {
    category: "ICT",
    items: [
      { id: 'r7', title: "2023 A/L ICT Past Paper", type: "pdf", size: "3.5 MB", downloads: 950 },
      { id: 'r8', title: "Python Programming Guide", type: "pdf", size: "2.8 MB", downloads: 1200 }
    ]
  }
];
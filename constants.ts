
import { BlogPost, ResourceCategory, User } from './types';

// Initial Data for the DB Service
export const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'K.Sithara Nimsara', email: 'admin@knix.lk', role: 'admin', joinedDate: '2023-11-01' },
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'p1',
    title: 'ජීව විද්‍යාව - සෛල ව්‍යුහය (Cell Structure)',
    content: 'සෛල යනු ජීවීන්ගේ මූලික තැනුම් ඒකකයයි. (The cell is the basic structural and functional unit of life forms.) \n\n Key points to remember for MCQ:\n- Prokaryotic vs Eukaryotic cells\n- Function of Ribosomes\n- Structure of the Plasma Membrane',
    subject: 'Biology',
    author: 'K.Sithara',
    date: '2025-02-27',
    likes: 45,
    imageUrl: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: 'p2',
    title: 'Physics - Electronics (ඉලෙක්ට්‍රොනික විද්‍යාව)',
    content: 'Operational Amplifiers (Op-Amps) are critical for the exam. Focus on:\n\n1. Ideal Op-Amp characteristics\n2. Inverting vs Non-inverting amplifiers\n3. Gain calculations',
    subject: 'Physics',
    author: 'K.Sithara',
    date: '2025-02-26',
    likes: 32
  },
  {
    id: 'p3',
    title: 'Chemistry - Organic Conversions',
    content: 'Easy path to convert Benzene to Phenol. \n\nBenzene -> Nitrobenzene -> Aniline -> Diazonium Salt -> Phenol.',
    subject: 'Chemistry',
    author: 'K.Sithara',
    date: '2025-02-25',
    likes: 89,
    imageUrl: 'https://picsum.photos/800/400?random=2'
  }
];

export const INITIAL_RESOURCES: ResourceCategory[] = [
  {
    category: "Biology",
    items: [
      { 
        id: 'r1', 
        title: "2023 A/L Biology Past Paper (Sinhala Medium)", 
        type: "pdf", 
        size: "4.2 MB", 
        downloads: 1240, 
        description: "Official past paper including Part I (MCQ) and Part II (Essay) with structured questions.",
        author: "Department of Examinations"
      },
      { 
        id: 'r2', 
        title: "Resource Book: Unit 5 (Sinhala)", 
        type: "pdf", 
        size: "12.5 MB", 
        downloads: 850,
        description: "National Institute of Education (NIE) official resource book for Plant form and function.",
        author: "NIE"
      },
    ]
  },
  {
    category: "Combined Maths",
    items: [
      { 
        id: 'r3', 
        title: "2023 A/L Combined Maths Past Paper", 
        type: "pdf", 
        size: "5.1 MB", 
        downloads: 1800,
        description: "Complete paper covering Pure Mathematics and Applied Mathematics.",
        author: "Department of Examinations"
      },
      { 
        id: 'r4', 
        title: "Trigonometry Short Notes", 
        type: "image", 
        size: "1.2 MB", 
        downloads: 3400,
        description: "Quick revision cheat sheet for all trigonometric identities and formulas.",
        author: "K.Sithara"
      },
    ]
  },
  {
    category: "Physics",
    items: [
      { 
        id: 'r5', 
        title: "2023 A/L Physics Past Paper", 
        type: "pdf", 
        size: "3.8 MB", 
        downloads: 1500,
        description: "Full past paper document.",
        author: "Department of Examinations"
      },
      { 
        id: 'r6', 
        title: "Electronics Model Questions", 
        type: "pdf", 
        size: "2.1 MB", 
        downloads: 900,
        description: "Target questions for the Electronics unit with answers.",
        author: "Physics Unit"
      }
    ]
  },
  {
    category: "Chemistry",
    items: [
      { 
        id: 'r7', 
        title: "2023 A/L Chemistry Past Paper", 
        type: "pdf", 
        size: "4.5 MB", 
        downloads: 1100,
        description: "Chemistry past paper 2023.",
        author: "Department of Examinations" 
      },
      { 
        id: 'r8', 
        title: "Organic Chemistry Road Map", 
        type: "image", 
        size: "1.8 MB", 
        downloads: 2200,
        description: "Visual map for organic reaction conversions.",
        author: "Knix Edu"
      }
    ]
  }
];

export const AD_SETTINGS = {
  enabled: true,
  sidebarAdId: 'ca-pub-sidebar-123',
  feedAdId: 'ca-pub-feed-456'
};

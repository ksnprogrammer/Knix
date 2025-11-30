import { User, Course, ResourceCategory, ResourceItem } from '../types';
import { INITIAL_USERS, INITIAL_COURSES, INITIAL_RESOURCES } from '../constants';

// Keys for LocalStorage
const KEYS = {
  USERS: 'knix_users_db',
  COURSES: 'knix_courses_db',
  RESOURCES: 'knix_resources_db'
};

// Helper to initialize DB if empty
const initDB = () => {
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(KEYS.COURSES)) {
    localStorage.setItem(KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
  }
  if (!localStorage.getItem(KEYS.RESOURCES)) {
    localStorage.setItem(KEYS.RESOURCES, JSON.stringify(INITIAL_RESOURCES));
  }
};

// Initialize immediately
initDB();

export const db = {
  // --- USER OPERATIONS ---
  getUsers: (): User[] => {
    return JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
  },
  
  updateUserRole: (userId: string, newRole: 'student' | 'admin' | 'content_creator') => {
    const users = db.getUsers();
    const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
    localStorage.setItem(KEYS.USERS, JSON.stringify(updated));
  },

  deleteUser: (userId: string) => {
    const users = db.getUsers();
    const updated = users.filter(u => u.id !== userId);
    localStorage.setItem(KEYS.USERS, JSON.stringify(updated));
  },

  // --- COURSE OPERATIONS ---
  getCourses: (): Course[] => {
    return JSON.parse(localStorage.getItem(KEYS.COURSES) || '[]');
  },

  addCourse: (course: Course) => {
    const courses = db.getCourses();
    courses.push(course);
    localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
  },

  deleteCourse: (courseId: string) => {
    const courses = db.getCourses();
    const updated = courses.filter(c => c.id !== courseId);
    localStorage.setItem(KEYS.COURSES, JSON.stringify(updated));
  },

  // --- RESOURCE OPERATIONS ---
  getResources: (): ResourceCategory[] => {
    return JSON.parse(localStorage.getItem(KEYS.RESOURCES) || '[]');
  },

  addResource: (category: string, item: ResourceItem) => {
    const resources = db.getResources();
    const catIndex = resources.findIndex(r => r.category === category);
    
    if (catIndex > -1) {
      resources[catIndex].items.push(item);
    } else {
      // Create new category if not exists (though type safety limits this in UI)
      resources.push({
        category: category as any,
        items: [item]
      });
    }
    localStorage.setItem(KEYS.RESOURCES, JSON.stringify(resources));
  }
};
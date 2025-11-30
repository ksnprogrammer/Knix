import { User, BlogPost, ResourceCategory, ResourceItem, Subject } from '../types';
import { INITIAL_USERS, INITIAL_POSTS, INITIAL_RESOURCES } from '../constants';

const KEYS = {
  USERS: 'knix_users_db',
  POSTS: 'knix_posts_db',
  RESOURCES: 'knix_resources_db'
};

const initDB = () => {
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(KEYS.POSTS)) {
    localStorage.setItem(KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
  }
  if (!localStorage.getItem(KEYS.RESOURCES)) {
    localStorage.setItem(KEYS.RESOURCES, JSON.stringify(INITIAL_RESOURCES));
  }
};

initDB();

export const db = {
  // --- USER ---
  getUsers: (): User[] => JSON.parse(localStorage.getItem(KEYS.USERS) || '[]'),
  
  updateUserRole: (userId: string, newRole: User['role']) => {
    const users = db.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index > -1) {
      users[index].role = newRole;
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
  },

  deleteUser: (userId: string) => {
    const users = db.getUsers();
    const updated = users.filter(u => u.id !== userId);
    localStorage.setItem(KEYS.USERS, JSON.stringify(updated));
  },
  
  // --- POSTS (BLOG) ---
  getPosts: (): BlogPost[] => JSON.parse(localStorage.getItem(KEYS.POSTS) || '[]'),
  
  addPost: (post: BlogPost) => {
    const posts = db.getPosts();
    posts.unshift(post); // Add to top
    localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
  },

  deletePost: (id: string) => {
    const posts = db.getPosts();
    const updated = posts.filter(p => p.id !== id);
    localStorage.setItem(KEYS.POSTS, JSON.stringify(updated));
  },

  // --- RESOURCES ---
  getResources: (): ResourceCategory[] => JSON.parse(localStorage.getItem(KEYS.RESOURCES) || '[]'),

  addResource: (category: Subject, item: ResourceItem) => {
    const resources = db.getResources();
    const catIndex = resources.findIndex(r => r.category === category);
    
    if (catIndex > -1) {
      resources[catIndex].items.push(item);
    } else {
      resources.push({ category, items: [item] });
    }
    localStorage.setItem(KEYS.RESOURCES, JSON.stringify(resources));
  }
};
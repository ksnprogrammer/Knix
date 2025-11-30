
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

  updatePost: (updatedPost: BlogPost) => {
    const posts = db.getPosts();
    const index = posts.findIndex(p => p.id === updatedPost.id);
    if (index > -1) {
      posts[index] = updatedPost;
      localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
    }
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
  },

  deleteResource: (resourceId: string) => {
    const resources = db.getResources();
    const updated = resources.map(cat => ({
        ...cat,
        items: cat.items.filter(item => item.id !== resourceId)
    }));
    localStorage.setItem(KEYS.RESOURCES, JSON.stringify(updated));
  },

  updateResource: (updatedResource: ResourceItem, originalCategory: Subject) => {
    const resources = db.getResources();
    const newCategory = (updatedResource as any).category as Subject;

    // If category hasn't changed, update in place
    if (newCategory === originalCategory) {
      const updated = resources.map(cat => ({
        ...cat,
        items: cat.items.map(item => item.id === updatedResource.id ? updatedResource : item)
      }));
      localStorage.setItem(KEYS.RESOURCES, JSON.stringify(updated));
      return;
    }

    // If category has changed, move the resource
    // 1. Remove from old category
    const resourcesWithoutOld = resources.map(cat => {
      if (cat.category === originalCategory) {
        return { ...cat, items: cat.items.filter(item => item.id !== updatedResource.id) };
      }
      return cat;
    });

    // 2. Add to new category
    const newCategoryIndex = resourcesWithoutOld.findIndex(cat => cat.category === newCategory);
    if (newCategoryIndex > -1) {
      resourcesWithoutOld[newCategoryIndex].items.push(updatedResource);
    } else {
      // If the new category doesn't exist, create it
      resourcesWithoutOld.push({ category: newCategory, items: [updatedResource] });
    }

    localStorage.setItem(KEYS.RESOURCES, JSON.stringify(resourcesWithoutOld));
  }
};

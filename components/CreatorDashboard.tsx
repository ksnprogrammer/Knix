import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { BlogPost, Subject } from '../types';
import { Plus, Save, Trash, FileText, Image as ImageIcon } from 'lucide-react';

export const CreatorDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    subject: 'Biology',
    author: 'K.Sithara',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    setPosts(db.getPosts());
  }, []);

  const handlePublish = () => {
    if (!newPost.title || !newPost.content) return;
    
    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title!,
      content: newPost.content!,
      subject: newPost.subject as Subject,
      author: newPost.author!,
      date: newPost.date!,
      likes: 0,
      imageUrl: newPost.imageUrl
    };

    db.addPost(post);
    setPosts(db.getPosts());
    setIsCreating(false);
    setNewPost({ ...newPost, title: '', content: '' });
  };

  const handleDelete = (id: string) => {
     if(window.confirm('Delete this post?')) {
        db.deletePost(id);
        setPosts(db.getPosts());
     }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
         <div>
            <h2 className="text-3xl font-bold text-white mb-2 font-rajdhani">Admin Studio</h2>
            <p className="text-slate-400">Manage Study Feed & Resources.</p>
         </div>
         <button 
           onClick={() => setIsCreating(true)}
           className="bg-knix-red hover:bg-knix-redHover text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2"
         >
           <Plus size={20} /> New Spark Post
         </button>
      </div>

      {isCreating && (
        <div className="bg-knix-card p-6 rounded-xl border border-slate-700 animate-in fade-in slide-in-from-top-4">
           <h4 className="font-bold text-white mb-4">Create New Content</h4>
           <div className="space-y-4">
              <input 
                 className="w-full bg-slate-900 border border-slate-700 p-3 rounded text-white text-lg font-bold" 
                 placeholder="Post Title (Sinhala/English)"
                 value={newPost.title}
                 onChange={e => setNewPost({...newPost, title: e.target.value})}
              />
              <div className="flex gap-4">
                 <select 
                    className="bg-slate-900 border border-slate-700 p-2 rounded text-white"
                    value={newPost.subject}
                    onChange={e => setNewPost({...newPost, subject: e.target.value as Subject})}
                 >
                    <option value="Biology">Biology</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                 </select>
                 <input 
                    className="bg-slate-900 border border-slate-700 p-2 rounded text-white flex-1"
                    placeholder="Image URL (Optional)"
                    value={newPost.imageUrl || ''}
                    onChange={e => setNewPost({...newPost, imageUrl: e.target.value})}
                 />
              </div>
              <textarea 
                 className="w-full bg-slate-900 border border-slate-700 p-3 rounded text-white h-48 font-mono text-sm"
                 placeholder="Content (Supports markdown)..."
                 value={newPost.content}
                 onChange={e => setNewPost({...newPost, content: e.target.value})}
              />
              <div className="flex justify-end gap-2">
                 <button onClick={() => setIsCreating(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                 <button onClick={handlePublish} className="px-6 py-2 bg-knix-red text-white rounded font-bold hover:bg-knix-redHover flex items-center gap-2">
                    <Save size={16} /> Publish to Feed
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="space-y-4">
         <h3 className="text-xl font-bold text-white">Published Posts</h3>
         {posts.map(post => (
            <div key={post.id} className="bg-knix-card p-4 rounded-xl border border-slate-800 flex justify-between items-center group">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-900 rounded-lg text-slate-400">
                     <FileText size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white">{post.title}</h4>
                     <p className="text-xs text-slate-500">{post.subject} • {post.date} • {post.likes} Likes</p>
                  </div>
               </div>
               <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                  <Trash size={18} />
               </button>
            </div>
         ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { BlogPost, Subject, ResourceItem, ResourceCategory } from '../types';
import { Plus, Save, Trash, FileText, Image as ImageIcon, Bold, Italic, List, Eye, Edit3, Link as LinkIcon, Type, FolderPlus, Download, Layout } from 'lucide-react';

export const CreatorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'resources'>('posts');
  
  // --- POSTS STATE ---
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postViewMode, setPostViewMode] = useState<'write' | 'preview'>('write');
  
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    subject: 'Biology',
    author: 'K.Sithara',
    date: new Date().toISOString().split('T')[0]
  });

  // --- RESOURCES STATE ---
  const [resources, setResources] = useState<ResourceCategory[]>([]);
  const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [originalResourceCategory, setOriginalResourceCategory] = useState<Subject | null>(null);
  
  const [newResource, setNewResource] = useState<{
      title: string;
      category: Subject;
      type: 'pdf' | 'image' | 'link';
      size: string;
      url: string;
      description: string;
  }>({
      title: '',
      category: 'Biology',
      type: 'pdf',
      size: '',
      url: '',
      description: ''
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setPosts(db.getPosts());
    setResources(db.getResources());
  };

  // --- POST HANDLERS ---
  const handlePublishPost = () => {
    if (!newPost.title || !newPost.content) return;

    if (editingPost) {
      const updatedPost = { ...editingPost, ...newPost };
      db.updatePost(updatedPost);
    } else {
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
    }

    refreshData();
    setIsPostFormOpen(false);
    setEditingPost(null);
    setNewPost({ title: '', content: '', subject: 'Biology', author: 'K.Sithara', date: new Date().toISOString().split('T')[0] });
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost(post);
    setIsPostFormOpen(true);
  };

  const handleDeletePost = (id: string) => {
     if(window.confirm('Delete this post?')) {
        db.deletePost(id);
        refreshData();
     }
  };

  const insertPostFormat = (tag: string, endTag: string = '') => {
      const textarea = document.getElementById('post-content') as HTMLTextAreaElement;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = newPost.content || '';
      const before = text.substring(0, start);
      const selection = text.substring(start, end);
      const after = text.substring(end);
      
      const newText = `${before}${tag}${selection}${endTag}${after}`;
      setNewPost({ ...newPost, content: newText });
  };

  // --- RESOURCE HANDLERS ---
  const handleAddResource = () => {
    if (!newResource.title || !newResource.url) return;

    if (editingResource && originalResourceCategory) {
      const updatedResource = { ...editingResource, ...newResource };
      db.updateResource(updatedResource, originalResourceCategory);
    } else {
      const item: ResourceItem = {
        id: Date.now().toString(),
        title: newResource.title,
        type: newResource.type,
        size: newResource.size || '0 MB',
        downloads: 0,
        url: newResource.url,
        description: newResource.description,
        author: 'K.Sithara'
      };
      db.addResource(newResource.category, item);
    }

    refreshData();
    setIsResourceFormOpen(false);
    setEditingResource(null);
    setOriginalResourceCategory(null);
    setNewResource({ title: '', category: 'Biology', type: 'pdf', size: '', url: '', description: '' });
  };

  const handleEditResource = (resource: ResourceItem, category: Subject) => {
    setEditingResource(resource);
    setOriginalResourceCategory(category);
    setNewResource({ ...resource, category });
    setIsResourceFormOpen(true);
  };

  const handleDeleteResource = (id: string) => {
      if(window.confirm('Delete this resource permanently?')) {
          db.deleteResource(id);
          refreshData();
      }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end border-b border-knix-border pb-4">
         <div>
            <h2 className="text-3xl font-bold text-knix-text mb-2 font-rajdhani">Admin Studio</h2>
            <p className="text-knix-muted">Manage Study Feed & Resources.</p>
         </div>
         <div className="flex gap-2">
            <button 
                onClick={() => setActiveTab('posts')}
                className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${activeTab === 'posts' ? 'bg-knix-red text-white shadow-glow' : 'text-knix-muted hover:bg-knix-card'}`}
            >
                <Edit3 size={18} /> Spark Posts
            </button>
            <button 
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${activeTab === 'resources' ? 'bg-knix-red text-white shadow-glow' : 'text-knix-muted hover:bg-knix-card'}`}
            >
                <FolderPlus size={18} /> Resources
            </button>
         </div>
      </div>

      {/* --- SPARK POSTS TAB --- */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-knix-text flex items-center gap-2">
                    <FileText className="text-knix-red" /> Published Posts ({posts.length})
                </h3>
                <button 
                    onClick={() => { setEditingPost(null); setNewPost({ title: '', content: '', subject: 'Biology', author: 'K.Sithara', date: new Date().toISOString().split('T')[0] }); setIsPostFormOpen(true); }}
                    className="bg-knix-card border border-knix-red text-knix-red hover:bg-knix-red hover:text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} /> Create New
                </button>
            </div>

            {isPostFormOpen && (
                <div className="bg-knix-card p-6 rounded-xl border border-knix-border animate-in fade-in slide-in-from-top-4 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-knix-text text-lg">{editingPost ? 'Edit Spark Post' : 'Create New Spark Post'}</h4>
                    <div className="flex bg-knix-bg rounded-lg border border-knix-border p-1">
                        <button 
                            onClick={() => setPostViewMode('write')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 ${postViewMode === 'write' ? 'bg-knix-card text-knix-text shadow-sm' : 'text-knix-muted hover:text-knix-text'}`}
                        >
                            <Edit3 size={16} /> Write
                        </button>
                        <button 
                            onClick={() => setPostViewMode('preview')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 ${postViewMode === 'preview' ? 'bg-knix-card text-knix-text shadow-sm' : 'text-knix-muted hover:text-knix-text'}`}
                        >
                            <Eye size={16} /> Preview
                        </button>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <input 
                        className="w-full bg-knix-input border border-knix-border p-3 rounded text-knix-text text-lg font-bold placeholder-knix-muted" 
                        placeholder="Post Title (Sinhala/English)"
                        value={newPost.title}
                        onChange={e => setNewPost({...newPost, title: e.target.value})}
                    />
                    
                    <div className="flex gap-4 flex-col md:flex-row">
                        <select 
                            className="bg-knix-input border border-knix-border p-3 rounded text-knix-text min-w-[200px]"
                            value={newPost.subject}
                            onChange={e => setNewPost({...newPost, subject: e.target.value as Subject})}
                        >
                            <option value="Biology">Biology</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Combined Maths">Combined Maths</option>
                            <option value="ICT">ICT</option>
                        </select>
                        <input 
                            className="bg-knix-input border border-knix-border p-3 rounded text-knix-text flex-1 placeholder-knix-muted"
                            placeholder="Cover Image URL (Optional)"
                            value={newPost.imageUrl || ''}
                            onChange={e => setNewPost({...newPost, imageUrl: e.target.value})}
                        />
                    </div>

                    {postViewMode === 'write' ? (
                        <div className="border border-knix-border rounded-lg bg-knix-input overflow-hidden">
                            <div className="flex gap-1 p-2 border-b border-knix-border bg-knix-card overflow-x-auto">
                            <button onClick={() => insertPostFormat('**', '**')} className="p-2 text-knix-text hover:bg-knix-bg rounded" title="Bold"><Bold size={16}/></button>
                            <button onClick={() => insertPostFormat('*', '*')} className="p-2 text-knix-text hover:bg-knix-bg rounded" title="Italic"><Italic size={16}/></button>
                            <button onClick={() => insertPostFormat('\n### ')} className="p-2 text-knix-text hover:bg-knix-bg rounded" title="Heading"><Type size={16}/></button>
                            <button onClick={() => insertPostFormat('\n- ')} className="p-2 text-knix-text hover:bg-knix-bg rounded" title="List"><List size={16}/></button>
                            <button onClick={() => insertPostFormat('[', '](url)')} className="p-2 text-knix-text hover:bg-knix-bg rounded" title="Link"><LinkIcon size={16}/></button>
                            <button onClick={() => insertPostFormat('![alt]', '(url)')} className="p-2 text-knix-text hover:bg-knix-bg rounded" title="Image"><ImageIcon size={16}/></button>
                            </div>
                            <textarea 
                            id="post-content"
                            className="w-full bg-knix-input p-4 rounded-b text-knix-text h-64 font-mono text-sm border-none focus:outline-none resize-y"
                            placeholder="Write your content here... Markdown is supported."
                            value={newPost.content}
                            onChange={e => setNewPost({...newPost, content: e.target.value})}
                            />
                        </div>
                    ) : (
                        <div className="border border-knix-border rounded-lg bg-knix-bg p-6 min-h-[300px] prose prose-invert max-w-none">
                            <h1 className="text-2xl font-bold mb-4">{newPost.title || 'Untitled Post'}</h1>
                            <div className="whitespace-pre-line text-knix-text">
                            {newPost.content ? newPost.content : <span className="text-knix-muted italic">Nothing to preview...</span>}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button onClick={() => { setIsPostFormOpen(false); setEditingPost(null); }} className="px-6 py-2.5 rounded-lg border border-knix-border text-knix-muted hover:text-knix-text hover:bg-knix-card font-medium transition-colors">
                            Cancel
                        </button>
                        <button onClick={handlePublishPost} className="px-8 py-2.5 bg-knix-red text-white rounded-lg font-bold hover:bg-knix-redHover flex items-center gap-2 shadow-lg shadow-knix-red/20 transition-all hover:-translate-y-0.5">
                            <Save size={18} /> {editingPost ? 'Update Spark' : 'Publish Spark'}
                        </button>
                    </div>
                </div>
                </div>
            )}

            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="bg-knix-card p-5 rounded-xl border border-knix-border flex justify-between items-center group shadow-sm hover:border-knix-muted/30 transition-all">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-knix-bg rounded-lg text-knix-muted border border-knix-border flex items-center justify-center">
                            {post.imageUrl ? (
                                <img src={post.imageUrl} className="w-full h-full object-cover rounded-lg opacity-80" alt="thumbnail" />
                            ) : (
                                <FileText size={20} />
                            )}
                        </div>
                        <div>
                            <h4 className="font-bold text-knix-text text-lg">{post.title}</h4>
                            <p className="text-sm text-knix-muted flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                                post.subject === 'Biology' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                post.subject === 'Physics' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                                'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                }`}>{post.subject}</span>
                                <span>• {post.date}</span>
                                <span>• {post.likes} Likes</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleEditPost(post)} className="p-2 text-knix-muted hover:text-knix-red hover:bg-knix-red/10 rounded-lg transition-colors">
                            <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDeletePost(post.id)} className="p-2 text-knix-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash size={18} />
                        </button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- RESOURCES TAB --- */}
      {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-knix-text flex items-center gap-2">
                    <Download className="text-knix-red" /> Resource Library
                </h3>
                <button 
                    onClick={() => { setEditingResource(null); setNewResource({ title: '', category: 'Biology', type: 'pdf', size: '', url: '', description: '' }); setIsResourceFormOpen(true); }}
                    className="bg-knix-card border border-knix-red text-knix-red hover:bg-knix-red hover:text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} /> Upload Resource
                </button>
            </div>

            {isResourceFormOpen && (
                <div className="bg-knix-card p-6 rounded-xl border border-knix-border animate-in fade-in slide-in-from-top-4 shadow-sm">
                    <h4 className="font-bold text-knix-text text-lg mb-6">{editingResource ? 'Edit Resource' : 'Upload New Resource'}</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-knix-muted uppercase">Resource Title</label>
                                <input 
                                    className="w-full bg-knix-input border border-knix-border p-3 rounded text-knix-text placeholder-knix-muted focus:border-knix-red focus:outline-none"
                                    placeholder="e.g. 2024 Biology Past Paper"
                                    value={newResource.title}
                                    onChange={e => setNewResource({...newResource, title: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="space-y-2 flex-1">
                                    <label className="text-xs font-bold text-knix-muted uppercase">Subject</label>
                                    <select 
                                        className="w-full bg-knix-input border border-knix-border p-3 rounded text-knix-text focus:border-knix-red focus:outline-none"
                                        value={newResource.category}
                                        onChange={e => setNewResource({...newResource, category: e.target.value as Subject})}
                                    >
                                        <option value="Biology">Biology</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Chemistry">Chemistry</option>
                                        <option value="Combined Maths">Combined Maths</option>
                                        <option value="ICT">ICT</option>
                                    </select>
                                </div>
                                <div className="space-y-2 flex-1">
                                    <label className="text-xs font-bold text-knix-muted uppercase">Type</label>
                                    <select 
                                        className="w-full bg-knix-input border border-knix-border p-3 rounded text-knix-text focus:border-knix-red focus:outline-none"
                                        value={newResource.type}
                                        onChange={e => setNewResource({...newResource, type: e.target.value as any})}
                                    >
                                        <option value="pdf">PDF Document</option>
                                        <option value="image">Image File</option>
                                        <option value="link">External Link</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-knix-muted uppercase">File Size (Approx)</label>
                                <input 
                                    className="w-full bg-knix-input border border-knix-border p-3 rounded text-knix-text placeholder-knix-muted focus:border-knix-red focus:outline-none"
                                    placeholder="e.g. 5.2 MB"
                                    value={newResource.size}
                                    onChange={e => setNewResource({...newResource, size: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-knix-muted uppercase">Download URL / File Link</label>
                                <input 
                                    className="w-full bg-knix-input border border-knix-border p-3 rounded text-knix-text placeholder-knix-muted focus:border-knix-red focus:outline-none"
                                    placeholder="https://drive.google.com/..."
                                    value={newResource.url}
                                    onChange={e => setNewResource({...newResource, url: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-knix-muted uppercase">Description</label>
                                <textarea 
                                    className="w-full bg-knix-input border border-knix-border p-3 rounded text-knix-text placeholder-knix-muted focus:border-knix-red focus:outline-none h-32"
                                    placeholder="Brief details about this resource..."
                                    value={newResource.description}
                                    onChange={e => setNewResource({...newResource, description: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-knix-border mt-4">
                        <button onClick={() => { setIsResourceFormOpen(false); setEditingResource(null); }} className="px-6 py-2.5 rounded-lg border border-knix-border text-knix-muted hover:text-knix-text hover:bg-knix-card font-medium transition-colors">
                            Cancel
                        </button>
                        <button onClick={handleAddResource} className="px-8 py-2.5 bg-knix-red text-white rounded-lg font-bold hover:bg-knix-redHover flex items-center gap-2 shadow-lg shadow-knix-red/20 transition-all hover:-translate-y-0.5">
                            <Save size={18} /> {editingResource ? 'Update Resource' : 'Save Resource'}
                        </button>
                    </div>
                </div>
            )}

            <div className="grid gap-6">
                {resources.map(category => (
                    category.items.length > 0 && (
                        <div key={category.category} className="bg-knix-card border border-knix-border rounded-xl overflow-hidden">
                            <div className="bg-knix-bg/50 px-6 py-3 border-b border-knix-border font-bold text-knix-text flex justify-between">
                                {category.category}
                                <span className="text-xs bg-knix-input px-2 py-1 rounded text-knix-muted">{category.items.length} files</span>
                            </div>
                            <div className="divide-y divide-knix-border">
                                {category.items.map(item => (
                                    <div key={item.id} className="p-4 hover:bg-knix-bg/30 flex justify-between items-center group transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-knix-input p-2 rounded text-knix-red">
                                                {item.type === 'pdf' ? <FileText size={20}/> : <ImageIcon size={20}/>}
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-knix-text">{item.title}</h5>
                                                <p className="text-xs text-knix-muted">{item.size} • {item.downloads} downloads</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditResource(item, category.category)}
                                                className="text-knix-muted hover:text-knix-red hover:bg-knix-red/10 p-2 rounded transition-colors"
                                                title="Edit Resource"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteResource(item.id)}
                                                className="text-knix-muted hover:text-red-500 hover:bg-red-500/10 p-2 rounded transition-colors"
                                                title="Delete Resource"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
          </div>
      )}
    </div>
  );
};

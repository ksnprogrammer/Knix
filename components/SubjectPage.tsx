import React, { useEffect, useState } from 'react';
import { BlogPost, ResourceCategory, Subject } from '../types';
import { db } from '../services/db';
import { FileText, Download, Calendar, User, Eye, ArrowDownCircle, Book } from 'lucide-react';
import { AdUnit } from './AdUnit';

interface SubjectPageProps {
  subject: Subject;
}

export const SubjectPage: React.FC<SubjectPageProps> = ({ subject }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [resources, setResources] = useState<ResourceCategory[]>([]);

  useEffect(() => {
    // Filter posts by subject
    const allPosts = db.getPosts();
    setPosts(allPosts.filter(p => p.subject === subject));

    // Filter resources by subject
    const allResources = db.getResources();
    setResources(allResources.filter(r => r.category === subject));
  }, [subject]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Subject Header */}
      <div className="bg-gradient-to-r from-knix-card to-slate-900 p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-2 font-rajdhani uppercase tracking-wide">
            {subject}
          </h2>
          <p className="text-slate-400">
             Access curated notes, past papers, and study guides specifically for A/L {subject}.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-32 bg-knix-red/10 skew-x-12 transform translate-x-8"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Blog/Notes Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <FileText className="text-knix-red" size={20} /> Latest Notes
          </h3>
          
          {posts.length === 0 ? (
             <div className="text-slate-500 italic p-4 bg-knix-card rounded-lg border border-slate-800">
                No notes published for {subject} yet.
             </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-knix-card rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all">
                {post.imageUrl && (
                  <div className="h-40 w-full overflow-hidden">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={12} /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                  <div className="prose prose-invert prose-sm text-slate-400 line-clamp-3 whitespace-pre-line mb-4">
                    {post.content}
                  </div>
                  <button className="text-knix-red text-sm font-bold hover:underline">Read More</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Downloadable Resources */}
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Download className="text-knix-red" size={20} /> Downloads
          </h3>

          <div className="bg-knix-card rounded-xl border border-slate-800 overflow-hidden">
             <div className="divide-y divide-slate-800">
                {resources.length === 0 ? (
                   <div className="p-4 text-center text-slate-500 text-sm">No files available.</div>
                ) : (
                   resources.map(cat => (
                      cat.items.map(item => (
                         <div key={item.id} className="p-4 hover:bg-slate-800/30 transition-colors group">
                            <h4 className="text-white font-medium text-sm mb-1 group-hover:text-knix-red transition-colors">{item.title}</h4>
                            <div className="flex justify-between items-center mt-2">
                               <span className="text-xs text-slate-500 uppercase font-bold">{item.type} • {item.size}</span>
                               <button className="p-1.5 text-white bg-knix-red rounded hover:bg-knix-redHover transition-colors">
                                  <ArrowDownCircle size={16} />
                               </button>
                            </div>
                         </div>
                      ))
                   ))
                )}
             </div>
          </div>
          
          <AdUnit format="sidebar" className="h-60" />
        </div>
      </div>
    </div>
  );
};
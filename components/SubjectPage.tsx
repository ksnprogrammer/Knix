import React, { useEffect, useState } from 'react';
import { BlogPost, ResourceCategory, Subject } from '../types';
import { db } from '../services/db';
import { FileText, Download, Calendar, Share2, ArrowDownCircle } from 'lucide-react';
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

  const handleShare = (text: string) => {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({ title: text, url });
    } else {
        navigator.clipboard.writeText(`${text} - ${url}`);
        alert('Content link copied!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Subject Header */}
      <div className="bg-knix-card p-8 rounded-2xl border border-knix-border relative overflow-hidden shadow-card">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-knix-text mb-2 font-rajdhani uppercase tracking-wide">
            {subject}
          </h2>
          <p className="text-knix-muted max-w-2xl">
             Access curated notes, past papers, and study guides specifically for A/L {subject}.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-32 bg-knix-red/10 skew-x-12 transform translate-x-8"></div>
        <div className="absolute right-0 bottom-0 h-32 w-32 bg-gradient-to-tl from-knix-red/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Blog/Notes Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-knix-border pb-2">
             <h3 className="text-xl font-bold text-knix-text flex items-center gap-2">
               <FileText className="text-knix-red" size={20} /> Latest Notes
             </h3>
          </div>
          
          {posts.length === 0 ? (
             <div className="text-knix-muted italic p-6 bg-knix-card rounded-lg border border-knix-border text-center">
                No notes published for {subject} yet.
             </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-knix-card rounded-xl border border-knix-border overflow-hidden hover:border-knix-muted/50 transition-all shadow-sm group">
                {post.imageUrl && (
                  <div className="h-40 w-full overflow-hidden relative">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-knix-muted flex items-center gap-1 font-medium bg-knix-bg px-2 py-1 rounded border border-knix-border">
                          <Calendar size={12} /> {post.date}
                       </span>
                    </div>
                    <button onClick={() => handleShare(post.title)} className="text-knix-muted hover:text-knix-red transition-colors p-1 rounded-md hover:bg-knix-bg">
                       <Share2 size={16} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-knix-text mb-2 group-hover:text-knix-red transition-colors">{post.title}</h3>
                  <div className="prose prose-invert prose-sm text-knix-muted line-clamp-3 whitespace-pre-line mb-4">
                    {post.content}
                  </div>
                  <button className="text-knix-red text-sm font-bold hover:underline flex items-center gap-1">
                     Read Note <ArrowDownCircle size={14} className="-rotate-90" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Downloadable Resources */}
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-knix-text flex items-center gap-2 border-b border-knix-border pb-2">
            <Download className="text-knix-red" size={20} /> Downloads
          </h3>

          <div className="bg-knix-card rounded-xl border border-knix-border overflow-hidden shadow-sm">
             <div className="divide-y divide-knix-border">
                {resources.length === 0 ? (
                   <div className="p-8 text-center text-knix-muted text-sm">No files available.</div>
                ) : (
                   resources.map(cat => (
                      cat.items.map(item => (
                         <div key={item.id} className="p-4 hover:bg-knix-bg/50 transition-colors group">
                            <h4 className="text-knix-text font-medium text-sm mb-1 group-hover:text-knix-red transition-colors cursor-pointer line-clamp-1">{item.title}</h4>
                            <div className="flex justify-between items-center mt-2">
                               <span className="text-xs text-knix-muted uppercase font-bold">{item.type} • {item.size}</span>
                               <div className="flex gap-2">
                                  <button onClick={() => handleShare(item.title)} className="p-1.5 text-knix-muted hover:text-knix-text hover:bg-knix-bg rounded transition-colors" title="Share">
                                     <Share2 size={14} />
                                  </button>
                                  <button className="p-1.5 text-white bg-knix-red rounded hover:bg-knix-redHover transition-colors shadow-glow hover:shadow-glow-hover">
                                     <ArrowDownCircle size={16} />
                                  </button>
                               </div>
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
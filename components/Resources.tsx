import React, { useEffect, useState } from 'react';
import { db } from '../services/db';
import { ResourceCategory, Subject } from '../types';
import { FileText, Download, Book, RefreshCw, Eye, ArrowDownCircle, Share2 } from 'lucide-react';
import { AdUnit } from './AdUnit';

export const Resources: React.FC = () => {
  const [resources, setResources] = useState<ResourceCategory[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All'>('All');

  const loadResources = () => {
     setResources(db.getResources());
  };

  useEffect(() => {
     loadResources();
  }, []);

  const subjects: (Subject | 'All')[] = ['All', 'Biology', 'Physics', 'Chemistry', 'Combined Maths', 'ICT'];

  const filteredResources = selectedSubject === 'All' 
    ? resources 
    : resources.filter(cat => cat.category === selectedSubject);

  const handleShare = (title: string) => {
     const text = `Download ${title} on Knix!`;
     const url = window.location.href;
     if (navigator.share) {
        navigator.share({ title: text, url });
     } else {
        navigator.clipboard.writeText(`${text} - ${url}`);
        alert('Link details copied!');
     }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
       <div className="flex justify-between items-end border-b border-knix-border pb-4">
         <div>
            <h2 className="text-3xl font-bold text-knix-text mb-2 font-rajdhani">Downloads Library</h2>
            <p className="text-knix-muted">Official Past Papers, Marking Schemes, and Short Notes.</p>
         </div>
       </div>

       {/* Subject Filters */}
       <div className="flex flex-wrap gap-2">
         {subjects.map(subject => (
           <button
             key={subject}
             onClick={() => setSelectedSubject(subject)}
             className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
               selectedSubject === subject
                 ? 'bg-knix-red border-knix-red text-white'
                 : 'bg-knix-card border-knix-border text-knix-muted hover:border-knix-red hover:text-white dark:hover:text-white hover:text-knix-red'
             }`}
           >
             {subject === 'All' ? 'All' : subject}
           </button>
         ))}
       </div>

       <AdUnit format="banner" className="h-20" />

       <div className="grid md:grid-cols-2 gap-8">
          {filteredResources.map((category) => (
             <div key={category.category} className="bg-knix-card rounded-xl border border-knix-border overflow-hidden flex flex-col shadow-sm">
                <div className="px-6 py-4 bg-knix-bg/50 border-b border-knix-border flex items-center justify-between">
                   <h3 className="text-xl font-bold text-knix-text flex items-center gap-2">
                      <Book className="text-knix-red" size={20} />
                      {category.category}
                   </h3>
                   <span className="text-xs font-medium bg-knix-bg text-knix-muted px-2 py-1 rounded border border-knix-border">
                      {category.items.length} Files
                   </span>
                </div>
                <div className="divide-y divide-knix-border flex-1">
                   {category.items.length === 0 ? (
                      <div className="p-8 text-center text-knix-muted text-sm italic">
                         No resources uploaded.
                      </div>
                   ) : (
                     category.items.map((item, idx) => (
                        <div key={idx} className="p-4 hover:bg-knix-bg/30 transition-colors flex items-center justify-between group">
                           <div className="flex items-start gap-4">
                              <div className="p-3 bg-knix-bg rounded-lg text-knix-muted group-hover:text-knix-text transition-colors border border-knix-border">
                                 <FileText size={24} />
                              </div>
                              <div>
                                 <h4 className="text-knix-text font-medium mb-1 group-hover:text-knix-red transition-colors cursor-pointer">{item.title}</h4>
                                 <p className="text-knix-muted text-xs uppercase font-bold flex items-center gap-2">
                                   {item.type} • <span className="font-normal">{item.size} • {item.downloads} Downloads</span>
                                 </p>
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <button onClick={() => handleShare(item.title)} className="p-2 text-knix-muted hover:text-knix-text rounded-lg transition-colors" title="Share">
                                 <Share2 size={16} />
                              </button>
                              <button className="p-2 text-white bg-knix-red hover:bg-knix-redHover rounded-lg transition-all shadow-lg shadow-knix-red/20" title="Download">
                                 <Download size={18} />
                              </button>
                           </div>
                        </div>
                     ))
                   )}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};
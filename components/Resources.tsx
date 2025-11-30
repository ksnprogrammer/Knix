
import React, { useEffect, useState } from 'react';
import { db } from '../services/db';
import { ResourceCategory, Subject } from '../types';
import { FileText, Download, Book, Share2, Image as ImageIcon, Link as LinkIcon, User, ArrowDownCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AdUnit } from './AdUnit';

export const Resources: React.FC = () => {
  const [resources, setResources] = useState<ResourceCategory[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All'>('All');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

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

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
             category.items.length > 0 && (
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
                        {category.items.map((item, idx) => {
                            const isExpanded = !!expandedItems[item.id];
                            const hasLongDesc = item.description && item.description.length > 80;

                            return (
                                <div key={idx} className="p-5 hover:bg-knix-bg/30 transition-colors flex flex-col group gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-knix-bg rounded-lg text-knix-muted group-hover:text-knix-red transition-colors border border-knix-border shrink-0 mt-1">
                                            {item.type === 'pdf' ? <FileText size={24} /> : item.type === 'image' ? <ImageIcon size={24} /> : <LinkIcon size={24} />}
                                        </div>
                                        <div className="space-y-2 flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-4">
                                                <h4 className="text-knix-text font-bold text-lg group-hover:text-knix-red transition-colors cursor-pointer leading-tight">
                                                    {item.title}
                                                </h4>
                                                {/* Mobile Download Count */}
                                                <div className="sm:hidden text-right shrink-0">
                                                     <div className="text-sm font-bold text-knix-text font-rajdhani">{item.downloads.toLocaleString()}</div>
                                                     <div className="text-[8px] uppercase text-knix-muted font-bold tracking-wider">DLs</div>
                                                </div>
                                            </div>
                                            
                                            {item.description && (
                                                <div className="relative">
                                                    <p className={`text-sm text-knix-muted transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
                                                        {item.description}
                                                    </p>
                                                    {hasLongDesc && (
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); toggleExpand(item.id); }}
                                                            className="flex items-center gap-1 text-xs text-knix-red font-bold hover:underline mt-1 bg-transparent border-none p-0 cursor-pointer"
                                                        >
                                                            {isExpanded ? (
                                                                <>Show Less <ChevronUp size={12} /></>
                                                            ) : (
                                                                <>Read More <ChevronDown size={12} /></>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex flex-wrap items-center gap-3 text-xs text-knix-muted pt-1">
                                                <span className="bg-knix-bg px-2 py-0.5 rounded border border-knix-border uppercase font-bold text-[10px]">{item.type}</span>
                                                <span>{item.size}</span>
                                                {item.author && (
                                                    <div className="flex items-center gap-1 pl-2 border-l border-knix-border">
                                                        <User size={10} /> 
                                                        <span>{item.author}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Desktop Action Area */}
                                        <div className="hidden sm:flex flex-col items-end gap-3 pl-4 border-l border-knix-border/50 ml-2">
                                            <div className="text-right min-w-[80px]">
                                                <div className="text-xl font-bold text-knix-text font-rajdhani">{item.downloads.toLocaleString()}</div>
                                                <div className="text-[10px] uppercase text-knix-muted font-bold tracking-wider">Downloads</div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleShare(item.title)} className="p-2 text-knix-muted hover:text-knix-text hover:bg-knix-bg rounded-lg transition-colors border border-transparent hover:border-knix-border" title="Share">
                                                    <Share2 size={16} />
                                                </button>
                                                <button className="p-2 text-white bg-knix-red hover:bg-knix-redHover rounded-lg transition-all shadow-lg shadow-knix-red/20 hover:-translate-y-0.5" title="Download">
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Mobile Actions */}
                                    <div className="flex sm:hidden justify-end gap-3 pt-2 border-t border-knix-border mt-2 border-dashed">
                                        <button onClick={() => handleShare(item.title)} className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-knix-muted bg-knix-bg border border-knix-border rounded-lg hover:text-knix-text">
                                            <Share2 size={14} /> Share
                                        </button>
                                        <button className="flex-[2] flex items-center justify-center gap-2 py-2 text-xs font-bold text-white bg-knix-red rounded-lg shadow-glow">
                                            <Download size={14} /> Download
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
             )
          ))}
          
          {filteredResources.every(cat => cat.items.length === 0) && (
             <div className="col-span-full p-12 text-center border border-dashed border-knix-border rounded-xl">
                <p className="text-knix-muted italic">No resources found for the selected filter.</p>
             </div>
          )}
       </div>
    </div>
  );
};

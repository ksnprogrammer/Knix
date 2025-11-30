import React, { useEffect, useState } from 'react';
import { db } from '../services/db';
import { ResourceCategory, Subject } from '../types';
import { FileText, Download, Book, RefreshCw, Eye, ArrowDownCircle } from 'lucide-react';
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

  // Filter logic
  const filteredResources = selectedSubject === 'All' 
    ? resources 
    : resources.filter(cat => cat.category === selectedSubject);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
       <div className="flex justify-between items-end border-b border-slate-800 pb-4">
         <div>
            <h2 className="text-3xl font-bold text-white mb-2 font-rajdhani">Downloads Library</h2>
            <p className="text-slate-400">Official Past Papers, Marking Schemes, and Short Notes.</p>
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
                 : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-knix-red hover:text-white'
             }`}
           >
             {subject === 'All' ? 'All' : subject}
           </button>
         ))}
       </div>

       <AdUnit format="banner" className="h-20" />

       <div className="grid md:grid-cols-2 gap-8">
          {filteredResources.map((category) => (
             <div key={category.category} className="bg-knix-card rounded-xl border border-slate-800 overflow-hidden flex flex-col">
                <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                   <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Book className="text-knix-red" size={20} />
                      {category.category}
                   </h3>
                   <span className="text-xs font-medium bg-slate-800 text-slate-300 px-2 py-1 rounded">
                      {category.items.length} Files
                   </span>
                </div>
                <div className="divide-y divide-slate-800 flex-1">
                   {category.items.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 text-sm italic">
                         No resources uploaded.
                      </div>
                   ) : (
                     category.items.map((item, idx) => (
                        <div key={idx} className="p-4 hover:bg-slate-800/30 transition-colors flex items-center justify-between group">
                           <div className="flex items-start gap-4">
                              <div className="p-3 bg-slate-900 rounded-lg text-slate-400 group-hover:text-white transition-colors">
                                 <FileText size={24} />
                              </div>
                              <div>
                                 <h4 className="text-white font-medium mb-1 group-hover:text-knix-red transition-colors cursor-pointer">{item.title}</h4>
                                 <p className="text-slate-500 text-xs uppercase font-bold flex items-center gap-2">
                                   {item.type} • <span className="font-normal">{item.size}</span>
                                 </p>
                              </div>
                           </div>
                           <button className="p-2 text-white bg-knix-red hover:bg-knix-redHover rounded-lg transition-all shadow-lg shadow-knix-red/20" title="Download">
                              <Download size={18} />
                           </button>
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
import React, { useEffect, useState } from 'react';
import { db } from '../services/db';
import { ResourceCategory } from '../types';
import { FileText, Download, Book, ExternalLink, RefreshCw } from 'lucide-react';

export const Resources: React.FC = () => {
  const [resources, setResources] = useState<ResourceCategory[]>([]);

  const loadResources = () => {
     setResources(db.getResources());
  };

  useEffect(() => {
     loadResources();
  }, []);

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-end border-b border-slate-800 pb-4">
         <div>
            <h2 className="text-3xl font-bold text-white mb-2">Resource Library</h2>
            <p className="text-slate-400">Past papers, marking schemes, and study guides for all streams.</p>
         </div>
         <button onClick={loadResources} className="text-slate-400 hover:text-white p-2" title="Refresh DB">
            <RefreshCw size={20} />
         </button>
       </div>

       <div className="grid gap-8">
          {resources.map((category) => (
             <div key={category.category} className="bg-knix-card rounded-xl border border-slate-800 overflow-hidden">
                <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                   <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Book className="text-knix-red" size={20} />
                      {category.category}
                   </h3>
                   <span className="text-xs font-medium bg-slate-900 text-slate-400 px-2 py-1 rounded">
                      {category.items.length} Resources
                   </span>
                </div>
                <div className="divide-y divide-slate-800">
                   {category.items.length === 0 ? (
                      <div className="p-4 text-slate-500 text-sm italic">No resources uploaded yet.</div>
                   ) : (
                     category.items.map((item, idx) => (
                        <div key={idx} className="p-4 hover:bg-slate-800/30 transition-colors flex items-center justify-between group">
                           <div className="flex items-start gap-4">
                              <div className="p-3 bg-slate-900 rounded-lg text-slate-400 group-hover:text-white transition-colors">
                                 <FileText size={24} />
                              </div>
                              <div>
                                 <h4 className="text-white font-medium mb-1 group-hover:text-knix-red transition-colors cursor-pointer">{item.title}</h4>
                                 <p className="text-slate-500 text-xs">{item.type.toUpperCase()} • {item.size}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className="text-slate-600 text-xs hidden sm:block">{item.downloads} downloads</span>
                              <button className="p-2 text-slate-400 hover:text-knix-red hover:bg-knix-red/10 rounded-full transition-all">
                                 <Download size={20} />
                              </button>
                           </div>
                        </div>
                     ))
                   )}
                </div>
             </div>
          ))}
       </div>

       {/* Banner for more */}
       <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 border border-slate-700 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need Physical Copies?</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
             Order past paper books and model paper sets directly from the Knix store. Delivered to your doorstep anywhere in Sri Lanka.
          </p>
          <button className="bg-white text-slate-900 hover:bg-slate-200 font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center gap-2">
             Visit Store <ExternalLink size={16} />
          </button>
       </div>
    </div>
  );
};
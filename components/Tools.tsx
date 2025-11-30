import React, { useState } from 'react';
import { Timer, Calculator, PenTool, Eraser } from 'lucide-react';
import { AdUnit } from './AdUnit';

export const Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timer' | 'calc' | 'board'>('timer');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
         <div>
            <h2 className="text-3xl font-bold text-white mb-2 font-rajdhani">Student Utilities</h2>
            <p className="text-slate-400">Tools to assist your daily study routine.</p>
         </div>
      </div>

      <div className="flex gap-4">
         <button onClick={() => setActiveTab('timer')} className={`px-4 py-2 rounded border ${activeTab === 'timer' ? 'bg-knix-red border-knix-red text-white' : 'border-slate-700 text-slate-400'}`}>Pomodoro</button>
         <button onClick={() => setActiveTab('board')} className={`px-4 py-2 rounded border ${activeTab === 'board' ? 'bg-knix-red border-knix-red text-white' : 'border-slate-700 text-slate-400'}`}>Whiteboard</button>
         <button onClick={() => setActiveTab('calc')} className={`px-4 py-2 rounded border ${activeTab === 'calc' ? 'bg-knix-red border-knix-red text-white' : 'border-slate-700 text-slate-400'}`}>Calculator</button>
      </div>

      <div className="bg-knix-card border border-slate-800 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
         {activeTab === 'timer' && (
            <div className="text-center">
               <div className="text-8xl font-mono font-bold text-white mb-8">25:00</div>
               <div className="flex justify-center gap-4">
                  <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">Start Focus</button>
                  <button className="bg-slate-800 text-white px-8 py-3 rounded-full font-bold">Reset</button>
               </div>
            </div>
         )}
         {activeTab === 'board' && (
            <div className="w-full h-full flex flex-col items-center text-slate-500">
               <PenTool size={48} className="mb-4" />
               <p>Digital Whiteboard Area</p>
               <p className="text-xs mt-2">(Use iPad or Tablet for best experience)</p>
            </div>
         )}
         {activeTab === 'calc' && (
            <div className="w-full max-w-xs bg-slate-900 p-4 rounded-xl border border-slate-700">
               <div className="bg-slate-800 h-16 mb-4 rounded text-right p-4 text-2xl font-mono text-white">0</div>
               <div className="grid grid-cols-4 gap-2">
                  {[7,8,9,'/',4,5,6,'*',1,2,3,'-',0,'.','=','+'].map(k => (
                     <button key={k} className="bg-slate-700 hover:bg-slate-600 p-4 rounded text-white font-bold">{k}</button>
                  ))}
               </div>
            </div>
         )}
      </div>
      
      <AdUnit format="banner" className="h-24" />
    </div>
  );
};
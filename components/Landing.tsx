import React from 'react';
import { useNavigate } from './Layout';
import { BookOpen, Users, Award, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-knix-bg relative overflow-hidden flex flex-col">
       {/* Background Glows */}
       <div className="absolute top-0 left-1/4 w-96 h-96 bg-knix-red/10 rounded-full blur-[128px] pointer-events-none opacity-50"></div>
       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none opacity-50"></div>

       <div className="max-w-6xl mx-auto py-20 px-6 relative z-10 flex-1">
          
          {/* Hero Section */}
          <div className="text-center mb-20 fade-in">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-knix-red/10 border border-knix-red/20 text-knix-red text-xs font-bold uppercase tracking-widest mb-6 shadow-glow">
                <Star size={12} fill="currentColor" /> Official Learning Platform
             </div>
             <h1 className="text-6xl md:text-8xl font-bold text-knix-text font-rajdhani mb-6 tracking-tight leading-none">
                <span className="text-gradient bg-gradient-to-r from-knix-text to-knix-muted">KNIX</span> <span className="text-knix-red">EDU</span>
             </h1>
             <p className="text-xl md:text-2xl text-knix-muted max-w-3xl mx-auto mb-10 font-light leading-relaxed">
                The ultimate open-source resource hub for A/L Science students. 
                <span className="text-knix-text font-medium border-b border-knix-red/30"> Biology</span>, 
                <span className="text-knix-text font-medium border-b border-knix-red/30"> Physics</span>, 
                <span className="text-knix-text font-medium border-b border-knix-red/30"> Chemistry</span> & 
                <span className="text-knix-text font-medium border-b border-knix-red/30"> Combined Maths</span>.
             </p>
             <div className="flex flex-col md:flex-row justify-center gap-6">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-knix-red hover:bg-knix-redHover text-white px-10 py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-glow hover:shadow-glow-hover transform hover:-translate-y-1"
                >
                  <Zap size={20} fill="currentColor" /> Start Learning Now
                </button>
                <button 
                  onClick={() => navigate('/resources')}
                  className="bg-knix-card hover:bg-knix-bg text-knix-text px-10 py-5 rounded-xl font-bold text-lg transition-all border border-knix-border hover:border-knix-red flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                >
                  <BookOpen size={20} /> Access Library
                </button>
             </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
             {[
                { 
                  title: 'Biology', 
                  desc: 'Complete resource packs for Biology including diagrams and short notes.', 
                  path: '/biology',
                  color: 'text-green-600 dark:text-green-500',
                  bg: 'bg-green-500/10',
                  border: 'hover:border-green-500/50'
                },
                { 
                  title: 'Physics', 
                  desc: 'Structured guides for Mechanics, Fields, and Electronics.', 
                  path: '/physics',
                  color: 'text-purple-600 dark:text-purple-500',
                  bg: 'bg-purple-500/10',
                  border: 'hover:border-purple-500/50'
                },
                { 
                  title: 'Chemistry', 
                  desc: 'Master Organic conversions and Physical Chemistry concepts.', 
                  path: '/chemistry',
                  color: 'text-blue-600 dark:text-blue-500',
                  bg: 'bg-blue-500/10',
                  border: 'hover:border-blue-500/50'
                }
             ].map((sub, i) => (
                <div 
                  key={i} 
                  onClick={() => navigate(sub.path)}
                  className={`bg-knix-card border border-knix-border p-8 rounded-2xl transition-all cursor-pointer group hover:-translate-y-2 shadow-card hover:shadow-lg ${sub.border}`}
                >
                   <div className={`w-12 h-12 rounded-lg ${sub.bg} flex items-center justify-center mb-6`}>
                      <Award className={sub.color} size={24} />
                   </div>
                   <h3 className="text-3xl font-bold text-knix-text font-rajdhani mb-3">{sub.title}</h3>
                   <p className="text-knix-muted leading-relaxed">{sub.desc}</p>
                   <div className="mt-6 flex items-center text-sm font-bold text-knix-red opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight size={16} className="ml-2" />
                   </div>
                </div>
             ))}
          </div>

          {/* Stats Section */}
          <div className="border-t border-knix-border pt-16">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: 'Active Students', value: '1,200+' },
                  { label: 'Past Papers', value: '500+' },
                  { label: 'Access Cost', value: 'FREE' },
                  { label: 'Platform', value: 'WEB' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl font-bold text-knix-text font-rajdhani mb-2">{stat.value}</div>
                    <div className="text-xs text-knix-red uppercase tracking-widest font-bold">{stat.label}</div>
                  </div>
                ))}
             </div>
          </div>
       </div>

       {/* Footer */}
       <div className="border-t border-knix-border bg-knix-card/50 mt-auto py-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-knix-muted text-sm">
             <div className="mb-4 md:mb-0">
                &copy; 2025 Knix Education. Built for Sri Lanka.
             </div>
             <div className="flex items-center gap-6">
                <span className="flex items-center gap-2 hover:text-knix-text transition-colors cursor-pointer"><ShieldCheck size={14} /> Secure</span>
                <span className="flex items-center gap-2 hover:text-knix-text transition-colors cursor-pointer"><Users size={14} /> Community</span>
             </div>
          </div>
       </div>
    </div>
  );
};
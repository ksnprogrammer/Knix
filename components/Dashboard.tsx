import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { db } from '../services/db';
import { Calendar } from 'lucide-react';
import { AdUnit } from './AdUnit';

export const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  // Hardcoded date: August 1, 2025
  const examDate = new Date('2025-08-01T00:00:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +examDate - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }

  useEffect(() => {
    setPosts(db.getPosts());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-knix-border pb-4">
         <div>
            <h2 className="text-3xl font-bold text-knix-text font-rajdhani">My Dashboard</h2>
            <span className="text-knix-muted text-sm">Welcome back, Scholar.</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-bold text-knix-muted uppercase tracking-widest mb-4 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-knix-red"></span> Recent Activity
          </h3>
          
          {posts.length === 0 ? (
            <div className="text-center p-10 border border-dashed border-knix-border rounded-xl text-knix-muted">
               No recent posts available.
            </div>
          ) : (
            posts.map((post, index) => (
              <React.Fragment key={post.id}>
                <div className="bg-knix-card rounded-xl border border-knix-border overflow-hidden hover:border-knix-muted/30 transition-all shadow-card group">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${
                         post.subject === 'Biology' ? 'bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20' :
                         post.subject === 'Chemistry' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-500/20' :
                         post.subject === 'Physics' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-500 border-purple-500/20' : 'bg-knix-bg text-knix-muted border-knix-border'
                      }`}>
                        {post.subject}
                      </span>
                      <span className="text-xs text-knix-muted flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-knix-text mb-2 group-hover:text-knix-red transition-colors">{post.title}</h3>
                    
                    <div className="prose prose-invert prose-sm text-knix-muted mb-4 line-clamp-3">
                      {post.content}
                    </div>
                    
                    <button className="text-sm text-knix-red font-bold hover:underline">View Full Note</button>
                  </div>
                </div>

                {index === 0 && (
                  <AdUnit format="feed" className="h-24" />
                )}
              </React.Fragment>
            ))
          )}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Exam Countdown Widget */}
          <div className="bg-knix-card p-6 rounded-xl border border-knix-border shadow-card relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
                <Calendar className="text-knix-red w-24 h-24" />
             </div>
             <h4 className="font-bold text-knix-text mb-4 flex items-center gap-2 relative z-10">
               <Calendar className="text-knix-red" size={18} />
               2025 A/L Countdown
             </h4>
             {timeLeft ? (
                <div className="grid grid-cols-4 gap-2 text-center relative z-10">
                   <div className="bg-knix-bg p-2 rounded border border-knix-border">
                      <div className="text-xl font-bold text-knix-text font-mono">{timeLeft.days}</div>
                      <div className="text-[10px] text-knix-muted uppercase font-bold">Days</div>
                   </div>
                   <div className="bg-knix-bg p-2 rounded border border-knix-border">
                      <div className="text-xl font-bold text-knix-text font-mono">{timeLeft.hours}</div>
                      <div className="text-[10px] text-knix-muted uppercase font-bold">Hrs</div>
                   </div>
                   <div className="bg-knix-bg p-2 rounded border border-knix-border">
                      <div className="text-xl font-bold text-knix-text font-mono">{timeLeft.minutes}</div>
                      <div className="text-[10px] text-knix-muted uppercase font-bold">Mins</div>
                   </div>
                   <div className="bg-knix-bg p-2 rounded border border-knix-border">
                      <div className="text-xl font-bold text-knix-text font-mono">{timeLeft.seconds}</div>
                      <div className="text-[10px] text-knix-muted uppercase font-bold">Secs</div>
                   </div>
                </div>
             ) : (
                <div className="text-center text-knix-red font-bold text-xl animate-bounce">Exam Day!</div>
             )}
             <p className="text-xs text-knix-muted text-center mt-3 relative z-10">Target: August 2025</p>
          </div>

          <div className="bg-knix-card p-6 rounded-xl border border-knix-border shadow-card">
            <h4 className="font-bold text-knix-text mb-4 flex justify-between">
               Daily Study Goal
               <span className="text-knix-red text-xs">65%</span>
            </h4>
            <div className="w-full bg-knix-bg rounded-full h-2.5 mb-2 border border-knix-border overflow-hidden">
               <div className="bg-knix-red h-full rounded-full w-2/3 shadow-glow"></div>
            </div>
            <p className="text-xs text-knix-muted text-right">Keep going!</p>
          </div>
          <AdUnit format="sidebar" className="h-64" />
        </div>
      </div>
    </div>
  );
};
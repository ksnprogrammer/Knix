import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { db } from '../services/db';
import { Heart, Share2, Calendar, User, BookOpen } from 'lucide-react';
import { AdUnit } from './AdUnit';

export const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(db.getPosts());
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
         <h2 className="text-3xl font-bold text-white font-rajdhani">My Dashboard</h2>
         <span className="text-slate-500 text-sm">Welcome back, Student.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
             Recent Activity from All Subjects
          </h3>
          
          {posts.map((post, index) => (
            <React.Fragment key={post.id}>
              <div className="bg-knix-card rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                       post.subject === 'Biology' ? 'bg-green-500/10 text-green-500' :
                       post.subject === 'Chemistry' ? 'bg-blue-500/10 text-blue-500' :
                       post.subject === 'Physics' ? 'bg-purple-500/10 text-purple-500' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {post.subject}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={12} /> {post.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                  
                  <div className="prose prose-invert prose-sm text-slate-400 mb-4 line-clamp-3">
                    {post.content}
                  </div>
                  
                  <button className="text-sm text-knix-red font-medium hover:underline">View Full Note</button>
                </div>
              </div>

              {index === 0 && (
                <AdUnit format="feed" className="h-20" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-knix-card p-5 rounded-xl border border-slate-800">
            <h4 className="font-bold text-white mb-4">Daily Study Goal</h4>
            <div className="w-full bg-slate-900 rounded-full h-2 mb-2">
               <div className="bg-knix-red h-full rounded-full w-2/3"></div>
            </div>
            <p className="text-xs text-slate-400 text-right">65% Completed</p>
          </div>
          <AdUnit format="sidebar" className="h-64" />
        </div>
      </div>
    </div>
  );
};
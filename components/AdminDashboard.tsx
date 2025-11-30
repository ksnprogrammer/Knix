import React from 'react';
import { RECENT_ACTIVITY } from '../constants';
import { Plus, Upload, MoreHorizontal, FileText, Bot, Users, DollarSign } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white border-b-4 border-knix-red w-fit pb-1 mb-6">Dashboard</h2>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
            { label: 'Total Students', val: '12,540', icon: Users },
            { label: 'Active Courses', val: '154', icon: FileText },
            { label: 'AI Content Usage', val: '85% daily', icon: Bot },
            { label: 'Ad Revenue (Beta)', val: '$0.00', icon: DollarSign },
         ].map((stat, idx) => (
            <div key={idx} className="bg-knix-card p-6 rounded-lg border border-slate-800 border-l-4 border-l-knix-red">
               <div className="flex justify-between items-start">
                  <div>
                     <p className="text-slate-400 text-sm font-medium mb-2">{stat.label}</p>
                     <h3 className="text-2xl font-bold text-white">{stat.val}</h3>
                  </div>
                  <stat.icon className="text-slate-600" size={24} />
               </div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-knix-card p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
              <div className="flex gap-4 flex-wrap">
                 <button className="flex-1 bg-knix-red hover:bg-knix-redHover text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <Plus size={18} className="mr-2" /> Add New Subject
                 </button>
                 <button className="flex-1 bg-knix-red hover:bg-knix-redHover text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <Upload size={18} className="mr-2" /> Upload Content
                 </button>
              </div>
           </div>

           <div className="bg-knix-card p-6 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-white">Ad Monetization Overview</h3>
                 <button className="px-3 py-1 text-sm border border-slate-600 rounded text-slate-300 hover:bg-slate-800">Configure Ads</button>
              </div>
              <div className="h-48 flex items-end justify-center space-x-2">
                 {/* Mock Chart */}
                 {[40, 60, 45, 70, 85, 60, 75, 50, 65, 90, 80, 95].map((h, i) => (
                    <div key={i} className="w-full bg-slate-800 rounded-t-sm hover:bg-knix-red transition-colors relative group" style={{ height: `${h}%` }}>
                       <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          ${h * 2}
                       </div>
                    </div>
                 ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                 <span>Jan</span><span>Dec</span>
              </div>
           </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-knix-card p-6 rounded-xl border border-slate-800">
           <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
           <div className="space-y-6">
              {RECENT_ACTIVITY.map((activity, idx) => (
                 <div key={idx} className="flex gap-4">
                    <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                       activity.type === 'create' ? 'bg-red-500/20 text-red-500' : 
                       activity.type === 'ai' ? 'bg-purple-500/20 text-purple-500' :
                       'bg-blue-500/20 text-blue-500'
                    }`}>
                       {activity.type === 'create' ? <Plus size={16} /> : <Bot size={16} />}
                    </div>
                    <div>
                       <p className="text-white text-sm font-medium">{activity.text}</p>
                       <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Plus, Upload, Users, DollarSign, Shield, Trash2, Edit } from 'lucide-react';
import { db } from '../services/db';
import { User } from '../types';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users'>('overview');

  useEffect(() => {
    setUsers(db.getUsers());
  }, []);

  const handleRoleChange = (userId: string, newRole: User['role']) => {
    db.updateUserRole(userId, newRole);
    setUsers(db.getUsers()); // Refresh
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      db.deleteUser(userId);
      setUsers(db.getUsers()); // Refresh
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
         <h2 className="text-3xl font-bold text-white border-b-4 border-knix-red w-fit pb-1">System Admin</h2>
         <div className="flex gap-2">
            <button 
               onClick={() => setActiveTab('overview')}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-knix-red text-white' : 'text-slate-400 hover:text-white'}`}
            >
               Overview
            </button>
            <button 
               onClick={() => setActiveTab('users')}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-knix-red text-white' : 'text-slate-400 hover:text-white'}`}
            >
               User Management
            </button>
         </div>
      </div>
      
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {[
                { label: 'Total Students', val: users.filter(u => u.role === 'student').length, icon: Users },
                { label: 'Content Creators', val: users.filter(u => u.role === 'content_creator').length, icon: Edit },
                { label: 'Admins', val: users.filter(u => u.role === 'admin').length, icon: Shield },
                { label: 'Revenue (Beta)', val: '$0.00', icon: DollarSign },
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
          
          <div className="bg-knix-card p-6 rounded-xl border border-slate-800">
             <h3 className="text-lg font-bold text-white mb-4">System Database Status</h3>
             <p className="text-slate-400 text-sm mb-2">Using Simulated Text Database (LocalStorage) for Demo</p>
             <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-full animate-pulse"></div>
             </div>
             <p className="text-right text-xs text-green-500 mt-1">Operational</p>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="bg-knix-card rounded-xl border border-slate-800 overflow-hidden">
           <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-900 text-slate-200 uppercase font-medium">
                 <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                 {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                       <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                       <td className="px-6 py-4">{user.email}</td>
                       <td className="px-6 py-4">{user.joinedDate}</td>
                       <td className="px-6 py-4">
                          <select 
                             value={user.role}
                             onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                             className={`bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-knix-red ${
                                user.role === 'admin' ? 'text-red-400' : 
                                user.role === 'content_creator' ? 'text-blue-400' : 'text-slate-300'
                             }`}
                          >
                             <option value="student">Student</option>
                             <option value="content_creator">Creator</option>
                             <option value="admin">Admin</option>
                          </select>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button 
                             onClick={() => handleDeleteUser(user.id)}
                             className="text-slate-500 hover:text-red-500 transition-colors"
                             title="Delete User"
                          >
                             <Trash2 size={16} />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Shield, Trash2, Edit } from 'lucide-react';
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
      <div className="flex items-center justify-between border-b border-knix-border pb-4 mb-6">
         <h2 className="text-3xl font-bold text-knix-text border-b-4 border-knix-red w-fit pb-1 font-rajdhani">System Admin</h2>
         <div className="flex gap-2">
            <button 
               onClick={() => setActiveTab('overview')}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-knix-red text-white shadow-glow' : 'text-knix-muted hover:text-knix-text hover:bg-knix-card'}`}
            >
               Overview
            </button>
            <button 
               onClick={() => setActiveTab('users')}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-knix-red text-white shadow-glow' : 'text-knix-muted hover:text-knix-text hover:bg-knix-card'}`}
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
                <div key={idx} className="bg-knix-card p-6 rounded-lg border border-knix-border border-l-4 border-l-knix-red shadow-sm">
                   <div className="flex justify-between items-start">
                      <div>
                         <p className="text-knix-muted text-sm font-medium mb-2">{stat.label}</p>
                         <h3 className="text-2xl font-bold text-knix-text">{stat.val}</h3>
                      </div>
                      <stat.icon className="text-knix-muted" size={24} />
                   </div>
                </div>
             ))}
          </div>
          
          <div className="bg-knix-card p-6 rounded-xl border border-knix-border shadow-sm">
             <h3 className="text-lg font-bold text-knix-text mb-4">System Database Status</h3>
             <p className="text-knix-muted text-sm mb-2">Using Simulated Text Database (LocalStorage) for Demo</p>
             <div className="w-full bg-knix-bg h-2 rounded-full overflow-hidden border border-knix-border">
                <div className="bg-green-500 h-full w-full animate-pulse"></div>
             </div>
             <p className="text-right text-xs text-green-500 mt-1 font-bold">Operational</p>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="bg-knix-card rounded-xl border border-knix-border overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-knix-muted">
                <thead className="bg-knix-bg text-knix-text uppercase font-bold text-xs border-b border-knix-border">
                   <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Joined</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-knix-border">
                   {users.map((user) => (
                      <tr key={user.id} className="hover:bg-knix-bg/50 transition-colors">
                         <td className="px-6 py-4 font-medium text-knix-text">{user.name}</td>
                         <td className="px-6 py-4">{user.email}</td>
                         <td className="px-6 py-4">{user.joinedDate}</td>
                         <td className="px-6 py-4">
                            <select 
                               value={user.role}
                               onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                               className={`bg-knix-input border border-knix-border rounded px-2 py-1 text-xs focus:outline-none focus:border-knix-red ${
                                  user.role === 'admin' ? 'text-red-500 font-bold' : 
                                  user.role === 'content_creator' ? 'text-blue-500 font-bold' : 'text-knix-text'
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
                               className="text-knix-muted hover:text-red-500 transition-colors"
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
        </div>
      )}
    </div>
  );
};
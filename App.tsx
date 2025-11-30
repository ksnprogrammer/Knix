import React, { useState } from 'react';
import { Layout, Router, Navigate, useLocation, useNavigate } from './components/Layout';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { SubjectPage } from './components/SubjectPage';
import { CreatorDashboard } from './components/CreatorDashboard';
import { Resources } from './components/Resources';
import { Tools } from './components/Tools';
import { Star } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'K.Sithara' && password === 'sudumanika0421') {
       localStorage.setItem('userRole', 'admin');
       navigate('/creator');
    } else {
       setError('Invalid Admin Credentials');
    }
  };

  return (
    <div className="min-h-screen bg-knix-bg flex items-center justify-center p-4">
      <div className="bg-knix-card p-8 rounded-2xl border border-slate-800 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <Star className="text-knix-red mb-2 fill-knix-red" size={32} />
          <h1 className="text-2xl font-bold text-white font-rajdhani">Admin Access</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
             value={username} 
             onChange={e => setUsername(e.target.value)}
             className="w-full bg-slate-900 border border-slate-700 p-3 rounded text-white"
             placeholder="Username"
          />
          <input 
             type="password"
             value={password} 
             onChange={e => setPassword(e.target.value)}
             className="w-full bg-slate-900 border border-slate-700 p-3 rounded text-white"
             placeholder="Password"
          />
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" className="w-full bg-knix-red text-white py-3 rounded font-bold hover:bg-knix-redHover transition-colors">
             Enter System
          </button>
        </form>
        <button onClick={() => navigate('/')} className="w-full text-center text-slate-500 text-sm mt-4 hover:text-white">
           Return to Site
        </button>
      </div>
    </div>
  );
};

const MainRoutes = () => {
  const { pathname } = useLocation();
  const role = localStorage.getItem('userRole') as 'admin' | null;

  // Root Landing Page
  if (pathname === '/' || pathname === '') {
    return <Layout userRole={role || 'guest'}><Landing /></Layout>;
  }

  // Dashboard (All Feed)
  if (pathname === '/dashboard') {
    return <Layout userRole={role || 'guest'}><Dashboard /></Layout>;
  }

  // Subject Specific Routes
  if (pathname === '/biology') return <Layout userRole={role || 'guest'}><SubjectPage subject="Biology" /></Layout>;
  if (pathname === '/physics') return <Layout userRole={role || 'guest'}><SubjectPage subject="Physics" /></Layout>;
  if (pathname === '/chemistry') return <Layout userRole={role || 'guest'}><SubjectPage subject="Chemistry" /></Layout>;
  if (pathname === '/maths') return <Layout userRole={role || 'guest'}><SubjectPage subject="Combined Maths" /></Layout>;
  if (pathname === '/ict') return <Layout userRole={role || 'guest'}><SubjectPage subject="ICT" /></Layout>;

  // Library & Tools
  if (pathname === '/resources') {
    return <Layout userRole={role || 'guest'}><Resources /></Layout>;
  }
  if (pathname === '/tools') {
    return <Layout userRole={role || 'guest'}><Tools /></Layout>;
  }
  
  // Auth
  if (pathname === '/login') {
    return <Login />;
  }

  // Admin
  if (pathname === '/creator') {
    if (role !== 'admin') return <Navigate to="/login" />;
    return <Layout userRole="admin"><CreatorDashboard /></Layout>;
  }

  return <Navigate to="/" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
};

export default App;
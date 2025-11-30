import React, { useState } from 'react';
import { Layout, Router, Navigate, useLocation, useNavigate } from './components/Layout';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { SubjectPage } from './components/SubjectPage';
import { CreatorDashboard } from './components/CreatorDashboard';
import { Resources } from './components/Resources';
import { Tools } from './components/Tools';
import { Star } from 'lucide-react';
import { AdminDashboard } from './components/AdminDashboard';

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
    <div className="min-h-screen bg-knix-bg flex items-center justify-center p-4 transition-colors duration-300">
      <div className="bg-knix-card p-8 rounded-2xl border border-knix-border w-full max-w-sm shadow-card">
        <div className="flex flex-col items-center mb-6">
          <Star className="text-knix-red mb-2 fill-knix-red" size={32} />
          <h1 className="text-2xl font-bold text-knix-text font-rajdhani tracking-wide">Admin Portal</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
             value={username} 
             onChange={e => setUsername(e.target.value)}
             className="w-full bg-knix-input border border-knix-border p-3 rounded-lg text-knix-text focus:outline-none focus:border-knix-red transition-colors placeholder-knix-muted"
             placeholder="Username"
          />
          <input 
             type="password"
             value={password} 
             onChange={e => setPassword(e.target.value)}
             className="w-full bg-knix-input border border-knix-border p-3 rounded-lg text-knix-text focus:outline-none focus:border-knix-red transition-colors placeholder-knix-muted"
             placeholder="Password"
          />
          {error && <p className="text-red-500 text-xs text-center font-bold bg-red-500/10 py-1 rounded">{error}</p>}
          <button type="submit" className="w-full bg-knix-red text-white py-3 rounded-lg font-bold hover:bg-knix-redHover transition-all shadow-glow hover:shadow-glow-hover">
             Enter System
          </button>
        </form>
        <button onClick={() => navigate('/')} className="w-full text-center text-knix-muted text-sm mt-6 hover:text-knix-text transition-colors">
           ← Return to Site
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
  
  // System Admin (User management)
  if (pathname === '/admin') {
     if (role !== 'admin') return <Navigate to="/login" />;
     return <Layout userRole="admin"><AdminDashboard /></Layout>;
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
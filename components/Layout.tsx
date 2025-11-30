import React, { createContext, useContext, useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, Settings, LogOut, Menu, Search, Bell, MonitorPlay, Star, Dna, Atom, FlaskConical, Calculator, Cpu, Home } from 'lucide-react';
import { AdUnit } from './AdUnit';

// --- Router Context ---
const RouterContext = createContext<{
  path: string;
  navigate: (path: string) => void;
  params: Record<string, string>;
}>({ path: '/', navigate: () => {}, params: {} });

export const useRouter = () => useContext(RouterContext);
export const useLocation = () => { const { path } = useRouter(); return { pathname: path }; };
export const useNavigate = () => { const { navigate } = useRouter(); return navigate; };
export const useParams = () => { const { params } = useRouter(); return params; };
export const Navigate: React.FC<{ to: string; replace?: boolean }> = ({ to }) => {
  const { navigate } = useRouter();
  useEffect(() => { navigate(to); }, [to, navigate]);
  return null;
};
export const Router: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');
  useEffect(() => {
    const handleHashChange = () => setPath(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const navigate = (to: string) => { window.location.hash = to; };
  return <RouterContext.Provider value={{ path, navigate, params: {} }}>{children}</RouterContext.Provider>;
};

interface LayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'student' | 'content_creator' | 'guest';
}

export const Layout: React.FC<LayoutProps> = ({ children, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ icon: Icon, label, path }: { icon: any, label: string, path: string }) => (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-colors ${
        isActive(path)
          ? 'bg-knix-red/10 text-knix-red border-r-2 border-knix-red'
          : 'text-gray-400 hover:bg-knix-card hover:text-white'
      }`}
    >
      <Icon size={20} className="mr-3" />
      <span className={`font-medium ${!isSidebarOpen && 'hidden md:hidden'}`}>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-knix-bg overflow-hidden text-gray-200">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-knix-bg border-r border-slate-800 flex-shrink-0 transition-all duration-300 flex flex-col hidden md:flex`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center ${!isSidebarOpen && 'justify-center w-full'}`} onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
             <Star className="text-knix-red mr-2 fill-knix-red" size={24} />
             {isSidebarOpen && <span className="text-2xl font-bold text-white tracking-tight font-rajdhani">Knix</span>}
          </div>
        </div>

        <nav className="flex-1 px-4 mt-4 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">
            {isSidebarOpen ? 'Main' : '...'}
          </div>
          <NavItem icon={Home} label="Home" path="/" />
          <NavItem icon={LayoutDashboard} label="My Dashboard" path="/dashboard" />
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-6 px-4">
            {isSidebarOpen ? 'Subjects' : '...'}
          </div>
          <NavItem icon={Dna} label="Biology" path="/biology" />
          <NavItem icon={Atom} label="Physics" path="/physics" />
          <NavItem icon={FlaskConical} label="Chemistry" path="/chemistry" />
          <NavItem icon={Calculator} label="Comb. Maths" path="/maths" />
          <NavItem icon={Cpu} label="ICT" path="/ict" />

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-6 px-4">
            {isSidebarOpen ? 'Library' : '...'}
          </div>
          <NavItem icon={BookOpen} label="All Resources" path="/resources" />
          
          {(userRole === 'admin') && (
             <>
               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-6 px-4">
                  {isSidebarOpen ? 'Manage' : '...'}
               </div>
               <NavItem icon={MonitorPlay} label="Creator Studio" path="/creator" />
             </>
          )}
        </nav>

        {/* Sidebar Ad Placement */}
        {isSidebarOpen && (
           <div className="px-4 mb-4">
              <AdUnit format="sidebar" className="h-40" />
           </div>
        )}

        <div className="p-4 border-t border-slate-800 mt-auto">
           {userRole !== 'guest' && (
              <button onClick={() => { localStorage.removeItem('userRole'); navigate('/'); }} className="flex items-center w-full px-4 py-2 text-slate-400 hover:text-white transition-colors">
                 <LogOut size={20} className="mr-3" />
                 {isSidebarOpen && <span>Logout</span>}
              </button>
           )}
           {userRole === 'guest' && isSidebarOpen && (
             <div className="text-center text-xs text-slate-600 px-4">
                <button onClick={() => navigate('/login')} className="hover:text-knix-red">Admin Login</button>
             </div>
           )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-knix-bg border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-slate-800 text-slate-400 mr-4 md:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-white capitalize font-rajdhani">
              {location.pathname === '/' ? 'WELCOME' : location.pathname.replace('/', '').toUpperCase()}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-knix-card rounded-md px-3 py-1.5 border border-slate-700">
              <Search size={16} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:outline-none text-sm text-white w-48"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};
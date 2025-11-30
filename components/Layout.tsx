import React, { createContext, useContext, useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, User, Settings, LogOut, Menu, Search, Bell, Database, Mic, PenTool, Library, MonitorPlay } from 'lucide-react';

// --- Custom Router Logic (Replacing react-router-dom) ---
const RouterContext = createContext<{
  path: string;
  navigate: (path: string) => void;
  params: Record<string, string>;
}>({ path: '/', navigate: () => {}, params: {} });

export const useRouter = () => useContext(RouterContext);

export const useLocation = () => {
  const { path } = useRouter();
  return { pathname: path };
};

export const useNavigate = () => {
  const { navigate } = useRouter();
  return navigate;
};

export const useParams = () => {
  const { params } = useRouter();
  return params;
};

export const Navigate: React.FC<{ to: string; replace?: boolean }> = ({ to }) => {
  const { navigate } = useRouter();
  useEffect(() => {
    navigate(to);
  }, [to, navigate]);
  return null;
};

export const Router: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  const params: Record<string, string> = {};
  if (path.startsWith('/course/')) {
    params.id = path.replace('/course/', '');
  }

  return (
    <RouterContext.Provider value={{ path, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
};
// --- End Custom Router Logic ---

interface LayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'student' | 'content_creator';
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
          <div className={`flex items-center ${!isSidebarOpen && 'justify-center w-full'}`}>
            <div className="w-8 h-8 bg-knix-red rounded-lg flex items-center justify-center mr-2">
               <Database className="text-white" size={18} />
            </div>
            {isSidebarOpen && <span className="text-xl font-bold text-white tracking-tight">Knix</span>}
          </div>
        </div>

        <nav className="flex-1 px-4 mt-4 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">
            {isSidebarOpen ? 'Learning' : '...'}
          </div>
          
          <NavItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" />
          <NavItem icon={BookOpen} label="Subjects" path="/subjects" />
          <NavItem icon={Library} label="Resources" path="/resources" />

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-6 px-4">
            {isSidebarOpen ? 'AI Tools' : '...'}
          </div>
          <NavItem icon={Mic} label="Live Tutor" path="/live" />
          <NavItem icon={PenTool} label="AI Lab" path="/tools" />
          
          {(userRole === 'admin' || userRole === 'content_creator') && (
             <>
               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-6 px-4">
                  {isSidebarOpen ? 'Studio' : '...'}
               </div>
               <NavItem icon={MonitorPlay} label="Creator Panel" path="/creator" />
             </>
          )}

          {userRole === 'admin' && (
            <>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-6 px-4">
                {isSidebarOpen ? 'Admin' : '...'}
              </div>
              <NavItem icon={Database} label="System Admin" path="/admin" />
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800 mt-auto">
           <button onClick={() => navigate('/settings')} className="flex items-center w-full px-4 py-2 text-slate-400 hover:text-white mb-2">
              <Settings size={20} className="mr-3" />
              {isSidebarOpen && <span>Settings</span>}
           </button>
           <button onClick={() => navigate('/')} className="flex items-center w-full px-4 py-2 text-slate-400 hover:text-white transition-colors">
              <LogOut size={20} className="mr-3" />
              {isSidebarOpen && <span>Logout</span>}
           </button>
        </div>
      </aside>

      {/* Mobile Header & Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-knix-bg border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-slate-800 text-slate-400 mr-4 md:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-white capitalize">
              {location.pathname.replace('/', '').toUpperCase() || 'DASHBOARD'}
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
            <button className="relative p-2 text-slate-400 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-knix-red rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
               <User size={16} className="text-slate-300"/>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};
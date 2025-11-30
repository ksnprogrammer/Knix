
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, LogOut, Menu, Search, Home, Sun, Moon, Share2, Star, Dna, Atom, FlaskConical, Calculator, Cpu, MonitorPlay, ShieldCheck } from 'lucide-react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ icon: Icon, label, path }: { icon: any, label: string, path: string }) => (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center w-full px-4 py-3 mb-1.5 rounded-lg transition-all duration-200 group ${
        isActive(path)
          ? 'bg-knix-red/10 text-knix-red font-semibold relative overflow-hidden'
          : 'text-knix-muted hover:bg-knix-card hover:text-knix-text'
      }`}
    >
      {isActive(path) && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-knix-red rounded-r-full"></div>
      )}
      <Icon size={20} className={`mr-3 transition-colors ${isActive(path) ? 'text-knix-red' : 'text-knix-muted group-hover:text-knix-text'}`} />
      <span className={`${!isSidebarOpen && 'hidden md:hidden'}`}>{label}</span>
    </button>
  );

  const handleShare = async () => {
    const url = window.location.href;
    const title = 'Knix Learning Platform';
    
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex h-screen bg-knix-bg overflow-hidden text-knix-text transition-colors duration-300">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-knix-bg border-r border-knix-border flex-shrink-0 transition-all duration-300 flex flex-col hidden md:flex z-50 shadow-sm`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center ${!isSidebarOpen && 'justify-center w-full'}`} onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
             <Star className="text-knix-red mr-2 fill-knix-red animate-pulse" size={24} />
             {isSidebarOpen && <span className="text-2xl font-bold text-knix-text tracking-tight font-rajdhani">Knix</span>}
          </div>
        </div>

        <nav className="flex-1 px-3 mt-2 overflow-y-auto">
          <div className={`text-[10px] font-bold text-knix-muted uppercase tracking-widest mb-3 px-4 ${!isSidebarOpen && 'text-center'}`}>
            {isSidebarOpen ? 'Main' : '•'}
          </div>
          <NavItem icon={Home} label="Home" path="/" />
          <NavItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" />
          
          <div className={`text-[10px] font-bold text-knix-muted uppercase tracking-widest mb-3 mt-6 px-4 ${!isSidebarOpen && 'text-center'}`}>
            {isSidebarOpen ? 'Subjects' : '•'}
          </div>
          <NavItem icon={Dna} label="Biology" path="/biology" />
          <NavItem icon={Atom} label="Physics" path="/physics" />
          <NavItem icon={FlaskConical} label="Chemistry" path="/chemistry" />
          <NavItem icon={Calculator} label="Combined Maths" path="/maths" />
          <NavItem icon={Cpu} label="ICT" path="/ict" />

          <div className={`text-[10px] font-bold text-knix-muted uppercase tracking-widest mb-3 mt-6 px-4 ${!isSidebarOpen && 'text-center'}`}>
            {isSidebarOpen ? 'Library' : '•'}
          </div>
          <NavItem icon={BookOpen} label="Resources" path="/resources" />
          <NavItem icon={LayoutDashboard} label="Tools" path="/tools" />
          
          {(userRole === 'admin') && (
             <>
               <div className={`text-[10px] font-bold text-knix-muted uppercase tracking-widest mb-3 mt-6 px-4 ${!isSidebarOpen && 'text-center'}`}>
                  {isSidebarOpen ? 'Admin' : '•'}
               </div>
               <NavItem icon={MonitorPlay} label="Creator Studio" path="/creator" />
               <NavItem icon={ShieldCheck} label="System Admin" path="/admin" />
             </>
          )}
        </nav>

        {/* Sidebar Ad Placement */}
        {isSidebarOpen && (
           <div className="px-4 mb-4">
              <AdUnit format="sidebar" className="h-32" />
           </div>
        )}

        <div className="p-4 border-t border-knix-border mt-auto space-y-2">
           {/* Theme Toggle */}
           <button 
             onClick={toggleTheme}
             className="flex items-center w-full px-4 py-2.5 rounded-lg text-knix-muted hover:text-knix-text hover:bg-knix-card transition-colors"
           >
              {theme === 'dark' ? <Sun size={20} className="mr-3" /> : <Moon size={20} className="mr-3" />}
              {isSidebarOpen && <span className="text-sm font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
           </button>

           {userRole !== 'guest' && (
              <button onClick={() => { localStorage.removeItem('userRole'); navigate('/'); }} className="flex items-center w-full px-4 py-2.5 rounded-lg text-knix-muted hover:text-knix-red hover:bg-knix-card transition-colors">
                 <LogOut size={20} className="mr-3" />
                 {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
              </button>
           )}
           {userRole === 'guest' && isSidebarOpen && (
             <button 
               onClick={() => navigate('/login')} 
               className="flex items-center justify-center w-full mt-2 px-4 py-2.5 rounded-lg border border-knix-red/30 text-knix-red text-xs font-bold hover:text-white hover:bg-knix-red transition-all shadow-sm"
             >
                <ShieldCheck size={14} className="mr-2" />
                Admin Access
             </button>
           )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-knix-bg text-knix-text">
        <header className="h-16 bg-knix-bg/80 backdrop-blur-md border-b border-knix-border flex items-center justify-between px-6 transition-colors duration-300 z-40 sticky top-0">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-knix-card text-knix-muted mr-4 md:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-knix-text capitalize font-rajdhani tracking-wide">
              {location.pathname === '/' ? 'WELCOME' : location.pathname.replace('/', '').toUpperCase().replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center bg-knix-input rounded-lg px-3 py-2 border border-knix-border focus-within:border-knix-red transition-colors">
              <Search size={16} className="text-knix-muted mr-2" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none focus:outline-none text-sm text-knix-text w-48 placeholder-knix-muted"
              />
            </div>
            
            <button onClick={handleShare} className="p-2.5 text-knix-muted hover:text-knix-red hover:bg-knix-card rounded-lg transition-colors border border-transparent hover:border-knix-border" title="Share Page">
              <Share2 size={20} />
            </button>
            
            {userRole === 'guest' && (
               <button 
                  onClick={() => navigate('/login')} 
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-knix-red bg-knix-red/10 border border-knix-red/20 rounded-lg hover:bg-knix-red hover:text-white transition-all shadow-sm ml-2"
                  title="Admin Login"
               >
                  <ShieldCheck size={16} />
                  <span className="hidden md:inline">Admin</span>
               </button>
            )}

            {/* Mobile Theme Toggle */}
            <button onClick={toggleTheme} className="md:hidden p-2 text-knix-muted">
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth bg-knix-bg text-knix-text transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

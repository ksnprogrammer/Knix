import React, { useState } from 'react';
import { Layout, Router, Navigate, useLocation, useNavigate } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LessonView } from './components/LessonView';
import { LiveTutor } from './components/LiveTutor';
import { Tools } from './components/Tools';
import { Resources } from './components/Resources';
import { Brain, ArrowRight, CheckCircle, Zap, Video, Mic, BookOpen, Layers, Users, Github, Twitter, Globe } from 'lucide-react';

// --- Login Component ---
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'student'>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userRole', role);
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-knix-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-knix-red/10 rounded-full blur-3xl filter opacity-50 animate-pulse"></div>
      
      <div className="bg-knix-card p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity">
             <div className="w-10 h-10 bg-knix-red rounded-xl flex items-center justify-center text-white">
                <Brain size={24} />
             </div>
             <h1 className="text-3xl font-bold text-white tracking-tight">Knix</h1>
          </button>
          <p className="text-slate-500 font-medium">{role === 'admin' ? 'Admin Access' : 'Student Portal'}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-knix-red transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-knix-red transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
             <div className="flex items-center gap-4">
                <button type="button" onClick={() => setRole('student')} className={`${role === 'student' ? 'text-knix-red' : 'text-slate-500'}`}>Student</button>
                <button type="button" onClick={() => setRole('admin')} className={`${role === 'admin' ? 'text-knix-red' : 'text-slate-500'}`}>Admin</button>
             </div>
             <a href="#" className="text-slate-500 hover:text-white">Forgot Password?</a>
          </div>

          <button 
            type="submit"
            className="w-full bg-knix-red hover:bg-knix-redHover text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-knix-red/20"
          >
            Login
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-600 text-sm">
           © 2025 Knix Learning. <a href="#" className="hover:text-slate-400">Privacy</a> & <a href="#" className="hover:text-slate-400">Terms</a>
        </p>
      </div>
    </div>
  );
};

// --- Landing/Intro Component ---
const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Mic className="text-knix-red" size={32} />,
      title: "AI Voice Tutor",
      desc: "Have real-time conversations with Knix. Ask questions about complex theories in Physics or Biology and get instant, voice-based explanations."
    },
    {
      icon: <Video className="text-blue-500" size={32} />,
      title: "Video Analysis",
      desc: "Upload educational videos or clips. Knix analyzes the content and extracts key concepts, summaries, and exam-relevant notes automatically."
    },
    {
      icon: <BookOpen className="text-green-500" size={32} />,
      title: "Smart Resources",
      desc: "Access a vast library of A/L past papers and marking schemes. Our AI helps you find the exact questions you need to practice."
    },
    {
      icon: <Layers className="text-purple-500" size={32} />,
      title: "Interactive Slides",
      desc: "Learn from AI-generated slide decks that adapt to your syllabus. Each slide comes with an integrated chat for instant doubts."
    }
  ];

  const steps = [
    { num: "01", title: "Create Your Account", desc: "Sign up for free and select your A/L stream (Bio/Maths/Tech)." },
    { num: "02", title: "Choose Your Subject", desc: "Pick from Biology, Physics, or Chemistry to start your focused learning path." },
    { num: "03", title: "Use AI Tools", desc: "Use the 'Scanner' to solve problems or 'Live Tutor' to clear doubts verbally." },
    { num: "04", title: "Track & Excel", desc: "Monitor your progress on the dashboard and ace your exams." }
  ];

  return (
    <div className="min-h-screen bg-knix-bg text-white font-sans selection:bg-knix-red selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-knix-bg/80 backdrop-blur-md border-b border-slate-800 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-knix-red rounded-xl flex items-center justify-center text-white shadow-lg shadow-knix-red/20">
              <Brain size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">Knix</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#guide" className="hover:text-white transition-colors">How it Works</a>
            <a href="#resources" className="hover:text-white transition-colors">Resources</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')} 
              className="text-slate-300 hover:text-white font-medium px-4 py-2 hidden sm:block"
            >
              Log in
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-black hover:bg-slate-200 px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-knix-red/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
         </div>

         <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-knix-red text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <Zap size={16} /> The Future of A/L Education in Sri Lanka
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500 max-w-4xl mx-auto leading-[1.1]">
               Master Science with <br/> <span className="text-knix-red">Artificial Intelligence</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
               Knix is the advanced open-source learning platform for Bio, Physics, and Chemistry. 
               Experience the next generation of studying with AI-powered tools completely free.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button 
                  onClick={() => navigate('/login')}
                  className="bg-knix-red hover:bg-knix-redHover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center shadow-xl shadow-knix-red/20 hover:scale-105"
               >
                  Start Learning Now <ArrowRight className="ml-2" />
               </button>
               <button onClick={() => document.getElementById('guide')?.scrollIntoView({behavior:'smooth'})} className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border border-slate-700 hover:border-slate-600">
                  See How It Works
               </button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-slate-500 grayscale opacity-60">
                <span className="flex items-center gap-2 text-lg font-semibold"><CheckCircle size={20} /> Free & Open Source</span>
                <span className="flex items-center gap-2 text-lg font-semibold"><CheckCircle size={20} /> AI Powered</span>
                <span className="flex items-center gap-2 text-lg font-semibold"><CheckCircle size={20} /> Community Driven</span>
            </div>
         </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-900/30 border-y border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to <span className="text-knix-red">Ace the Exam</span></h2>
             <p className="text-slate-400 max-w-2xl mx-auto">We've combined traditional study resources with cutting-edge Gemini AI to create the ultimate study companion.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-knix-card p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 group">
                <div className="mb-6 p-4 bg-slate-950 rounded-xl w-fit border border-slate-800 group-hover:border-slate-700 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Guide) */}
      <section id="guide" className="py-24 relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">How to use Knix <br /><span className="text-slate-500">A Simple Guide</span></h2>
                  <p className="text-slate-400 mb-10 text-lg">Knix is designed to be intuitive. You don't need to be a tech expert to benefit from AI. Just follow these simple steps to supercharge your studies.</p>
                  
                  <div className="space-y-8">
                     {steps.map((step, idx) => (
                        <div key={idx} className="flex gap-6">
                           <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-knix-red">
                              {step.num}
                           </div>
                           <div>
                              <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                              <p className="text-slate-400">{step.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="lg:w-1/2 relative">
                  {/* Visual representation of app interface */}
                  <div className="bg-slate-900 rounded-2xl border border-slate-700 p-2 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                     <div className="bg-knix-bg rounded-xl overflow-hidden border border-slate-800">
                        <div className="h-8 bg-slate-800 flex items-center px-4 gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-500"></div>
                           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                           <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="p-6">
                           <div className="flex justify-between items-center mb-6">
                              <div className="h-8 w-32 bg-slate-800 rounded animate-pulse"></div>
                              <div className="h-8 w-8 bg-slate-800 rounded-full"></div>
                           </div>
                           <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="h-32 bg-slate-800/50 rounded-xl border border-slate-800 p-4">
                                 <div className="h-4 w-20 bg-slate-700 rounded mb-2"></div>
                                 <div className="h-8 w-12 bg-knix-red/20 rounded"></div>
                              </div>
                              <div className="h-32 bg-slate-800/50 rounded-xl border border-slate-800 p-4">
                                 <div className="h-4 w-20 bg-slate-700 rounded mb-2"></div>
                                 <div className="h-8 w-12 bg-blue-500/20 rounded"></div>
                              </div>
                           </div>
                           <div className="h-24 bg-slate-800 rounded-xl w-full mb-2"></div>
                           <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20">
         <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-knix-red to-orange-700 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your grades?</h2>
                  <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Join thousands of Sri Lankan students using Knix to simplify their A/L journey. It's free, open-source, and powered by advanced AI.</p>
                  <button 
                     onClick={() => navigate('/login')}
                     className="bg-white text-knix-red hover:bg-slate-100 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:scale-105"
                  >
                     Create Free Account
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
               <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="w-8 h-8 bg-knix-red rounded-lg flex items-center justify-center text-white">
                        <Brain size={18} />
                     </div>
                     <span className="text-xl font-bold tracking-tight">Knix</span>
                  </div>
                  <p className="text-slate-500 mb-6 max-w-sm">
                     An open-source AI learning platform dedicated to making high-quality education accessible to every A/L student in Sri Lanka.
                  </p>
                  <div className="flex gap-4">
                     <a href="#" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Github size={20} /></a>
                     <a href="#" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Twitter size={20} /></a>
                     <a href="#" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Globe size={20} /></a>
                  </div>
               </div>
               
               <div>
                  <h4 className="text-white font-bold mb-6">Platform</h4>
                  <ul className="space-y-4 text-slate-400 text-sm">
                     <li><a href="#" className="hover:text-knix-red transition-colors">Courses</a></li>
                     <li><a href="#" className="hover:text-knix-red transition-colors">AI Live Tutor</a></li>
                     <li><a href="#" className="hover:text-knix-red transition-colors">Past Papers</a></li>
                     <li><a href="#" className="hover:text-knix-red transition-colors">Pricing (Coming Soon)</a></li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-white font-bold mb-6">Support</h4>
                  <ul className="space-y-4 text-slate-400 text-sm">
                     <li><a href="#" className="hover:text-knix-red transition-colors">Help Center</a></li>
                     <li><a href="#" className="hover:text-knix-red transition-colors">Community</a></li>
                     <li><a href="#" className="hover:text-knix-red transition-colors">Terms of Service</a></li>
                     <li><a href="#" className="hover:text-knix-red transition-colors">Privacy Policy</a></li>
                  </ul>
               </div>
            </div>
            
            <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-600 text-sm">
               <p>© 2025 Knix Learning. Built with ❤️ for Sri Lanka.</p>
               <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-slate-400">Privacy</a>
                  <a href="#" className="hover:text-slate-400">Cookies</a>
                  <a href="#" className="hover:text-slate-400">Terms</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

// --- Main Routes ---
const MainRoutes = () => {
  const { pathname } = useLocation();

  if (pathname === '/' || pathname === '') {
    return <Landing />;
  }
  if (pathname === '/login') {
    return <Login />;
  }
  if (pathname === '/dashboard') {
    return (
      <Layout userRole="student">
        <Dashboard />
      </Layout>
    );
  }
  if (pathname === '/subjects') {
    return (
      <Layout userRole="student">
        <Dashboard />
      </Layout>
    );
  }
  if (pathname === '/resources') {
    return (
      <Layout userRole="student">
        <Resources />
      </Layout>
    );
  }
  if (pathname === '/live') {
    return (
      <Layout userRole="student">
        <LiveTutor />
      </Layout>
    );
  }
  if (pathname === '/tools') {
    return (
      <Layout userRole="student">
        <Tools />
      </Layout>
    );
  }
  if (pathname.startsWith('/course/')) {
    return (
      <Layout userRole="student">
        <LessonView />
      </Layout>
    );
  }
  if (pathname === '/admin') {
    return (
      <Layout userRole="admin">
        <AdminDashboard />
      </Layout>
    );
  }

  return <Navigate to="/" replace />;
};

// --- Main App Logic ---
const App: React.FC = () => {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
};

export default App;
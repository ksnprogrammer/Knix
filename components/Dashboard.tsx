import React from 'react';
import { Course, StatCardProps } from '../types';
import { PlayCircle, Clock, Award, ArrowRight } from 'lucide-react';
import { INITIAL_COURSES } from '../constants';
import { useNavigate } from './Layout';

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, icon }) => (
  <div className="bg-knix-card p-6 rounded-xl border border-slate-800">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
      </div>
      {icon && <div className="p-2 bg-slate-800 rounded-lg text-knix-red">{icon}</div>}
    </div>
    {subtext && <p className="text-xs text-slate-500">{subtext}</p>}
  </div>
);

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-knix-card rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all group">
      <div className="h-32 bg-slate-800 relative">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white">
          {course.subject}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1 truncate">{course.title}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-knix-red h-full rounded-full transition-all duration-500" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
        
        <button 
          onClick={() => navigate(`/course/${course.id}`)}
          className="w-full py-2 bg-slate-800 hover:bg-knix-red text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center group-hover:bg-knix-red"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Alex</h2>
        <p className="text-slate-400">You've completed 3 lessons this week. Keep up the momentum!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Learning Time" value="42h 15m" subtext="+12% from last week" icon={<Clock size={20}/>} />
        <StatCard title="Courses in Progress" value="4" subtext="2 due soon" icon={<PlayCircle size={20}/>} />
        <StatCard title="Certificates" value="1" subtext="Biology 101 Completed" icon={<Award size={20}/>} />
        <StatCard title="Avg. Quiz Score" value="85%" subtext="Top 10% of students" icon={<Award size={20}/>} />
      </div>

      {/* My Learning Paths */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">My Learning Paths</h3>
          <button className="text-sm text-knix-red hover:text-white transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_COURSES.slice(0, 3).map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      
      {/* Recent Activity / Community */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-knix-card p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4">Recent Achievements</h3>
            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center p-3 hover:bg-slate-800/50 rounded-lg transition-colors">
                     <div className="w-10 h-10 rounded-full bg-knix-red/20 flex items-center justify-center text-knix-red mr-4">
                        <Award size={20} />
                     </div>
                     <div>
                        <h4 className="text-white font-medium text-sm">Completed "Cellular Respiration"</h4>
                        <p className="text-slate-500 text-xs">2 hours ago • Biology</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         
         <div className="bg-knix-card p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-knix-card to-slate-900">
            <h3 className="text-lg font-bold text-white mb-4">Upgrade to Pro</h3>
            <p className="text-slate-400 text-sm mb-6">Get unlimited AI tutor access and detailed analytics for your A/L exams.</p>
            <button className="w-full py-3 bg-gradient-to-r from-knix-red to-orange-600 text-white rounded-lg font-bold shadow-lg hover:shadow-orange-500/20 transition-all">
               View Plans
            </button>
         </div>
      </div>
    </div>
  );
};
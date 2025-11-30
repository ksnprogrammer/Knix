import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Course, Subject } from '../types';
import { Plus, Upload, Book, Video, Save, X, Trash } from 'lucide-react';

export const CreatorDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  
  // New Course Form State
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    subject: 'Biology',
    description: '',
    duration: '',
    instructor: 'Creator',
    thumbnail: 'https://picsum.photos/400/225'
  });

  // Resource Upload State
  const [uploadCategory, setUploadCategory] = useState<Subject>('Biology');
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState<'pdf'|'image'>('pdf');

  useEffect(() => {
    setCourses(db.getCourses());
  }, []);

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.description) return;
    
    const course: Course = {
      id: Date.now().toString(),
      title: newCourse.title!,
      subject: newCourse.subject as Subject,
      description: newCourse.description!,
      duration: newCourse.duration || '4 Weeks',
      instructor: newCourse.instructor!,
      progress: 0,
      thumbnail: newCourse.thumbnail!,
      syllabusUrl: '#'
    };

    db.addCourse(course);
    setCourses(db.getCourses());
    setIsAddingCourse(false);
    setNewCourse({ ...newCourse, title: '', description: '' });
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm("Delete this course?")) {
      db.deleteCourse(id);
      setCourses(db.getCourses());
    }
  };

  const handleUploadResource = () => {
    if(!resourceTitle) return;
    
    db.addResource(uploadCategory, {
      id: Date.now().toString(),
      title: resourceTitle,
      type: resourceType,
      size: '1.2 MB', // Mock size
      downloads: 0
    });
    
    alert(`Uploaded "${resourceTitle}" to ${uploadCategory} Database`);
    setResourceTitle('');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
         <div>
            <h2 className="text-3xl font-bold text-white mb-2">Content Creator Studio</h2>
            <p className="text-slate-400">Manage your courses, lessons, and learning resources.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Course Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Your Courses</h3>
            <button 
              onClick={() => setIsAddingCourse(true)}
              className="bg-knix-red hover:bg-knix-redHover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Plus size={16} /> New Course
            </button>
          </div>

          {isAddingCourse && (
            <div className="bg-knix-card p-6 rounded-xl border border-slate-700 animate-in fade-in slide-in-from-top-4">
               <h4 className="font-bold text-white mb-4">Create New Course</h4>
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <input 
                    className="bg-slate-900 border border-slate-700 p-2 rounded text-white" 
                    placeholder="Course Title"
                    value={newCourse.title}
                    onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                  />
                  <select 
                    className="bg-slate-900 border border-slate-700 p-2 rounded text-white"
                    value={newCourse.subject}
                    onChange={e => setNewCourse({...newCourse, subject: e.target.value as Subject})}
                  >
                    <option value="Biology">Biology</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Combined Maths">Combined Maths</option>
                    <option value="ICT">ICT</option>
                  </select>
               </div>
               <textarea 
                  className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white mb-4 h-24"
                  placeholder="Course Description"
                  value={newCourse.description}
                  onChange={e => setNewCourse({...newCourse, description: e.target.value})}
               />
               <div className="flex justify-end gap-2">
                  <button onClick={() => setIsAddingCourse(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                  <button onClick={handleAddCourse} className="px-4 py-2 bg-knix-red text-white rounded hover:bg-knix-redHover flex items-center gap-2">
                     <Save size={16} /> Save Course
                  </button>
               </div>
            </div>
          )}

          <div className="grid gap-4">
            {courses.map(course => (
              <div key={course.id} className="bg-knix-card p-4 rounded-xl border border-slate-800 flex justify-between items-center group">
                 <div className="flex items-center gap-4">
                    <img src={course.thumbnail} className="w-16 h-16 object-cover rounded-lg bg-slate-800" />
                    <div>
                       <h4 className="font-bold text-white">{course.title}</h4>
                       <p className="text-xs text-slate-500">{course.subject} • {course.duration}</p>
                    </div>
                 </div>
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-slate-800 rounded hover:text-blue-400"><Book size={16} /></button>
                    <button onClick={() => handleDeleteCourse(course.id)} className="p-2 bg-slate-800 rounded hover:text-red-500"><Trash size={16} /></button>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Resource Upload */}
        <div className="space-y-6">
           <div className="bg-knix-card p-6 rounded-xl border border-slate-800 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Upload size={20} /> Upload Resource</h3>
              
              <div className="space-y-4">
                 <div>
                    <label className="text-xs text-slate-500 block mb-1">Subject</label>
                    <select 
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                      value={uploadCategory}
                      onChange={e => setUploadCategory(e.target.value as Subject)}
                    >
                      <option value="Biology">Biology</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Combined Maths">Combined Maths</option>
                      <option value="ICT">ICT</option>
                    </select>
                 </div>
                 
                 <div>
                    <label className="text-xs text-slate-500 block mb-1">Resource Title</label>
                    <input 
                       className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                       placeholder="e.g. 2024 Model Paper"
                       value={resourceTitle}
                       onChange={e => setResourceTitle(e.target.value)}
                    />
                 </div>

                 <div>
                    <label className="text-xs text-slate-500 block mb-1">File Type</label>
                     <div className="flex gap-2">
                        <button 
                           onClick={() => setResourceType('pdf')}
                           className={`flex-1 py-2 text-xs rounded border ${resourceType === 'pdf' ? 'bg-knix-red border-knix-red text-white' : 'border-slate-700 text-slate-400'}`}
                        >
                           PDF Document
                        </button>
                        <button 
                           onClick={() => setResourceType('image')}
                           className={`flex-1 py-2 text-xs rounded border ${resourceType === 'image' ? 'bg-knix-red border-knix-red text-white' : 'border-slate-700 text-slate-400'}`}
                        >
                           Image / Diagram
                        </button>
                     </div>
                 </div>

                 <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center text-slate-500 text-xs hover:bg-slate-800/50 cursor-pointer transition-colors">
                    Click to browse files (Demo)
                 </div>

                 <button 
                    onClick={handleUploadResource}
                    className="w-full bg-white text-black font-bold py-2 rounded hover:bg-slate-200 transition-colors"
                 >
                    Publish to Database
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
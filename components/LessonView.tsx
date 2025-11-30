import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from './Layout';
import { MOCK_LESSON } from '../constants';
import { generateTutorResponse } from '../services/geminiService';
import { ArrowLeft, Send, Mic, Maximize2, MoreHorizontal, BookOpen, Bot } from 'lucide-react';
import { ChatMessage } from '../types';

export const LessonView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hello! I\'m your AI Tutor. Ask me anything about this slide or the topic of Neural Networks.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await generateTutorResponse(
      messages.map(m => ({ role: m.role, text: m.text })),
      input,
      MOCK_LESSON.content + " " + MOCK_LESSON.notes
    );

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Left Column: Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center mb-4">
           <button onClick={() => navigate('/dashboard')} className="mr-4 p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
           </button>
           <div>
              <h2 className="text-xl font-bold text-white">{MOCK_LESSON.title}</h2>
              <p className="text-slate-400 text-sm">Module 1: Introduction to AI</p>
           </div>
        </div>

        {/* Slide Viewer */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden relative border border-slate-800 shadow-2xl mb-6 group">
          <img src={MOCK_LESSON.slideUrl} alt="Slide" className="w-full h-full object-cover opacity-90" />
          
          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
             <div className="text-white text-sm font-medium">Slide 3 of 10</div>
             <div className="flex gap-2">
                <button className="p-2 hover:bg-white/20 rounded-full text-white"><Maximize2 size={18} /></button>
             </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {/* Slide Content Overlay Text */}
             <div className="bg-white/95 text-black p-8 rounded-lg max-w-lg shadow-xl pointer-events-auto">
                <h3 className="text-2xl font-bold mb-4">Understanding Neural Networks</h3>
                <div className="grid grid-cols-3 gap-2">
                   {/* Visual representation of nodes */}
                   {[1,2,3].map(i => (
                      <div key={i} className="flex flex-col gap-2 items-center justify-center">
                         <div className="w-4 h-4 rounded-full border-2 border-slate-400"></div>
                         <div className="w-4 h-4 rounded-full border-2 border-slate-400 bg-red-500"></div>
                         <div className="w-4 h-4 rounded-full border-2 border-slate-400"></div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-knix-card p-6 rounded-xl border border-slate-800 flex-1 overflow-y-auto">
           <div className="flex items-center gap-2 mb-4 text-white">
              <BookOpen size={20} className="text-knix-red" />
              <h3 className="font-bold">AI-Generated Notes</h3>
           </div>
           <div className="prose prose-invert prose-sm max-w-none text-slate-300">
              <ul className="list-disc pl-5 space-y-2">
                 {MOCK_LESSON.notes.split('\n').map((note, i) => (
                    <li key={i}>{note.replace('• ', '')}</li>
                 ))}
              </ul>
           </div>
           <button className="mt-6 bg-knix-red hover:bg-knix-redHover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Read Full Summary
           </button>
        </div>
      </div>

      {/* Right Column: AI Tutor Chat */}
      <div className="w-full lg:w-96 flex flex-col bg-knix-card border border-slate-800 rounded-xl overflow-hidden h-[600px] lg:h-auto">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
           <div className="flex items-center gap-2">
              <Bot className="text-knix-red" size={20} />
              <span className="font-bold text-white">Ask Knix Tutor</span>
           </div>
           <MoreHorizontal size={18} className="text-slate-500 cursor-pointer" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
           {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user' 
                    ? 'bg-slate-700 text-white rounded-br-none' 
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                 }`}>
                    {msg.text}
                 </div>
              </div>
           ))}
           {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-700 flex gap-1">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                 </div>
              </div>
           )}
        </div>

        <div className="p-4 bg-slate-900/50 border-t border-slate-800">
           {/* Quick Suggestions */}
           {messages.length < 3 && (
              <button 
                 onClick={() => setInput("Can you explain backpropagation?")}
                 className="mb-3 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg transition-colors w-full text-left truncate"
              >
                 "Can you explain backpropagation?"
              </button>
           )}
           
           <div className="flex items-center gap-2 relative">
              <input
                 type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                 placeholder="Type a message..."
                 className="flex-1 bg-slate-950 border border-slate-700 text-white text-sm rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-knix-red transition-colors"
              />
              <button 
                 onClick={handleSendMessage}
                 disabled={!input.trim() || isLoading}
                 className="absolute right-2 p-1.5 bg-slate-800 hover:bg-knix-red text-slate-400 hover:text-white rounded-md transition-all disabled:opacity-50 disabled:hover:bg-slate-800"
              >
                 <Send size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
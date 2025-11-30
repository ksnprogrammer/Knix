import React, { useState } from 'react';
import { Camera, Search, Image as ImageIcon, Sparkles, ArrowRight, Loader, Video, FileVideo } from 'lucide-react';
import { analyzeImage, searchGrounding, generateEducationalImage, analyzeVideo } from '../services/geminiService';

export const Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'search' | 'generate' | 'video'>('scan');
  
  // State for Scanner
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanPrompt, setScanPrompt] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // State for Video Analysis
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoMimeType, setVideoMimeType] = useState<string>('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoResult, setVideoResult] = useState('');
  const [isVideoAnalyzing, setIsVideoAnalyzing] = useState(false);

  // State for Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{text: string, sources: any[]} | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // State for Generator
  const [genPrompt, setGenPrompt] = useState('');
  const [genImage, setGenImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => setSelectedVideo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) return;
    setIsScanning(true);
    const base64 = selectedImage.split(',')[1];
    const result = await analyzeImage(base64, scanPrompt || "Explain this scientific diagram in detail for an A/L student.");
    setScanResult(result);
    setIsScanning(false);
  };

  const handleVideoAnalysis = async () => {
    if (!selectedVideo) return;
    setIsVideoAnalyzing(true);
    const base64 = selectedVideo.split(',')[1];
    const result = await analyzeVideo(base64, videoMimeType, videoPrompt || "Summarize the key scientific concepts in this video.");
    setVideoResult(result);
    setIsVideoAnalyzing(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    const result = await searchGrounding(searchQuery);
    setSearchResult(result);
    setIsSearching(false);
  };

  const handleGenerate = async () => {
    if (!genPrompt) return;
    setIsGenerating(true);
    const result = await generateEducationalImage(genPrompt);
    setGenImage(result);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-4 mb-6">
         <div>
            <h2 className="text-3xl font-bold text-white mb-2">AI Laboratory</h2>
            <p className="text-slate-400">Advanced tools to assist your scientific studies.</p>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-slate-900/50 p-1 rounded-xl w-fit border border-slate-800 flex-wrap gap-y-2">
         <button 
            onClick={() => setActiveTab('scan')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'scan' ? 'bg-knix-red text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
         >
            <Camera size={16} /> Scanner
         </button>
         <button 
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'video' ? 'bg-knix-red text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
         >
            <Video size={16} /> Video Analyst
         </button>
         <button 
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'search' ? 'bg-knix-red text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
         >
            <Search size={16} /> Research
         </button>
         <button 
            onClick={() => setActiveTab('generate')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'generate' ? 'bg-knix-red text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
         >
            <ImageIcon size={16} /> Illustrator
         </button>
      </div>

      {/* Content Area */}
      <div className="bg-knix-card border border-slate-800 rounded-2xl p-6 min-h-[400px]">
         
         {/* SCANNER */}
         {activeTab === 'scan' && (
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-700 rounded-xl h-64 flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900 hover:border-knix-red/50 transition-all relative overflow-hidden group">
                     {selectedImage ? (
                        <img src={selectedImage} alt="Upload" className="w-full h-full object-contain" />
                     ) : (
                        <div className="text-center p-6">
                           <Camera className="mx-auto text-slate-500 mb-2" size={32} />
                           <p className="text-slate-400 text-sm">Upload a diagram, equation, or graph</p>
                        </div>
                     )}
                     <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                     />
                  </div>
                  <input 
                     type="text" 
                     value={scanPrompt}
                     onChange={(e) => setScanPrompt(e.target.value)}
                     placeholder="Ask a question about this image (Optional)"
                     className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-knix-red"
                  />
                  <button 
                     onClick={handleScan}
                     disabled={!selectedImage || isScanning}
                     className="w-full bg-knix-red hover:bg-knix-redHover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                     {isScanning ? <Loader className="animate-spin" size={20} /> : <Sparkles size={20} />}
                     Analyze Diagram
                  </button>
               </div>
               <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 overflow-y-auto max-h-[500px]">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                     <BotIcon /> Analysis Result
                  </h3>
                  {scanResult ? (
                     <div className="prose prose-invert prose-sm">
                        {scanResult.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                     </div>
                  ) : (
                     <p className="text-slate-500 italic">Upload an image and click analyze to see AI insights here.</p>
                  )}
               </div>
            </div>
         )}

         {/* VIDEO ANALYST */}
         {activeTab === 'video' && (
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-700 rounded-xl h-64 flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900 hover:border-knix-red/50 transition-all relative overflow-hidden group">
                     {selectedVideo ? (
                        <video controls src={selectedVideo} className="w-full h-full object-contain" />
                     ) : (
                        <div className="text-center p-6">
                           <FileVideo className="mx-auto text-slate-500 mb-2" size={32} />
                           <p className="text-slate-400 text-sm">Upload a short educational video</p>
                           <p className="text-slate-600 text-xs mt-2">Max size depends on demo limit</p>
                        </div>
                     )}
                     <input 
                        type="file" 
                        accept="video/*" 
                        onChange={handleVideoUpload} 
                        className={`absolute inset-0 opacity-0 cursor-pointer ${selectedVideo ? 'pointer-events-none' : ''}`}
                     />
                     {selectedVideo && (
                        <button 
                           onClick={() => { setSelectedVideo(null); setVideoResult(''); }}
                           className="absolute top-2 right-2 bg-slate-800 text-white p-1 rounded-full text-xs z-10 hover:bg-red-500 pointer-events-auto"
                        >
                           Change
                        </button>
                     )}
                  </div>
                  <input 
                     type="text" 
                     value={videoPrompt}
                     onChange={(e) => setVideoPrompt(e.target.value)}
                     placeholder="What should the AI look for in this video?"
                     className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-knix-red"
                  />
                  <button 
                     onClick={handleVideoAnalysis}
                     disabled={!selectedVideo || isVideoAnalyzing}
                     className="w-full bg-knix-red hover:bg-knix-redHover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                     {isVideoAnalyzing ? <Loader className="animate-spin" size={20} /> : <Sparkles size={20} />}
                     Analyze Video
                  </button>
               </div>
               <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 overflow-y-auto max-h-[500px]">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                     <BotIcon /> Video Insights
                  </h3>
                  {videoResult ? (
                     <div className="prose prose-invert prose-sm">
                        {videoResult.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                     </div>
                  ) : (
                     <p className="text-slate-500 italic">Upload a video clip and analyze to get a summary or explanation.</p>
                  )}
               </div>
            </div>
         )}

         {/* SEARCH */}
         {activeTab === 'search' && (
            <div className="max-w-3xl mx-auto space-y-6">
               <div className="relative">
                  <input 
                     type="text" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Search for recent scientific discoveries, definitions, or news..."
                     className="w-full bg-slate-950 border border-slate-700 rounded-full px-6 py-4 text-lg text-white focus:outline-none focus:border-knix-red pr-14"
                     onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button 
                     onClick={handleSearch}
                     disabled={isSearching || !searchQuery}
                     className="absolute right-2 top-2 p-2.5 bg-knix-red rounded-full text-white hover:bg-knix-redHover transition-colors disabled:opacity-50"
                  >
                     {isSearching ? <Loader className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                  </button>
               </div>

               {searchResult && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-knix-red font-bold mb-2 text-sm uppercase tracking-wider">AI Overview</h3>
                        <p className="text-slate-200 leading-relaxed whitespace-pre-line">{searchResult.text}</p>
                     </div>

                     {searchResult.sources && searchResult.sources.length > 0 && (
                        <div>
                           <h4 className="text-white font-bold mb-3">Sources</h4>
                           <div className="grid gap-3">
                              {searchResult.sources.map((chunk, i) => (
                                 chunk.web?.uri && (
                                    <a key={i} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="block bg-knix-card hover:bg-slate-800 p-4 rounded-lg border border-slate-800 transition-colors group">
                                       <div className="text-knix-red font-medium text-sm mb-1 group-hover:underline">{chunk.web.title}</div>
                                       <div className="text-slate-500 text-xs truncate">{chunk.web.uri}</div>
                                    </a>
                                 )
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               )}
            </div>
         )}

         {/* GENERATE */}
         {activeTab === 'generate' && (
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                     <label className="block text-white font-medium mb-2">Describe the diagram you need</label>
                     <textarea 
                        value={genPrompt}
                        onChange={(e) => setGenPrompt(e.target.value)}
                        placeholder="E.g., A detailed cross-section of a human heart labeled with aorta and ventricles..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-knix-red h-32 resize-none"
                     />
                     <div className="mt-4 flex justify-end">
                        <button 
                           onClick={handleGenerate}
                           disabled={isGenerating || !genPrompt}
                           className="bg-gradient-to-r from-knix-red to-purple-600 hover:from-knix-redHover hover:to-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                        >
                           {isGenerating ? <Loader className="animate-spin" size={18} /> : <Sparkles size={18} />}
                           Generate
                        </button>
                     </div>
                  </div>
                  <div className="text-xs text-slate-500">
                     * Uses Gemini 3 Pro Image Preview. Images are 1K resolution.
                  </div>
               </div>
               
               <div className="bg-black rounded-xl border border-slate-800 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                  {genImage ? (
                     <img src={genImage} alt="Generated" className="w-full h-full object-contain" />
                  ) : (
                     <div className="text-slate-600 text-center">
                        <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Your generated visual will appear here</p>
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
    </div>
  );
};

const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-knix-red">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4Z" fill="currentColor" fillOpacity="0.2"/>
    <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="currentColor"/>
  </svg>
);
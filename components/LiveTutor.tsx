import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Volume2, XCircle, Loader, Activity } from 'lucide-react';
import { getGeminiClient } from '../services/geminiService';
import { LiveServerMessage, Modality } from '@google/genai';

export const LiveTutor: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // User is speaking
  const [isBotSpeaking, setIsBotSpeaking] = useState(false); // Bot is speaking
  const [error, setError] = useState<string | null>(null);
  
  // Audio Context Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const sessionRef = useRef<any>(null);

  const stopAudio = () => {
    if (sourcesRef.current) {
      for (const source of sourcesRef.current) {
        source.stop();
      }
      sourcesRef.current.clear();
    }
    nextStartTimeRef.current = 0;
  };

  const connectToLive = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Init Audio Contexts
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputNodeRef.current = outputAudioContextRef.current.createGain();
      outputNodeRef.current.connect(outputAudioContextRef.current.destination);

      const ai = getGeminiClient();

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            // Setup input stream
            if (!inputAudioContextRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            inputSourceRef.current = source;
            
            const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              // Simple volume check for visualization
              const sum = inputData.reduce((a, b) => a + Math.abs(b), 0);
              setIsSpeaking(sum > 100); // Threshold

              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                 session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(processor);
            processor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
             // Handle Audio Output
             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio) {
                if (!outputAudioContextRef.current || !outputNodeRef.current) return;
                
                setIsBotSpeaking(true);
                // Reset bot speaking vis after a delay roughly equal to chunk length
                setTimeout(() => setIsBotSpeaking(false), 500);

                const ctx = outputAudioContextRef.current;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                
                const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
                
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNodeRef.current);
                source.addEventListener('ended', () => {
                   sourcesRef.current.delete(source);
                });
                
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
             }

             // Handle Interruption
             if (message.serverContent?.interrupted) {
                stopAudio();
             }
          },
          onclose: () => {
            setIsConnected(false);
          },
          onerror: (e) => {
            console.error("Live API Error", e);
            setError("Connection error.");
            setIsConnected(false);
          }
        },
        config: {
           responseModalities: [Modality.AUDIO],
           speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
           },
           systemInstruction: "You are Knix Live, a friendly and energetic Biology and Physics tutor for A/L students in Sri Lanka. Speak clearly, use simple analogies, and be encouraging."
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (err) {
      console.error(err);
      setError("Failed to access microphone or connect.");
    }
  };

  const disconnect = () => {
    if (processorRef.current) {
       processorRef.current.disconnect();
       processorRef.current = null;
    }
    if (inputSourceRef.current) {
       inputSourceRef.current.disconnect();
       inputSourceRef.current = null;
    }
    if (inputAudioContextRef.current) {
       inputAudioContextRef.current.close();
    }
    if (outputAudioContextRef.current) {
       outputAudioContextRef.current.close();
    }
    // Note: session.close() is not strictly available on the promise wrapper in this SDK version pattern usually, 
    // but relying on closing contexts and simple state reset.
    setIsConnected(false);
    setIsSpeaking(false);
    setIsBotSpeaking(false);
  };

  useEffect(() => {
    return () => disconnect();
  }, []);

  // PCM Util Helpers
  function createBlob(data: Float32Array): { data: string, mimeType: string } {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) {
     const dataInt16 = new Int16Array(data.buffer);
     const frameCount = dataInt16.length / numChannels;
     const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
     for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
           channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
     }
     return buffer;
  }

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center max-w-2xl mx-auto">
       <div className="mb-10">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
             isConnected 
               ? isBotSpeaking 
                  ? 'bg-knix-red shadow-[0_0_50px_rgba(225,58,75,0.6)] scale-110' 
                  : 'bg-knix-red/20 border-2 border-knix-red' 
               : 'bg-slate-800 border border-slate-700'
          }`}>
             {isConnected ? (
                <Volume2 size={48} className={`text-white ${isBotSpeaking ? 'animate-pulse' : ''}`} />
             ) : (
                <MicOff size={48} className="text-slate-500" />
             )}
          </div>
       </div>

       <h2 className="text-4xl font-bold text-white mb-4">
          {isConnected ? "Listening..." : "Live Tutor Mode"}
       </h2>
       
       <p className="text-slate-400 mb-12 text-lg max-w-md">
          {isConnected 
             ? "Go ahead, ask me anything about Biology or Physics. I'm listening." 
             : "Start a real-time voice conversation with your AI tutor to clarify doubts instantly."}
       </p>

       {error && (
          <div className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg mb-6 border border-red-500/20">
             {error}
          </div>
       )}

       {!isConnected ? (
          <button 
             onClick={connectToLive}
             className="bg-white text-black hover:bg-slate-200 font-bold py-4 px-10 rounded-full text-lg transition-all flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
          >
             <Mic size={24} /> Start Session
          </button>
       ) : (
          <button 
             onClick={disconnect}
             className="bg-slate-800 hover:bg-red-500/20 hover:text-red-500 text-white font-medium py-3 px-8 rounded-full transition-all flex items-center gap-2 border border-slate-700"
          >
             <XCircle size={20} /> End Session
          </button>
       )}
       
       {isConnected && (
          <div className="mt-8 flex items-center gap-2 text-xs text-slate-500 font-mono">
             <Activity size={12} className={isSpeaking ? "text-green-500 animate-pulse" : "text-slate-700"} />
             Microphone Status: {isSpeaking ? "Detecting Voice" : "Idle"}
          </div>
       )}
    </div>
  );
};

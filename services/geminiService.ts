import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getGeminiClient = () => ai;

export const generateTutorResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  currentMessage: string,
  context: string
): Promise<string> => {
  if (!apiKey) return "API Key is missing. Please configure the environment.";

  try {
    // Using Pro for better reasoning in Tutor mode
    const model = 'gemini-3-pro-preview';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: `You are an expert A/L (Advanced Level) Tutor for Knix, a learning platform for Biology, Physics, and Chemistry. 
        Your goal is to help students understand complex topics simply.
        Current Lesson Context: ${context}
        
        Keep answers concise, encouraging, and accurate. Use markdown for formatting.`
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: currentMessage });
    return result.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI tutor right now.";
  }
};

export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
  if (!apiKey) return "API Key is missing.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/png', data: base64Image } },
          { text: prompt || "Analyze this image relevant to A/L Science subjects." }
        ]
      }
    });
    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Image Analysis Error:", error);
    return "Failed to analyze image.";
  }
};

export const analyzeVideo = async (base64Data: string, mimeType: string, prompt: string): Promise<string> => {
  if (!apiKey) return "API Key is missing.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: mimeType, data: base64Data } },
          { text: prompt || "Analyze this video to identify key educational concepts for A/L students." }
        ]
      }
    });
    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Video Analysis Error:", error);
    return "Failed to analyze video. Ensure the file is supported and within size limits for this demo.";
  }
};

export const searchGrounding = async (query: string): Promise<{text: string, sources: any[]}> => {
  if (!apiKey) return { text: "API Key missing", sources: [] };
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    const text = response.text || "No results found.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { text, sources };
  } catch (error) {
    console.error("Search Error:", error);
    return { text: "Search failed.", sources: [] };
  }
};

export const generateEducationalImage = async (prompt: string): Promise<string | null> => {
  if (!apiKey) return null;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      }
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};
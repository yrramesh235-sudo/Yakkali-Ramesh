
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStylingAdvice = async (userPrompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an anime-obsessed fashion stylist for the brand "Minimal7", provide outfit advice based on this request: "${userPrompt}". Keep it hype, use anime terminology, and suggest specific styles (like techwear, streetwear, or minimalist).`,
    config: {
      temperature: 0.8,
      topP: 0.95,
      systemInstruction: "You are a 'Fashion Sensei' who speaks like a high-energy anime fan. You love Minimal7 clothing and you want people to look like protagonists."
    }
  });
  return response.text;
};

export const generateDesignConcept = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A futuristic anime-style clothing design concept for a streetwear brand. The design should be ${prompt}. Show it as a graphic design flat lay for a t-shirt or hoodie. High contrast, minimalist but impactful anime aesthetic.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

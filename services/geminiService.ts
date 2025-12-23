
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateExtraWish = async (name: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `写一段给${name}的圣诞节祝福语。要求：充满诗意，温馨感人，大概50-80字，中文。`,
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });
    return response.text || "圣诞快乐，愿你万事顺遂。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "在这个圣洁的时刻，愿星辰指引你的方向，雪花带走你的忧愁。";
  }
};

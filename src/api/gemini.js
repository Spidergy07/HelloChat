import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateGeminiResponse(prompt, role) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const context = `You are a ${role}. Please respond in a helpful and engaging way.`;
    const fullPrompt = `${context}\n\nUser: ${prompt}`;
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    throw error;
  }
}
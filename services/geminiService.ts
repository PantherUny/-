import { GoogleGenAI, ChatSession, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: ChatSession | null = null;

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing in process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async (): Promise<ChatSession> => {
  const ai = getClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 2000,
    },
  });
  chatSession = chat;
  return chat;
};

export const sendMessageStream = async function* (message: string) {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
     throw new Error("Failed to initialize chat session");
  }

  const result = await chatSession.sendMessageStream({ message });
  
  for await (const chunk of result) {
     const c = chunk as GenerateContentResponse;
     yield c.text;
  }
};

export const resetChat = () => {
  chatSession = null;
};

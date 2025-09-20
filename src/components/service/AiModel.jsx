// AiModel.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_AI_API_KEY
);

// Start a chat session with the model
const model = ai.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const chatSession = model.startChat({
  // Configure the API to enforce a JSON output format
  generationConfig: {
    responseMimeType: "application/json",
  },
});

/**
 * Simple wrapper around chatSession
 */
export async function sendMessage(prompt) {
  try {
    const result = await chatSession.sendMessage(prompt);
    // The API is now configured to return a string, we still need to parse it
    return JSON.parse(result.response.text());
  } catch (error) {
    // If JSON parsing fails, log the error and re-throw it.
    // Returning a non-JSON string can cause crashes in the component that calls this.
    console.error("AI response could not be parsed as JSON:", error);
    throw new Error("AI response was not valid JSON.");
  }
}
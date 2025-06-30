import { GoogleGenAI } from "@google/genai";
import { GeneratedPost } from '../types.ts';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateBlogPost(topic: string): Promise<GeneratedPost> {
  const prompt = `You are an expert blog post writer. Generate an insightful and well-structured blog post about "${topic}". The content should be engaging and approximately 2-3 paragraphs long. Return the response as a single, valid JSON object with the following structure: { "title": "A Creative and Catchy Title", "content": "The full blog post content, formatted as a single string with paragraphs separated by newline characters (\\n\\n).", "imagePrompt": "A descriptive, artistic prompt for an image that visually represents the blog post's theme, e.g., 'A vibrant, abstract painting of interconnected neural networks'." }`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.7,
            topP: 0.95,
        }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }

    const parsedData: GeneratedPost = JSON.parse(jsonStr);

    if (!parsedData.title || !parsedData.content || !parsedData.imagePrompt) {
        throw new Error("Received malformed JSON data from API.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error generating blog post:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate blog post. API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the blog post.");
  }
}
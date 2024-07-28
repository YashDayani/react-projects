import axios from 'axios';

const API_KEY = 'AIzaSyC9EtRr3eu5QAAYL_wVNXfuUeUjgHV6bwg';
const GEMINI_MODEL = 'gemini-1.5-pro'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

// Create a reusable axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 150000, // Reduced timeout to 15 seconds
});

// Prepare static parts of the request body
const staticRequestBody = {
  generationConfig: {
    temperature: 0.5, // Further lowered for more focused and faster responses
    topP: 1, // Slightly reduced
    maxOutputTokens: 2048, // Further reduced for faster responses
  },
  safetySettings: [
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
  ],
};

export const runChat = async (prompt) => {
  try {
    const response = await api.post('', {
      ...staticRequestBody,
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || 'No response text found';
  } catch (error) {
    console.error('Error making request to Gemini API:', error.response?.data || error.message);
    throw new Error('Failed to get response from Gemini API');
  }
};
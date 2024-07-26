import axios from 'axios';

const API_KEY = 'AIzaSyC9EtRr3eu5QAAYL_wVNXfuUeUjgHV6bwg'; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

// Create a reusable axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Set a timeout of 30 seconds
});

export const runChat = async (prompt) => {
  try {
    const response = await api.post('', {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7, // Lowered for more focused responses
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096, // Reduced for faster responses
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    });

    const content = response.data.candidates?.[0]?.content;
    if (content?.parts?.[0]?.text) {
      return content.parts[0].text;
    }

    console.warn('Unexpected response format:', response.data);
    return 'No response text found';
  } catch (error) {
    console.error('Error making request to Gemini API:', error.response?.data || error.message);
    throw new Error('Failed to get response from Gemini API');
  }
};
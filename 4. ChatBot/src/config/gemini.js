import axios from 'axios';

const API_KEY = 'AIzaSyC9EtRr3eu5QAAYL_wVNXfuUeUjgHV6bwg'; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

export const runChat = async (prompt) => {
  try {
    const response = await axios.post(API_URL, {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 1,
        topK: 64,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the full response for debugging
    console.log('API response:', response.data);

    // Access the text from the response data
    if (response.data.candidates && response.data.candidates.length > 0) {
      const content = response.data.candidates[0]?.content;
      if (content && content.parts && content.parts.length > 0) {
        return content.parts[0]?.text || 'No response text found';
      }
    }
    
    console.error('Unexpected response format:', response.data);
    return 'No response text found';
  } catch (error) {
    console.error('Error making request to Gemini API:', error);
    throw error;
  }
};

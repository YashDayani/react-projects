import React, { createContext, useState, useRef, useEffect } from "react";
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Import a Prism theme CSS file
import { runChat } from '../config/gemini'; // Ensure this import is correct

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const resultRef = useRef(null);

    useEffect(() => {
        if (resultRef.current) {
            highlightCode(resultRef.current);
        }
    }, [resultData]);

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const formatGeminiStyle = (text) => {
        marked.setOptions({
            highlight: function(code, lang) {
                const language = Prism.languages[lang] ? lang : 'markup'; // Use 'markup' as a fallback language
                return Prism.highlight(code, Prism.languages[language], language);
            },
            langPrefix: 'language-'
        });

        let html = marked(text);
console.log(html); // Add this line to debug

html = html.replace(/<h2/g, '<h2 class="mb-4 mt-6"')
        .replace(/<h3/g, '<h3 class="mb-3 mt-5"')
        .replace(/<p>/g, '<p class="mb-4">')
        .replace(/<ul>/g, '<ul class="mb-4">')
        .replace(/<li>/g, '<li class="mb-2 ml-4">');
html = html.replace(/<pre><code/g, '<div class="code-block"><pre><code')
        .replace(/<\/code><\/pre>/g, '</code></pre></div>');
console.log(html); // Add this line to debug
return html;

    };

    const highlightCode = (element) => {
        Prism.highlightElement(element);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        try {
            if (prompt !== undefined) {
                response = await runChat(prompt);
                setRecentPrompt(prompt);
            } else {
                setPrevPrompts(prev => [...prev, input]);
                setRecentPrompt(input);
                response = await runChat(input);
            }

            if (response) {
                let formattedResponse = formatGeminiStyle(response);
                const sanitizedResponse = DOMPurify.sanitize(formattedResponse);

                setResultData(sanitizedResponse);
                return response;
            } else {
                console.error('No response received');
                setResultData('No response text found');
                return null;
            }
        } catch (error) {
            console.error('Error in onSent:', error);
            setResultData('An error occurred while processing the request');
            return null;
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        resultRef
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;

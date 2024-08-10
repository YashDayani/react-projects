import React, { createContext, useState, useRef, useEffect } from "react";
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import Prism from 'prismjs';
import './code.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import { runChat } from '../config/gemini'; // Ensure this import is correct

Prism.manual = true;

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'day'); // Initialize theme

    const resultRef = useRef(null);

    useEffect(() => {
        if (resultRef.current) {
            setTimeout(() => {
                const codeBlocks = resultRef.current.querySelectorAll('pre code');
                codeBlocks.forEach((block) => {
                    Prism.highlightElement(block);
                });
            }, 0);
        }
    }, [resultData]);

    useEffect(() => {
        // Apply the theme to the body
        document.body.classList.toggle('night', theme === 'night');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const formatGeminiStyle = (text) => {
        marked.setOptions({
            highlight: function(code, lang) {
                if (Prism.languages[lang]) {
                    code = Prism.highlight(code, Prism.languages[lang], lang);
                }
                return `<code class="language-${lang}">${code}</code>`;
            },
            langPrefix: 'language-'
        });

        let html = marked(text);

        // Apply general styling classes
        html = html.replace(/<h2/g, '<h2 class="mb-4 mt-6"')
            .replace(/<h3/g, '<h3 class="mb-3 mt-5"')
            .replace(/<p>/g, '<p class="mb-4">')
            .replace(/<ul>/g, '<ul class="mb-4">')
            .replace(/<li>/g, '<li class="mb-2 ml-4">');

        // Render code blocks correctly
        html = html.replace(/<pre><code class="language-(\w+)">/g, '<pre class="language-$1"><code class="language-$1">');
        html = html.replace(/<pre><code>/g, '<pre class="language-none"><code class="language-none">');

        return html;
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        try {
            let response;
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
                setResultData('No response text found');
                return null;
            }
        } catch (error) {
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
        resultRef,
        theme,         // Provide theme value
        setTheme       // Provide function to change theme
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;

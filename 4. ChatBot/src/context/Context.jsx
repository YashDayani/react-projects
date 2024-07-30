import React, { createContext, useState, useRef, useEffect } from "react";
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import Prism from 'prismjs';
import './code.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import { runChat } from '../config/gemini';

Prism.manual = true;

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [error, setError] = useState("");

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

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setRecentPrompt("");
    };

    const formatGeminiStyle = (text) => {
        marked.setOptions({
            highlight: (code, lang) => {
                if (Prism.languages[lang]) {
                    code = Prism.highlight(code, Prism.languages[lang], lang);
                }
                return `<code class="language-${lang}">${code}</code>`;
            },
            langPrefix: 'language-'
        });

        let html = marked(text);

        html = html.replace(/<h2/g, '<h2 class="mb-4 mt-6"')
            .replace(/<h3/g, '<h3 class="mb-3 mt-5"')
            .replace(/<p>/g, '<p class="mb-4">')
            .replace(/<ul>/g, '<ul class="mb-4">')
            .replace(/<li>/g, '<li class="mb-2 ml-4">');

        html = html.replace(/<pre><code class="language-(\w+)">/g, '<pre class="language-$1"><code class="language-$1">');
        html = html.replace(/<pre><code>/g, '<pre class="language-none"><code class="language-none">');

        return html;
    };

    const onSent = async (prompt, storedResponse = null) => {
        setLoading(true);
        setShowResult(true);
        setError("");

        try {
            let response;
            if (storedResponse) {
                setRecentPrompt(prompt);
                setResultData(storedResponse);
            } else {
                response = await runChat(prompt);
                setRecentPrompt(prompt);

                if (response) {
                    const formattedResponse = formatGeminiStyle(response);
                    const sanitizedResponse = DOMPurify.sanitize(formattedResponse);
                    setResultData(sanitizedResponse);
                } else {
                    throw new Error('Empty response from API');
                }
            }
        } catch (error) {
            console.error('Error in onSent:', error);
            setError(`An error occurred while processing the request: ${error.message}`);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const fetchPromptAndResponse = async (id) => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`http://localhost:5000/api/history/${id}`, {
                method: 'GET',
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }

            const data = await response.json();

            console.log('Fetched data:', data);

            if (data && data.prompt && data.response) {
                await onSent(data.prompt, data.response);
            } else {
                setError('No data found or incomplete data');
            }
        } catch (error) {
            console.error('Error fetching prompt and response:', error);
            setError(`Error fetching prompt and response: ${error.message}`);
        } finally {
            setLoading(false);
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
        fetchPromptAndResponse,
        error
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
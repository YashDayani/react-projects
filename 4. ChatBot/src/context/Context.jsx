import { createContext, useState, useRef, useEffect } from "react";
import runChat from "../config/gemini";
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

export const Context = createContext();

const ContextProvider = (props) => {
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
        // Configure marked options
        marked.setOptions({
            highlight: function(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            },
            langPrefix: 'hljs language-'
        });

        // Use marked to convert Markdown to HTML
        let html = marked(text);

        // Additional custom styling
        html = html.replace(/<h2/g, '<h2 class="mb-4 mt-6"')
                   .replace(/<h3/g, '<h3 class="mb-3 mt-5"')
                   .replace(/<p>/g, '<p class="mb-4">')
                   .replace(/<ul>/g, '<ul class="mb-4">')
                   .replace(/<li>/g, '<li class="mb-2 ml-4">');

        // Wrap code blocks
        html = html.replace(/<pre><code/g, '<div class="code-block"><pre><code')
                   .replace(/<\/code><\/pre>/g, '</code></pre></div>');

        return html;
    };

    const highlightCode = (element) => {
        hljs.highlightAll();
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }

        let formattedResponse = formatGeminiStyle(response);
        const sanitizedResponse = DOMPurify.sanitize(formattedResponse);

        setResultData(sanitizedResponse);

        setLoading(false);
        setInput("");
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
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
import { createContext, useState, useRef, useEffect } from "react";
import runChat from "../config/gemini";
import hljs from 'highlight.js'; // Or your preferred syntax highlighting theme

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState(""); // Current user input
    const [recentPrompt, setRecentPrompt] = useState(""); // Most recent prompt
    const [prevPrompts, setPrevPrompts] = useState([]); // History of prompts
    const [showResult, setShowResult] = useState(false); // Whether to show result
    const [loading, setLoading] = useState(false); // Loading state
    const [resultData, setResultData] = useState(""); // Formatted response data

    const resultRef = useRef(null); // Ref to highlight code blocks

    useEffect(() => {
        if (resultRef.current) {
            highlightCode(resultRef.current); // Highlight code on result update
        }
    }, [resultData]);

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord); // Display words with delay
        }, 3 * index); // Adjust delay as needed
    };

    const newChat = () => {
        setLoading(false); // Reset states for new chat
        setShowResult(false);
    };

    const formatGeminiStyle = (text) => {
        // Handle code blocks
        text = text.replace(
            /```(\w+)?\n([\s\S]*?)```/g,
            (match, lang, code) => `<div class="code-block"><pre class="language-${lang || ''}"><code class="hljs language-${lang || ''}">${hljs.highlightAuto(code.trim()).value}</code></pre></div>`
        );
    
        // Handle inline code
        text = text.replace(
            /`([^`]+?)`/g,
            '<code class="inline-code hljs">$1</code>'
        );
    
        // Handle headers
        text = text.replace(/^## (.*$)/gm, '<h2 class="mb-4 mt-6">$1</h2>')  // H2 headers with margin
            .replace(/^### (.*$)/gm, '<h3 class="mb-3 mt-5">$1</h3>');  // H3 headers with margin
    
        // Handle bold and italic text
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>');  // Italic
    
        // Handle paragraphs and line breaks
        text = text.replace(/\n\n/g, '</p><p class="mb-4">')  // Paragraphs with margin
            .replace(/\n/g, '<br>');  // Line breaks
    
        // Handle unordered lists
        text = text.replace(/^(\s*)\* (.+)$/gm, (match, indent, content) => {
            const depth = indent.length / 2;  // Assuming 2 spaces per indent level
            return `<li class="mb-2 ml-${depth * 4}">${content}</li>`;
        });
    
        // Wrap list items in <ul> tags
        text = text.replace(/(<li.*?<\/li>\s*)+/g, '<ul class="mb-4">$&</ul>');
    
        return text;
    };
    
    const highlightCode = (element) => {
        hljs.highlightAll(); // Highlight all code blocks
    };

    const onSent = async (prompt) => {
        setResultData(""); // Clear previous result
        setLoading(true); // Set loading state
        setShowResult(true); // Show result

        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt); // Update recent prompt
        } else {
            setPrevPrompts(prev => [...prev, input]); // Save current input to history
            setRecentPrompt(input); // Update recent prompt
            response = await runChat(input);
        }

        // Format the response
        let formattedResponse = formatGeminiStyle(response);

        // Split the formatted response into words
        let words = formattedResponse.split(/(\s+)/);

        // Display words with delay
        words.forEach((word, index) => {
            delayPara(index, word);
        });

        setLoading(false); // Reset loading state
        setInput(""); // Clear input
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

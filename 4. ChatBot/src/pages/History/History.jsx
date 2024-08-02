import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import Prism from 'prismjs';
import Accordion from '../../components/Accordion/Accordion'; // Import the Accordion component
import Popup from '../../components/Popup/Popup'; // Import the Popup component
import './History.css';
import '../../context/code.css'; // Or any other Prism theme you like

// Ensure to import Prism.js components for languages you want to support

const History = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [popup, setPopup] = useState({ show: false, onConfirm: null, message: '' });

    useEffect(() => {
        const fetchSearchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found. Please log in.');
                    return;
                }
                const response = await axios.get('http://localhost:5000/api/history', {
                    headers: { 'x-auth-token': token }
                });
                setSearchHistory(response.data);
            } catch (error) {
                setError('Failed to load search history. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchHistory();
    }, []);

    const handleDeleteChat = (id) => {
        setPopup({
            show: true,
            message: 'Are you sure you want to delete this chat?',
            onConfirm: () => confirmDeleteChat(id)
        });
    };

    const confirmDeleteChat = async (id) => {
        setPopup({ show: false });
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }
            await axios.delete(`http://localhost:5000/api/history/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setSearchHistory(searchHistory.filter(item => item._id !== id));
        } catch (error) {
            setError('Failed to delete chat. Please try again.');
        }
    };

    const handleDeleteAllChats = () => {
        setPopup({
            show: true,
            message: 'Are you sure you want to delete all chats?',
            onConfirm: confirmDeleteAllChats
        });
    };

    const confirmDeleteAllChats = async () => {
        setPopup({ show: false });
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }
            await axios.delete('http://localhost:5000/api/history', {
                headers: { 'x-auth-token': token }
            });
            setSearchHistory([]);
        } catch (error) {
            setError('Failed to delete all chats. Please try again.');
        }
    };

    const renderResponse = (response) => {
        if (typeof response !== 'string') {
            response = String(response);
        }

        // Step 1: Parse the markdown text with marked
        const rawHtml = marked.parse(response);

        // Step 2: Create a temporary DOM element to manipulate HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawHtml;

        // Step 3: Find all code blocks and replace them with highlighted code
        const codeBlocks = tempDiv.querySelectorAll('pre code');
        codeBlocks.forEach((block) => {
            const code = block.textContent;
            const language = block.className.replace('language-', '');
            const validLang = Prism.languages[language] ? language : 'text';
            const html = Prism.highlight(code, Prism.languages[validLang] || Prism.languages['text'], validLang);

            // Create a wrapper for the code block
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block';
            wrapper.style.margin = '10px -20px';

            // Create a header for the code block
            const header = document.createElement('div');
            header.className = 'code-header';
            header.innerHTML = `
                <span class="code-language">${validLang}</span>
                <button class="copy-code-btn">Copy Code</button>
            `;

            // Create a new pre element with the highlighted code
            const newPre = document.createElement('pre');
            newPre.innerHTML = `<code class="language-${validLang}">${html}</code>`;

            // Assemble the wrapper
            wrapper.appendChild(header);
            wrapper.appendChild(newPre);

            // Replace the original code block with the new wrapper
            block.parentNode.replaceWith(wrapper);
        });

        // Step 4: Sanitize and return the HTML
        const sanitizedHtml = DOMPurify.sanitize(tempDiv.innerHTML);
        return (
            <div 
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }} 
                onClick={(e) => {
                    if (e.target.classList.contains('copy-code-btn')) {
                        const codeElement = e.target.closest('.code-block-wrapper').querySelector('code');
                        navigator.clipboard.writeText(codeElement.textContent)
                            .then(() => {
                                e.target.textContent = 'Copied!';
                                setTimeout(() => {
                                    e.target.textContent = 'Copy Code';
                                }, 2000);
                            })
                            .catch(err => console.error('Failed to copy: ', err));
                    }
                }}
            />
        );
    };

    const filteredHistory = searchHistory.filter(item =>
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.response.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className='history-page'>
            <div className="history-container">
                <h1>Search History</h1>
                <input
                    type="text"
                    placeholder="Search history..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : filteredHistory.length > 0 ? (
                    <div className="history-list">
                        {filteredHistory.map((item) => (
                            <div key={item._id} id={`${item._id}`} className="history-item">
                                <Accordion 
                                    prompt={item.prompt} 
                                    response={renderResponse(item.response)} 
                                />
                                <button onClick={() => handleDeleteChat(item._id)}>Delete</button>
                            </div>
                        ))}
                        <button onClick={handleDeleteAllChats} className="delete-all-btn">Delete All Chats</button>
                    </div>
                ) : (
                    <p>No history available.</p>
                )}
            </div>
            {popup.show && (
                <Popup 
                    message={popup.message} 
                    onConfirm={popup.onConfirm} 
                    onCancel={() => setPopup({ show: false })} 
                />
            )}
        </section>
    );
};

export default History;
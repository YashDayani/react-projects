import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { assets } from '../../assets/assets';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; 
import Accordion from '../../components/Accordion/Accordion';
import Popup from '../../components/Popup/Popup';
import './History.css';
import '../../context/code.css';

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

        
        const tokens = marked.lexer(response);

        
        const processedTokens = tokens.map(token => {
            if (token.type === 'code') {
                
                const langMatch = token.text.match(/^```(\w+)/);
                let language = langMatch ? langMatch[1].toLowerCase() : '';

                
                let code = token.text.replace(/^```\w+\n/, '').trim();

                
                const highlighted = hljs.highlightAuto(code, language ? [language] : undefined);

                return {
                    ...token,
                    html: highlighted.value,
                    language: highlighted.language
                };
            }
            return token;
        });

        
        const renderedHtml = processedTokens.map(token => {
            if (token.type === 'code') {
                return `
                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-language">${token.language}</span>
                            <button class="copy-code-btn">Copy Code</button>
                        </div>
                        <pre><code class="hljs language-${token.language}">${token.html}</code></pre>
                    </div>
                `;
            }
            return marked.parser([token]);
        }).join('');

        
        const sanitizedHtml = DOMPurify.sanitize(renderedHtml);
        return (
            <div
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                onClick={handleCopyCode}
            />
        );
    };

    const handleCopyCode = (e) => {
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
    };

    const filteredHistory = searchHistory.filter(item =>
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.response.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className='history-page'>
            <div className="history-container">
                <div className="history-page-header">
                    <h1 className='history-title'>History</h1>
                    <input
                        type="text"
                        placeholder="Search history..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : filteredHistory.length > 0 ? (
                    <div className="history-items">
                        <div className="history-list">
                            {filteredHistory.map((item) => (
                                <div key={item._id} id={`${item._id}`} className="history-item">
                                    <Accordion
                                        prompt={item.prompt}
                                        response={renderResponse(item.response)}
                                    />
                                    <img className='historyDeletebtn' src={assets.trash_icon} onClick={() => handleDeleteChat(item._id)} alt="Delete" />
                                </div>
                            ))}
                            <button onClick={handleDeleteAllChats} className="delete-all-btn">Delete All Chats</button>
                        </div>
                    </div>

                ) : (
                    <p>No history yet</p>
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
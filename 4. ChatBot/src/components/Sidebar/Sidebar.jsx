import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import axios from 'axios';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { setRecentPrompt, onSent, newChat } = useContext(Context);
    const [searchHistory, setSearchHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchSearchHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }
            const response = await axios.get('http://localhost:5000/api/history', {
                headers: {
                    'x-auth-token': token
                }
            });
            setSearchHistory(response.data);
        } catch (error) {
            console.error('Error fetching search history:', error.response ? error.response.data : error.message);
            setError('Failed to load search history. Please log in again.');
        } finally {
            setLoading(false);
        }
    };

    const loadPrompt = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }
            const response = await axios.get(`http://localhost:5000/api/history/${id}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            const { prompt, response: responseText } = response.data;
            if (!prompt || !responseText) {
                throw new Error('Invalid data received from server');
            }
            setRecentPrompt(prompt);
            await onSent(prompt, responseText);
        } catch (error) {
            console.error('Error fetching prompt and response:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 404) {
                setError('Chat not found. It may have been deleted.');
            } else {
                setError('Failed to fetch prompt and response. Please try again.');
            }
        }
    };

    const handleDeleteChat = async (id, event) => {
        event.stopPropagation();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }
            await axios.delete(`http://localhost:5000/api/history/${id}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            setSearchHistory(searchHistory.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting chat:', error.response ? error.response.data : error.message);
            setError('Failed to delete chat. Please try again.');
        }
    };

    const handleDeleteAllChats = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }
            await axios.delete('http://localhost:5000/api/history', {
                headers: {
                    'x-auth-token': token
                }
            });
            setSearchHistory([]);
        } catch (error) {
            console.error('Error deleting all chats:', error.response ? error.response.data : error.message);
            setError('Failed to delete all chats. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        fetchSearchHistory();
    }, []);

    return (
        <div className={`sidebar ${extended ? 'extended' : ''}`}>
            <div className="top">
                <div className='sidelogo'>
                    <img
                        onClick={() => setExtended(prev => !prev)}
                        className='menu'
                        src={extended ? assets.extended_logo : assets.menu_icon}
                        alt="Menu icon"
                        aria-label="Toggle sidebar"
                    />
                </div>

                <div onClick={() => newChat()} className="new-chat" title='New Chat' aria-label="Start a new chat">
                    <img src={assets.plus_icon} alt="Plus icon" />
                    {extended && (
                        <div className='new-btn'>
                            New Chat
                            <span className='srt-btn'>Ctrl</span>
                            <span className='srt-btn'>I</span>
                        </div>
                    )}
                </div>

                {extended && <p className="recent-title">Recent</p>}
            </div>

            <div className="recent-container">
                {extended && (
                    <div className="recent">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="error-message">{error}</p>
                        ) : searchHistory.length > 0 ? (
                            <>
                                {searchHistory.map((item, index) => (
                                    <div
                                        key={index}
                                        className="recent-entry chat-entry"
                                        aria-label={`Load prompt ${item.prompt.slice(0, 12)}`}
                                        onClick={() => loadPrompt(item._id)}
                                    >
                                        <p className="recent-entry-text">
                                            {item.prompt}
                                        </p>

                                        <button 
                                            onClick={(e) => handleDeleteChat(item._id, e)}
                                            className="delete-chat-btn"
                                            aria-label="Delete this chat"
                                        >
                                            <img src={assets.cross_icon} alt="Delete icon" />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={handleDeleteAllChats}
                                    className="delete-all-chats-btn"
                                    aria-label="Delete all chats"
                                >
                                    Delete All Chats
                                </button>
                            </>
                        ) : (
                            <p>No recent history available.</p>
                        )}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry" aria-label="Activity">
                    <img src={assets.history_icon} alt="History icon" />
                    {extended && <p>Clear</p>}
                </div>

                <div className="bottom-item recent-entry" aria-label="Help">
                    <img src={assets.question_icon} alt="Help icon" />
                    {extended && <p>Help</p>}
                </div>
                
                <div onClick={handleLogout} className="bottom-item recent-entry" aria-label="Logout">
                    <img src={assets.logout_icon} alt="Logout icon" />
                    {extended && <p>Logout</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
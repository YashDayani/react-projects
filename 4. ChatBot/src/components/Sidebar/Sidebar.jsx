import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import axios from 'axios';
import Popup from '../Popup/Popup';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { setRecentPrompt, onSent, newChat } = useContext(Context);
    const [searchHistory, setSearchHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popup, setPopup] = useState({ show: false, message: '', onConfirm: null });
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                handleNewChat(); // Call the new chat handler
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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
            if (error.response && error.response.status === 401) {
                handleLogout('Your session has expired. Please log in again.');
            } else {
                setError('Failed to load search history. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const handleDeleteChat = (id, event) => {
        event.stopPropagation();
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
                headers: {
                    'x-auth-token': token
                }
            });
            setSearchHistory(searchHistory.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting chat:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 401) {
                handleLogout('Your session has expired. Please log in again.');
            } else {
                setError('Failed to delete chat. Please try again.');
            }
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
                headers: {
                    'x-auth-token': token
                }
            });
            setSearchHistory([]);
        } catch (error) {
            console.error('Error deleting all chats:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 401) {
                handleLogout('Your session has expired. Please log in again.');
            } else {
                setError('Failed to delete all chats. Please try again.');
            }
        }
    };

    const handleLogout = (logoutMessage) => {
        setPopup({ show: false });
        localStorage.removeItem('token');
        if (logoutMessage) {
            setError(logoutMessage);
        }
        navigate('/login');
    };

    const confirmLogout = () => {
        setPopup({ show: false });
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleNewChat = async () => {
        navigate('/dashboard');
        newChat();
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

                <div onClick={handleNewChat} className="new-chat" title='New Chat' aria-label="Start a new chat">
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
                                    >
                                        <p 
                                            className="recent-entry-text" 
                                            onClick={() => loadPrompt(item.prompt)}
                                        >
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
                            </>
                        ) : (
                            <p>No recent history available.</p>
                        )}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div 
                    className="bottom-item recent-entry" 
                    aria-label="Clear History"
                    onClick={handleDeleteAllChats}
                >
                    <img src={assets.trash_icon} alt="Trash icon" />
                    {extended && <p>Clear</p>}
                </div>

                <div 
                    className="bottom-item recent-entry" 
                    aria-label="View History"
                    onClick={() => navigate('/history')}
                >
                    <img src={assets.history_icon} alt="History icon" />
                    {extended && <p>History</p>}
                </div>
                
                <div 
                    className="bottom-item recent-entry" 
                    aria-label="Logout"
                    onClick={handleLogout}
                >
                    <img src={assets.logout_icon} alt="Logout icon" />
                    {extended && <p>Logout</p>}
                </div>
            </div>
            
            {popup.show && (
                <Popup 
                    message={popup.message} 
                    onConfirm={popup.onConfirm} 
                    onCancel={() => setPopup({ show: false })} 
                />
            )}
        </div>
    );
};

export default Sidebar;
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import axios from 'axios';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
    const [searchHistory, setSearchHistory] = useState([]);
    const navigate = useNavigate();

    const fetchSearchHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            const response = await axios.get('http://localhost:5000/api/history', {
                headers: {
                    'x-auth-token': token
                }
            });
            setSearchHistory(response.data);
        } catch (error) {
            console.error('Error fetching search history:', error);
        }
    };

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    useEffect(() => {
        fetchSearchHistory();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

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
                    {extended ? <p className='new-btn'>New Chat <p className='srt-btn'>Ctrl</p> <p className='srt-btn'>I</p> </p> : null}
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {searchHistory.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => loadPrompt(item.prompt)} 
                                className="recent-entry" 
                                aria-label={`Load prompt ${item.prompt.slice(0, 12)}`}
                            >
                                <img src={assets.message_icon} alt="Message icon" />
                                <p>{item.prompt.slice(0, 20)} ...</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry" aria-label="Help">
                    <img src={assets.question_icon} alt="Question icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry" aria-label="Activity">
                    <img src={assets.history_icon} alt="History icon" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div onClick={handleLogout} className="bottom-item recent-entry" aria-label="Logout">
                    <img src={assets.logout_icon} alt="Logout icon" />
                    {extended ? <p>Logout</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

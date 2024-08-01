import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css'; // Your styles for History
import CodeBlock from '../../components/CodeBlock/CodeBlock'; // Adjust path if needed

const History = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleDeleteChat = async (id) => {
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

    const handleDeleteAllChats = async () => {
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

    return (
        <section className='history-page'>
            <div className="history-container">
                <h1>Search History</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : searchHistory.length > 0 ? (
                    <div className="history-list">
                        {searchHistory.map((item) => (
                            <div key={item._id} id={`history-item-${item._id}`} className="history-item">
                                <div className="history-item-content">
                                    <h3>ID:</h3>
                                    <p>{item._id}</p>
                                    <h3>Prompt:</h3>
                                    <p>{item.prompt}</p>
                                    <h3>Response:</h3>
                                    <div className="response-content">
                                        <CodeBlock
                                            language={item.language || 'plaintext'} // Default to 'plaintext' if no language is provided
                                            code={item.response}
                                        />
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteChat(item._id)}>Delete</button>
                            </div>
                        ))}
                        <button onClick={handleDeleteAllChats} className="delete-all-btn">Delete All Chats</button>
                    </div>
                ) : (
                    <p>No history available.</p>
                )}
            </div>
        </section>
    );
};

export default History;

import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import axios from 'axios';

const Main = ({ onSendMessage }) => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, newChat } = useContext(Context);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [transcript, setTranscript] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in again.');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/user/name', {
          headers: {
            'x-auth-token': token
          }
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching user name:', error);
        setError('Failed to fetch user name. Please try refreshing the page.');
      }
    };

    fetchUserName();

    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
        }
        setTranscript(prev => prev + currentTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.log('Speech recognition not supported');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setInput(prevInput => prevInput + transcript);
    setTranscript('');
  }, [transcript, setInput]);

  useEffect(() => {
    if (!loading && elapsedTime !== 0) {
      clearInterval(timerRef.current);
    }
  }, [loading, elapsedTime]);

  const saveSearchHistory = async (prompt, response) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      if (!prompt || !response) {
        console.error('Prompt or response is missing');
        return;
      }
      const data = { prompt, response };
      const res = await axios.post('http://localhost:5000/api/history', data, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      console.log('Search history saved:', res.data);
    } catch (error) {
      console.error('Error saving search history:', error.response ? error.response.data : error.message);
      setError('Failed to save search history. Please try again.');
    }
  };

  const handleSent = async () => {
    try {
      if (!input.trim()) {
        setError('Please enter a prompt before sending.');
        return;
      }
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
      setElapsedTime(0);
      setMilliseconds(0);
      timerRef.current = setInterval(() => {
        setMilliseconds(prev => {
          if (prev === 990) {
            setElapsedTime(prevTime => prevTime + 1);
            return 0;
          }
          return prev + 10;
        });
      }, 10);
      const response = await onSent(input);
      console.log('Input:', input);
      console.log('Response:', response);
      if (response) {
        await saveSearchHistory(input, response);
        await onSendMessage(input);
      } else {
        console.error('No response received from onSent');
      }
    } catch (error) {
      console.error('Error in handleSent:', error);
      setError('An error occurred while processing your request. Please try again.');
    } finally {
      clearInterval(timerRef.current);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSent();
    }
  };

  const handleNewChat = useCallback((event) => {
    if (event.ctrlKey && event.key === 'i') {
      event.preventDefault();
      newChat();
    }
  }, [newChat]);

  useEffect(() => {
    window.addEventListener('keydown', handleNewChat);
    return () => {
      window.removeEventListener('keydown', handleNewChat);
    };
  }, [handleNewChat]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className='main'>
      <div className="main-wrapper">
        <div className="nav">
          <p>Sophos</p>
          <img src={assets.dummy_icon} alt="" />
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p><span>Hello, {userName || 'User'}.</span></p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                  <p>Briefly summarize this concept: urban planning</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                  <p>Improve the readability of the following code</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </>
          ) : (
            <div className='result'>
              <div className="result-title">
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <div className='answer'>
                  <img src={assets.menu_icon} alt="" />
                  <span>Answer</span>
                  <span className="timer">
                    {elapsedTime}.{milliseconds.toString().padStart(3, '0').slice(0, 2)}s
                  </span>
                </div>
                {loading ? (
                  <div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}
          <div className="main-bottom">
            <div className="search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                value={input}
                type="text"
                placeholder='Enter a prompt here'
              />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img
                  src={isListening ? assets.mic_icon_active : assets.mic_icon}
                  alt="Microphone"
                  onClick={toggleListening}
                  style={{ cursor: 'pointer' }}
                />
                {input.trim() && <img onClick={handleSent} src={assets.send_icon} alt="" />}
              </div>
            </div>
            <p className="bottom-info">
              The AI may display inaccurate info, including about people, so double-check its response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
import React, { useContext, useEffect, useState, useRef } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { cardPrompts } from './data';
import axios from 'axios';
import './Main.css';

const Main = ({ theme, toggleTheme }) => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, newChat, resultRef } = useContext(Context);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [transcript, setTranscript] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const timerRef = useRef(null);

  const renderContent = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = Array.from(doc.body.childNodes);

    return elements.map((node, index) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'PRE' && node.firstChild.tagName === 'CODE') {
        const language = node.firstChild.className.replace('language-', '') || 'plaintext';
        const code = node.firstChild.textContent;
        return <CodeBlock key={index} language={language} code={code} />;
      }
      return <div key={index} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />;
    });
  };

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
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const body = { prompt, response };
      await axios.post('http://localhost:5000/api/history', body, config);
    } catch (error) {
      console.error('Error saving search history:', error.response.data);
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

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const handleCardClick = (prompt) => {
    setInput(prompt);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className={`main ${theme}`}>
      <div className="main-wrapper">
        <div className="nav">
          <p>Sophos</p>
          <div>
            <img
              src={theme === 'day' ? assets.day_icon : assets.night_icon}
              alt="Toggle Theme"
              onClick={toggleTheme}
            />
          </div>
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p><span>Hello, {userName || 'User'}.</span></p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                {cardPrompts.map((card, index) => (
                  <div
                    key={index}
                    className="card"
                    onClick={() => handleCardClick(card.text)}
                  >
                    <p>{card.text}</p>
                    <img src={assets[card.icon]} alt="" />
                  </div>
                ))}
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
                  <div ref={resultRef} className="prism-highlight">
                    {renderContent(resultData)}
                  </div>
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
                <div className='micSwitch'>
                  <img
                    src={isListening ? assets.mic_icon_active : assets.mic_icon}
                    alt="Microphone"
                    onClick={toggleListening}
                  />
                </div>
                {input.trim() && <div className='sendBtn'>
                  <img onClick={handleSent} src={assets.send_icon} alt="" />
                </div>}
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
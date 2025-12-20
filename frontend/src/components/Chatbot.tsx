// src/components/Chatbot.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import type { ChatMessage } from '../types';
import './Chatbot.css';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(
        'http://localhost:8000/api/chatbot',
        `symptoms=${encodeURIComponent(userMessage.content)}`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      
      const botMessage: ChatMessage = { 
        role: 'bot', 
        content: JSON.stringify(res.data, null, 2) 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = { 
        role: 'bot', 
        content: 'Sorry, unable to process your request. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
      setError('Server error. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
    setError('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = (): void => {
    setMessages([]);
    setInput('');
    setError('');
  };

  return (
    <div className="chatbot-page">
      <h2>Health Assistant</h2>
      
      <div className="chat-container">
        <div className="chat-header">
          <div className="disclaimer">
            🤖 AI Health Assistant - Educational use only. Always consult a doctor.
          </div>
          <button onClick={clearChat} className="clear-btn">Clear Chat</button>
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <p>Hi! Describe your symptoms and I'll provide general guidance.</p>
              <p className="examples">
                Examples: "I have a headache and fever" or "Stomach pain after eating"
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-bubble">
                  <div className="message-content">
                    {message.content}
                  </div>
                  <div className="message-time">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="message bot">
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          {error && <div className="error">{error}</div>}
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Describe your symptoms..."
              className="chat-input"
              disabled={loading}
            />
            <button 
              onClick={sendMessage} 
              disabled={loading || !input.trim()} 
              className="send-btn"
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

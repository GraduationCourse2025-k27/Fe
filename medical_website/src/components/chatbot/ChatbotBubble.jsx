import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaRegSmile } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './ChatbotBubble.css';

const ChatbotBubble = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" }
    ]);
    const [input, setInput] = useState("");
    const location = useLocation();
    const messagesEndRef = useRef(null);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    // Now we can have conditional returns after all hooks have been called
    if (location.pathname === "/chatbot") return null;

    const handleSend = () => {
        if (input.trim()) {
            const userMessage = { sender: "user", text: input };
            setMessages(prev => [...prev, userMessage]);
            setInput("");
            setTyping(true);
            
            // Simulate bot response
            setTimeout(() => {
                setTyping(false);
                setMessages(prev => [...prev, { sender: "bot", text: "Chức năng AI sẽ được tích hợp sau!" }]);
            }, 1500);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chatbot-container">
            {!isOpen ? (
                <button className="chatbot-bubble-button" onClick={() => setIsOpen(true)}>
                    <FaRobot />
                </button>
            ) : (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <FaRobot className="chatbot-icon" />
                            <span>Trợ lý AI</span>
                        </div>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>
                    
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <div className="message-content">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div className="message bot">
                                <div className="message-content typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="chatbot-input-area">
                        <textarea 
                            placeholder="Nhập tin nhắn..." 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="chatbot-input"
                            rows="1"
                        />
                        <div className="chatbot-controls">
                            <button className="emoji-button">
                                <FaRegSmile />
                            </button>
                            <button 
                                className="send-button"
                                onClick={handleSend}
                                disabled={!input.trim()}
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatbotBubble;

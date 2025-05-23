import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaUser, FaRegCopy, FaRedo } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAIResponse } from "../../utils/chatbot";
const ChatbotBubble = () => {
  const location = useLocation();
  const messagesEndRef = useRef(null);

  // Sanitize messages
  const sanitizeMessages = (storedMessages) => {
    if (!Array.isArray(storedMessages)) return [];
    return storedMessages.filter(
      (msg) => msg && typeof msg.text === 'string' && msg.sender && msg.timestamp
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('bubbleMessages')) || [
      { id: Date.now(), sender: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn?', timestamp: new Date().toISOString() },
    ];
    return sanitizeMessages(stored);
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Fetch AI response
 

  // Scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('bubbleMessages', JSON.stringify(messages));
  }, [messages]);

  // Hide bubble on /chatbot route
  if (location.pathname === '/chatbot') return null;

  // Format timestamp
  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Đã sao chép phản hồi!', { autoClose: 3000 });
    });
  };

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim() || isSending) return;
    setIsSending(true);

    const newMessage = {
      id: Date.now() + Math.random(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setTyping(true);
    setInput('');

    try {
      const aiResponse = await fetchAIResponse(input);
      const botMessage = {
        id: Date.now() + Math.random(),
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Lỗi khi lấy phản hồi AI:', error);
      const errorMessage = {
        id: Date.now() + Math.random(),
        text: 'Đã xảy ra lỗi khi lấy phản hồi từ AI.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setTyping(false);
      setIsSending(false);
    }
  };

  // Handle restart
  const handleRestart = () => {
    if (isSending) return;
    const initialMessage = [
      { id: Date.now(), sender: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn?', timestamp: new Date().toISOString() },
    ];
    setMessages(initialMessage);
    setInput('');
    localStorage.setItem('bubbleMessages', JSON.stringify(initialMessage));
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && input.trim() && !isSending) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[1000] font-sans">
        {!isOpen ? (
          <button
            className="w-[60px] h-[60px] !rounded-full bg-gradient-to-br from-blue-500 to-blue-900 text-white border-none flex items-center justify-center text-2xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => setIsOpen(true)}
          >
            <FaRobot />
          </button>
        ) : (
          <div className="w-[350px] h-[500px] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-900 text-white flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center font-semibold gap-2">
                <FaRobot className="text-xl" />
                <span>Trợ lý AI</span>
              </div>
              <button
                className="bg-transparent border-none text-white text-base cursor-pointer transition-all duration-200 flex items-center justify-center w-[30px] h-[30px] rounded-full hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100 flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-2 max-w-[80%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
                >
                  <div
                    className={`p-3 rounded-[18px] text-sm leading-tight ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-300 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 text-xs font-medium">
                      {msg.sender === 'user' ? <FaUser /> : <FaRobot />}
                      <span>{msg.sender === 'user' ? 'Bạn' : 'Trợ lý'}</span>
                    </div>
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <div className="mt-2 flex justify-between items-center text-xs">
                      <span>{formatTime(msg.timestamp)}</span>
                      {msg.sender === 'bot' && (
                        <button
                          onClick={() => copyToClipboard(msg.text)}
                          title="Sao chép"
                          className="p-1 hover:text-blue-500 active:text-blue-700"
                        >
                          <FaRegCopy />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex mb-2 max-w-[80%] self-start">
                  <div className="p-3 rounded-[18px] text-sm leading-tight bg-gray-300 text-gray-800 rounded-bl-none flex items-center gap-1 h-6">
                    <span className="inline-block w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="inline-block w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-200"></span>
                    <span className="inline-block w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-400"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-3 bg-white flex items-center relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border border-gray-300 rounded-3xl p-2 pr-24 text-sm outline-none transition-colors duration-200 focus:border-blue-500"
              />
              
              <button
                onClick={handleSend}
                disabled={!input.trim() || isSending}
                className={`absolute right-6 w-9 h-9 flex items-center justify-center transition-colors ${
                  input.trim() && !isSending
                    ? ' text-blue-500 border-blue-500 '
                    : ' text-gray-400 border-gray-300 cursor-not-allowed'
                }`}
              >
                <MdSend size={22} />
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ChatbotBubble;
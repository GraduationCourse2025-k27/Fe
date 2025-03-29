import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaPaperPlane, FaRegSmile, FaRegThumbsUp, FaRegThumbsDown, FaRegCopy, FaTimes, FaHistory, FaPlus, FaCog, FaMoon, FaSun, FaExpand, FaCompress, FaBars } from "react-icons/fa";
import "./ChatbotPage.css";

  
const ChatbotPage = () => {
    // Keep states
    const [messages, setMessages] = useState([
        { 
            id: 1,
            sender: "bot", 
            text: "Xin chào! Tôi là trợ lý y khoa AI. Tôi có thể giúp gì cho bạn hôm nay?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { id: 1, title: "Hỗ trợ đầu tư", date: "Hôm nay" },
        { id: 2, title: "Phân tích ngân sách", date: "Hôm qua" }
    ]);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(window.innerWidth > 768);
    const [typing, setTyping] = useState(false);
    const [activeChat, setActiveChat] = useState(1);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('chatbotTheme') || 'light');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
    const chatEndRef = useRef(null);
    const textareaRef = useRef(null);
    const chatbotPageRef = useRef(null);
    const chatMainRef = useRef(null);
    

    // Xử lý sự kiện resize cửa sổ để đảm bảo giao diện phản hồi
 useEffect(() => {
    const handleResize = () => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        
        // Tự động đóng sidebar trên thiết bị di động nếu nó đang mở
        if (mobile && isChatSidebarOpen && !isMobile) {
            setIsChatSidebarOpen(false);
        }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, [isMobile, isChatSidebarOpen]);

// Cuộn xuống cuối danh sách tin nhắn
useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

// Tự động điều chỉnh chiều cao của textarea
useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
}, [input]);

// Áp dụng chủ đề giao diện
useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('chatbotTheme', theme);
}, [theme]);

// Điều chỉnh nội dung chính khi sidebar thay đổi trạng thái
useEffect(() => {
    if (chatMainRef.current) {
        // Kích hoạt hiệu ứng mượt mà khi thay đổi chiều rộng
        setTimeout(() => {
            chatMainRef.current.style.transition = "width var(--sidebar-transition), margin-left var(--sidebar-transition)";
        }, 0);
    }
}, [isChatSidebarOpen]);

const toggleChatSidebar = () => {
    setIsChatSidebarOpen(!isChatSidebarOpen);
};

// Chuyển đổi chế độ toàn màn hình
const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        if (chatbotPageRef.current.requestFullscreen) {
            chatbotPageRef.current.requestFullscreen();
            setIsFullScreen(true);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    }
};

// Xử lý sự kiện thay đổi chế độ toàn màn hình
useEffect(() => {
    const handleFullscreenChange = () => {
        setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
}, []);

// Xử lý gửi tin nhắn
const handleSend = () => {
    if (input.trim()) {
        const userMessage = { 
            id: messages.length + 1, 
            sender: "user", 
            text: input,
            timestamp: new Date()
        };
        
        setMessages([...messages, userMessage]);
        setInput("");
        setTyping(true);
        
        // Đặt lại chiều cao textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
        
        // Giả lập phản hồi từ bot
        setTimeout(() => {
            setTyping(false);
            const botResponse = {
                id: messages.length + 2,
                sender: "bot",
                text: "Chức năng AI sẽ được tích hợp sau! Tôi hiện chỉ có thể phản hồi các tin nhắn đơn giản.",
                timestamp: new Date()
            };
            setMessages(prevMessages => [...prevMessages, botResponse]);
        }, 2000);
    }
};

// Xử lý sự kiện nhấn phím Enter để gửi tin nhắn
const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
};

// Định dạng thời gian tin nhắn
const formatTime = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

// Sao chép nội dung tin nhắn vào clipboard
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Có thể thêm thông báo sao chép thành công tại đây
};

// Bắt đầu cuộc trò chuyện mới
const startNewChat = () => {
    setMessages([{ 
        id: 1, 
        sender: "bot", 
        text: "Xin chào! Tôi là trợ lý y khoa AI. Tôi có thể giúp gì cho bạn hôm nay?",
        timestamp: new Date()
    }]);
    
    // Đóng sidebar trên thiết bị di động khi bắt đầu cuộc trò chuyện mới
    if (isMobile) {
        setIsChatSidebarOpen(false);
    }
};

// Chuyển đổi giữa chế độ sáng và tối
// const toggleTheme = () => {
//     setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
// };

return (
    <div 
        className={`chatbot-page ${theme} ${isFullScreen ? 'fullscreen' : ''}`}
        ref={chatbotPageRef}
    >
        {/* Hiển thị lớp phủ khi sidebar mở trên thiết bị di động */}
        {isMobile && isChatSidebarOpen && (
            <div className="sidebar-overlay" onClick={toggleChatSidebar}></div>
        )}
        
        {/* Thanh bên trái - Sidebar */}
        <aside className={`chat-sidebar ${isChatSidebarOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <button className="new-chat-btn" onClick={startNewChat}>
                    <FaPlus /> <span>Cuộc trò chuyện mới</span>
                </button>
                <button 
                    className="sidebar-toggle"
                    onClick={toggleChatSidebar}
                    aria-label="Đóng sidebar"
                >
                    <FaTimes />
                </button>
            </div>

            <div className="chat-history">
                <div className="history-header">
                    <h5 
                        onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                        className="clickable-header"
                    >
                        Lịch sử hội thoại {isHistoryOpen ? '▼' : '▶'}
                    </h5>
                </div>
                
                {isHistoryOpen && chatHistory.map(chat => (
                    <div 
                        key={chat.id} 
                        className={`history-item ${activeChat === chat.id ? 'active' : ''}`}
                        onClick={() => {
                            setActiveChat(chat.id);
                            if (isMobile) setIsChatSidebarOpen(false);
                        }}
                    >
                        <div className="history-icon"><FaHistory /></div>
                        <div className="history-details">
                            <div className="history-title">{chat.title}</div>
                            <div className="history-date">{chat.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
            {/* Main chat area */}
            <main 
                className={`chat-main ${!isChatSidebarOpen ? 'expanded' : ''}`}
                ref={chatMainRef}
            >
                <div className="chat-header">
                    <div className="header-left">
                        <button 
                            className="sidebar-toggle-main"
                            onClick={toggleChatSidebar}
                            aria-label="Toggle sidebar"
                        >
                            <FaBars />
                        </button>
                        <h2><FaRobot /> Trợ lý tư vấn y khoa bằng AI</h2>
                    </div>
                    <div className="header-actions">
                        {/* <button 
                            className="header-action-btn"
                            onClick={toggleTheme}
                            title={theme === 'light' ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
                        >
                            {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </button> */}
                        <button 
                            className="header-action-btn"
                            onClick={toggleFullScreen}
                            title={isFullScreen ? "Thoát chế độ toàn màn hình" : "Toàn màn hình"}
                        >
                            {isFullScreen ? <FaCompress /> : <FaExpand />}
                        </button>
                    </div>
                </div>
                
                <div className="chat-container">
                    <div className="messages-container">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                                <div className="message-bubble">
                                    {msg.sender === "bot" && (
                                        <div className="avatar bot-avatar">
                                            <FaRobot />
                                        </div>
                                    )}
                                    <div className="message-content">
                                        <div className="message-text">{msg.text}</div>
                                        <div className="message-footer">
                                            <span className="message-time">{formatTime(msg.timestamp)}</span>
                                            {msg.sender === "bot" && (
                                                <div className="message-actions">
                                                    <button title="Sao chép" onClick={() => copyToClipboard(msg.text)}>
                                                        <FaRegCopy />
                                                    </button>
                                                    <button title="Thích">
                                                        <FaRegThumbsUp />
                                                    </button>
                                                    <button title="Không thích">
                                                        <FaRegThumbsDown />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {typing && (
                            <div className="message-wrapper bot">
                                <div className="message-bubble">
                                    <div className="avatar bot-avatar">
                                        <FaRobot />
                                    </div>
                                    <div className="message-content typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="input-container">
                        <div className="input-wrapper">
                            <textarea
                                ref={textareaRef}
                                placeholder="Nhập tin nhắn của bạn..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                rows={1}
                            />
                            <div className="input-actions">
                                <button className="emoji-button">
                                    <FaRegSmile />
                                </button>
                                <button 
                                    className="send-button" 
                                    onClick={handleSend}
                                    disabled={!input.trim() || typing}
                                >
                                    <FaPaperPlane />
                                </button>
                            </div>
                        </div>
                        <div className="input-footer">
                            Trợ lý AI có thể cung cấp thông tin không chính xác. Hãy kiểm tra thông tin quan trọng.
                        </div>
                    </div>
                </div>
            </main>

            {/* Settings Modal */}
           
        </div>
    );
};

export default ChatbotPage;

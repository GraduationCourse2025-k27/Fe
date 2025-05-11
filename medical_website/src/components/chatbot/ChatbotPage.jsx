import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaRegCopy,
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaPlus,
  FaBars,
  FaTimes,
  FaCog,
  FaCompress,
  FaExpand,
} from "react-icons/fa";

const ChatbotPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search).get("query");

  const messagesEndRef = useRef(null);
  const debouncedSendRef = useRef(null);

  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem("chatMessages")) || []);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => JSON.parse(localStorage.getItem("chatHistory")) || []);
  const [currentChatId, setCurrentChatId] = useState(() => localStorage.getItem("currentChatId") || null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const mockAIResponse = () => "Tôi là trợ lý AI, sẵn sàng giúp bạn!";

  const handleSend = (text) => {
    if (!text.trim() || isSending) return;
    setIsSending(true);

    const newMessage = {
      id: Date.now() + Math.random(),
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setTyping(true);
    setInput("");

    const botMessage = {
      id: Date.now() + Math.random(),
      text: mockAIResponse(),
      sender: "bot",
      timestamp: new Date().toISOString(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
      setTyping(false);
      setIsSending(false);

      if (!currentChatId) {
        const newChatId = Date.now().toString();
        setCurrentChatId(newChatId);
        const newChat = {
          id: newChatId,
          title: text.slice(0, 30) + (text.length > 30 ? "..." : ""),
          messages: [newMessage, botMessage],
        };
        setChatHistory((prev) => [newChat, ...prev]);
      } else {
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId
              ? { ...chat, messages: [...chat.messages, newMessage, botMessage] }
              : chat
          )
        );
      }
    }, 1000);
  };

  const debouncedHandleSend = useCallback(
    debounce((text) => {
      handleSend(text);
    }, 300),
    [currentChatId, isSending]
  );

  useEffect(() => {
    debouncedSendRef.current = debouncedHandleSend;
  }, [debouncedHandleSend]);

  // Handle initial query
  useEffect(() => {
    if (queryParam && !isSending) {
      handleSend(queryParam);
      navigate(location.pathname, { replace: true });
    }
  }, [queryParam, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, 300);
    return () => clearTimeout(timeout);
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem("currentChatId", currentChatId);
  }, [currentChatId]);

  // Renamed from noteNewChat to handleNewChat
  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setInput("");
  };

  const handleSelectChat = (chatId) => {
    const selectedChat = chatHistory.find((chat) => chat.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setCurrentChatId(chatId);
      setInput("");
    }
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Đã sao chép phản hồi!");
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      debouncedSendRef.current?.(input);
    }
  };

  return (
    <div className={`flex h-screen ${fullscreen ? "p-0" : "p-2"} bg-gray-100`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-3 border-b border-gray-600 flex justify-between items-center">
            <h4 className="text-xl font-bold">Lịch sử chat</h4>
            <button onClick={() => setSidebarOpen(false)}><FaTimes /></button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto p-3 space-y-2">
            <button onClick={handleNewChat} className="w-full bg-blue-500 text-white p-2 rounded flex items-center gap-2">
              <FaPlus /> Cuộc trò chuyện mới
            </button>
            <hr />
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${chat.id === currentChatId ? "bg-gray-200 font-medium" : ""}`}
              >
                {chat.title}
              </div>
            ))}
          </div>

          {/* Footer Button - Fixed Bottom */}
          <div className="p-4 space-y-2">
            <button
              onClick={() => {
                localStorage.removeItem("chatHistory");
                localStorage.removeItem("chatMessages");
                localStorage.removeItem("currentChatId");
                setChatHistory([]);
                setMessages([]);
                setCurrentChatId(null);
                setInput("");
              }}
              className="w-full bg-red-500 text-white p-2 rounded flex items-center gap-2 hover:bg-red-600"
            >
              Xoá lịch sử chat
            </button>

            <button className="w-full bg-gray-200 text-gray-800 p-2 mt-2 rounded flex items-center gap-2 hover:bg-gray-300">
              <FaCog /> Cài đặt
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col relative ${sidebarOpen ? "" : "w-full"}`}>
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b bg-white ">
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)}>
                <FaBars />
              </button>
            )}
            <h4 className="text-lg font-semibold">Trợ lý thông minh</h4>
          </div>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {fullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] p-3 rounded-xl relative ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-300"}`}>
                <div className="flex items-center gap-2 mb-1 text-sm font-medium">
                  {msg.sender === "user" ? <FaUser /> : <FaRobot />}
                  <span>{msg.sender === "user" ? "Bạn" : "Trợ lý"}</span>
                </div>
                <div className="whitespace-pre-line">{msg.text}</div>
                <div className="mt-2 flex justify-between items-center text-xs text-white-900">
                  <span>{formatTime(msg.timestamp)}</span>
                  {msg.sender === "bot" && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => copyToClipboard(msg.text)} title="Sao chép"><FaRegCopy /></button>
                      <button title="Hài lòng"><FaRegThumbsUp /></button>
                      <button title="Không hài lòng"><FaRegThumbsDown /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {typing && <div className="italic text-gray-500">Trợ lý đang nhập...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 border border-gray-300 p-2 rounded-md outline-none"
          />
          <button onClick={() => debouncedSendRef.current?.(input)} className="bg-blue-500 text-white p-2 rounded-md">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
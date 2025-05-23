import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  FaTrash,
  FaCompress,
  FaExpand,
  FaHistory,
} from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAIResponse } from "../../utils/chatbot";

const ChatbotPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search).get("query");
  const messagesEndRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [messages, setMessages] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("chatMessages")) || [];
    return Array.isArray(stored) ? stored : [];
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("chatHistory")) || [];
    return Array.isArray(stored) ? stored : [];
  });
  const [currentChatId, setCurrentChatId] = useState(() => localStorage.getItem("currentChatId") || null);
  const [fullscreen, setFullscreen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const handleSend = async (text) => {
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

    try {
      const aiResponse = await fetchAIResponse(text);
      const botMessage = {
        id: Date.now() + Math.random(),
        text: typeof aiResponse === "string" ? aiResponse.trim() : "Phản hồi không hợp lệ từ AI.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (!currentChatId) {
        const newChatId = Date.now().toString();
        const newChat = {
          id: newChatId,
          title: text.slice(0, 30) + (text.length > 30 ? "..." : ""),
          messages: [newMessage, botMessage],
        };
        setCurrentChatId(newChatId);
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
    } catch (error) {
      const errorMessage = {
        id: Date.now() + Math.random(),
        text: "Đã xảy ra lỗi khi lấy phản hồi từ AI.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setTyping(false);
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (queryParam && !isSending) {
      handleSend(queryParam);
      navigate(location.pathname, { replace: true });
    }
  }, [queryParam]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem("currentChatId", currentChatId);
  }, [currentChatId]);

  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setInput("");
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleSelectChat = (chatId) => {
    const selectedChat = chatHistory.find((chat) => chat.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setCurrentChatId(chatId);
      setInput("");
      if (window.innerWidth < 768) setSidebarOpen(false);
    }
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Đã sao chép phản hồi!");
    });
  };

  return (
    <div className={`flex h-screen ${fullscreen ? "p-0" : "p-2"} bg-gray-100`}>
      <ToastContainer />
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:z-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-3 border-b border-gray-600 flex justify-between items-center">
            <h4 className="text-xl font-bold flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <FaHistory className="text-blue-900" />
              <span className="text-blue-900">Lịch sử chat</span>
            </h4>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-800 sm:hidden"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-2">
            <button
              onClick={handleNewChat}
              className="w-full bg-blue-500 text-white p-2 rounded flex items-center gap-2 text-sm hover:bg-blue-600 active:bg-blue-700"
            >
              <FaPlus /> Cuộc trò chuyện mới
            </button>
            <hr />
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`cursor-pointer p-2 rounded text-sm hover:bg-gray-100 active:bg-gray-200 ${
                  chat.id === currentChatId ? "bg-gray-200 font-medium" : ""
                }`}
              >
                {chat.title}
              </div>
            ))}
          </div>
          <div className="p-4">
            <button
              onClick={() => {
                localStorage.removeItem("chatHistory");
                localStorage.removeItem("chatMessages");
                localStorage.removeItem("currentChatId");
                setChatHistory([]);
                setMessages([]);
                setCurrentChatId(null);
                setInput("");
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className="w-full bg-red-500 text-white text-center p-2 rounded flex items-center gap-2 text-sm hover:bg-red-600 active:bg-red-700"
            >
              <FaTrash /> Xoá lịch sử chat
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative transition-all duration-300">
        <div className="flex justify-between items-center p-3 border-b bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-800 md:hidden"
            >
              <FaBars size={20} />
            </button>
            <h4 className="text-lg font-semibold flex items-center gap-2 text-blue-500">
              <FaRobot className="text-blue-900" />
              <span className="text-blue-900">Trợ lý thông minh</span>
            </h4>
          </div>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400"
          >
            {fullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-xl relative ${
                  msg.sender === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-1 text-sm font-medium">
                  {msg.sender === "user" ? <FaUser /> : <FaRobot />}
                  <span>{msg.sender === "user" ? "Bạn" : "Trợ lý"}</span>
                </div>
                <div className="whitespace-pre-line">{msg.text}</div>
                <div className="mt-2 flex justify-between items-center text-xs">
                  <span>{formatTime(msg.timestamp)}</span>
                  {msg.sender === "bot" && (
                    <button
                      onClick={() => copyToClipboard(msg.text)}
                      className="text-gray-500 hover:text-blue-500"
                    >
                      <FaRegCopy />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t bg-white flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Nhập nội dung..."
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => handleSend(input)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700"
            disabled={isSending}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
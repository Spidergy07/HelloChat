import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { generateGeminiResponse } from '../api/gemini';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {
      userName: urlParams.get('userName') || 'Oppabank',
      modelName: urlParams.get('modelName') || 'Gemini',
      roleName: urlParams.get('roleName') || 'General Assistant',
      roleIcon: urlParams.get('roleIcon') || '🤖',
      language: urlParams.get('language') || 'th',
      primaryColor: urlParams.get('primaryColor') || '#4FC3F7',
      accentColor: urlParams.get('accentColor') || '#2196F3',
      backgroundGradient: urlParams.get('backgroundGradient') || 'linear-gradient(45deg, #29B6F6, #4FC3F7, #81D4FA)'
    };
    setParams(params);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateGeminiResponse(input, params.roleName);
      const aiMessage = {
        text: response,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        text: 'ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: params.backgroundGradient }}>
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg p-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={handleBack}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center gap-2 text-white hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">กลับ</span>
        </button>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xl sm:text-2xl">{params.roleIcon}</span>
          <div className="min-w-0">
            <h1 className="text-white font-semibold text-lg sm:text-xl truncate">{params.roleName}</h1>
            <p className="text-white/80 text-sm truncate">{params.userName}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] md:max-w-[65%] p-3 sm:p-4 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-white text-gray-900'
                  : 'bg-white/10 backdrop-blur-lg text-white'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm sm:text-base">{message.text}</p>
              <p className="text-xs mt-1 sm:mt-2 opacity-50">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-lg text-white p-3 sm:p-4 rounded-2xl">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white/10 backdrop-blur-lg p-2 sm:p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={params.language === 'th' ? 'พิมพ์ข้อความ...' : 'Type a message...'}
            className="flex-1 p-3 sm:p-4 rounded-2xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 sm:p-4 rounded-2xl bg-white text-gray-900 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat; 
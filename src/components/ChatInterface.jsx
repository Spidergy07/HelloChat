import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInterface = () => {
  const [selectedModel, setSelectedModel] = useState('typhoon');
  const [selectedRole, setSelectedRole] = useState('general');
  const [userName, setUserName] = useState('');
  const [isEnglish, setIsEnglish] = useState(false);

  const models = {
    typhoon: {
      name: 'Typhoon',
      primary: '#9C27B0',
      accent: '#673AB7',
      gradient: 'linear-gradient(45deg, #9C27B0, #673AB7, #8E24AA)'
    },
    gemini: {
      name: 'Gemini',
      primary: '#2196F3',
      accent: '#03A9F4',
      gradient: 'linear-gradient(45deg, #1976D2, #2196F3, #03A9F4)'
    }
  };

  const roles = {
    general: {
      name: isEnglish ? 'General Assistant' : 'ผู้ช่วยทั่วไป',
      primary: '#4FC3F7',
      accent: '#2196F3',
      icon: '🤖',
      gradient: 'linear-gradient(45deg, #29B6F6, #4FC3F7, #81D4FA)'
    },
    business: {
      name: isEnglish ? 'Business & Finance' : 'ธุรกิจการเงิน',
      primary: '#66BB6A',
      accent: '#43A047',
      icon: '💰',
      gradient: 'linear-gradient(45deg, #2E7D32, #4CAF50, #81C784)'
    },
    chef: {
      name: isEnglish ? 'Chef' : 'เชฟ',
      primary: '#E0E0E0',
      accent: '#BDBDBD',
      icon: '👨‍🍳',
      gradient: 'linear-gradient(45deg, #9E9E9E, #E0E0E0, #F5F5F5)'
    },
    fortune: {
      name: isEnglish ? 'Fortune Teller' : 'หมอดู',
      primary: '#9C27B0',
      accent: '#7B1FA2',
      icon: '🔮',
      gradient: 'linear-gradient(45deg, #6A1B9A, #9C27B0, #AB47BC)'
    },
    music: {
      name: isEnglish ? 'Music Advisor' : 'ที่ปรึกษาด้านดนตรี',
      primary: '#FF3B30',
      accent: '#FF2D55',
      icon: '🎵',
      gradient: 'linear-gradient(45deg, #FF1744, #FF4081, #FF5252)'
    },
    partner: {
      name: isEnglish ? 'Virtual Partner' : 'คู่สนทนาเสมือน',
      primary: '#FF4081',
      accent: '#F50057',
      icon: '🫂',
      gradient: 'linear-gradient(45deg, #D81B60, #FF4081, #FF80AB)'
    }
  };

  const text = {
    chatSettings: isEnglish ? 'Chat Settings' : 'ตั้งค่าแชท',
    selectModel: isEnglish ? 'Select Model' : 'เลือกโมเดล',
    selectRole: isEnglish ? 'Select Role' : 'เลือกบทบาท',
    yourName: isEnglish ? 'Your Name' : 'ชื่อของคุณ',
    enterName: isEnglish ? 'Enter your name (default: Oppabank)' : 'กรุณาใส่ชื่อ (ค่าเริ่มต้น: Oppabank)',
    startChat: isEnglish ? 'Start Chat' : 'เริ่มแชท'
  };

  const getMixedGradient = () => {
    const model = models[selectedModel];
    const role = roles[selectedRole];
    
    return `linear-gradient(135deg, 
      ${model.primary}, 
      ${role.primary}, 
      ${role.accent}
    )`;
  };

  const handleStartChat = () => {
    const name = userName.trim() || 'Oppabank';
    const modelData = models[selectedModel];
    const roleData = roles[selectedRole];
    const language = isEnglish ? 'en' : 'th';
    
    const params = new URLSearchParams({
      userName: name,
      modelName: modelData.name,
      roleName: roleData.name,
      roleIcon: roleData.icon,
      language: language,
      primaryColor: roleData.primary,
      accentColor: roleData.accent,
      backgroundGradient: roleData.gradient
    }).toString();

    const targetUrl = `/${selectedModel.toLowerCase()}.html?${params}`;
    window.location.href = targetUrl;
  };

  return (
    <div className="min-h-screen p-4 sm:p-8" 
      style={{
        background: getMixedGradient(),
        backgroundAttachment: 'fixed',
        transition: 'background 0.5s ease'
      }}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl bg-white/95 backdrop-blur-2xl p-8 sm:p-12 rounded-[30px] sm:rounded-[50px] shadow-2xl"
          style={{
            boxShadow: '0 25px 80px rgba(0,0,0,0.15), 0 15px 40px rgba(0,0,0,0.08)'
          }}>
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 sm:mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {text.chatSettings}
              </h2>
              <p className="text-gray-500 text-lg">
                {isEnglish ? 'Customize your AI chat experience' : 'ปรับแต่งประสบการณ์การแชทของคุณ'}
              </p>
            </div>
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 font-medium text-lg"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
              }}
            >
              {isEnglish ? '🇹🇭 TH' : '🇬🇧 EN'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <label className="text-2xl font-semibold block text-gray-800">
                  {text.selectModel}
                </label>
                <div className="space-y-4">
                  {Object.entries(models).map(([key, model]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedModel(key)}
                      className={`w-full p-7 rounded-[30px] transition-all duration-500 flex items-center justify-between ${
                        selectedModel === key 
                          ? 'transform scale-102'
                          : 'hover:scale-101'
                      }`}
                      style={{
                        background: selectedModel === key ? model.gradient : 'rgba(255,255,255,0.7)',
                        color: selectedModel === key ? 'white' : 'black',
                        boxShadow: selectedModel === key 
                          ? '0 15px 40px rgba(0,0,0,0.15)'
                          : '0 8px 20px rgba(0,0,0,0.06)'
                      }}
                    >
                      <span className="text-2xl font-bold">{model.name}</span>
                      {selectedModel === key && (
                        <span className="text-2xl">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-2xl font-semibold block text-gray-800">
                  {text.yourName}
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={text.enterName}
                  className="w-full p-7 rounded-[30px] bg-white/80 focus:bg-white transition-all duration-300 outline-none text-xl"
                  style={{
                    boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                    border: '2px solid transparent',
                    borderImage: roles[selectedRole].gradient,
                    borderImageSlice: 1
                  }}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7">
              <label className="text-2xl font-semibold mb-6 block text-gray-800">
                {text.selectRole}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(roles).map(([key, role]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedRole(key)}
                    className={`aspect-square p-6 rounded-[30px] transition-all duration-500 flex flex-col items-center justify-center gap-4 ${
                      selectedRole === key 
                        ? 'transform scale-105'
                        : 'hover:scale-102'
                    }`}
                    style={{
                      background: selectedRole === key ? role.gradient : 'rgba(255,255,255,0.7)',
                      color: selectedRole === key ? 'white' : 'black',
                      boxShadow: selectedRole === key 
                        ? '0 15px 40px rgba(0,0,0,0.15)'
                        : '0 8px 20px rgba(0,0,0,0.06)'
                    }}
                  >
                    <span className="text-4xl sm:text-5xl">{role.icon}</span>
                    <span className="text-center text-base sm:text-lg font-medium">{role.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleStartChat}
            className="w-full p-7 rounded-[30px] text-white font-bold text-xl sm:text-2xl mt-12 sm:mt-16 transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-3"
            style={{
              background: roles[selectedRole].gradient,
              boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
            }}
          >
            <span>{text.startChat}</span>
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff, Camera, FileText, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

interface ConsultationSession {
  id: string;
  title: string;
  date: Date;
  duration: number;
  status: 'active' | 'completed';
  summary?: string;
}

export const AIConsultation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Namaste! I am your AI Ayurvedic consultant. I can help you with health concerns, medicine recommendations, and lifestyle guidance based on traditional Ayurvedic principles. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [currentSession, setCurrentSession] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with sample sessions
  useEffect(() => {
    const sampleSessions: ConsultationSession[] = [
      {
        id: '1',
        title: 'Digestive Issues Consultation',
        date: new Date(Date.now() - 86400000),
        duration: 15,
        status: 'completed',
        summary: 'Discussed digestive problems, recommended Triphala and dietary changes'
      },
      {
        id: '2',
        title: 'Stress Management',
        date: new Date(Date.now() - 172800000),
        duration: 20,
        status: 'completed',
        summary: 'Addressed anxiety and sleep issues, suggested Ashwagandha and meditation'
      }
    ];
    setSessions(sampleSessions);
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('headache') || input.includes('head pain')) {
      return `I understand you're experiencing headaches. In Ayurveda, headaches can be caused by various dosha imbalances:

**Vata-type headaches**: Usually throbbing, worse with stress
- Try: Brahmi oil massage, regular sleep schedule
- Avoid: Irregular meals, excessive screen time

**Pitta-type headaches**: Sharp, burning sensation
- Try: Cooling foods, avoid spicy/hot foods
- Recommended: Saraswatarishta, rose water compress

**Kapha-type headaches**: Dull, heavy feeling
- Try: Steam inhalation, light exercise
- Avoid: Heavy, oily foods

Would you like specific medicine recommendations based on your headache type?`;
    }
    
    if (input.includes('stress') || input.includes('anxiety')) {
      return `Stress and anxiety are common concerns that Ayurveda addresses holistically:

**Immediate Relief**:
- Practice Pranayama (breathing exercises)
- Try Ashwagandha churna: 3-6g with warm milk before bed
- Brahmi tea for mental clarity

**Lifestyle Recommendations**:
- Maintain regular sleep schedule (10 PM - 6 AM)
- Practice meditation or yoga daily
- Avoid excessive caffeine and processed foods

**Long-term Support**:
- Saraswatarishta for nervous system support
- Regular oil massage (Abhyanga)
- Spend time in nature

Would you like a personalized stress management plan based on your prakriti?`;
    }
    
    if (input.includes('digestion') || input.includes('stomach')) {
      return `Digestive health is fundamental in Ayurveda. Let me help you:

**For Poor Digestion**:
- Triphala churna: 3-6g with warm water before bed
- Hingwashtak churna: 1-3g after meals
- Drink warm water throughout the day

**Dietary Guidelines**:
- Eat largest meal at midday when digestive fire is strongest
- Avoid cold drinks with meals
- Include digestive spices: ginger, cumin, coriander

**Lifestyle Tips**:
- Eat in a calm environment
- Chew food thoroughly
- Walk 100 steps after meals

What specific digestive symptoms are you experiencing?`;
    }
    
    return `Thank you for sharing that with me. Based on Ayurvedic principles, I'd like to understand your concern better to provide personalized recommendations.

Could you please tell me:
1. How long have you been experiencing this?
2. What time of day is it worse?
3. Any specific triggers you've noticed?
4. Your current diet and lifestyle patterns?

This information will help me suggest the most appropriate Ayurvedic approach for your situation. Remember, Ayurveda focuses on treating the root cause, not just symptoms.`;
  };

  const startNewSession = () => {
    const newSession: ConsultationSession = {
      id: Date.now().toString(),
      title: 'New Consultation',
      date: new Date(),
      duration: 0,
      status: 'active'
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSession(newSession.id);
    setMessages([{
      id: '1',
      type: 'ai',
      content: 'Welcome to a new consultation session! How can I help you today?',
      timestamp: new Date()
    }]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Sidebar - Session History */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Consultations</h3>
            <button
              onClick={startNewSession}
              className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sessions.map(session => (
              <motion.div
                key={session.id}
                whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  currentSession === session.id
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setCurrentSession(session.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {session.title}
                  </h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    session.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {session.status}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500 space-x-2">
                  <Clock className="w-3 h-3" />
                  <span>{session.date.toLocaleDateString()}</span>
                  {session.duration > 0 && <span>• {session.duration}min</span>}
                </div>
                {session.summary && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {session.summary}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Ayurvedic Consultant</h3>
                <p className="text-sm text-gray-500">Available 24/7 • Powered by Ancient Wisdom</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.9/5</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-3xl ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Describe your symptoms or ask about Ayurvedic remedies..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-1 rounded-full transition-colors ${
                      isRecording ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3 rounded-full hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 text-center">
              AI responses are based on traditional Ayurvedic knowledge. Always consult healthcare professionals for serious conditions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
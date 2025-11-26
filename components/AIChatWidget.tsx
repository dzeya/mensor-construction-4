import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import anime from 'animejs';
import { streamResponse } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello. I am the Mensor AI Architect. How can I assist with your construction inquiry today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      anime({
        targets: chatRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'spring(1, 80, 10, 0)',
        duration: 800
      });
    }
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Format history for API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const stream = await streamResponse(userMsg, history);
      
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        const text = chunk.text; // Correct way to get text from chunk
        if (text) {
          fullResponse += text;
          setMessages(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1].text = fullResponse;
            return newHistory;
          });
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Apologies, I encountered a structural error in my processing. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatRef}
          className="pointer-events-auto mb-4 w-[350px] md:w-[400px] h-[500px] glass-panel rounded-2xl flex flex-col shadow-2xl overflow-hidden origin-bottom-right"
        >
          {/* Header */}
          <div className="p-4 border-b border-mensor-accent/10 bg-mensor-gray/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="text-mensor-accent w-5 h-5" />
              <span className="font-mono text-sm font-bold text-mensor-accent">MENSOR_AI_ARCHITECT_V2</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-mensor-light hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-mensor-accentDark/20 border border-mensor-accentDark/30 text-white rounded-br-none' 
                      : 'bg-mensor-gray/80 border border-white/5 text-mensor-light rounded-bl-none'
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-mensor-gray/80 p-3 rounded-lg rounded-bl-none">
                   <Loader2 className="w-4 h-4 animate-spin text-mensor-accent" />
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-mensor-accent/10 bg-mensor-gray/30 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about materials, costs..."
              className="flex-1 bg-mensor-dark/50 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-mensor-accent transition-colors"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-mensor-accent text-mensor-dark p-2 rounded-md hover:bg-white transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-mensor-accent hover:bg-white text-mensor-dark p-4 rounded-full shadow-[0_0_20px_rgba(227,62,43,0.3)] transition-all transform hover:scale-105 group"
      >
        <MessageSquare className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-90 opacity-0 absolute' : 'opacity-100'}`} />
        <X className={`w-6 h-6 transition-transform absolute ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} style={{top: '16px', left: '16px'}} />
      </button>
    </div>
  );
};

export default AIChatWidget;
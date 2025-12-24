import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { MessageBubble } from './components/MessageBubble';
import { InputArea } from './components/InputArea';
import { Message, Role } from './types';
import { INITIAL_GREETING } from './constants';
import { sendMessageStream, resetChat } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        id: 'init-1',
        role: Role.MODEL,
        text: INITIAL_GREETING
      }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: text
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const stream = sendMessageStream(text);
      
      // Create a placeholder message for AI
      const aiMessageId = (Date.now() + 1).toString();
      setMessages(prev => [
        ...prev,
        { id: aiMessageId, role: Role.MODEL, text: '', isStreaming: true }
      ]);

      let fullResponse = '';
      
      for await (const chunk of stream) {
        if (chunk) {
            fullResponse += chunk;
            setMessages(prev => 
                prev.map(msg => 
                    msg.id === aiMessageId 
                        ? { ...msg, text: fullResponse } 
                        : msg
                )
            );
        }
      }

      // Finalize message
      setMessages(prev => 
        prev.map(msg => 
            msg.id === aiMessageId 
                ? { ...msg, isStreaming: false } 
                : msg
        )
      );

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { 
            id: Date.now().toString(), 
            role: Role.MODEL, 
            text: "抱歉，由于网络问题我暂时无法回答，请检查API Key设置或稍后重试。" 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    resetChat();
    setMessages([
        {
          id: Date.now().toString(),
          role: Role.MODEL,
          text: INITIAL_GREETING
        }
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onReset={handleReset} />
      
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;

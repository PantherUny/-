import React, { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  // Focus on mount
  useEffect(() => {
     if(!isLoading) {
         textareaRef.current?.focus();
     }
  }, [isLoading]);

  return (
    <div className="border-t border-gray-200 bg-white p-4 pb-6 sm:p-6 sticky bottom-0 z-20">
      <div className="max-w-4xl mx-auto relative">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-white rounded-xl shadow-lg border border-gray-300 focus-within:ring-2 focus-within:ring-amazon-blue focus-within:border-transparent transition-all overflow-hidden p-2">
            <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="输入本周数据异常、项目进展或需要支持的事项..."
                className="w-full resize-none border-0 bg-transparent focus:ring-0 text-gray-800 placeholder-gray-400 py-3 px-3 min-h-[52px] max-h-[150px]"
                rows={1}
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`mb-1 p-3 rounded-lg flex-shrink-0 transition-colors ${
                !input.trim() || isLoading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-amazon-blue text-white hover:bg-amazon-light'
                }`}
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                )}
            </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-2">
           AOK AI可能会犯错。请务必核对数据和逻辑。
        </p>
      </div>
    </div>
  );
};

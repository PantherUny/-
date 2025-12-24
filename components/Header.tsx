import React from 'react';

export const Header: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <header className="bg-amazon-dark text-white shadow-md sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amazon-orange rounded-md flex items-center justify-center text-amazon-dark font-bold text-lg">
            A
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">AOK 周报大师</h1>
            <p className="text-[10px] text-gray-300 font-light tracking-wide uppercase">Amazon Operations & OKR Navigator</p>
          </div>
        </div>
        <button 
            onClick={onReset}
            className="text-xs sm:text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded transition-colors text-gray-200 flex items-center gap-1"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            新对话
        </button>
      </div>
    </header>
  );
};

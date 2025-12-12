import React, { useState, useEffect } from 'react';
import { AppId, type WindowState } from '../types';
import { Image as ImageIcon } from 'lucide-react';

interface TaskbarProps {
  openWindows: WindowState[];
  activeWindowId: string | null;
  onWindowClick: (id: AppId) => void;
  onStartClick: () => void;
  isStartOpen: boolean;
}

export const Taskbar: React.FC<TaskbarProps> = ({ 
  openWindows, 
  activeWindowId, 
  onWindowClick, 
  onStartClick,
  isStartOpen
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 z-[9999] shadow-md select-none touch-manipulation">
      
      {/* Start Button */}
      <button 
        onClick={onStartClick}
        className={`flex items-center gap-1 px-2 py-1 mr-2 font-bold retro-border-outset active:retro-border-inset hover:bg-gray-300 transition-colors ${isStartOpen ? 'retro-border-inset bg-gray-300' : ''}`}
      >
        <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-blue-600 border border-black transform rotate-45 scale-75"></div>
        <span className="font-['VT323'] text-xl tracking-wider hidden md:inline">Start</span>
        <span className="font-['VT323'] text-xl tracking-wider md:hidden">GO</span>
      </button>

      {/* Separator */}
      <div className="w-1 h-6 border-l border-gray-500 border-r border-white mx-1"></div>

      {/* Taskbar Items - Horizontal Scroll Container */}
      <div className="flex-1 flex gap-1 overflow-x-auto px-1 no-scrollbar">
        {openWindows.map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            className={`
              flex items-center gap-2 px-2 min-w-[120px] max-w-[160px] h-8 
              ${activeWindowId === win.id && !win.isMinimized ? 'retro-border-inset bg-[#e0e0e0] font-bold' : 'retro-border-outset bg-[#c0c0c0]'}
              truncate flex-shrink-0
            `}
          >
             <div className="w-4 h-4 rounded-full bg-gray-500 border border-black flex-shrink-0" />
            <span className="text-sm truncate font-['VT323'] text-lg">{win.title}</span>
          </button>
        ))}
      </div>

      {/* Clock - Hidden on very small screens */}
      <div className="retro-border-inset bg-[#c0c0c0] px-3 py-1 ml-auto hidden sm:flex items-center gap-2">
         <ImageIcon size={14} className="text-gray-600" />
         <span className="font-['VT323'] text-lg">
           {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
         </span>
      </div>
    </div>
  );
};
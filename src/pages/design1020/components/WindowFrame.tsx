import React, { useState, useRef } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowFrameProps {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  title,
  x,
  y,
  width,
  height,
  zIndex,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  onMove,
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Disable drag start on mobile viewports (768px matches Tailwind 'md')
    if (window.innerWidth < 768) return;

    e.preventDefault();
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y
    });
    // Capture pointer to ensure smooth dragging even if mouse leaves the title bar
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    onMove(newX, newY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (e.target instanceof Element) {
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      ref={windowRef}
      className={`
        absolute flex flex-col bg-[#c0c0c0] retro-border-outset p-1 
        ${isActive ? 'z-50' : ''}
        max-md:!top-0 max-md:!left-0 max-md:!w-full max-md:!h-[calc(100vh-2.5rem)] max-md:!transform-none
      `}
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
        zIndex: zIndex,
        display: 'flex',
      }}
      onPointerDown={() => !isActive && onFocus()}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center justify-between px-2 py-1 mb-1 select-none cursor-default ${
          isActive ? 'bg-[#000080]' : 'bg-[#808080]'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <span className="text-white font-bold text-sm tracking-wide truncate pr-2 font-['VT323'] text-lg">
          {title}
        </span>
        <div className="flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-6 h-6 md:w-5 md:h-5 flex items-center justify-center bg-[#c0c0c0] retro-border-outset active:retro-border-inset hover:bg-gray-300"
          >
            <Minus size={10} color="black" />
          </button>
          <button
            className="w-6 h-6 md:w-5 md:h-5 flex items-center justify-center bg-[#c0c0c0] retro-border-outset active:retro-border-inset hover:bg-gray-300 hidden md:flex"
          >
            <Square size={10} color="black" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-6 h-6 md:w-5 md:h-5 flex items-center justify-center bg-[#c0c0c0] retro-border-outset active:retro-border-inset hover:bg-red-200"
          >
            <X size={12} color="black" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white retro-border-inset p-2 relative">
         {children}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { type Discussion } from '../types';
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface NotepadAppProps {
  discussions: Discussion[];
}

export const NotepadApp: React.FC<NotepadAppProps> = ({ discussions }) => {
  const [selectedId, setSelectedId] = useState<string | null>(discussions[0]?.id || null);
  const [showMenu, setShowMenu] = useState(false); // Toggle for mobile menu
  
  const activeDiscussion = discussions.find(d => d.id === selectedId);

  return (
    <div className="h-full flex flex-col bg-white font-mono relative">
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-1 bg-[#c0c0c0] border-b border-gray-400 text-sm overflow-x-auto whitespace-nowrap">
        <span className="underline cursor-pointer">F</span>ile
        <span className="underline cursor-pointer">E</span>dit
        <span className="underline cursor-pointer">S</span>earch
        <span className="underline cursor-pointer">H</span>elp
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden absolute top-2 right-2 z-10 bg-[#c0c0c0] border border-black p-1 shadow-md"
        >
           {showMenu ? <ChevronLeft size={16}/> : <ListIcon />}
        </button>

        {/* Sidebar List - Hidden on mobile unless toggled */}
        <div className={`
          w-full md:w-1/3 border-r border-black bg-[#e0e0e0] flex flex-col
          absolute md:static inset-0 z-20 md:z-0
          transition-transform duration-200
          ${showMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
            <div className="p-1 bg-[#000080] text-white text-xs font-bold uppercase mb-1 flex justify-between items-center">
                <span>Directory</span>
                <span className="md:hidden cursor-pointer px-2" onClick={() => setShowMenu(false)}>X</span>
            </div>
            <div className="overflow-y-auto flex-1 p-1">
                {discussions.map(d => (
                    <button
                        key={d.id}
                        onClick={() => {
                          setSelectedId(d.id);
                          setShowMenu(false);
                        }}
                        className={`w-full text-left px-1 py-1 text-sm truncate mb-1 border ${
                            selectedId === d.id 
                            ? 'bg-[#000080] text-white border-dotted border-white' 
                            : 'text-black border-transparent hover:underline'
                        }`}
                    >
                        <FileText size={12} className="inline mr-1" />
                        {d.title}.txt
                    </button>
                ))}
            </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white w-full">
            {activeDiscussion ? (
                <>
                    <div className="p-4 overflow-y-auto flex-1 font-['Courier_New']">
                        <h1 className="text-lg md:text-xl font-bold mb-4 border-b-2 border-black pb-2 uppercase tracking-widest break-words">
                            {activeDiscussion.title}
                        </h1>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {activeDiscussion.content}
                        </div>
                        <div className="mt-8 text-xs text-gray-500">
                            Last Modified: {activeDiscussion.date}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                    No file selected
                </div>
            )}
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-gray-300 p-1 text-xs flex justify-between">
         <span>Ln 1, Col 1</span>
         <span>UTF-8</span>
      </div>
    </div>
  );
};

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);
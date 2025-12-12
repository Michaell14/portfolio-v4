import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  User, 
  Trash2, 
  Image as ImageIcon 
} from 'lucide-react';
import { AppId, type WindowState } from './types';
import { INITIAL_WINDOWS, PROJECTS, DISCUSSIONS, PHOTOS } from './constants';
import { WindowFrame } from './components/WindowFrame';
import { Taskbar } from './components/Taskbar';
import { DesktopIcon } from './components/DesktopIcon';
import { PortfolioApp } from './apps/PortfolioApp';
import { NotepadApp } from './apps/NotepadApp';
import { BioApp } from './apps/BioApp';
import { PhotosApp } from './apps/PhotosApp';

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(INITIAL_WINDOWS[0].id);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const openWindow = (id: AppId) => {
    const existing = windows.find(w => w.id === id);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
      }
      bringToFront(id);
      return;
    }

    // Default configs for new windows
    let config = { title: 'App', width: 750, height: 600, x: 50, y: 50 };
    if (id === AppId.PHOTOS) config = { title: 'Secret_Gallery.exe', width: 500, height: 400, x: 150, y: 150 };
    if (id === AppId.TRASH) config = { title: 'Recycle Bin', width: 300, height: 200, x: 200, y: 200 };

    const newWindow: WindowState = {
      id,
      title: config.title,
      isOpen: true,
      isMinimized: false,
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
      zIndex: maxZIndex + 1,
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(id);
    setMaxZIndex(prev => prev + 1);
  };

  const closeWindow = (id: AppId) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const bringToFront = (id: string) => {
    setActiveWindowId(id);
    const target = windows.find(w => w.id === id);
    if (target && target.zIndex < maxZIndex) {
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
    }
  };

  const moveWindow = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  };

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case AppId.PORTFOLIO:
        return <PortfolioApp projects={PROJECTS} />;
      case AppId.NOTEPAD:
        return <NotepadApp discussions={DISCUSSIONS} />;
      case AppId.BIO:
        return <BioApp />;
      case AppId.PHOTOS:
        return <PhotosApp photos={PHOTOS} />;
      case AppId.TRASH:
        return (
          <div className="flex flex-col items-center justify-center h-full bg-white p-4 text-center">
            <Trash2 size={48} className="text-red-500 mb-2" />
            <p className="font-['VT323'] text-xl">The trash is empty.</p>
          </div>
        );
      default:
        return <div className="p-4">Content not found.</div>;
    }
  };

  return (
    <div 
      className="w-screen h-screen bg-[#008080] overflow-hidden relative select-none"
      onClick={() => setIsStartOpen(false)}
    >
      {/* Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diag-diamonds-light.png')]"></div>

      {/* Desktop Icons Grid */}
      <div className="absolute top-4 left-4 flex flex-col gap-6 z-0">
        <DesktopIcon 
          label="My Bio" 
          icon={User} 
          onClick={() => openWindow(AppId.BIO)} 
          color="#FFFF00"
        />
        <DesktopIcon 
          label="Projects" 
          icon={Briefcase} 
          onClick={() => openWindow(AppId.PORTFOLIO)} 
          color="#FF00FF"
        />
        <DesktopIcon 
          label="Discussions" 
          icon={FileText} 
          onClick={() => openWindow(AppId.NOTEPAD)} 
          color="#00FFFF"
        />
        <DesktopIcon 
          label="Secrets" 
          icon={ImageIcon} 
          onClick={() => openWindow(AppId.PHOTOS)} 
          color="#FFA500"
        />
        <div className="mt-8">
            <DesktopIcon 
            label="Trash" 
            icon={Trash2} 
            onClick={() => openWindow(AppId.TRASH)} 
            color="#CCCCCC"
            />
        </div>
      </div>

      {/* Windows Layer */}
      {windows.map(win => (
        <div key={win.id} style={{ display: win.isMinimized ? 'none' : 'block' }}>
          <WindowFrame
            id={win.id}
            title={win.title}
            x={win.x}
            y={win.y}
            width={win.width}
            height={win.height}
            zIndex={win.zIndex}
            isActive={activeWindowId === win.id}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onFocus={() => bringToFront(win.id)}
            onMove={(x, y) => moveWindow(win.id, x, y)}
          >
            {renderAppContent(win.id)}
          </WindowFrame>
        </div>
      ))}

      {/* Start Menu Dropdown */}
      {isStartOpen && (
        <div className="fixed bottom-10 left-1 w-48 bg-[#c0c0c0] retro-border-outset z-[10000] p-1 flex flex-col shadow-xl">
           <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white p-2 mb-1 font-bold font-['VT323'] text-xl tracking-widest">
             RetroOS 99
           </div>
           <button onClick={() => openWindow(AppId.PORTFOLIO)} className="hover:bg-[#000080] hover:text-white p-2 text-left flex items-center gap-2">
             <Briefcase size={16} /> Projects
           </button>
           <button onClick={() => openWindow(AppId.NOTEPAD)} className="hover:bg-[#000080] hover:text-white p-2 text-left flex items-center gap-2">
             <FileText size={16} /> Notes
           </button>
           <div className="h-[1px] bg-gray-500 my-1 mx-2"></div>
           <button onClick={() => alert("System Shutdown Initiated... Just kidding.")} className="hover:bg-[#000080] hover:text-white p-2 text-left flex items-center gap-2">
             Shut Down...
           </button>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar 
        openWindows={windows} 
        activeWindowId={activeWindowId} 
        onWindowClick={(id) => {
             const win = windows.find(w => w.id === id);
             if (win?.isMinimized) {
                 setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
                 bringToFront(id);
             } else if (activeWindowId === id) {
                 minimizeWindow(id);
             } else {
                 bringToFront(id);
             }
        }}
        onStartClick={() => setIsStartOpen(!isStartOpen)}
        isStartOpen={isStartOpen}
      />
    </div>
  );
};

export default App;

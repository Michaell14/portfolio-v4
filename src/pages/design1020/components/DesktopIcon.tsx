import React from 'react';

interface DesktopIconProps {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  color?: string;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon: Icon, onClick, color = "#008080" }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-24 gap-1 p-2 group focus:outline-none"
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Simple shadow effect for icon */}
        <Icon width={48} height={48} className="absolute top-0.5 left-0.5 text-black opacity-50 transform scale-y-50 skew-x-12 origin-bottom" />
        <Icon width={48} height={48} className={`relative z-10 text-white drop-shadow-md`} style={{ fill: color, stroke: 'black', strokeWidth: 1.5 }} />
      </div>
      <span className="text-white text-sm font-['VT323'] text-lg bg-[#008080] px-1 group-hover:bg-[#000080] group-focus:bg-[#000080] group-focus:border-dotted group-focus:border-white border border-transparent">
        {label}
      </span>
    </button>
  );
};

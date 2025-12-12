import React from 'react';
import { type Project } from '../types';
import { FolderOpen, ExternalLink } from 'lucide-react';

interface PortfolioAppProps {
  projects: Project[];
}

export const PortfolioApp: React.FC<PortfolioAppProps> = ({ projects }) => {
  return (
    <div className="h-full bg-white flex flex-col font-sans">
      <div className="bg-[#ffffcc] border-b border-gray-400 p-2 flex items-center gap-2 text-sm">
         <FolderOpen size={16} />
         <span>C:\My_Documents\Art_of_Web\Projects</span>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {projects.map((project, idx) => (
          <div key={project.id} className="border-2 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#f0f0f0]">
            <div className="bg-navy-900 border-b-2 border-black mb-2 relative group overflow-hidden h-32">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                <div className="absolute inset-0 bg-black/10 scanlines pointer-events-none" />
            </div>
            
            <h3 className="font-bold text-lg uppercase tracking-widest bg-black text-white px-1 mb-2 font-mono">{project.title}</h3>
            
            <p className="text-sm text-gray-800 mb-3 font-serif leading-tight">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase border border-gray-500 px-1 bg-white text-gray-600">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-400">
               <span className="text-xs text-gray-500 font-mono">{project.date}</span>
               <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                 <button className="flex items-center gap-1 text-xs font-bold text-blue-800 hover:underline">
                   LAUNCH.EXE <ExternalLink size={10} />
                 </button>
               </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-[#c0c0c0] p-1 border-t border-white text-xs text-gray-600 font-mono">
        {projects.length} object(s) selected
      </div>
    </div>
  );
};

import React from 'react';

export const BioApp: React.FC = () => {
  return (
    <div className="h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-purple-900 text-white overflow-y-auto p-4 md:p-6 font-['VT323'] text-xl">
      <div className="border-4 border-double border-yellow-400 p-4 bg-black shadow-[8px_8px_0_0_#ff00ff] mb-8 animate-pulse">
        <h1 className="text-3xl md:text-4xl text-center text-yellow-400 uppercase tracking-widest mb-2">
          *** EXPLORING ART OF THE WEB: DESIGN 1020 ***
        </h1>
        <div className="text-center text-cyan-300 text-sm animate-bounce">
          Scroll down for my portfolio ↓
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-blue-800 p-4 border-2 border-white transform rotate-1 hover:rotate-0 transition-transform">
          <h2 className="text-2xl text-green-400 mb-2 underline decoration-wavy">Who Am I?</h2>
          <p className="leading-relaxed">
            I am a student of the <span className="bg-white text-black px-1">Art of the Web</span>. 
            This portfolio explores the projects I have worked on during the course of the class.
          </p>
        </div>

        <div className="bg-red-900 p-4 border-2 border-white transform -rotate-1 hover:rotate-0 transition-transform md:ml-8">
           <h2 className="text-2xl text-yellow-300 mb-2">What is Art of the Web?</h2>
           <p>
           This course introduces students to interactive web concepts while exploring how internet culture shapes creativity and human connection.
           <br />
           </p>
        </div>

        <div className="mt-4 text-center">
             <div className="bg-white text-black p-1 border-2 border-red-500">
                WARNING: CONSTRUCTION IN PROGRESS // PORTFOLIO IS STILL UNDER DEVELOPMENT // DRINK WATER
             </div>
        </div>
        
        <div className="flex justify-center mt-6">
        <div className="w-24 h-24 relative"><iframe src="https://giphy.com/embed/qWx5C3iSfwa6Q" width="100%" height="100%" style={{ position: 'absolute' }} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
        </div>
      </div>
    </div>
  );
};
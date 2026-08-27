import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

interface Block {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

// Standard palette for random mode. Module scope so its identity is stable
// across renders and it does not have to be an effect dependency.
const palette = ["#F4D03F", "#E74C3C", "#3498DB", "#9B59B6", "#16A085", "#2C3E50", "#ECF0F1"];

// --- EASTER EGG PATTERN DEFINITIONS ---
// Strings represent colors: W=White, B=Black, P=Pink, R=Red, G=Green, U=Blue, Y=Yellow, .=Empty
const PATTERNS: Record<string, string[][]> = {
  cow: [
    [".", "B", ".", ".", "B", "."],
    [".", "W", "W", "W", "W", "."],
    ["W", "B", "W", "W", "B", "W"], // Eyes
    [".", "P", "P", "P", "P", "."], // Nose
    [".", "W", "W", "W", "W", "."],
  ],
  heart: [
    [".", "R", "R", ".", "R", "R", "."],
    ["R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "R"],
    [".", "R", "R", "R", "R", "R", "."],
    [".", ".", "R", "R", "R", ".", "."],
    [".", ".", ".", "R", ".", ".", "."],
  ],
  creeper: [
    ["G", "G", "G", "G", "G", "G", "G", "G"],
    ["G", "G", "G", "G", "G", "G", "G", "G"],
    ["G", "B", "B", "G", "G", "B", "B", "G"],
    ["G", "B", "B", "G", "G", "B", "B", "G"],
    ["G", "G", "G", "B", "B", "G", "G", "G"],
    ["G", "G", "B", "B", "B", "B", "G", "G"],
    ["G", "G", "B", "B", "B", "B", "G", "G"],
    ["G", "G", "B", "G", "G", "B", "G", "G"],
  ],
  sus: [
    [".", "R", "R", "R", "."],
    [".", "R", "U", "U", "."], // Visor
    ["R", "R", "R", "R", "."],
    ["R", "R", "R", "R", "."],
    [".", "R", ".", "R", "."],
  ]
};

// Color mapping for the characters above
const COLOR_MAP: Record<string, string> = {
  W: "#FFFFFF",
  B: "#2C3E50",
  P: "#F1948A",
  R: "#E74C3C",
  G: "#27AE60",
  U: "#3498DB",
  Y: "#F4D03F",
};

const GenerativeText: React.FC = () => {
  const renderRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);
  const [inputText, setInputText] = useState<string>("Bauhaus");
  const [copied, setCopied] = useState(false);
  const seedRef = useRef<number>(100);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wordParam = params.get("word");
    if (wordParam) setInputText(wordParam);
  }, []);

  const calculateSeed = (text: string) => {
    let sum = 0;
    for (let i = 0; i < text.length; i++) sum += text.charCodeAt(i);
    return sum || 100;
  };

  useEffect(() => {
    seedRef.current = calculateSeed(inputText);
  }, [inputText]);

  const handleDownload = () => p5Ref.current?.saveCanvas(`bauhaus-${inputText}`, "png");

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?word=${encodeURIComponent(inputText)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // --- P5 LOGIC ---
  useEffect(() => {
    const sketch = (p: p5) => {
      let blocks: Block[] = [];
      const gridSize = 40; 
      
      const generatePattern = () => {
        blocks = [];
        const cleanInput = inputText.trim().toLowerCase();
        
        // 1. CHECK FOR EASTER EGG
        if (PATTERNS[cleanInput]) {
          const matrix = PATTERNS[cleanInput];
          const patternRows = matrix.length;
          const patternCols = matrix[0].length;
          
          // Calculate offsets to center the pattern
          const startX = (p.width - (patternCols * gridSize)) / 2;
          const startY = (p.height - (patternRows * gridSize)) / 2;

          for (let r = 0; r < patternRows; r++) {
            for (let c = 0; c < patternCols; c++) {
              const char = matrix[r][c];
              if (char !== "." && COLOR_MAP[char]) {
                blocks.push({
                  x: startX + c * gridSize,
                  y: startY + r * gridSize,
                  w: gridSize,
                  h: gridSize,
                  color: COLOR_MAP[char],
                });
              }
            }
          }
          return; // Exit function so we don't draw random grid
        }

        // 2. STANDARD RANDOM GENERATION (If no easter egg found)
        p.randomSeed(seedRef.current);
        const cols = p.width / gridSize + 2;
        const rows = p.height / gridSize + 2;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (p.random() > 0.3) {
              const wMult = p.floor(p.random(1, 3)); 
              const hMult = p.floor(p.random(1, 3));
              blocks.push({
                x: i * gridSize,
                y: j * gridSize,
                w: wMult * gridSize,
                h: hMult * gridSize,
                color: p.random(palette),
              });
            }
          }
        }
      };

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.noStroke();
        generatePattern();
      };

      // Watch for input changes manually in the draw loop via Refs
      let lastInput = "";
      
      p.draw = () => {
        // If input changed, regenerate
        // We use the raw text instead of just seed to differentiate words with same checksum
        if (inputText !== lastInput) {
            generatePattern();
            lastInput = inputText;
        }

        p.background("#F9E79F"); 

        blocks.forEach((b) => {
          const dist = p.dist(p.mouseX, p.mouseY, b.x + b.w/2, b.y + b.h/2);
          let hoverScale = 1;
          if (dist < 50) hoverScale = 0.85;

          p.fill(b.color);
          p.push();
          p.translate(b.x + b.w/2, b.y + b.h/2);
          p.scale(hoverScale);
          p.rect(-b.w/2, -b.h/2, b.w - 2, b.h - 2); 
          p.pop();
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        generatePattern();
      };
    };

    if (renderRef.current) p5Ref.current = new p5(sketch, renderRef.current);
    return () => p5Ref.current?.remove();
  }, [inputText]); // Add inputText to dependency to force refresh on Easter Eggs

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#F9E79F]">
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-lg px-4">
        <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <label className="text-black font-bold uppercase tracking-widest text-xs">Pattern Generator</label>
            <span className="text-[10px] font-mono text-gray-400">
               {PATTERNS[inputText.toLowerCase()] ? "Easter Egg Unlocked!" : `Seed: ${calculateSeed(inputText)}`}
            </span>
          </div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Try 'cow', 'heart', 'creeper'..."
            className="w-full bg-gray-100 text-black text-2xl font-bold border-b-4 border-black p-2 outline-none placeholder:text-gray-400 hover:bg-gray-200 focus:border-[#E74C3C] focus:bg-white transition-colors duration-200"
          />
          <div className="flex gap-3 mt-2">
            <button onClick={handleDownload} className="flex-1 bg-[#3498DB] text-white font-bold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none transition-all">
              Save PNG
            </button>
            <button onClick={handleShare} className={`flex-1 font-bold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none transition-all ${copied ? "bg-[#27ae60] text-white" : "bg-[#F4D03F] text-black"}`}>
              {copied ? "Link Copied" : "Share"}
            </button>
          </div>
        </div>
      </div>
      <div ref={renderRef} className="absolute top-0 left-0 z-0" />
    </div>
  );
};

export default GenerativeText;
// import React, { useEffect, useRef, useState } from "react";
// import p5 from "p5";

// // -----------------------------------------------------------------------------
// // SHADER: GRAINY GRADIENT FIELD
// // -----------------------------------------------------------------------------
// const vertShader = `
//   attribute vec3 aPosition;
//   attribute vec2 aTexCoord;
//   varying vec2 vTexCoord;
//   void main() {
//     vTexCoord = aTexCoord;
//     vec4 positionVec4 = vec4(aPosition, 1.0);
//     positionVec4.xy = positionVec4.xy * 2.0 - 1.0; 
//     gl_Position = positionVec4;
//   }
// `;

// const fragShader = `
//   precision mediump float;
//   varying vec2 vTexCoord;
//   uniform float uTime;
//   uniform vec2 uResolution;
//   uniform vec3 uColor1;
//   uniform vec3 uColor2;
//   uniform vec3 uColor3;
//   uniform float uGrainStrength;

//   float random(vec2 st) {
//       return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
//   }

//   void main() {
//     vec2 uv = vTexCoord;
//     float aspect = uResolution.x / uResolution.y;
//     uv.x *= aspect;
    
//     // Orb movements
//     vec2 pos1 = vec2(0.5 * aspect + sin(uTime * 0.5) * 0.3, 0.5 + cos(uTime * 0.3) * 0.2);
//     vec2 pos2 = vec2(0.5 * aspect + cos(uTime * 0.4 + 2.0) * 0.4, 0.5 + sin(uTime * 0.6 + 1.0) * 0.3);
//     vec2 pos3 = vec2(0.5 * aspect + sin(uTime * 0.2 + 4.0) * 0.5, 0.5 + cos(uTime * 0.2 + 2.0) * 0.4);

//     float d1 = distance(uv, pos1);
//     float d2 = distance(uv, pos2);
//     float d3 = distance(uv, pos3);

//     // Color mixing with soft falloff
//     vec3 color = vec3(0.08); 
//     color += uColor1 * (0.35 / (d1 + 0.1));
//     color += uColor2 * (0.3 / (d2 + 0.1));
//     color += uColor3 * (0.25 / (d3 + 0.1));

//     // Film Grain
//     float noise = random(uv * uTime);
//     color += (noise - 0.5) * uGrainStrength;

//     gl_FragColor = vec4(color, 1.0);
//   }
// `;

// const GenerativeText: React.FC = () => {
//   const renderRef = useRef<HTMLDivElement>(null);
  
//   const [displayText, setDisplayText] = useState<string>("AURA");
//   const textRef = useRef<string>("AURA");
  
//   const targetEnergy = useRef<number>(0); 
//   const currentEnergy = useRef<number>(0);
//   const paletteRef = useRef({
//     c1: [1.0, 0.0, 0.5], 
//     c2: [0.0, 0.5, 1.0], 
//     c3: [0.5, 1.0, 0.0]  
//   });

//   useEffect(() => {
//     const sketch = (p: p5) => {
//       let theShader: p5.Shader;

//       p.setup = () => {
//         p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL).parent(renderRef.current!);
//         theShader = p.createShader(vertShader, fragShader);
//         p.noStroke();
//         p.pixelDensity(1); 
//       };

//       p.draw = () => {
//         targetEnergy.current *= 0.96;
//         currentEnergy.current = p.lerp(currentEnergy.current, targetEnergy.current, 0.1);

//         let timeSpeed = 0.005 + (currentEnergy.current * 0.05);
//         (p as any).customTime = ((p as any).customTime || 0) + timeSpeed;

//         p.shader(theShader);
//         theShader.setUniform("uResolution", [p.width, p.height]);
//         theShader.setUniform("uTime", (p as any).customTime);
//         theShader.setUniform("uColor1", paletteRef.current.c1);
//         theShader.setUniform("uColor2", paletteRef.current.c2);
//         theShader.setUniform("uColor3", paletteRef.current.c3);
//         theShader.setUniform("uGrainStrength", 0.12 + (currentEnergy.current * 0.2));

//         p.rect(0, 0, p.width, p.height);
//       };

//       p.windowResized = () => {
//         p.resizeCanvas(window.innerWidth, window.innerHeight);
//       };
//     };

//     const p5Instance = new p5(sketch);
//     return () => p5Instance.remove();
//   }, []);

//   const getRandomColor = () => [Math.random(), Math.random(), Math.random()];

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const val = e.target.value;
//     textRef.current = val;
//     setDisplayText(val);

//     targetEnergy.current = 1.0; 
    
//     if (Math.random() > 0.7) {
//        const pick = Math.random();
//        if(pick < 0.33) paletteRef.current.c1 = getRandomColor();
//        else if(pick < 0.66) paletteRef.current.c2 = getRandomColor();
//        else paletteRef.current.c3 = getRandomColor();
//     }
//   };

//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-black font-sans text-white">
//       {/* Invisible Input Layer */}
//       <textarea
//         autoFocus
//         className="absolute inset-0 z-50 h-full w-full opacity-0 cursor-text resize-none outline-none"
//         onChange={handleChange}
//         spellCheck={false}
//         defaultValue="AURA"
//       />

//       {/* Canvas Layer */}
//       <div ref={renderRef} className="absolute inset-0 z-0" />

//       {/* UI OVERLAY */}
//       <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-12">
        
//         {/* TOP: Header */}
//         <div className="flex justify-between items-start opacity-70 mix-blend-difference">
//           <div className="text-xs tracking-widest uppercase font-bold">
//             <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
//             GLSL // Reactive
//           </div>
//           <div className="text-right text-[10px] space-y-1 font-mono">
//              <p>ENERGY: {currentEnergy.current.toFixed(2)}</p>
//           </div>
//         </div>

//         {/* CENTER: The Main Text Display (Restored to First Iteration Style) */}
//         <div className="flex flex-col items-center justify-center">
//              <div className="relative group">
//                 <div className="absolute -inset-10 bg-black/20 blur-xl rounded-full opacity-50 transition-opacity duration-500 group-hover:opacity-75"></div>
//                 <h1 className="relative text-7xl md:text-9xl font-bold tracking-tighter text-white mix-blend-overlay opacity-90 text-center break-words max-w-[90vw]">
//                     {displayText}
//                     <span className="animate-pulse opacity-50">_</span>
//                 </h1>
//             </div>
//         </div>

//         {/* BOTTOM: Instructions */}
//         <div className="text-center opacity-40 text-[10px] tracking-[0.3em] uppercase mix-blend-difference">
//           Input Stream Active
//         </div>
//       </div>

//       {/* Texture Overlay */}
//       <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>
//     </div>
//   );
// };

// export default GenerativeText;
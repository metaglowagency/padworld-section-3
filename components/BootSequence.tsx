import React, { useState, useEffect, useRef } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const HEX_CHARS = "0123456789ABCDEF";

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [leftHex, setLeftHex] = useState<string[]>([]);
  const [rightStats, setRightStats] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Rapid Hex Dump Generator (Left Column)
  useEffect(() => {
    const hexInterval = setInterval(() => {
      const line = Array(3).fill(0).map(() => 
        `0x${Array(4).fill(0).map(() => HEX_CHARS[Math.floor(Math.random() * 16)]).join('')}`
      ).join(' ');
      setLeftHex(prev => [...prev.slice(-25), line]);
    }, 40); // Faster

    return () => clearInterval(hexInterval);
  }, []);

  // 2. System Stats Generator (Right Column)
  useEffect(() => {
    const statsTemplates = [
        "CPU_CORE_0: [OK]", "CPU_CORE_1: [OK]", "GPU_LINK: [OK]",
        "MEM_INTEGRITY: 100%", "NET_LATENCY: 12ms", "AI_MODEL: LOADED",
        "BIOMETRICS: CALIBRATING", "RANKING_DB: SYNCED", "PHYSICS_ENG: ACTIVE",
        "USER_PROFILE: DECRYPTING", "MATCH_HIST: FETCHING"
    ];
    let statIndex = 0;
    const statsInterval = setInterval(() => {
        setRightStats(prev => [...prev.slice(-15), statsTemplates[statIndex % statsTemplates.length] + (Math.random() > 0.5 ? "..." : "")]);
        statIndex++;
    }, 100);

    return () => clearInterval(statsInterval);
  }, []);

  // 3. Main Kernel Logs (Center)
  useEffect(() => {
    const bootLogs = [
      "PADCHAT_OS KERNEL v3.0.1 initializing...",
      "Mounting root file system...",
      "Loading neural network weights (2.4GB)...",
      "Connecting to global padel grid...",
      "Decrypting user passport...",
      "Verifying integrity of match history...",
      "Optimizing graphics engine for high-framerate...",
      "Initializing AI coach sub-routines...",
      "Checking social graph connections...",
      "Generating 3D assets...",
      "Compiling shaders...",
      "Authenticating session token...",
      "System fully operational."
    ];
    
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
        setProgress(p => Math.min(p + (100 / bootLogs.length), 100));
      } else {
        clearInterval(logInterval);
        setTimeout(onComplete, 800);
      }
    }, 250); // Slightly faster logs

    return () => clearInterval(logInterval);
  }, [onComplete]);

  // Auto Scroll
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 bg-black text-xs font-mono overflow-hidden flex flex-col items-center justify-center z-50 cursor-wait">
        
        {/* CRT Overlay Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_60%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-20 animate-pulse"></div>

        <div className="w-full max-w-7xl grid grid-cols-12 gap-6 p-4 h-full relative z-0 items-center">
            
            {/* LEFT COLUMN: RAW HEX */}
            <div className="hidden md:flex col-span-2 border-r border-white/10 p-4 text-[9px] text-acid/40 font-mono flex-col justify-end h-3/4 overflow-hidden mask-image-gradient-b">
                <div className="mb-2 text-acid uppercase border-b border-acid/20 pb-1">Mem_Dump_0x89</div>
                {leftHex.map((line, i) => (
                    <div key={i} className="font-mono whitespace-nowrap opacity-70">{line}</div>
                ))}
            </div>

            {/* CENTER: MAIN LOGS & VISUALIZER */}
            <div className="col-span-12 md:col-span-8 flex flex-col justify-center relative bg-black/50 p-8 border-y border-white/5 backdrop-blur-sm">
                
                {/* Visualizer: Wireframe Padel Court Loading */}
                <div className="h-48 w-full flex items-center justify-center mb-8 relative border border-white/10 bg-white/5 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(10,1fr)] opacity-10">
                         {Array.from({length: 200}).map((_, i) => <div key={i} className="border border-white/20"></div>)}
                    </div>
                    
                    {/* SVG Wireframe */}
                    <svg viewBox="0 0 200 120" className="w-64 h-40 opacity-80 drop-shadow-[0_0_10px_rgba(172,255,1,0.5)]">
                         {/* Court Base */}
                         <rect x="20" y="20" width="160" height="80" fill="none" stroke="#2DD6FF" strokeWidth="0.5" className="animate-[draw_1s_ease-out_forwards]" strokeDasharray="500" strokeDashoffset="500" />
                         {/* Net */}
                         <line x1="100" y1="10" x2="100" y2="110" stroke="#ACFF01" strokeWidth="1" className="animate-[draw_1s_ease-out_0.5s_forwards]" strokeDasharray="100" strokeDashoffset="100" />
                         {/* Service Lines */}
                         <line x1="60" y1="20" x2="60" y2="100" stroke="#2DD6FF" strokeWidth="0.5" strokeOpacity="0.5" className="animate-[draw_1s_ease-out_0.8s_forwards]" strokeDasharray="100" strokeDashoffset="100" />
                         <line x1="140" y1="20" x2="140" y2="100" stroke="#2DD6FF" strokeWidth="0.5" strokeOpacity="0.5" className="animate-[draw_1s_ease-out_0.8s_forwards]" strokeDasharray="100" strokeDashoffset="100" />
                         {/* Center Line */}
                         <line x1="60" y1="60" x2="140" y2="60" stroke="#2DD6FF" strokeWidth="0.5" strokeOpacity="0.5" />
                    </svg>
                    
                    <div className="absolute bottom-2 right-2 text-[9px] text-acid animate-pulse">RENDERING_ENVIRONMENT...</div>
                </div>

                {/* Logo / Header */}
                <div className="text-center mb-6">
                     <h1 className="text-3xl font-black text-white tracking-tighter">
                         PADCHAT <span className="text-gray-600">INTELLIGENCE</span>
                     </h1>
                </div>

                {/* Log Terminal */}
                <div 
                    ref={scrollRef} 
                    className="h-40 overflow-y-auto font-mono text-xs space-y-1 mb-6 scrollbar-hide border border-white/10 p-4 bg-black/80 shadow-inner"
                >
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-3">
                            <span className="text-gray-600 select-none">
                                {`> `}
                            </span>
                            <span className={`${i === logs.length - 1 ? 'text-white font-bold' : 'text-gray-400'}`}>
                                {log}
                            </span>
                        </div>
                    ))}
                    <div className="animate-pulse text-acid">_</div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-900 h-1 relative overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 h-full bg-acid shadow-[0_0_10px_#ACFF01]"
                        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-gray-500 uppercase tracking-widest">
                    <span className="animate-pulse">Loading Modules</span>
                    <span>{Math.round(progress)}%</span>
                </div>
            </div>

            {/* RIGHT COLUMN: MODULE STATS */}
            <div className="hidden md:flex col-span-2 border-l border-white/10 p-4 text-[9px] text-electric/60 font-mono flex-col justify-end text-right h-3/4 overflow-hidden">
                <div className="mb-2 text-white uppercase border-b border-white/10 pb-1">Sys_Diagnostics</div>
                 {rightStats.map((line, i) => (
                    <div key={i} className="font-mono whitespace-nowrap opacity-80">{line}</div>
                ))}
            </div>

        </div>
    </div>
  );
};

export default BootSequence;
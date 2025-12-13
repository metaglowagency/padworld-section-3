import React, { useState, useEffect, useRef } from 'react';
import { Lock, ShieldAlert, Cpu, Terminal, Wifi } from 'lucide-react';

interface PasscodeGateProps {
  onUnlock: () => void;
}

const PasscodeGate: React.FC<PasscodeGateProps> = ({ onUnlock }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hintText, setHintText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Focus keeper
  useEffect(() => {
    const keepFocus = () => inputRef.current?.focus();
    window.addEventListener('click', keepFocus);
    return () => window.removeEventListener('click', keepFocus);
  }, []);

  // Typing effect for hint
  useEffect(() => {
    const fullHint = "Hint: The name of the world’s smartest padel ecosystem.";
    let i = 0;
    const interval = setInterval(() => {
        if (i < fullHint.length) {
            setHintText(fullHint.substring(0, i + 1));
            i++;
        } else {
            clearInterval(interval);
        }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Canvas Background Animation (Digital Rain / Nodes)
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles: {x: number, y: number, speed: number, opacity: number}[] = [];
      for(let i=0; i<100; i++) {
          particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              speed: 1 + Math.random() * 3,
              opacity: Math.random()
          });
      }

      const draw = () => {
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear with void

          ctx.fillStyle = '#ACFF01';
          
          particles.forEach(p => {
              ctx.globalAlpha = p.opacity * 0.5;
              ctx.fillRect(p.x, p.y, 2, 15); // Digital rain drops
              
              p.y += p.speed;
              if (p.y > canvas.height) {
                  p.y = -20;
                  p.x = Math.random() * canvas.width;
              }
          });
          
          requestAnimationFrame(draw);
      };
      
      const animId = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(animId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === 'padworld') {
      setSuccess(true);
      setTimeout(() => {
        onUnlock();
      }, 2000); // Wait for success animation
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 800);
    }
  };

  if (success) {
      return (
          <div className="h-screen w-screen bg-acid flex items-center justify-center overflow-hidden animate-crt-on">
              <div className="text-black text-center space-y-4">
                  <h1 className="text-9xl font-black tracking-tighter uppercase animate-pulse">ACCESS GRANTED</h1>
                  <p className="font-mono text-xl tracking-[1em] animate-bounce">LOADING INTELLIGENCE LAYER...</p>
              </div>
          </div>
      )
  }

  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden flex items-center justify-center font-mono selection:bg-acid selection:text-black animate-crt-on">
      
      {/* 1. Dynamic Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20 pointer-events-none" />

      {/* 2. Floating Data Particles */}
      <div className="absolute top-10 left-10 text-[10px] text-gray-500 space-y-2 hidden md:block font-mono">
        <div className="flex items-center gap-2"><Wifi size={12} className="animate-pulse text-acid"/> SECURE_CONN: <span className="text-acid">ESTABLISHED</span></div>
        <div>LATENCY: <span className="text-electric">12ms</span></div>
        <div>ENCRYPTION: <span className="text-white">AES-256-GCM</span></div>
      </div>

      {/* 3. Main Security Card */}
      <div className={`relative z-10 w-full max-w-lg transition-all duration-100 ${error ? 'translate-x-[-10px]' : 'translate-x-0'}`}>
        
        {/* Error Shake Animation wrapper */}
        <div className={`bg-black/80 backdrop-blur-xl border border-white/10 p-1 md:p-2 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] ${error ? 'animate-glitch border-red-500' : ''}`}>
          
          {/* Decorative Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-acid"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-acid"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-acid"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-acid"></div>

          <div className="border border-white/5 p-8 md:p-12 flex flex-col items-center text-center relative z-20">
            
            {/* Header Icon */}
            <div className={`mb-6 p-4 rounded-full bg-white/5 border border-white/10 ${error ? 'border-red-500 text-red-500 shadow-[0_0_20px_red]' : 'border-acid/30 text-acid shadow-[0_0_20px_rgba(172,255,1,0.2)]'}`}>
              {error ? <ShieldAlert size={42} className="animate-pulse" /> : <Lock size={42} />}
            </div>

            <h1 className="text-3xl font-black text-white tracking-[0.2em] mb-2 uppercase">
              PadChat<span className="text-acid">OS</span>
            </h1>
            <p className="text-[10px] text-gray-500 tracking-widest mb-10 uppercase">
              Restricted Access Environment // Level 03
            </p>

            {/* Terminal Input Area */}
            <form onSubmit={handleSubmit} className="w-full relative group">
              <div className="absolute inset-0 bg-acid/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
              
              <div className={`relative flex items-center bg-black border-2 ${error ? 'border-red-500' : 'border-white/20 group-hover:border-acid'} transition-all px-4 py-4 shadow-inner`}>
                <span className="text-acid mr-3 blink text-sm">➜</span>
                <input
                  ref={inputRef}
                  type="text"
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-white font-mono text-lg tracking-[0.3em] w-full uppercase placeholder-gray-800"
                  placeholder="ENTER_PASSPHRASE"
                  autoComplete="off"
                />
                {/* Custom Block Cursor */}
                <div className="w-3 h-6 bg-acid absolute animate-pulse pointer-events-none opacity-70" style={{ left: `calc(3.5rem + ${input.length * 14}px)` }}></div>
              </div>
            </form>

            {/* Hint & Status */}
            <div className="mt-8 flex flex-col items-center gap-2 w-full text-[10px] text-gray-400 font-mono border-t border-white/10 pt-4">
              <div className="flex justify-between w-full">
                  <span className="flex items-center gap-1">
                    <Terminal size={10} />
                    STATUS: {error ? <span className="text-red-500">AUTH_FAILED</span> : <span className="text-acid">AWAITING_INPUT</span>}
                  </span>
                  <span>ID: GUEST_USER</span>
              </div>
              <div className="w-full text-left text-gray-600 h-4">
                  {hintText} <span className="animate-pulse">_</span>
              </div>
            </div>

            {/* Error Message Overlay */}
            {error && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm">
                <div className="text-red-500 text-xl font-bold tracking-widest animate-pulse border-2 border-red-500 px-8 py-4 bg-red-500/10 shadow-[0_0_30px_red]">
                  ACCESS DENIED
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 w-full p-2 border-t border-white/10 flex justify-between text-[9px] text-gray-600 font-mono bg-black/90 backdrop-blur z-20">
        <div className="flex gap-4">
           <span className="flex items-center gap-1"><Cpu size={10}/> SYS_READY</span>
           <span>MEM_AVAIL: 64.0 TB</span>
        </div>
        <div>BUILD: v3.0.1-ALPHA</div>
      </div>
    </div>
  );
};

export default PasscodeGate;
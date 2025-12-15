import React, { useEffect, useState } from 'react';
import { Activity, Cpu, Database, Zap, ChevronDown, PlayCircle } from 'lucide-react';

interface IntroSectionProps {
    // onStartAuto prop removed as it moved to Nav
}

const ScrambleText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const [display, setDisplay] = useState(() => 
    text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
  );
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
};

const IntroSection: React.FC<IntroSectionProps> = () => {
  const [visible, setVisible] = useState(false);
  
  // Asset Routing Logic
  const localPoster = '/assets/hero_poster.jpg';
  const remotePoster = 'https://images.unsplash.com/photo-1626245648836-2396e95f5022?q=80&w=1920&auto=format&fit=crop';
  const [activePoster, setActivePoster] = useState(remotePoster);

  useEffect(() => {
    // Check if local poster exists
    const img = new Image();
    img.src = localPoster;
    img.onload = () => setActivePoster(localPoster);
    // On error, it stays as remotePoster
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToPassport = () => {
      document.getElementById('passport')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center perspective-1000 overflow-hidden rounded-3xl border border-white/5 mx-4 md:mx-0 shadow-2xl">
      
      {/* Immersive Hero Video Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-void">
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/30 z-20"></div>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 z-20 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <video 
            autoPlay 
            loop 
            muted 
            playsInline
            poster={activePoster}
            className="w-full h-full object-cover scale-110 animate-slow-zoom opacity-60 grayscale-[0.8] contrast-125 brightness-75 sepia-[0.3] hue-rotate-[170deg]"
        >
            {/* PRIORITY 1: LOCAL ASSET */}
            <source src="/assets/hero.mp4" type="video/mp4" />
            
            {/* PRIORITY 2: REMOTE FALLBACKS */}
            <source src="https://videos.pexels.com/video-files/4754033/4754033-hd_1920_1080_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/5738860/5738860-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={`relative z-30 transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="flex justify-center gap-12 mb-12 opacity-80">
          {[Activity, Cpu, Database, Zap].map((Icon, i) => (
             <div key={i} className="flex flex-col items-center gap-4 group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="relative p-3 border border-white/10 rounded-full bg-black/40 backdrop-blur-md group-hover:border-acid/50 group-hover:bg-acid/10 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <Icon className="w-5 h-5 text-electric group-hover:text-acid group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-acid/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
             </div>
          ))}
        </div>

        <h2 className="text-electric font-mono text-xs tracking-[0.5em] mb-4 uppercase drop-shadow-md">
          Welcome to PadChat
        </h2>
        
        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8 drop-shadow-2xl mix-blend-overlay">
          YOUR GLOBAL<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600">
            {visible && <ScrambleText text="INTELLIGENCE" />}
          </span>
        </h1>

        <div className="max-w-3xl mx-auto backdrop-blur-md bg-black/30 p-8 border-l-2 border-acid/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] transform hover:scale-[1.01] transition-transform duration-500 rounded-r-xl">
          <p className="text-lg md:text-2xl font-light text-gray-200 leading-snug">
            "Every match. Every movement. <br />
            <span className="text-acid font-normal glow-text-acid tracking-wide">Captured. Analyzed. Evolved."</span>
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16">
            <button 
                onClick={scrollToPassport}
                className="flex flex-col items-center gap-2 group cursor-pointer"
            >
                <div className="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors tracking-[0.2em] uppercase">Manual Entry</div>
                <div className="w-8 h-12 rounded-full border border-white/10 flex justify-center p-2 group-hover:border-white transition-colors">
                    <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
                </div>
            </button>
        </div>
      </div>
      
      {/* Technical Footer for Hero */}
      <div className="absolute bottom-6 right-6 flex flex-col items-end z-30 opacity-50">
          <div className="text-[9px] font-mono text-gray-400">VIDEO_SOURCE: {activePoster === localPoster ? 'LOCAL_STORAGE' : 'CLOUD_STREAM'}</div>
          <div className="text-[9px] font-mono text-gray-400">RENDER: 60FPS</div>
      </div>
    </section>
  );
};

export default IntroSection;
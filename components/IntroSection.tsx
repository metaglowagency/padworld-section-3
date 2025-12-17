import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Database, Zap, ChevronDown, PlayCircle, Radio } from 'lucide-react';

interface IntroSectionProps {
    autoPlay?: boolean;
}

const ScrambleText: React.FC<{ text: string; className?: string; trigger?: boolean }> = ({ text, className, trigger }) => {
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
  }, [text, trigger]);

  return <span className={className}>{display}</span>;
};

const HolographicGrid = () => {
    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden perspective-1000">
            {/* 3D Floor Grid */}
            <motion.div 
                initial={{ opacity: 0, rotateX: 60, y: 100 }}
                animate={{ opacity: 0.15, rotateX: 60, y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-x-0 bottom-0 h-[150%] holographic-grid origin-bottom"
                style={{ 
                    maskImage: 'linear-gradient(to top, white, transparent)',
                    WebkitMaskImage: 'linear-gradient(to top, white, transparent)'
                }}
            />
            
            {/* Floating Particles */}
            {[...Array(40)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-acid rounded-full"
                    initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: Math.random() * 100 + "%", 
                        opacity: 0 
                    }}
                    animate={{ 
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 2, 0.5],
                        y: ["0%", "-20%"]
                    }}
                    transition={{ 
                        duration: Math.random() * 5 + 3, 
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    style={{ 
                        boxShadow: '0 0 10px #ACFF01',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                />
            ))}

            {/* Vertical Scanning Line */}
            <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-acid/10 to-transparent skew-x-12"
            />
        </div>
    );
};

const IntroSection: React.FC<IntroSectionProps> = ({ autoPlay }) => {
  const [visible, setVisible] = useState(false);
  const [activePoster, setActivePoster] = useState('https://images.unsplash.com/photo-1626245648836-2396e95f5022?q=80&w=1920&auto=format&fit=crop');
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Attempt local asset check
    const img = new Image();
    img.src = '/assets/hero_poster.jpg';
    img.onload = () => setActivePoster('/assets/hero_poster.jpg');
  }, []);

  const scrollToPassport = () => {
      document.getElementById('passport')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-void">
      
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {/* Hero Video / Image */}
        <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="w-full h-full"
        >
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                poster={activePoster}
                onError={() => setVideoError(true)}
                className="w-full h-full object-cover grayscale-[0.8] contrast-125 brightness-50"
            >
                <source src="/assets/hero.mp4" type="video/mp4" />
                <source src="https://videos.pexels.com/video-files/4754033/4754033-hd_1920_1080_25fps.mp4" type="video/mp4" />
            </video>
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void z-10"></div>
        
        {/* THE GRID (Restored and Enhanced) */}
        <HolographicGrid />
      </div>

      {/* Content Container */}
      <div className="relative z-30 flex flex-col items-center px-4 max-w-6xl w-full">
        
        {/* Intro UI Elements Build */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-4 mb-8"
        >
            <div className="flex items-center gap-2 px-3 py-1 border border-acid/20 rounded-full bg-acid/5 backdrop-blur-sm shadow-[0_0_15px_rgba(172,255,1,0.1)]">
                <Radio className="w-3 h-3 text-acid animate-pulse" />
                <span className="text-[10px] font-mono text-acid tracking-[0.3em] uppercase">Intelligence Layer Live</span>
            </div>
        </motion.div>

        {/* Headline Layer */}
        <div className="mb-12">
            <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1 }}
                className="text-gray-500 font-mono text-[10px] md:text-xs tracking-[0.6em] mb-4 uppercase"
            >
                Welcome to PadChat
            </motion.h2>
            
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                GLOBAL<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                    {visible && <ScrambleText text="INTELLIGENCE" trigger={autoPlay} />}
                </span>
            </h1>
        </div>

        {/* Punchline Moment */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="max-w-3xl glass-panel p-8 border-l-4 border-l-acid shadow-2xl rounded-r-xl"
        >
            <p className="text-xl md:text-3xl font-light text-gray-200 leading-tight">
                "Every match. Every movement. <br />
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="text-acid font-bold glow-text-acid tracking-wide uppercase"
                >
                    Captured. Analyzed. Evolved.
                </motion.span>"
            </p>
        </motion.div>
        
        {/* Navigation / Scroll Hint */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-20 flex flex-col items-center gap-4"
        >
            <button 
                onClick={scrollToPassport}
                className="flex flex-col items-center gap-3 group pointer-events-auto"
            >
                <span className="text-[10px] font-mono text-gray-500 tracking-[0.4em] uppercase group-hover:text-white transition-colors">Enter PadWorld</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-acid to-transparent group-hover:h-16 transition-all duration-500"></div>
                <ChevronDown className="text-acid w-4 h-4 animate-bounce" />
            </button>
        </motion.div>
      </div>
      
      {/* Corner Data Decorations */}
      <div className="absolute bottom-8 left-8 hidden md:flex flex-col gap-2 z-30 opacity-40 font-mono text-[9px] text-gray-500 tracking-widest text-left">
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-acid rounded-full shadow-[0_0_5px_#ACFF01]"></div> DATA_INGEST: ACTIVE</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> GEO_MESH: SYNCED</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> NODE_ID: {Math.floor(Math.random()*999999)}</div>
      </div>
      
      <div className="absolute bottom-8 right-8 hidden md:block z-30 opacity-40 font-mono text-[9px] text-gray-500 tracking-widest text-right">
          <div>ASSET_ID: HERO_SECTION_03</div>
          <div>FRAME_RATE: 60FPS</div>
          <div className="text-acid uppercase tracking-widest">Secure Protocol Enabled</div>
      </div>

    </section>
  );
};

export default IntroSection;
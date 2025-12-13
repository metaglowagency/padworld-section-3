import React, { useState, useEffect, useRef } from 'react';
import PasscodeGate from './components/PasscodeGate';
import BootSequence from './components/BootSequence';
import IntroSection from './components/IntroSection';
import PlayerPassport from './components/PlayerPassport';
import Matchmaker from './components/Matchmaker';
import RankingGlobe from './components/RankingGlobe';
import CoachingMode from './components/CoachingMode';
import Timeline from './components/Timeline';
import MatchReport from './components/MatchReport';
import SocialGraph from './components/SocialGraph';
import FinalCta from './components/FinalCta';
import { Activity, Wifi, Cpu, Battery, Disc } from 'lucide-react';

const SECTIONS = [
  { id: 'intro', label: 'SYS_INIT', duration: 4000 },
  { id: 'passport', label: 'PASSPORT', duration: 9000 },
  { id: 'matchmaker', label: 'MATCH_SIM', duration: 10000 },
  { id: 'ranking', label: 'GLOBAL_RANK', duration: 6000 },
  { id: 'coaching', label: 'AI_COACH', duration: 8000 },
  { id: 'timeline', label: 'TIMELINE', duration: 7000 },
  { id: 'report', label: 'MATCH_LOG', duration: 7000 },
  { id: 'social', label: 'NETWORK', duration: 5000 },
  { id: 'final', label: 'EXIT', duration: 0 },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [autoPlayIndex, setAutoPlayIndex] = useState<number>(-1);
  const isAutoMode = autoPlayIndex !== -1;

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll Spy Logic (Only active when NOT in auto mode to prevent fighting)
  useEffect(() => {
    if (!showContent || isAutoMode) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showContent, isAutoMode]);

  // Autonomous Sequencer
  useEffect(() => {
      if (autoPlayIndex >= 0 && autoPlayIndex < SECTIONS.length) {
          const section = SECTIONS[autoPlayIndex];
          setActiveSection(section.id); // Force update HUD
          
          const el = document.getElementById(section.id);
          if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }

          if (section.duration > 0) {
              const timer = setTimeout(() => {
                  setAutoPlayIndex(prev => prev + 1);
              }, section.duration);
              return () => clearTimeout(timer);
          } else {
              // End of sequence
              setTimeout(() => setAutoPlayIndex(-1), 5000);
          }
      }
  }, [autoPlayIndex]);

  const startAutonomousMode = () => {
      setAutoPlayIndex(0); // Starts at Intro
  };

  if (!isAuthenticated) {
    return <PasscodeGate onUnlock={() => setIsAuthenticated(true)} />;
  }

  if (!showContent) {
    return <BootSequence onComplete={() => setShowContent(true)} />;
  }

  return (
    <div className="min-h-screen bg-void text-gray-300 font-sans selection:bg-acid selection:text-void cursor-none overflow-x-hidden">
      
      {/* 1. GLOBAL INTERACTIVE BACKGROUND */}
      <InteractiveBackground />
      
      {/* 2. CUSTOM CURSOR */}
      <div 
        className="fixed w-8 h-8 rounded-full border border-acid/50 pointer-events-none z-[100] transition-transform duration-75 ease-out mix-blend-difference flex items-center justify-center"
        style={{ left: mousePos.x - 16, top: mousePos.y - 16 }}
      >
        <div className="w-1 h-1 bg-acid rounded-full"></div>
      </div>
      <div 
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ left: mousePos.x - 4, top: mousePos.y - 4 }}
      ></div>

      {/* 3. IMMERSIVE HUD OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-40 p-6 flex flex-col justify-between">
          {/* Top Bar */}
          <div className="flex justify-between items-start opacity-70">
              <div className="flex flex-col gap-1">
                  <div className="text-[10px] font-mono text-acid tracking-widest flex items-center gap-2">
                      <Disc className="animate-spin" size={10} /> PADCHAT_OS v3.1 {isAutoMode && <span className="text-white animate-pulse bg-red-500/50 px-2 rounded">AUTO_PILOT_ENGAGED</span>}
                  </div>
                  <div className="text-[9px] font-mono text-gray-500">SECURE CONNECTION</div>
              </div>
              <div className="flex gap-6 text-[10px] font-mono text-gray-500">
                  <span className="flex items-center gap-2"><Cpu size={12}/> CPU: 12%</span>
                  <span className="flex items-center gap-2"><Wifi size={12}/> NET: 1.2Gbps</span>
                  <span className="flex items-center gap-2"><Battery size={12}/> PWR: STABLE</span>
              </div>
          </div>

          {/* Left Side: Section Progress */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
               <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent absolute left-[5px] top-0 bottom-0 m-auto"></div>
               {SECTIONS.map((sec) => (
                   <div key={sec.id} className="flex items-center gap-3 transition-all duration-300 group">
                       <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${activeSection === sec.id ? 'bg-acid border-acid scale-125 shadow-[0_0_10px_#ACFF01]' : 'bg-black border-gray-700 group-hover:border-white'}`}></div>
                       <span className={`text-[9px] font-mono tracking-widest transition-all duration-300 ${activeSection === sec.id ? 'text-white opacity-100 translate-x-0' : 'text-gray-600 opacity-0 -translate-x-2'}`}>
                           {sec.label}
                       </span>
                   </div>
               ))}
          </div>

          {/* Right Side: Decorative Lines */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block opacity-20">
              <div className="flex flex-col gap-1 items-end">
                  {Array.from({length: 20}).map((_, i) => (
                      <div key={i} className="h-[2px] bg-electric" style={{ width: Math.random() * 20 + 5 + 'px', opacity: Math.random() }}></div>
                  ))}
              </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-between items-end opacity-70">
              <div className="text-[9px] font-mono text-gray-600">
                  LAT: 34.0522 N / LON: 118.2437 W
              </div>
              <div className="text-[9px] font-mono text-acid animate-pulse">
                  SYSTEM STATUS: ONLINE
              </div>
          </div>
      </div>

      {/* 4. MAIN SCROLL CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-0 pb-20">
        <SectionWrapper id="intro"><IntroSection onStartAuto={startAutonomousMode} /></SectionWrapper>
        <SectionWrapper id="passport"><PlayerPassport autoPlay={isAutoMode && activeSection === 'passport'} /></SectionWrapper>
        <SectionWrapper id="matchmaker"><Matchmaker autoPlay={isAutoMode && activeSection === 'matchmaker'} /></SectionWrapper>
        <SectionWrapper id="ranking"><RankingGlobe autoPlay={isAutoMode && activeSection === 'ranking'} /></SectionWrapper>
        <SectionWrapper id="coaching"><CoachingMode autoPlay={isAutoMode && activeSection === 'coaching'} /></SectionWrapper>
        <SectionWrapper id="timeline"><Timeline autoPlay={isAutoMode && activeSection === 'timeline'} /></SectionWrapper>
        <SectionWrapper id="report"><MatchReport autoPlay={isAutoMode && activeSection === 'report'} /></SectionWrapper>
        <SectionWrapper id="social"><SocialGraph /></SectionWrapper>
        <SectionWrapper id="final"><FinalCta /></SectionWrapper>
      </div>

    </div>
  );
};

const SectionWrapper: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => (
    <div id={id} className="min-h-screen flex flex-col justify-center py-20 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        {children}
    </div>
);

const InteractiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: {x: number, y: number, vx: number, vy: number}[] = [];
        const particleCount = 40; // optimized for performance

        for(let i=0; i<particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        let mouse = { x: 0, y: 0 };
        const handleMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        window.addEventListener('mousemove', handleMove);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.lineWidth = 1;
            
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(172, 255, 1, 0.2)';
                ctx.fill();

                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(45, 214, 255, ${1 - dist/200})`;
                    ctx.stroke();
                }

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2*dx2 + dy2*dy2);
                    if (dist2 < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist2/100)})`;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(draw);
        };

        const animId = requestAnimationFrame(draw);
        
        const handleResize = () => {
             width = window.innerWidth;
             height = window.innerHeight;
             canvas.width = width;
             canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
};

export default App;
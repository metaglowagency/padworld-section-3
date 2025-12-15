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
import Nav from './components/Nav';
import Footer from './components/Footer';
import ImageDivider from './components/ImageDivider';
import { Activity, Wifi, Cpu, Battery, Disc } from 'lucide-react';
import { speakText } from './services/geminiService';

const SECTIONS = [
  { 
    id: 'intro', 
    label: 'SYS_INIT', 
    duration: 5000,
    script: "Welcome to PadChat. Initializing the world's most advanced padel intelligence layer."
  },
  { 
    id: 'passport', 
    label: 'PASSPORT', 
    duration: 9000, 
    script: "Constructing your digital athlete identity. Analyzing biometrics, playstyle, and skill tier."
  },
  { 
    id: 'divider1', 
    label: 'NEURAL_LINK', 
    duration: 4000,
    script: "Entering the Arena. Where data dictates destiny."
  },
  { 
    id: 'matchmaker', 
    label: 'MATCH_SIM', 
    duration: 10000,
    script: "Initiating Match Simulation. Processing forty-eight proprietary data points to predict outcome and compatibility."
  },
  { 
    id: 'ranking', 
    label: 'GLOBAL_RANK', 
    duration: 7000,
    script: "Global ranking engine active. Your position is dynamic, updating in real-time against the world."
  },
  { 
    id: 'divider2', 
    label: 'SYNC_GRID', 
    duration: 4000,
    script: "Breaking limits. AI driven performance evolution."
  },
  { 
    id: 'coaching', 
    label: 'AI_COACH', 
    duration: 9000,
    script: "Live Coaching Mode active. Biomechanical analysis detecting patterns and suggesting immediate improvements."
  },
  { 
    id: 'timeline', 
    label: 'TIMELINE', 
    duration: 7000,
    script: "Projecting future performance trajectory. Calculating optimal path to the elite tier."
  },
  { 
    id: 'report', 
    label: 'MATCH_LOG', 
    duration: 8000,
    script: "Match report generated. Analyzing winning zones and rally intensity."
  },
  { 
    id: 'divider3', 
    label: 'NETWORK', 
    duration: 4000,
    script: "Global Nexus. Uniting the ecosystem."
  },
  { 
    id: 'social', 
    label: 'SOCIAL_GRAPH', 
    duration: 6000,
    script: "Connecting the grid. PadChat is not just data, it is a living network of athletes."
  },
  { 
    id: 'final', 
    label: 'EXIT', 
    duration: 0,
    script: "PadChat. The intelligence layer behind global padel."
  },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [autoPlayIndex, setAutoPlayIndex] = useState<number>(-1);
  const [isMuted, setIsMuted] = useState(false); // Default unmuted for demo
  
  const isAutoMode = autoPlayIndex !== -1;
  const currentSectionIndex = SECTIONS.findIndex(s => s.id === activeSection) + 1;

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

  // Autonomous Sequencer with TTS
  useEffect(() => {
      if (autoPlayIndex >= 0 && autoPlayIndex < SECTIONS.length) {
          const section = SECTIONS[autoPlayIndex];
          setActiveSection(section.id); // Force update HUD
          
          const el = document.getElementById(section.id);
          if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }

          const advance = () => {
             setAutoPlayIndex(prev => prev + 1);
          };

          // If muted or script missing, use duration
          if (isMuted || !section.script) {
              if (section.duration > 0) {
                  const timer = setTimeout(advance, section.duration);
                  return () => clearTimeout(timer);
              } else {
                  setTimeout(() => setAutoPlayIndex(-1), 5000);
              }
          } else {
              // Play TTS then advance
              // Add a small delay before speaking so the scroll settles
              const delayTimer = setTimeout(() => {
                   speakText(section.script!).then(() => {
                       // Small buffer after speech before moving on
                       setTimeout(advance, 1000);
                   });
              }, 1000);
              
              // Safety fallback in case TTS hangs
              const safetyTimer = setTimeout(advance, Math.max(section.duration + 5000, 15000));
              
              return () => {
                  clearTimeout(delayTimer);
                  clearTimeout(safetyTimer);
              };
          }
      } else if (autoPlayIndex >= SECTIONS.length) {
          // End of sequence
          setAutoPlayIndex(-1);
      }
  }, [autoPlayIndex, isMuted]);

  const startAutonomousMode = () => {
      setIsMuted(false); // Unmute for full experience
      setAutoPlayIndex(0); // Starts at Intro
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
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

      {/* 3. NEW NAV & FOOTER */}
      <Nav 
        isMuted={isMuted} 
        toggleMute={toggleMute} 
        onStartAuto={startAutonomousMode} 
        isAutoMode={isAutoMode} 
      />
      <Footer current={currentSectionIndex > 0 ? currentSectionIndex : 1} total={SECTIONS.length} />

      {/* 4. IMMERSIVE HUD OVERLAY (SIDE ELEMENTS ONLY) */}
      <div className="fixed inset-0 pointer-events-none z-40 p-6 flex flex-col justify-between">
          
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
      </div>

      {/* 5. MAIN SCROLL CONTENT WITH DIVIDERS */}
      <div className="relative z-10 max-w-full mx-auto space-y-0 pb-20">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionWrapper id="intro"><IntroSection /></SectionWrapper>
            <SectionWrapper id="passport"><PlayerPassport autoPlay={isAutoMode && activeSection === 'passport'} /></SectionWrapper>
        </div>

        {/* DIVIDER 1: Identity -> Matchmaking */}
        <div id="divider1">
            <ImageDivider 
                imgSrc="/assets/divider_1.jpg" 
                fallbackSrc="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
                title="THE ARENA"
                subtitle="WHERE DATA DICTATES DESTINY"
                align="center"
            />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionWrapper id="matchmaker"><Matchmaker autoPlay={isAutoMode && activeSection === 'matchmaker'} /></SectionWrapper>
            <SectionWrapper id="ranking"><RankingGlobe autoPlay={isAutoMode && activeSection === 'ranking'} /></SectionWrapper>
        </div>

        {/* DIVIDER 2: Ranking -> Coaching/Evolution */}
        <div id="divider2">
             <ImageDivider 
                imgSrc="/assets/divider_2.jpg" 
                fallbackSrc="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop" 
                title="BREAK LIMITS"
                subtitle="AI-DRIVEN PERFORMANCE EVOLUTION"
                align="left"
            />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionWrapper id="coaching"><CoachingMode autoPlay={isAutoMode && activeSection === 'coaching'} /></SectionWrapper>
            <SectionWrapper id="timeline"><Timeline autoPlay={isAutoMode && activeSection === 'timeline'} /></SectionWrapper>
            <SectionWrapper id="report"><MatchReport autoPlay={isAutoMode && activeSection === 'report'} /></SectionWrapper>
        </div>

        {/* DIVIDER 3: Reports -> Social/Global */}
        <div id="divider3">
             <ImageDivider 
                imgSrc="/assets/divider_3.jpg" 
                fallbackSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                title="GLOBAL NEXUS"
                subtitle="UNITING THE WORLD'S SMARTEST ECOSYSTEM"
                align="right"
            />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionWrapper id="social"><SocialGraph /></SectionWrapper>
            <SectionWrapper id="final"><FinalCta /></SectionWrapper>
        </div>

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
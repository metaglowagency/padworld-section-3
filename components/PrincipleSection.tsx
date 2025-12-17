import React, { useRef, useState, useEffect } from 'react';
import { Scale, ShieldCheck, Globe, Cpu, X, Check, Activity, Zap, Heart, Battery, ChevronRight, ChevronLeft, Swords, Trophy, Server, Database, ArrowDown, Wifi, ScanLine, MapPin, Target, Fingerprint, BarChart3, Lock, Hash, Share2, Dna, Layers, GitMerge, Brain } from 'lucide-react';

interface PrincipleSectionProps {
    autoPlay?: boolean;
}

const PrincipleSection: React.FC<PrincipleSectionProps> = ({ autoPlay }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 py-10 overflow-hidden">
      {/* Part 1: The Principle (Text Reveal) */}
      <section className="flex flex-col items-center justify-center text-center px-4 relative py-12">
        <div className="absolute inset-0 bg-holo-grid opacity-10 pointer-events-none"></div>
        <div className="space-y-6 z-10 max-w-6xl mx-auto w-full">
           
           <div className="flex flex-col items-center gap-4">
                <div className="inline-block bg-white/5 border border-white/10 rounded-full px-6 py-2 animate-in fade-in zoom-in duration-1000 delay-0">
                    <span className="text-[10px] font-mono text-acid tracking-[0.3em] uppercase">The New Standard</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 uppercase tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 drop-shadow-2xl">
                    DISTANCE IS <span className="text-electric decoration-electric underline decoration-2 underline-offset-8">IRRELEVANT</span>.
                </h3>
           </div>
           
           {/* NEW: GLOBAL INTELLIGENCE ENGINE */}
           <div className="w-full mt-8 mb-16">
               <GlobalIntelligenceEngine autoPlay={autoPlay} />
           </div>

           <div className="space-y-2 animate-in zoom-in duration-1000 delay-1000 fill-mode-forwards opacity-0">
             <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] glow-text-white">
               Democratization<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-acid via-white to-electric">By Data</span>
             </h2>
           </div>
           
           <p className="text-electric font-mono text-xs md:text-sm tracking-widest uppercase animate-in fade-in duration-1000 delay-2000 fill-mode-forwards opacity-0">
             Every Match Measured // Every Player Visible // Zero Bias
           </p>
        </div>
      </section>

      {/* Part 2: Proof Not Words (Split View) */}
      <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
          {/* Old World */}
          <div className="p-10 border border-white/5 bg-white/5 grayscale opacity-50 hover:opacity-100 transition-all duration-500 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-8">
                  <h3 className="text-2xl font-black text-gray-500 uppercase tracking-tight flex items-center gap-3">
                      <X className="text-red-900" /> Legacy System
                  </h3>
                  <div className="text-[10px] font-mono border border-red-900/30 text-red-900 px-2 py-1 uppercase">Obsolete</div>
              </div>
              <ul className="space-y-6 font-mono text-xs text-gray-500">
                  <li className="flex items-center gap-4 border-b border-white/5 pb-4">
                      <div className="w-8 h-8 rounded bg-red-900/20 flex items-center justify-center text-red-900 font-bold">!</div>
                      <span>Manual Committee Decisions</span>
                  </li>
                  <li className="flex items-center gap-4 border-b border-white/5 pb-4">
                      <div className="w-8 h-8 rounded bg-red-900/20 flex items-center justify-center text-red-900 font-bold">!</div>
                      <span>Restricted by Federation Politics</span>
                  </li>
                  <li className="flex items-center gap-4 pb-4">
                      <div className="w-8 h-8 rounded bg-red-900/20 flex items-center justify-center text-red-900 font-bold">!</div>
                      <span>High Bias Risk & Invisible Barriers</span>
                  </li>
              </ul>
          </div>

          {/* New World */}
          <div className="p-10 border border-acid/50 bg-gradient-to-br from-acid/10 to-transparent relative overflow-hidden group shadow-[0_0_50px_rgba(172,255,1,0.1)] hover:shadow-[0_0_80px_rgba(172,255,1,0.2)] transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-holo-grid opacity-30 animate-pulse"></div>
              <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                          <Check className="text-acid" /> PadWorld Core
                      </h3>
                      <div className="text-[10px] font-mono bg-acid text-black font-bold px-2 py-1 uppercase animate-pulse">Active Protocol</div>
                  </div>
                  <ul className="space-y-6 font-mono text-xs text-white">
                      <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                          <div className="w-8 h-8 rounded bg-acid/20 flex items-center justify-center text-acid"><Cpu size={14}/></div>
                          <span>100% AI-Measured Telemetry</span>
                      </li>
                      <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                          <div className="w-8 h-8 rounded bg-acid/20 flex items-center justify-center text-acid"><ShieldCheck size={14}/></div>
                          <span>Cryptographically Verified Matches</span>
                      </li>
                      <li className="flex items-center gap-4 pb-4">
                          <div className="w-8 h-8 rounded bg-acid/20 flex items-center justify-center text-acid"><Globe size={14}/></div>
                          <span>Universal Global Normalization</span>
                      </li>
                  </ul>
              </div>
          </div>
      </section>

      {/* Part 2.5: LIVE INTELLIGENCE GRID (Netflix Style - Manually Scrollable) */}
      <section className="relative py-16 border-y border-white/5 bg-black/80 backdrop-blur-sm group/section">
          <div className="px-6 mb-8 flex items-end justify-between max-w-[1400px] mx-auto w-full">
              <div>
                  <div className="flex items-center gap-2 text-acid font-mono text-[10px] tracking-widest uppercase animate-pulse mb-2">
                      <span className="w-2 h-2 rounded-full bg-acid shadow-[0_0_10px_#ACFF01]"></span> Live Biometric Feed
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                      Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Leaderboard</span>
                  </h3>
              </div>
              <div className="flex items-center gap-6">
                  <div className="hidden md:block text-right">
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Active Players</div>
                      <div className="text-3xl font-mono text-white font-bold tracking-tighter">142,891</div>
                  </div>
                  {/* Scroll Controls */}
                  <div className="flex gap-2">
                      <button onClick={scrollLeft} className="p-3 border border-white/10 hover:bg-white/10 hover:border-white text-white rounded-full transition-all active:scale-95">
                          <ChevronLeft size={20} />
                      </button>
                      <button onClick={scrollRight} className="p-3 border border-white/10 hover:bg-white/10 hover:border-white text-white rounded-full transition-all active:scale-95">
                          <ChevronRight size={20} />
                      </button>
                  </div>
              </div>
          </div>

          {/* Scrolling Container - Netflix Style Cards */}
          <div className="relative w-full">
              <div 
                  ref={scrollContainerRef}
                  className="flex gap-4 overflow-x-auto px-6 pb-12 w-full snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollBehavior: 'smooth' }}
              >
                  {/* Cards */}
                  {[...PLAYERS, ...PLAYERS, ...PLAYERS].map((p, i) => (
                      <div key={`${p.rank}-${i}`} className="snap-start">
                          <PlayerCard player={p} />
                      </div>
                  ))}
              </div>
              
              {/* Fade Edges */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none"></div>
          </div>
      </section>

      {/* Part 3: The Protocol (Improved) */}
      <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
              <h3 className="text-acid font-mono text-xs tracking-[0.5em] uppercase mb-4">The Pipeline</h3>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                  From Match Point <br/><span className="text-gray-600">To Global Rank</span>
              </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
             {/* Central Connectivity Line */}
             <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-700 to-transparent md:-translate-x-1/2"></div>
             
             {/* Active Pulse Line (Animated) */}
             <div className="absolute left-6 md:left-1/2 top-0 h-1/2 w-0.5 bg-gradient-to-b from-acid/0 via-acid to-acid/0 md:-translate-x-1/2 animate-[scan_3s_ease-in-out_infinite] opacity-50"></div>
             
             <div className="space-y-12 relative z-10 pb-12">
                 {PROTOCOL_STEPS.map((step, i) => (
                     <div key={i} className={`flex items-center gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative group`}>
                         
                         {/* Icon Node */}
                         <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-carbon border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-acid group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(172,255,1,0.3)] transition-all duration-300 z-20">
                            <step.icon size={20} className={`${step.color} transition-transform group-hover:rotate-12`} />
                         </div>
                         
                         {/* Spacer for alignment */}
                         <div className="w-12 md:w-1/2 flex-shrink-0"></div>
                         
                         {/* Content Card */}
                         <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-4 md:pl-0`}>
                             <div className={`p-6 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group/card transform hover:-translate-y-1 shadow-lg ${step.isFinal ? 'border-acid/30 bg-acid/5' : ''}`}>
                                
                                {/* Hover Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:animate-[shimmer_1s_infinite] pointer-events-none"></div>
                                
                                <div className="flex flex-col gap-1 relative z-10">
                                    <h4 className={`text-lg font-black uppercase tracking-wide ${step.isFinal ? 'text-acid' : 'text-white'}`}>{step.label}</h4>
                                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{step.sub}</p>
                                </div>

                                {step.isFinal && (
                                    <div className="absolute top-2 right-2 flex space-x-0.5">
                                        <div className="w-1 h-1 bg-acid rounded-full animate-ping"></div>
                                    </div>
                                )}
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
             
             {/* Final Arrow */}
             <div className="absolute bottom-0 left-6 md:left-1/2 -translate-x-1/2 translate-y-full pt-4 flex flex-col items-center">
                 <ArrowDown className="text-gray-600 animate-bounce" size={20} />
             </div>
          </div>

          <div className="pt-32 text-center px-4 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase drop-shadow-2xl leading-none">
                  "The game<br/> <span className="text-electric">talks."</span>
              </h2>
              <p className="mt-6 text-gray-500 font-mono text-sm tracking-widest uppercase">
                  No committees. No favors. Just performance.
              </p>
          </div>
      </section>

      {/* Part 4: Universal Equality */}
      <section className="relative py-32 px-4 border-y border-white/10 bg-gradient-to-r from-void via-white/5 to-void overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.2" />
                  <path d="M0,30 Q25,80 50,30 T100,30" fill="none" stroke="white" strokeWidth="0.1" />
              </svg>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-electric/10 rounded-full border border-electric/30">
                        <Globe className="text-electric w-6 h-6" />
                      </div>
                      <span className="text-electric font-mono text-sm tracking-widest uppercase">Universal Equality</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9]">
                      A PLAYER IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-acid to-white">NAIROBI</span><br/> 
                      IS MEASURED THE SAME AS A PLAYER IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-white">MADRID</span>.
                  </h2>

                  <p className="text-gray-400 leading-relaxed border-l-2 border-white/20 pl-6">
                      PadChat removes geographic bias. If you have the skill, the system will find you. 
                      Your talent is your only currency.
                  </p>
              </div>
              
              <div className="relative flex justify-center">
                   <div className="relative w-64 h-64">
                       <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]"></div>
                       <div className="absolute inset-4 rounded-full border border-dashed border-white/20 animate-[spin_15s_linear_infinite_reverse]"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                           <Scale className="text-white w-16 h-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                       </div>
                       
                       <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black border border-acid text-acid text-[10px] font-mono px-3 py-1 uppercase tracking-widest shadow-[0_0_10px_rgba(172,255,1,0.3)]">
                           Nairobi
                       </div>
                       <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black border border-electric text-electric text-[10px] font-mono px-3 py-1 uppercase tracking-widest shadow-[0_0_10px_rgba(45,214,255,0.3)]">
                           Madrid
                       </div>
                   </div>
              </div>
          </div>
      </section>
    </div>
  );
};

// --- NEW COMPONENT: GLOBAL INTELLIGENCE ENGINE (FUSION CORE) ---
const GlobalIntelligenceEngine = ({ autoPlay }: { autoPlay?: boolean }) => {
    // 0: INGEST, 1: CROSS-REF, 2: CLASSIFY
    const [cycle, setCycle] = useState(0); 
    const [progress, setProgress] = useState(0);
    const [playerId, setPlayerId] = useState("PX-9921");

    // Simulation Data Points
    const [telemetry] = useState({
        bio: { bpm: 154, stress: "HIGH", fatigue: "12%" },
        match: { score: "6-2, 6-4", winner: true, unforced: 3 },
        move: { dist: "4.2km", speed: "18km/h", coverage: "92%" },
        skill: { type: "AGGRESSIVE", acc: "94%", power: "98/100" }
    });

    const [tier, setTier] = useState("CALCULATING...");
    const [finalRank, setFinalRank] = useState(0);

    // Watch for autoPlay to reset sequence
    useEffect(() => {
        if (autoPlay) {
            setCycle(0);
            setProgress(0);
        }
    }, [autoPlay]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Cycle Logic
            setCycle((prev) => {
                if (prev === 0) return 1;
                if (prev === 1) return 2;
                return 0;
            });
        }, 3000); // 3 seconds per phase

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (cycle === 0) {
            setProgress(0);
            setTier("INGESTING...");
            setPlayerId(`PX-${Math.floor(Math.random() * 9000) + 1000}`);
        } else if (cycle === 1) {
            setProgress(50);
            setTier("ANALYZING...");
        } else if (cycle === 2) {
            setProgress(100);
            const tiers = ["AMATEUR", "PRO", "ELITE"];
            setTier(tiers[Math.floor(Math.random() * tiers.length)]);
            setFinalRank(Math.floor(Math.random() * 500) + 1);
        }
    }, [cycle]);

    return (
        <div className="w-full max-w-7xl mx-auto border border-white/10 bg-black/60 rounded-xl overflow-hidden backdrop-blur-md relative shadow-2xl">
            {/* Header */}
            <div className="w-full bg-white/5 border-b border-white/10 p-3 flex justify-between items-center text-[10px] font-mono tracking-widest text-gray-400">
                <div className="flex items-center gap-2">
                    <Brain size={12} className="text-acid" />
                    GLOBAL_INTELLIGENCE_KERNEL v4.0
                </div>
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                        <Server size={10} /> STATUS: <span className="text-white">ONLINE</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <Activity size={10} /> THREADS: <span className="text-acid">ACTIVE</span>
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 h-[500px]">
                
                {/* COL 1: DATA INGESTION STREAMS (30%) */}
                <div className="md:col-span-4 border-r border-white/10 bg-black/40 relative flex flex-col p-6 space-y-6">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Layers size={12} /> Multi-Channel Ingest
                    </div>

                    {/* Biometrics Stream */}
                    <div className={`p-4 border border-white/10 rounded bg-white/5 transition-all duration-500 ${cycle === 0 ? 'border-acid shadow-[0_0_15px_rgba(172,255,1,0.2)]' : 'opacity-50'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-white flex items-center gap-2"><Dna size={12} className="text-acid"/> BIOMETRICS</span>
                            <span className="text-[8px] font-mono text-gray-400">LIVE</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-gray-300">
                            <div>BPM: <span className="text-white">{telemetry.bio.bpm}</span></div>
                            <div>FATIGUE: <span className="text-white">{telemetry.bio.fatigue}</span></div>
                        </div>
                    </div>

                    {/* Match Data Stream */}
                    <div className={`p-4 border border-white/10 rounded bg-white/5 transition-all duration-500 delay-100 ${cycle === 0 ? 'border-electric shadow-[0_0_15px_rgba(45,214,255,0.2)]' : 'opacity-50'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-white flex items-center gap-2"><Trophy size={12} className="text-electric"/> MATCH DATA</span>
                            <span className="text-[8px] font-mono text-gray-400">FINAL</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-gray-300">
                            <div>SCORE: <span className="text-white">{telemetry.match.score}</span></div>
                            <div>ERRORS: <span className="text-white">{telemetry.match.unforced}</span></div>
                        </div>
                    </div>

                    {/* Movement Stream */}
                    <div className={`p-4 border border-white/10 rounded bg-white/5 transition-all duration-500 delay-200 ${cycle === 0 ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'opacity-50'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-white flex items-center gap-2"><MapPin size={12} className="text-white"/> MOVEMENT</span>
                            <span className="text-[8px] font-mono text-gray-400">TRACKING</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-gray-300">
                            <div>DIST: <span className="text-white">{telemetry.move.dist}</span></div>
                            <div>SPEED: <span className="text-white">{telemetry.move.speed}</span></div>
                        </div>
                    </div>
                </div>

                {/* COL 2: CROSS-REFERENCE ENGINE (40%) */}
                <div className="md:col-span-4 relative bg-black flex flex-col items-center justify-center border-r border-white/10 overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

                    {/* Central Animation */}
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        {/* Connecting Lines (Simulated Data Merge) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                             {/* Lines animating in based on cycle */}
                             <line x1="0" y1="50%" x2="50%" y2="50%" stroke="#ACFF01" strokeWidth="2" className={`transition-all duration-1000 ${cycle >= 1 ? 'opacity-100 stroke-dashoffset-0' : 'opacity-0'}`} />
                             <line x1="100%" y1="50%" x2="50%" y2="50%" stroke="#2DD6FF" strokeWidth="2" className={`transition-all duration-1000 ${cycle >= 1 ? 'opacity-100' : 'opacity-0'}`} />
                             <line x1="50%" y1="0" x2="50%" y2="50%" stroke="white" strokeWidth="2" className={`transition-all duration-1000 ${cycle >= 1 ? 'opacity-100' : 'opacity-0'}`} />
                        </svg>

                        {/* Central Core */}
                        <div className={`relative w-32 h-32 rounded-full border-2 flex items-center justify-center bg-black z-10 transition-all duration-500 ${cycle === 1 ? 'border-acid scale-110 shadow-[0_0_50px_rgba(172,255,1,0.4)]' : 'border-white/20'}`}>
                            {cycle === 0 && <Database size={32} className="text-gray-500 animate-pulse" />}
                            {cycle === 1 && <GitMerge size={32} className="text-acid animate-spin" />}
                            {cycle === 2 && <Check size={40} className="text-electric animate-bounce" />}
                            
                            {/* Scanning Radar Effect */}
                            <div className="absolute inset-0 rounded-full border border-dashed border-white/30 animate-[spin_10s_linear_infinite]"></div>
                        </div>

                        {/* Floating Labels */}
                        {cycle === 1 && (
                            <>
                                <div className="absolute top-10 right-0 bg-black border border-acid text-[8px] text-acid px-2 py-1 animate-pulse">CROSS-REFERENCING...</div>
                                <div className="absolute bottom-10 left-0 bg-black border border-electric text-[8px] text-electric px-2 py-1 animate-pulse delay-100">ELIMINATING BIAS...</div>
                            </>
                        )}
                    </div>

                    <div className="mt-8 text-center">
                        <div className="text-[10px] font-mono text-gray-500 tracking-widest mb-1">PLAYER ID: <span className="text-white">{playerId}</span></div>
                        <div className="h-1 w-48 bg-gray-800 rounded-full overflow-hidden mx-auto">
                            <div className="h-full bg-gradient-to-r from-acid to-electric transition-all duration-[3000ms] ease-linear" style={{ width: `${cycle === 0 ? 30 : cycle === 1 ? 70 : 100}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* COL 3: CLASSIFICATION OUTPUT (30%) */}
                <div className="md:col-span-4 bg-black/40 flex flex-col p-6 relative">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Target size={12} /> Classification Output
                    </div>

                    <div className="flex-1 flex flex-col justify-center space-y-8">
                        {/* Calculated Tier */}
                        <div>
                            <div className="text-[9px] font-mono text-gray-400 mb-1">DETECTED TIER</div>
                            <div className={`text-4xl font-black italic tracking-tighter transition-all duration-300 ${cycle === 2 ? 'text-white scale-110' : 'text-gray-700 blur-sm'}`}>
                                {cycle === 2 ? tier : "---"}
                            </div>
                        </div>

                        {/* Skill Score Gauge */}
                        <div>
                            <div className="text-[9px] font-mono text-gray-400 mb-2 flex justify-between">
                                <span>COMPOSITE SCORE</span>
                                <span className={cycle === 2 ? "text-acid" : "text-gray-700"}>{cycle === 2 ? "94.2" : "0.0"}</span>
                            </div>
                            <div className="w-full h-4 bg-gray-900 rounded-sm overflow-hidden border border-white/10 relative">
                                {/* Ticks */}
                                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10"></div>
                                <div className="absolute left-2/4 top-0 bottom-0 w-px bg-white/10"></div>
                                <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10"></div>
                                {/* Fill */}
                                <div className={`h-full bg-acid transition-all duration-1000 ${cycle === 2 ? 'w-[94%]' : 'w-0'}`}></div>
                            </div>
                            <div className="flex justify-between text-[8px] font-mono text-gray-600 mt-1">
                                <span>BEGINNER</span>
                                <span>PRO</span>
                                <span>ELITE</span>
                            </div>
                        </div>

                        {/* Final Rank */}
                        <div className={`p-4 bg-white/5 border border-white/10 rounded flex items-center justify-between transition-all duration-500 ${cycle === 2 ? 'border-electric bg-electric/10' : ''}`}>
                            <div className="text-[9px] font-mono text-gray-400">GLOBAL RANK</div>
                            <div className="text-2xl font-bold text-white font-mono flex items-center gap-2">
                                {cycle === 2 ? `#${finalRank}` : "---"}
                                {cycle === 2 && <ArrowDown size={14} className="text-acid rotate-180" />}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const PROTOCOL_STEPS = [
    { label: "Match Event", sub: "Raw Telemetry Input", icon: Swords, color: "text-white" },
    { label: "Smart Court Data", sub: "Sensors & Optical Tracking", icon: Wifi, color: "text-electric" },
    { label: "AI Analysis", sub: "Pattern Recognition", icon: Cpu, color: "text-acid" },
    { label: "Global Normalization", sub: "Bias Removal Algorithm", icon: Globe, color: "text-blue-400" },
    { label: "Rank Update", sub: "Live Ledger Sync", icon: Trophy, color: "text-yellow-400", isFinal: true },
];

const FlowArrow = () => (
    <div className="h-8 w-[1px] bg-gradient-to-b from-white/20 to-white/5"></div>
);

// --- UPDATED MOCK DATA ---
const PLAYERS = [
  { 
      rank: "01", name: "ALEJANDRO G.", country: "ESP", status: "ON COURT", statusType: "live",
      bpm: 154, pwr: 98, nrg: "High",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&h=900&fit=crop" 
  },
  { 
      rank: "03", name: "SOFIA R.", country: "ARG", status: "RECOVERY", statusType: "neutral",
      bpm: 68, pwr: 92, nrg: "Rest",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&h=900&fit=crop" 
  },
  { 
      rank: "08", name: "MARCUS T.", country: "SWE", status: "ON COURT", statusType: "live",
      bpm: 142, pwr: 88, nrg: "Med",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=900&fit=crop" 
  },
  { 
      rank: "12", name: "ELENA V.", country: "ITA", status: "TRAINING", statusType: "neutral",
      bpm: 120, pwr: 75, nrg: "High",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=900&fit=crop" 
  },
  { 
      rank: "15", name: "K. TANAKA", country: "JPN", status: "ON COURT", statusType: "live",
      bpm: 165, pwr: 91, nrg: "Low",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&h=900&fit=crop" 
  },
  { 
      rank: "22", name: "L. DUBOIS", country: "FRA", status: "ANALYZING", statusType: "processing",
      bpm: 0, pwr: 85, nrg: "---",
      img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600&h=900&fit=crop" 
  },
];

// --- NETFLIX STYLE CARD COMPONENT WITH ASSET ROUTING ---
const PlayerCard = ({ player }: { player: typeof PLAYERS[0] }) => {
    const [imgSrc, setImgSrc] = useState(player.img);

    useEffect(() => {
        // Asset Routing: Check for local override based on rank (e.g. player_01.jpg)
        const localSrc = `/assets/player_${player.rank}.jpg`;
        const img = new Image();
        img.src = localSrc;
        img.onload = () => setImgSrc(localSrc);
    }, [player.rank, player.img]);

    return (
        <div className="w-[280px] h-[400px] flex-shrink-0 relative group cursor-pointer overflow-hidden border border-white/10 hover:border-acid/50 transition-all duration-300 transform hover:scale-105 hover:z-20 bg-black">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src={imgSrc} 
                    alt={player.name} 
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
            </div>

            {/* Top Section: Rank & Live Badge */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10">
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Rank</span>
                    <span className="text-6xl font-black text-white leading-none tracking-tighter drop-shadow-lg">{player.rank}</span>
                </div>
                
                {player.statusType === 'live' && (
                    <div className="bg-acid text-black px-2 py-1 text-[10px] font-bold font-mono uppercase animate-pulse shadow-[0_0_10px_#ACFF01]">
                        LIVE
                    </div>
                )}
            </div>

            {/* Middle Content */}
            <div className="absolute bottom-20 left-0 w-full px-4 z-10">
                <div className="flex gap-2 mb-2">
                     <span className="bg-white text-black px-1.5 py-0.5 text-[10px] font-bold font-mono">{player.country}</span>
                     <span className="bg-black/80 text-gray-300 px-1.5 py-0.5 text-[10px] font-mono border border-white/20 uppercase">{player.status}</span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{player.name}</h3>
            </div>

            {/* Bottom Stats Footer */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-carbon/90 backdrop-blur-md border-t border-white/10 flex divide-x divide-white/10 z-10">
                <StatBox icon={Heart} label="BPM" value={player.bpm > 0 ? player.bpm.toString() : '--'} color="text-acid" />
                <StatBox icon={Zap} label="PWR" value={`${player.pwr}%`} color="text-yellow-400" />
                <StatBox icon={Battery} label="NRG" value={player.nrg} color="text-electric" />
            </div>

            {/* Hover Scanline */}
            <div className="absolute top-0 left-0 w-full h-1 bg-acid/50 shadow-[0_0_15px_#ACFF01] opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none z-20"></div>
        </div>
    );
}

const StatBox = ({ icon: Icon, label, value, color }: any) => (
    <div className="flex-1 flex flex-col items-center justify-center p-1 group/stat hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-1 text-[9px] font-mono text-gray-500 uppercase mb-0.5">
            <Icon size={10} className={`group-hover/stat:${color} transition-colors`} /> {label}
        </div>
        <div className="text-sm font-bold text-white font-mono">{value}</div>
    </div>
);

export default PrincipleSection;
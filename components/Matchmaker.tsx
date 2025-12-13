import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Crosshair, Swords } from 'lucide-react';

interface MatchmakerProps {
    autoPlay?: boolean;
}

const SIMULATION_STEPS = [
  { label: "STYLE_COMPATIBILITY", color: "#ACFF01" },
  { label: "RALLY_LENGTH_MATCH", color: "#2DD6FF" },
  { label: "FATIGUE_LEVEL", color: "#ffffff" },
  { label: "ATTITUDE_MATRIX", color: "#ACFF01" },
  { label: "HISTORICAL_PERF", color: "#2DD6FF" },
  { label: "SKILL_GAP_SCORE", color: "#ffffff" },
];

const Matchmaker: React.FC<MatchmakerProps> = ({ autoPlay }) => {
  const [matching, setMatching] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (autoPlay && !matching && !result) {
        runSimulation();
    }
  }, [autoPlay]);

  const runSimulation = () => {
    setMatching(true);
    setResult(null);
    setTimeout(() => {
        setMatching(false);
        setResult({
            quality: 91,
            intensity: 'HIGH',
            balance: 'IDEAL',
            prob: 54
        });
    }, 4000); // 4s for animation
  };

  return (
    <section className="relative overflow-hidden py-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-black text-white/[0.02] pointer-events-none select-none leading-none z-0">
            VS
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="space-y-4">
                 <h2 className="text-5xl font-black uppercase text-white tracking-tighter">Match<br/><span className="text-electric">Simulation</span></h2>
                 <p className="text-gray-400 font-mono text-xs max-w-md border-l-2 border-electric pl-4 leading-relaxed">
                     RUNNING PROPRIETARY MATCHMAKING ALGORITHM. <br/>
                     <span className="text-electric">48+ DATA POINTS</span> INCLUDING FATIGUE & STYLE.
                 </p>
            </div>
            <button 
                onClick={runSimulation}
                disabled={matching}
                className="mt-8 md:mt-0 flex items-center gap-4 px-10 py-5 bg-black border border-acid text-acid hover:bg-acid hover:text-black transition-all uppercase font-mono text-xs tracking-[0.2em] font-bold disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(172,255,1,0.1)] hover:shadow-[0_0_30px_rgba(172,255,1,0.4)]"
            >
                <Crosshair size={18} className={`group-hover:rotate-90 transition-transform duration-500 ${matching ? 'animate-spin' : ''}`} /> 
                {matching ? 'PROCESSING...' : 'INITIATE SIM'}
            </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center min-h-[400px]">
            <PlayerCard 
                name="PLAYER A" 
                style="AGGRESSIVE" 
                tier="TIER 2" 
                color="from-blue-500 to-blue-900" 
                isMatching={matching} 
                side="left"
            />

            <div className="relative flex flex-col items-center justify-center h-full w-full">
                {matching && (
                    <div className="z-30 w-full max-w-sm bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-xl relative overflow-hidden shadow-2xl animate-in fade-in duration-300">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-acid/5 to-transparent animate-scan pointer-events-none opacity-20"></div>
                        
                        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
                             <div className="flex items-center gap-2 text-[10px] font-mono text-acid animate-pulse">
                                <span className="w-1.5 h-1.5 bg-acid rounded-full"></span>
                                PROCESSING TELEMETRY
                             </div>
                             <span className="text-[10px] font-mono text-gray-500">THREAD_01</span>
                        </div>
                        
                        <div className="space-y-5">
                            {SIMULATION_STEPS.map((step, i) => (
                                <SimulationBar key={i} label={step.label} color={step.color} index={i} />
                            ))}
                        </div>

                         <div className="mt-6 pt-4 border-t border-white/10 text-center">
                             <div className="text-[9px] text-gray-500 font-mono animate-pulse">CALCULATING PREDICTIVE OUTCOME...</div>
                         </div>
                    </div>
                )}
                
                {!matching && !result && (
                    <div className="flex flex-col items-center justify-center animate-pulse opacity-50">
                        <Swords size={64} className="text-gray-600 mb-4" />
                        <div className="text-[10px] font-mono text-gray-500 tracking-[0.5em]">SYSTEM IDLE</div>
                    </div>
                )}

                {result && !matching && (
                    <div className="w-full space-y-8 animate-in zoom-in duration-500 flex flex-col items-center">
                         <div className="text-center relative">
                            <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter drop-shadow-2xl filter">{result.quality}%</div>
                            <div className="text-[10px] font-mono text-acid tracking-[0.3em] uppercase mt-2 border px-2 py-1 border-acid/30 inline-block bg-acid/10">Match Quality</div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-black/50 backdrop-blur p-4 text-center border border-white/10 hover:border-acid/50 transition-colors">
                                <div className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">Intensity</div>
                                <div className="text-acid text-xl font-black tracking-tight">{result.intensity}</div>
                            </div>
                            <div className="bg-black/50 backdrop-blur p-4 text-center border border-white/10 hover:border-electric/50 transition-colors">
                                <div className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">Balance</div>
                                <div className="text-electric text-xl font-black tracking-tight">{result.balance}</div>
                            </div>
                         </div>
                         <div className="text-center">
                             <p className="text-[10px] font-mono text-gray-500">WIN PROBABILITY: <span className="text-white">{result.prob}%</span> / <span className="text-gray-600">{100-result.prob}%</span></p>
                             <div className="w-32 h-1 bg-gray-800 mx-auto mt-2 rounded-full overflow-hidden">
                                 <div className="h-full bg-white" style={{ width: `${result.prob}%` }}></div>
                             </div>
                         </div>
                    </div>
                )}
            </div>

            <PlayerCard 
                name="PLAYER B" 
                style="COUNTER" 
                tier="TIER 2" 
                color="from-red-500 to-red-900" 
                isMatching={matching} 
                side="right"
            />
        </div>
    </section>
  );
};

interface SimulationBarProps {
  label: string;
  color: string;
  index: number;
}

const SimulationBar: React.FC<SimulationBarProps> = ({ label, color, index }) => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        const startDelay = index * 500;
        const timer = setTimeout(() => {
            setProgress(Math.floor(Math.random() * 25) + 75);
        }, startDelay);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className="space-y-1">
             <div className="flex justify-between text-[9px] font-mono uppercase text-gray-400 tracking-wider">
                 <span>{label.replace(/_/g, ' ')}</span>
                 <span className={progress > 0 ? "text-white" : "opacity-0"}>{Math.floor(progress)}%</span>
             </div>
             <div className="h-1 bg-gray-800/50 w-full overflow-hidden">
                 <div 
                    className="h-full transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)" 
                    style={{ width: `${progress}%`, backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                 ></div>
             </div>
        </div>
    )
}

const PlayerCard = ({ name, style, tier, color, isMatching, side }: any) => (
    <div className={`glass-panel p-10 flex flex-col items-center justify-center transition-all duration-700 transform border border-white/10 ${isMatching ? 'scale-90 opacity-40 blur-[2px]' : 'scale-100 opacity-100'} hover:border-white/30`}>
        <div className={`w-32 h-32 rounded-full bg-gray-900 mb-8 border-4 border-black relative overflow-hidden shadow-2xl ${side === 'left' ? 'shadow-blue-900/20' : 'shadow-red-900/20'}`}>
             <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-40`}></div>
             <div className="absolute inset-0 flex items-center justify-center text-white/20">
                 <Swords size={40} />
             </div>
        </div>
        <h3 className="text-2xl font-black tracking-tighter text-white">{name}</h3>
        <div className="text-[10px] font-mono text-gray-400 mt-2 bg-white/5 px-3 py-1 rounded border border-white/5 uppercase tracking-widest">
            {style} // {tier}
        </div>
        
        <div className="w-full mt-6 space-y-2 opacity-50">
            <div className="h-[2px] bg-gray-800 w-full rounded-full overflow-hidden"><div className="h-full bg-gray-600 w-3/4"></div></div>
            <div className="h-[2px] bg-gray-800 w-full rounded-full overflow-hidden"><div className="h-full bg-gray-600 w-1/2"></div></div>
        </div>
    </div>
);

export default Matchmaker;
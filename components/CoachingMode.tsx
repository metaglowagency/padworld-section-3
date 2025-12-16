import React, { useState, useEffect } from 'react';
import { generateCoachingTip } from '../services/geminiService';
import { Video, Scan, Activity } from 'lucide-react';

interface CoachingModeProps {
    autoPlay?: boolean;
}

const CoachingMode: React.FC<CoachingModeProps> = ({ autoPlay }) => {
    const [advice, setAdvice] = useState<string>("Scanning playstyle...");
    const [analyzing, setAnalyzing] = useState(false);
    const [bgSrc, setBgSrc] = useState('https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2669&auto=format&fit=crop'); // Default Court Image

    useEffect(() => {
        // Asset Routing: Check for local background override
        const img = new Image();
        img.src = '/assets/coaching_bg.jpg';
        img.onload = () => setBgSrc('/assets/coaching_bg.jpg');
    }, []);

    useEffect(() => {
        if (autoPlay && !analyzing && advice === "Scanning playstyle...") {
            handleAnalyze();
        }
    }, [autoPlay]);

    const handleAnalyze = async () => {
        setAnalyzing(true);
        setAdvice("ANALYZING BIOMECHANICS...");
        setTimeout(async () => {
            const tip = await generateCoachingTip("weak net volley");
            setAdvice(tip);
            setAnalyzing(false);
        }, 1500);
    };

    return (
        <section className="py-20 border-t border-white/10">
            <div className="mb-16 flex items-end justify-between">
                <div>
                    <h2 className="text-5xl font-black uppercase text-white mb-2">Live Performance<br/><span className="text-acid">Coaching</span></h2>
                    <p className="text-gray-500 font-mono text-xs tracking-widest">REAL-TIME BIOMETRIC FEEDBACK LOOP</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-acid font-mono text-xs">
                    <span className="w-2 h-2 bg-acid rounded-full animate-pulse"></span>
                    SYSTEM ACTIVE
                </div>
            </div>

            <div className="grid md:grid-cols-12 gap-6 h-[600px]">
                <div className="md:col-span-8 bg-black border-2 border-white/10 relative overflow-hidden group">
                    {/* Background Image with Asset Routing */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity transition-all duration-1000 group-hover:scale-105"
                        style={{ backgroundImage: `url(${bgSrc})` }}
                    ></div>
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                         <div className="flex justify-between items-start">
                             <div className="flex items-center gap-4 bg-black/60 backdrop-blur px-4 py-2 border-l-2 border-red-500">
                                 <div className="text-red-500 font-mono text-xs animate-pulse">● REC</div>
                                 <div className="text-white font-mono text-xs">CAM_01</div>
                             </div>
                             <div className="text-electric font-mono text-2xl tracking-tighter">00:42:19:12</div>
                         </div>
                         
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-acid/30 flex items-center justify-center transition-all duration-300">
                            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-acid"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-acid"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-acid"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-acid"></div>
                            
                            <div className={`w-full h-[1px] bg-acid/50 absolute top-1/2 ${analyzing ? 'animate-scan' : ''}`}></div>
                            <div className="text-[10px] text-acid font-mono absolute -bottom-6">TARGET_LOCK: CONFIRMED</div>
                         </div>

                         <div className="absolute top-20 right-6 text-[9px] font-mono text-acid/80 space-y-1 text-right">
                             <div>VELOCITY: 42.3 m/s</div>
                             <div>ANGLE: 12.4 deg</div>
                             <div>SPIN_RATE: 2400 rpm</div>
                         </div>

                         <div className="flex items-end justify-between">
                            <div className="bg-black/80 backdrop-blur-md p-6 border-l-4 border-acid max-w-lg w-full shadow-2xl">
                                <div className="text-[10px] text-gray-400 font-mono mb-2 flex items-center gap-2">
                                    <Scan size={12} /> AI COACHING DIRECTIVE
                                </div>
                                <p className="text-white text-xl font-bold uppercase leading-none tracking-tight min-h-[3rem]">
                                    {analyzing ? <span className="animate-pulse">DECODING MOVEMENT PATTERNS...</span> : advice}
                                </p>
                            </div>
                            
                            <button 
                                onClick={handleAnalyze}
                                disabled={analyzing}
                                className="bg-acid text-black p-4 hover:bg-white transition-colors"
                            >
                                <Activity size={24} className={analyzing ? 'animate-spin' : ''} />
                            </button>
                         </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:50px_50px] pointer-events-none"></div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-4">
                    {[
                        { label: "Shot Accuracy", val: "87%", bar: 87 },
                        { label: "Reaction Time", val: "0.41s", color: "text-acid", bar: 92 },
                        { label: "Backhand Stability", val: "92%", bar: 92 },
                        { label: "Serve Depth", val: "1.2m", bar: 75 },
                    ].map((stat, i) => (
                        <div key={i} className="glass-panel p-6 flex flex-col justify-center">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{stat.label}</span>
                                <span className={`text-2xl font-bold font-mono ${stat.color || 'text-white'}`}>{stat.val}</span>
                            </div>
                            <div className="h-1 bg-gray-800 w-full">
                                <div className="h-full bg-white" style={{ width: `${stat.bar}%` }}></div>
                            </div>
                        </div>
                    ))}
                    
                    <div className="flex-1 glass-panel border border-electric/30 p-6 flex flex-col justify-center items-center text-center space-y-4 bg-gradient-to-b from-electric/5 to-transparent">
                        <div className="w-16 h-16 rounded-full border-2 border-electric flex items-center justify-center animate-pulse">
                            <span className="text-electric font-bold text-xl">AI</span>
                        </div>
                        <p className="text-xs text-gray-300 font-mono leading-relaxed">
                            "Live connection active. Latency: 14ms. Ready for tactical injection."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoachingMode;
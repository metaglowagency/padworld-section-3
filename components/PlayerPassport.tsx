import React, { useState, useEffect } from 'react';
import { generatePlayerAnalysis } from '../services/geminiService';
import { PlayerProfile, PlayerStats } from '../types';
import { User, Shield, Target, Zap, Fingerprint, ScanLine } from 'lucide-react';

interface PlayerPassportProps {
    autoPlay?: boolean;
}

const PlayerPassport: React.FC<PlayerPassportProps> = ({ autoPlay }) => {
  const [profile, setProfile] = useState<PlayerProfile>({
    name: '',
    age: 25,
    style: 'Aggressive',
    level: 'Intermediate',
    country: 'Spain'
  });
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-play trigger
  useEffect(() => {
      if (autoPlay && !stats && !loading) {
          handleGenerate();
      }
  }, [autoPlay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    
    const aiData = await generatePlayerAnalysis(profile.age, profile.style, profile.level);
    
    const mockStats: PlayerStats = {
      aggressionIndex: profile.style === 'Aggressive' ? 88 : 45,
      rallyPatience: profile.style === 'Defensive' ? 92 : 60,
      netCoverage: profile.level === 'Pro' ? 95 : 70,
      ranking: Math.floor(Math.random() * 5000) + 1,
      improvementTime: aiData.improvement,
      aiSummary: aiData.summary,
    };

    setStats(mockStats);
    setLoading(false);
  };

  return (
    <section className="relative grid md:grid-cols-12 gap-16 pt-10">
      
      {/* LEFT: INPUT TERMINAL */}
      <div className="md:col-span-4 space-y-8 z-20">
        <div className="space-y-2">
            <h2 className="text-5xl font-black uppercase text-white leading-none tracking-tighter">Identity<br/><span className="text-gray-600">Matrix</span></h2>
            <div className="h-[2px] w-20 bg-acid"></div>
            <p className="text-gray-500 font-mono text-[10px] tracking-widest pt-2">
                INPUT BIOMETRIC DATA FOR AI GENERATION
            </p>
        </div>

        <div className="space-y-6 p-8 glass-panel rounded-lg relative overflow-hidden border border-white/10 group hover:border-acid/30 transition-colors">
            <div className="absolute -top-10 -right-10 opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-700"><Fingerprint size={200} /></div>
            
            <div className="space-y-6 relative z-10">
                <div>
                    <label className="text-[10px] font-mono text-acid block mb-2 tracking-wider">COMBAT STYLE</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Aggressive', 'Counter', 'Defensive'].map(opt => (
                            <button 
                                key={opt}
                                onClick={() => setProfile({...profile, style: opt as any})}
                                className={`py-3 text-[10px] font-mono border uppercase tracking-tighter transition-all duration-300 ${profile.style === opt ? 'bg-acid text-black border-acid shadow-[0_0_15px_rgba(172,255,1,0.4)]' : 'border-white/10 text-gray-500 hover:border-white/40 hover:text-white'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-mono text-acid block mb-2 tracking-wider">SKILL TIER</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-black/50 border border-white/20 text-white p-3 text-sm focus:border-acid outline-none font-mono uppercase appearance-none"
                            value={profile.level}
                            onChange={(e) => setProfile({...profile, level: e.target.value as any})}
                        >
                            <option>Amateur</option>
                            <option>Intermediate</option>
                            <option>Pro</option>
                        </select>
                        <div className="absolute right-3 top-3 text-acid pointer-events-none text-xs">▼</div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                         <label className="text-[10px] font-mono text-acid tracking-wider">BIOLOGICAL AGE</label>
                         <span className="text-[10px] font-mono text-white">{profile.age} YRS</span>
                    </div>
                    <input 
                        type="range" min="16" max="60" 
                        className="w-full accent-acid h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        value={profile.age}
                        onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                    />
                </div>
                
                <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-acid transition-all disabled:opacity-50 relative overflow-hidden group clip-path-slant"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? <ScanLine className="animate-spin" size={16}/> : <Fingerprint size={16}/>}
                        {loading ? 'ANALYZING...' : 'GENERATE ID'}
                    </span>
                </button>
            </div>
        </div>
      </div>

      {/* RIGHT: OUTPUT HOLOGRAM */}
      <div className="md:col-span-8 flex items-center justify-center relative min-h-[500px] perspective-1000">
        
        {loading && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                 <div className="w-full h-1 bg-acid/50 absolute top-0 animate-[scan_2s_ease-in-out_infinite]"></div>
                 <div className="font-mono text-acid text-xs tracking-[0.5em] animate-pulse">COMPILING BIOMETRICS...</div>
             </div>
        )}

        {!stats && !loading && (
            <div className="w-full h-full flex flex-col items-center justify-center border border-white/5 bg-white/5 rounded-xl animate-pulse backdrop-blur-sm">
                <div className="w-32 h-32 border-4 border-t-acid border-r-transparent border-b-electric border-l-transparent rounded-full animate-spin mb-6 opacity-50"></div>
                <p className="font-mono text-xs text-gray-500 tracking-widest">AWAITING DATA STREAM...</p>
            </div>
        )}

        {stats && !loading && (
            <div 
                className="w-full max-w-2xl transition-transform duration-100 ease-out z-20"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="glass-panel p-10 relative overflow-hidden group rounded-xl border border-white/10 shadow-[0_0_100px_rgba(172,255,1,0.1)]">
                    <div className="absolute inset-0 bg-holo-grid opacity-20 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="flex justify-between items-start mb-12 relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 bg-acid rounded-full animate-pulse"></span>
                                <h3 className="text-electric font-mono text-[10px] tracking-[0.3em]">PADCHAT ID // {Math.floor(Math.random()*99999)}</h3>
                            </div>
                            <h2 className="text-6xl font-black text-white uppercase tracking-tighter drop-shadow-lg">{profile.level}</h2>
                            <div className="text-xl text-gray-400 font-mono mt-1 border-b border-white/10 pb-4 inline-block">{profile.style} Specialist</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-full border border-white/10 group-hover:border-acid/50 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            <User className="w-12 h-12 text-acid" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mb-12 relative z-10">
                        <StatBar label="Aggression" value={stats.aggressionIndex} icon={Zap} color="text-acid" />
                        <StatBar label="Patience" value={stats.rallyPatience} icon={Shield} color="text-electric" />
                        <StatBar label="Precision" value={stats.netCoverage} icon={Target} color="text-white" />
                    </div>

                    <div className="bg-black/60 p-6 border-l-4 border-acid flex flex-col md:flex-row gap-8 backdrop-blur-xl relative z-10">
                        <div className="flex-1">
                            <div className="text-[9px] font-mono text-gray-500 mb-2 uppercase tracking-widest">AI Tactical Analysis</div>
                            <p className="text-sm text-gray-200 font-medium leading-relaxed font-mono">
                                <span className="text-acid mr-2">{'>'}</span> 
                                "{stats.aiSummary}"
                            </p>
                        </div>
                        <div className="md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                             <div className="text-[9px] font-mono text-gray-500 mb-1 uppercase tracking-widest">Proj. Upgrade</div>
                             <div className="text-4xl font-mono text-white tracking-tighter">{stats.improvementTime}</div>
                             <div className="text-[8px] text-acid font-mono uppercase tracking-[0.2em]">ESTIMATED</div>
                        </div>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-acid/5 to-transparent opacity-20 animate-scan pointer-events-none"></div>
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

const StatBar = ({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) => (
    <div className="space-y-3 group/stat">
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 tracking-wider">
            <span className="flex items-center gap-2 group-hover/stat:text-white transition-colors"><Icon size={12} className={color} /> {label.toUpperCase()}</span>
            <span className="text-white font-bold">{value}%</span>
        </div>
        <div className="h-1 bg-gray-800 w-full rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r from-transparent to-current ${color} shadow-[0_0_10px_currentColor]`} style={{ width: `${value}%`, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
        </div>
    </div>
);

export default PlayerPassport;
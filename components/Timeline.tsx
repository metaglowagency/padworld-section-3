import React, { useEffect, useState } from 'react';

interface TimelineProps {
    autoPlay?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ autoPlay }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    
    // Animate through steps
    let i = 0;
    const interval = setInterval(() => {
        setActiveIndex(i);
        i++;
        if (i > 3) i = 0;
    }, 1500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const steps = [
    { time: "TODAY", rank: "4213", desc: "Strength: Endurance Rally", active: true },
    { time: "+3 MONTHS", rank: "2710", desc: "Improvement: +34% Backhand Depth", active: false },
    { time: "+6 MONTHS", rank: "TOP 15%", desc: "FastPad Score: +12%", active: false },
    { time: "1 YEAR", rank: "NATIONALS", desc: "Potential to reach National Tournaments", active: false },
  ];

  return (
    <section className="py-20 border-t border-white/10">
         <h2 className="text-4xl font-black uppercase text-white mb-12">Progression<br/>Forecast</h2>
         
         <div className="relative border-l-2 border-white/10 ml-4 md:ml-12 space-y-12">
            {steps.map((step, index) => {
                const isActive = autoPlay ? index === activeIndex : step.active;
                return (
                    <div key={index} className="relative pl-8 md:pl-12 group">
                        <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 transition-all duration-500 ${isActive ? 'bg-acid border-acid shadow-[0_0_15px_rgba(172,255,1,0.6)] scale-125' : 'bg-void border-gray-600 group-hover:border-electric'}`}></div>
                        
                        <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-x-2' : 'opacity-50 group-hover:opacity-100'}`}>
                            <div className="text-[10px] font-mono text-electric mb-1">{step.time}</div>
                            <div className="text-3xl font-black text-white mb-1 uppercase">{step.rank}</div>
                            <div className="text-sm font-light text-gray-400">{step.desc}</div>
                        </div>
                    </div>
                );
            })}
         </div>
         
         <div className="mt-12 ml-4 md:ml-12 p-4 bg-gradient-to-r from-electric/10 to-transparent border-l-4 border-electric">
             <p className="text-electric text-sm font-mono">
                 AI PREDICTION CONFIDENCE: 89.4%
             </p>
         </div>
    </section>
  );
};

export default Timeline;
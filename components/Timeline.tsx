import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, Target, ArrowUpRight } from 'lucide-react';

interface TimelineProps {
    autoPlay?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ autoPlay }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-play sequence
  useEffect(() => {
    if (!autoPlay) return;
    
    // Animate through steps
    let i = 0;
    const interval = setInterval(() => {
        setActiveIndex(i);
        i++;
        if (i > 3) i = 0;
    }, 2000); // Slightly slower to let user see graph update
    return () => clearInterval(interval);
  }, [autoPlay]);

  const steps = [
    { time: "TODAY", rank: "4213", desc: "Strength: Endurance Rally", percent: 20 },
    { time: "+3 MO", rank: "2710", desc: "Improvement: +34% Backhand", percent: 45 },
    { time: "+6 MO", rank: "TOP 15%", desc: "FastPad Score: +12%", percent: 70 },
    { time: "1 YEAR", rank: "NATIONALS", desc: "Elite Tier Qualification", percent: 95 },
  ];

  // SVG Configuration
  const width = 500;
  const height = 300;
  const padding = 50;
  
  // Calculate points for the curve
  // X is distributed evenly, Y is inverted based on percent (100% is top)
  const points = steps.map((step, i) => {
      const x = padding + (i * ((width - padding * 2) / (steps.length - 1)));
      const y = height - padding - (step.percent / 100) * (height - padding * 2);
      return { x, y, ...step };
  });

  // Generate Smooth Bezier Path
  const pathData = points.reduce((acc, point, i, a) => {
      if (i === 0) return `M ${point.x},${point.y}`;
      // Simple smoothing using previous point
      const cpsX = (a[i-1].x + point.x) / 2;
      return `${acc} C ${cpsX},${a[i-1].y} ${cpsX},${point.y} ${point.x},${point.y}`;
  }, "");

  // Area under curve
  const areaPath = `${pathData} L ${width-padding},${height-padding} L ${padding},${height-padding} Z`;

  return (
    <section ref={sectionRef} className="py-20 border-t border-white/10 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-20">
             <TrendingUp size={100} className="text-white" />
         </div>

         <div className="mb-12">
            <h2 className="text-4xl font-black uppercase text-white mb-2">Progression<br/><span className="text-acid">Forecast</span></h2>
            <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">AI-CALCULATED TRAJECTORY</p>
         </div>
         
         <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: TEXT TIMELINE */}
            <div className="md:col-span-5 space-y-8 relative">
                {/* Connecting Line */}
                <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gray-800"></div>
                
                {steps.map((step, index) => {
                    const isActive = autoPlay ? index === activeIndex : (isVisible && index === activeIndex); 
                    const isHighlighted = autoPlay ? index === activeIndex : true; 

                    return (
                        <div 
                            key={index} 
                            className={`relative pl-8 group cursor-pointer transition-all duration-500 ${isHighlighted ? 'opacity-100' : 'opacity-40'}`}
                            onMouseEnter={() => !autoPlay && setActiveIndex(index)}
                        >
                            <div className={`absolute -left-[5px] top-2 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 bg-black ${index === activeIndex ? 'border-acid bg-acid scale-110 shadow-[0_0_10px_#ACFF01]' : 'border-gray-600 group-hover:border-white'}`}></div>
                            
                            <div className="transform transition-transform duration-500">
                                <div className="text-[10px] font-mono text-electric mb-1 flex items-center gap-2">
                                    {step.time} 
                                    {index === 3 && <Target size={12} className="text-acid animate-pulse"/>}
                                </div>
                                <div className="text-2xl font-black text-white mb-1 uppercase tracking-tight">{step.rank}</div>
                                <div className="text-xs font-light text-gray-400 font-mono">{step.desc}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* RIGHT: FUTURISTIC GRAPH */}
            <div className="md:col-span-7">
                <div className="relative glass-panel p-2 md:p-6 border border-white/10 rounded-xl overflow-hidden group/graph bg-black/40">
                    {/* Graph Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
                    
                    <div className="relative z-10 w-full h-full aspect-video">
                        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                            {/* Defs for Gradients */}
                            <defs>
                                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#2DD6FF" />
                                    <stop offset="100%" stopColor="#ACFF01" />
                                </linearGradient>
                                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ACFF01" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#ACFF01" stopOpacity="0" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Background Watermark Text */}
                            <text x="50%" y="40%" textAnchor="middle" className="text-6xl font-black fill-white/[0.03] uppercase tracking-tighter select-none">
                                Trajectory
                            </text>

                            {/* Y-Axis Labels */}
                            <text x={padding - 10} y={height - padding} textAnchor="end" className="text-[9px] fill-gray-500 font-mono tracking-wider">AMATEUR</text>
                            <text x={padding - 10} y={height / 2} textAnchor="end" className="text-[9px] fill-gray-500 font-mono tracking-wider">ADVANCED</text>
                            <text x={padding - 10} y={padding} textAnchor="end" className="text-[9px] fill-acid font-mono tracking-wider font-bold">ELITE</text>

                            {/* Horizontal Grid Lines */}
                            {[0.2, 0.5, 0.8].map((tick, i) => (
                                <line 
                                    key={i}
                                    x1={padding} 
                                    y1={height - padding - (tick * (height - padding * 2))} 
                                    x2={width - padding} 
                                    y2={height - padding - (tick * (height - padding * 2))} 
                                    stroke="rgba(255,255,255,0.05)" 
                                    strokeDasharray="4 4"
                                />
                            ))}

                            {/* The Area Under Curve */}
                            <path 
                                d={areaPath} 
                                fill="url(#areaGradient)" 
                                className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                            />

                            {/* The Line Curve */}
                            <path 
                                d={pathData} 
                                fill="none" 
                                stroke="url(#lineGradient)" 
                                strokeWidth="3" 
                                filter="url(#glow)"
                                strokeLinecap="round"
                                strokeDasharray="1000"
                                strokeDashoffset={isVisible ? 0 : 1000}
                                className="transition-all duration-[2000ms] ease-out"
                            />

                            {/* X-Axis Labels & Points */}
                            {points.map((p, i) => (
                                <g key={i}>
                                    {/* X-Axis Label */}
                                    <text x={p.x} y={height - padding + 20} textAnchor="middle" className="text-[9px] fill-gray-400 font-mono uppercase tracking-widest">
                                        {p.time}
                                    </text>

                                    {/* Pulse Effect for Active Point */}
                                    <circle 
                                        cx={p.x} cy={p.y} r={activeIndex === i ? 15 : 0} 
                                        fill="none" 
                                        stroke="#ACFF01" 
                                        strokeOpacity="0.3"
                                        className="transition-all duration-300"
                                    />
                                    {/* The Dot */}
                                    <circle 
                                        cx={p.x} cy={p.y} r={5} 
                                        fill="#000" 
                                        stroke={i <= activeIndex ? "#ACFF01" : "#555"} 
                                        strokeWidth="2"
                                        className="transition-colors duration-300"
                                    />
                                    
                                    {/* Hover Rank Tooltip */}
                                    <text 
                                        x={p.x} y={p.y - 15} 
                                        textAnchor="middle" 
                                        className={`text-[8px] font-mono fill-white transition-opacity duration-300 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        #{p.rank}
                                    </text>
                                </g>
                            ))}

                             {/* Final Target Annotation */}
                             {isVisible && (
                                <g transform={`translate(${points[points.length-1].x - 60}, ${points[points.length-1].y + 40})`}>
                                    <path d="M60,-30 L60,-10" stroke="#ACFF01" strokeWidth="1" strokeDasharray="2 2" />
                                    <rect x="0" y="-10" width="120" height="20" fill="#ACFF01" fillOpacity="0.1" stroke="#ACFF01" strokeWidth="1" rx="2" />
                                    <text x="60" y="3" textAnchor="middle" className="text-[9px] fill-acid font-mono font-bold tracking-wider uppercase">Projected Elite Entry</text>
                                </g>
                             )}
                        </svg>
                    </div>

                    {/* Floating HUD Stats */}
                    <div className="absolute top-4 right-4 text-right">
                         <div className="text-[9px] text-gray-500 font-mono mb-1">PREDICTION CONFIDENCE</div>
                         <div className="text-xl font-bold text-white font-mono tracking-tight">89.4%</div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 text-left">
                         <div className="text-[9px] text-gray-500 font-mono mb-1 uppercase">Growth Velocity</div>
                         <div className="flex items-center gap-1 text-acid font-mono text-sm">
                             <ArrowUpRight size={14} /> +340 pts/mo
                         </div>
                    </div>
                </div>
            </div>
         </div>
    </section>
  );
};

export default Timeline;
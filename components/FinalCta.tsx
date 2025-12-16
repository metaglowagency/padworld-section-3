import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

const FinalCta: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 } // Trigger when 40% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
        ref={sectionRef} 
        className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-16 relative overflow-hidden py-32"
    >
        {/* Background ambience */}
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] transition-opacity duration-1000 pointer-events-none ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

        <div className="space-y-8 relative z-10 max-w-5xl px-4">
            
            {/* Line 1: Impact Statement */}
            <div className="overflow-hidden pb-2">
                <h2 
                    className={`text-5xl md:text-8xl font-black text-white uppercase leading-[0.9] tracking-tighter transform transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                >
                    PadChat is <br className="hidden md:block" />
                    <span className="relative inline-block">
                        not an app
                        {/* Strikethrough Animation */}
                        <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-red-600 transition-all duration-700 delay-1000 ease-out ${isVisible ? 'w-full' : 'w-0'}`}></span>
                    </span>.
                </h2>
            </div>

            {/* Line 2: The Reveal */}
            <div className="overflow-hidden pt-2">
                <p 
                    className={`text-xl md:text-4xl text-gray-400 font-light transform transition-all duration-1000 delay-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                >
                    It is the <span className={`text-acid font-mono inline-block transition-all duration-500 delay-1000 ${isVisible ? 'bg-acid/10 px-2' : ''}`}>intelligence layer</span> behind global padel.
                </p>
            </div>
        </div>

        {/* Action Button */}
        <div className={`transform transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button className="group relative px-12 py-6 bg-black border border-acid text-acid font-black text-xl uppercase tracking-widest overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(172,255,1,0.4)] hover:scale-105">
                <div className="absolute inset-0 bg-acid translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                <span className="relative z-10 flex items-center gap-4 group-hover:text-black transition-colors">
                    Continue to Section 4 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
            </button>
        </div>

        {/* Footer Terminal Text */}
        <div className={`transform transition-all duration-1000 delay-1500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
             <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono text-gray-600 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
                <Terminal size={14} className="text-acid animate-pulse" />
                <span className="tracking-widest">BUSINESS_MODEL_INTELLIGENCE // <span className="text-white animate-pulse">LOADING...</span></span>
             </div>
        </div>

        {/* Cinematic horizontal line expansion */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-acid/50 to-transparent transition-all duration-[2000ms] delay-500 ease-out ${isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
    </section>
  );
};

export default FinalCta;
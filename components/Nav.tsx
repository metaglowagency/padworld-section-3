import React from 'react';
import { Volume2, VolumeX, Activity, Disc, PlayCircle, Radio } from 'lucide-react';

interface NavProps {
  isMuted: boolean;
  toggleMute: () => void;
  onStartAuto: () => void;
  isAutoMode: boolean;
}

const Nav: React.FC<NavProps> = ({ isMuted, toggleMute, onStartAuto, isAutoMode }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-start mix-blend-exclusion pointer-events-none select-none">
      {/* Left: Brand Name & OS Status */}
      <div className="flex flex-col gap-1 pointer-events-auto">
        <div className="font-sans font-black text-2xl tracking-tighter leading-none text-white">
          pad<span className="text-acid">world</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 tracking-widest opacity-80">
            <Disc size={10} className="text-acid animate-[spin_3s_linear_infinite]"/>
            <span>PADCHAT_OS v3.1 <span className="text-gray-600">//</span> LOADED</span>
        </div>
      </div>
      
      {/* Right: Technical Data Group */}
      <div className="hidden md:flex items-center gap-6 text-[10px] font-mono tracking-widest text-gray-400 uppercase pointer-events-auto">
         
         {/* Autonomous Demo Trigger */}
         <button 
            onClick={onStartAuto}
            className={`flex items-center gap-2 border px-3 py-1.5 rounded-sm transition-all duration-300 group ${isAutoMode ? 'border-acid bg-acid text-black shadow-[0_0_15px_rgba(172,255,1,0.6)]' : 'border-white/20 hover:border-acid hover:text-white bg-black/50 backdrop-blur'}`}
         >
            {isAutoMode ? (
                <Radio size={10} className="animate-pulse" />
            ) : (
                <PlayCircle size={10} className="group-hover:text-acid transition-colors" />
            )}
            <span className={isAutoMode ? 'font-bold' : ''}>
                {isAutoMode ? 'DEMO_RUNNING' : 'AUTO_DEMO'}
            </span>
         </button>

         {/* Divider Line */}
         <div className="w-px h-3 bg-gray-600 mx-2" />

         {/* Audio Toggle Button */}
         <button onClick={toggleMute} className="hover:text-acid transition-colors focus:outline-none flex items-center gap-2 group">
            {isMuted ? <VolumeX size={14} className="group-hover:scale-110 transition-transform" /> : <Volume2 size={14} className="group-hover:scale-110 transition-transform" />}
         </button>

         {/* Status Indicator */}
         <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-acid rounded-full animate-pulse shadow-[0_0_8px_#ACFF01]"></span> 
            <span>DUBAI HQ</span>
         </div>
         
         {/* Separator */}
         <span>//</span>

         {/* Call to Action Link */}
         <a href="#" className="text-white hover:text-acid transition-colors flex items-center gap-1 group">
            PADWORLD.GLOBAL <span className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">↗</span>
         </a>
      </div>
    </nav>
  );
};

export default Nav;
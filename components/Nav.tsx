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
      <div className="flex flex-col gap-2 pointer-events-auto">
        <div className="text-white">
            <svg width="247" height="47" viewBox="0 0 247 47" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-40 h-auto">
                <path d="M18.6592 9.00219C23.9399 9.00226 28.1644 13.2771 28.1644 18.5075C28.1644 22.9332 25.0462 26.856 20.721 27.8116L6.33685 31.2314V46.6435H0V9.00219H18.6592ZM169.028 7.89989C177.421 7.89997 184.243 14.7224 184.244 23.1152C184.244 31.5082 177.421 38.3311 169.028 38.3311C160.635 38.3311 153.812 31.5082 153.812 23.1152C153.812 14.7223 160.635 7.89989 169.028 7.89989ZM110.719 24.5793C110.719 28.3155 113.751 31.3478 117.433 31.3479C121.169 31.3479 124.202 28.3156 124.202 24.5793V9.03876H131.024V17.2693C131.024 21.0055 134.057 24.0379 137.793 24.0379C141.529 24.0379 144.561 21.0055 144.561 17.2693V9.03876H151.384V17.2693C151.384 24.7418 145.265 30.8606 137.793 30.8606C135.085 30.8606 132.54 30.0485 130.429 28.6406C128.696 34.1637 123.552 38.1706 117.433 38.1706C109.961 38.1706 103.896 32.0518 103.896 24.5793V9.03876H110.719V24.5793ZM56.3292 37.1965H37.6702C32.3893 37.1965 28.1648 32.9212 28.1648 27.6907C28.1648 23.265 31.2831 19.3422 35.6083 18.3866L49.9919 15.1705L31.2999 15.2523V9.04019H56.3292V37.1965ZM87.7986 37.1965H69.1396C63.8587 37.1965 59.6342 32.9212 59.6342 27.6907C59.6342 23.265 62.7524 19.3422 67.0779 18.3866L81.4621 14.9668V0H87.7986V37.1965ZM246.09 37.1965H227.431C222.15 37.1965 217.926 32.9212 217.926 27.6907C217.926 23.265 221.044 19.3422 225.369 18.3866L239.753 14.9668V0.00824736H246.09V37.1965ZM204.821 15.8629H201.41C197.565 15.8629 194.479 18.9495 194.479 22.7939V37.1921H187.656V22.7939L194.479 10.936C196.482 9.74475 198.865 9.04056 201.41 9.04056H204.821V15.8629ZM214.785 37.1917H207.962V0.00932311H214.785V37.1917ZM169.028 14.7223C164.371 14.7223 160.635 18.4586 160.635 23.1152C160.635 27.7178 164.371 31.5085 169.028 31.5085C173.631 31.5085 177.421 27.7178 177.421 23.1152C177.421 18.4586 173.631 14.7223 169.028 14.7223ZM36.9659 24.5725C35.5074 24.8743 34.5017 26.182 34.5017 27.6907C34.5017 29.451 35.9099 30.8592 37.6702 30.8592H49.9919V21.4547L36.9659 24.5725ZM68.4357 24.5725C66.9773 24.8743 65.9712 26.182 65.9712 27.6907C65.9712 29.4509 67.3793 30.8591 69.1396 30.8592H81.4621V21.4547L68.4357 24.5725ZM226.727 24.5725C225.269 24.8743 224.263 26.182 224.263 27.6907C224.263 29.4509 225.671 30.8591 227.431 30.8592H239.753V21.4547L226.727 24.5725ZM6.33685 24.7439L19.3631 21.6257C20.8215 21.3239 21.8276 20.0162 21.8276 18.5075C21.8276 16.7473 20.4193 15.3391 18.6592 15.339H6.33685V24.7439Z" fill="currentColor"/>
            </svg>
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
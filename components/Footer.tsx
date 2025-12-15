import React from 'react';

interface FooterProps {
  current: number;
  total: number;
}

const Footer: React.FC<FooterProps> = ({ current, total }) => {
  const format = (n: number) => n < 10 ? `0${n}` : n;
  
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-end mix-blend-exclusion pointer-events-none">
       
       {/* Left Side: Confidential Status */}
       <div className="flex items-center gap-3 pointer-events-auto">
          {/* The Green Square/Dot */}
          <div className="w-1.5 h-1.5 bg-acid rounded-full animate-pulse" />
          {/* The Label */}
          <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase">
            Confidential
          </span>
       </div>

       {/* Right Side: Tagline & Counter */}
       <div className="flex items-center gap-4 pointer-events-auto">
          {/* Tagline */}
          <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase hidden md:block">
            The Future of Sport Starts Now
          </span>
          
          {/* Divider Line */}
          <div className="w-16 h-px bg-gray-700 hidden md:block" />
          
          {/* Page Counter */}
          <div className="font-mono text-sm font-bold text-acid">
            {format(current)} <span className="text-gray-600">/ {format(total)}</span>
          </div>
       </div>
    </div>
  );
};

export default Footer;
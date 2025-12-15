import React, { useState, useEffect } from 'react';

interface ImageDividerProps {
  imgSrc: string;      // Path to local image (e.g., /assets/divider_1.jpg)
  fallbackSrc: string; // URL for demo purposes
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const ImageDivider: React.FC<ImageDividerProps> = ({ imgSrc, fallbackSrc, title, subtitle, align = 'center' }) => {
  const [activeSrc, setActiveSrc] = useState<string>(fallbackSrc);

  // Attempt to load the local image. If it loads, use it. 
  // If it errors (doesn't exist), keep the fallback.
  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => setActiveSrc(imgSrc);
    // No need for onerror, default is fallbackSrc
  }, [imgSrc, fallbackSrc]);

  return (
    <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden border-y border-white/10 group">
       
       {/* Parallax Background Layer */}
       {/* bg-fixed creates the parallax effect on desktop. */}
       <div
         className="absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-1000 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
         style={{ 
             backgroundImage: `url(${activeSrc})`,
         }} 
       >
         {/* Dark overlay for text readability */}
         <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700"></div>
       </div>

       {/* Gradient Overlays for smooth blending with the void background */}
       <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void"></div>
       <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[length:100px_100%] opacity-20 pointer-events-none"></div>

       {/* Content Layer */}
       <div className={`absolute inset-0 flex flex-col justify-center px-6 md:px-20 z-10 ${
           align === 'left' ? 'items-start text-left' : 
           align === 'right' ? 'items-end text-right' : 
           'items-center text-center'
       }`}>
          <div className="overflow-hidden">
             <h2 className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase transform translate-y-0 drop-shadow-2xl mix-blend-overlay opacity-90">
                {title}
             </h2>
          </div>
          
          {subtitle && (
              <div className="mt-4 inline-flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-acid"></div>
                  <div className="text-acid font-mono text-xs md:text-sm tracking-[0.3em] uppercase bg-black/80 backdrop-blur px-4 py-2 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                      {subtitle}
                  </div>
                  <div className="h-[1px] w-12 bg-acid"></div>
              </div>
          )}
       </div>

       {/* Technical Decorations */}
       <div className="absolute top-6 left-6 flex flex-col gap-1 z-20 mix-blend-difference">
           <span className="text-[9px] font-mono text-gray-400">SRC: {activeSrc === imgSrc ? 'LOCAL_ASSET' : 'REMOTE_STREAM'}</span>
           <span className="text-[9px] font-mono text-gray-400">RES: 4K_UHD</span>
       </div>
       
       <div className="absolute bottom-6 right-6 z-20">
            <div className="w-4 h-4 border-r-2 border-b-2 border-acid/50"></div>
       </div>
    </section>
  );
};

export default ImageDivider;
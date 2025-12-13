import React from 'react';
import { ArrowRight } from 'lucide-react';

const FinalCta: React.FC = () => {
  return (
    <section className="py-32 flex flex-col items-center justify-center text-center space-y-12">
        <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight">
                PadChat is not an app.<br/>
                <span className="text-gray-500">It is the intelligence layer behind global padel.</span>
            </h2>
        </div>

        <button className="group relative px-8 py-5 bg-acid text-void font-black text-lg uppercase tracking-widest overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
                Continue to Section 4 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
        </button>

        <p className="text-[10px] font-mono text-gray-700">
            BUSINESS MODEL INTELLIGENCE // LOADING...
        </p>
    </section>
  );
};

export default FinalCta;
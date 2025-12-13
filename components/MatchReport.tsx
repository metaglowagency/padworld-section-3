import React, { useState, useEffect } from 'react';
import { FileText, Download, Share2 } from 'lucide-react';
import { generateMatchReportSummary } from '../services/geminiService';

interface MatchReportProps {
    autoPlay?: boolean;
}

const MatchReport: React.FC<MatchReportProps> = ({ autoPlay }) => {
    const [generating, setGenerating] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);

    useEffect(() => {
        if (autoPlay && !summary && !generating) {
            handleGenerate();
        }
    }, [autoPlay]);

    const handleGenerate = async () => {
        setGenerating(true);
        const text = await generateMatchReportSummary();
        setSummary(text);
        setGenerating(false);
    };

    return (
        <section className="py-20 border-t border-white/10 grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <h2 className="text-4xl font-black uppercase text-white">Match Report<br/>Generator</h2>
                <p className="text-gray-500 text-sm max-w-sm">
                    Instant, pro-level post-match analysis. From rally count to winning zone heatmaps.
                </p>
                <button 
                    onClick={handleGenerate}
                    className="flex items-center gap-3 bg-white text-black px-6 py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                    <FileText size={18} />
                    {generating ? 'Compiling Data...' : 'Generate Match Report'}
                </button>
            </div>

            <div className={`glass-panel p-8 min-h-[400px] flex flex-col justify-between transition-all duration-500 ${summary ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-50'}`}>
                {/* Header */}
                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                    <div>
                        <div className="text-[10px] font-mono text-gray-500">REPORT ID</div>
                        <div className="text-acid font-mono">#PX-2025-991</div>
                    </div>
                    <div className="text-right">
                         <div className="text-[10px] font-mono text-gray-500">DATE</div>
                         <div className="text-white font-mono">OCT 24</div>
                    </div>
                </div>

                {/* Content */}
                <div className="py-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-xs text-gray-500 mb-1">RALLY COUNT</div>
                            <div className="text-2xl font-bold">168</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">WINNING ZONE</div>
                            <div className="text-2xl font-bold text-electric">RIGHT NET</div>
                        </div>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded border border-white/10">
                        <div className="text-[10px] font-mono text-acid mb-2">AI SUMMARY HIGHLIGHTS</div>
                        <p className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-line">
                            {summary || "Waiting for report generation..."}
                        </p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-4 border-t border-white/10 pt-4">
                    <button className="flex-1 py-2 text-xs font-mono uppercase border border-white/20 hover:bg-white/10 text-center flex items-center justify-center gap-2">
                        <Download size={12} /> PDF
                    </button>
                    <button className="flex-1 py-2 text-xs font-mono uppercase border border-white/20 hover:bg-white/10 text-center flex items-center justify-center gap-2">
                        <Share2 size={12} /> Share
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MatchReport;
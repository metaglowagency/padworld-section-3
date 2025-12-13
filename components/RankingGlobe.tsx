import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface RankingGlobeProps {
    autoPlay?: boolean;
}

const RankingGlobe: React.FC<RankingGlobeProps> = ({ autoPlay }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [rotation, setRotation] = useState(0);
    const [activeRankIndex, setActiveRankIndex] = useState(-1);

    // Auto Play Sequence for Ranks
    useEffect(() => {
        if (!autoPlay) {
            setActiveRankIndex(-1);
            return;
        }

        let i = 0;
        const interval = setInterval(() => {
            setActiveRankIndex(i);
            i++;
            if (i > 4) i = 0; // Loop or just stop? Let's loop for the duration of the section
        }, 1000);

        return () => clearInterval(interval);
    }, [autoPlay]);

    useEffect(() => {
        if (!svgRef.current) return;

        const width = 400;
        const height = 400;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const projection = d3.geoOrthographic()
            .scale(180)
            .translate([width / 2, height / 2])
            .clipAngle(90);

        const path = d3.geoPath().projection(projection);

        const graticule = d3.geoGraticule();

        svg.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", "rgba(45, 214, 255, 0.2)")
            .style("stroke-width", "0.5px");
            
        svg.append("circle")
            .attr("cx", width/2)
            .attr("cy", height/2)
            .attr("r", 180)
            .style("fill", "none")
            .style("stroke", "#2DD6FF")
            .style("stroke-width", "1px")
            .style("opacity", "0.3");

        const generateRandomPoints = (count: number) => {
             return Array.from({length: count}).map(() => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [Math.random() * 360 - 180, Math.random() * 180 - 90]
                }
             }));
        };

        const points = generateRandomPoints(30);
        
        const update = () => {
            setRotation(r => r + 0.5);
            projection.rotate([rotation, -15]);
            svg.selectAll(".graticule").attr("d", path);
            
            svg.selectAll(".player-dot").remove();
            
            svg.selectAll(".player-dot")
                .data(points)
                .enter()
                .append("path")
                .attr("class", "player-dot")
                .attr("d", path as any)
                .style("fill", (d, i) => i % 5 === 0 ? "#ACFF01" : "#ffffff") 
                .style("opacity", "0.8");
        };

        const timer = d3.interval(update, 50);
        return () => timer.stop();

    }, [rotation]);

  return (
    <section className="grid md:grid-cols-2 gap-12 items-center py-20 border-t border-white/10">
        <div className="order-2 md:order-1 flex justify-center relative">
            <svg ref={svgRef} width={400} height={400} className="max-w-full" />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/80 border border-electric px-4 py-1 text-[10px] text-electric font-mono whitespace-nowrap">
                LIVE ACTIVITY FEED
            </div>
        </div>
        
        <div className="order-1 md:order-2 space-y-8">
            <div className="space-y-2">
                <div className="text-acid font-mono text-xs tracking-widest uppercase">Global Ranking Engine</div>
                <h2 className="text-4xl font-black text-white leading-none">
                    YOUR POSITION IS <br/>
                    <span className="text-electric">DYNAMIC.</span>
                </h2>
                <p className="text-gray-500 font-light max-w-md">
                    The only system that updates your global rank after every single match, calibrated against 120,000+ players worldwide.
                </p>
            </div>

            <div className="space-y-1 font-mono text-sm">
                 {[
                    { rank: "#01", label: "ELITE DOMAIN", color: "text-yellow-400" },
                    { rank: "#02", label: "APEX COMPETITOR", color: "text-white" },
                    { rank: "#03", label: "ADVANCED TIER", color: "text-gray-400" },
                    { rank: "#04", label: "COMPETITIVE TIER", color: "text-gray-500" },
                    { rank: "#05", label: "AMATEUR TIER", color: "text-gray-600" },
                 ].map((item, i) => (
                    <div 
                        key={i} 
                        className={`flex items-center gap-4 p-3 border-b border-white/5 transition-all duration-300 ${
                            (autoPlay && activeRankIndex === i) || (!autoPlay && i===2) 
                            ? 'bg-white/5 border-l-4 border-l-acid pl-4 scale-105' 
                            : 'opacity-60'
                        }`}
                    >
                        <span className={`font-bold ${item.color}`}>{item.rank}</span>
                        <span className="text-gray-300 tracking-wider">{item.label}</span>
                        {((autoPlay && activeRankIndex === i) || (!autoPlay && i === 2)) && <span className="ml-auto text-[10px] text-acid bg-acid/10 px-2 py-0.5 rounded animate-pulse">ACTIVE</span>}
                    </div>
                 ))}
            </div>
        </div>
    </section>
  );
};

export default RankingGlobe;
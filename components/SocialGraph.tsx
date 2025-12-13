import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SocialGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Data: Nodes and Links
    const nodes = Array.from({ length: 20 }, (_, i) => ({ id: i, group: Math.floor(Math.random() * 3) }));
    const links = [];
    for (let i = 0; i < 30; i++) {
        links.push({
            source: Math.floor(Math.random() * 20),
            target: Math.floor(Math.random() * 20),
            value: Math.random()
        });
    }

    const simulation = d3.forceSimulation(nodes as any)
        .force("link", d3.forceLink(links).id((d: any) => d.id).distance(50))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#2DD6FF")
        .attr("stroke-opacity", 0.3)
        .attr("stroke-width", 1);

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 5)
        .attr("fill", (d) => d.group === 0 ? "#ACFF01" : d.group === 1 ? "#2DD6FF" : "#ffffff")
        .call(drag(simulation) as any);

    node.append("title").text((d) => `Player ${d.id}`);

    simulation.on("tick", () => {
        link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);

        node
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y);
    });

    function drag(simulation: any) {
        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        function dragged(event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
  }, []);

  return (
    <section className="py-20 border-t border-white/10 text-center">
        <h2 className="text-4xl font-black uppercase text-white mb-4">The Padel Graph</h2>
        <p className="text-gray-500 mb-8 font-mono text-xs uppercase tracking-widest">
            "PadChat creates a global social network around padel. Not just matches — meaningful connections."
        </p>
        
        <div className="w-full glass-panel h-[400px] overflow-hidden relative">
            <svg ref={svgRef} className="w-full h-full" />
            <div className="absolute top-4 left-4 flex flex-col gap-2 text-[10px] font-mono text-left">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-acid"></span> AMATEUR</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-electric"></span> RISING STAR</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-white"></span> PRO ELITE</div>
            </div>
        </div>
    </section>
  );
};

export default SocialGraph;
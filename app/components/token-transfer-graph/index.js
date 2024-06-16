"use client";

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import './index.css';

export const TokenTransferGraph = ({
   solutions,
   setSelectedSolutionId,
   selectedSolutionId,
   setLiveStream,
   liveStream
}) => {
    const [solutionGraphs, setSolutionGraphs] = useState(null);
    const renderContainerRef = useRef(null);
    const simulationRef = useRef(null);
    const nodesRef = useRef([]);
    const linksRef = useRef([]);

    const [oneSolutionView, setOneSolutionView] = useState(false);
    const [currentSolutionId, setCurrentSolutionId] = useState(null);

    useEffect(()=>{
        if (currentSolutionId !== selectedSolutionId) {
            setCurrentSolutionId(selectedSolutionId);
        }
    },[selectedSolutionId, currentSolutionId]);

    useEffect(() => {
        if (solutions?.length > 0) {
            const solutionsGraphs = solutions.map((solution, index)=> {
                let agentName = solution.agent.name.replace(/\s/g,'-')

                // Extract nodes
                let nodes = new Set();
                solution.route.forEach(routeStep => {
                    nodes.add(routeStep.srcName);
                    nodes.add(routeStep.dstName);
                });
                nodes = Array.from(nodes).map(name => ({
                    id: `${agentName}-${name}`,
                    name, 
                    agentName,
                    solutionIndex: index
                    // TODO add address and other metadata
                }));
                
                // Extract links
                let links = solution.route.map(routeStep => ({
                    source: `${agentName}-${routeStep.srcName}`,
                    target: `${agentName}-${routeStep.dstName}`,
                    // TODO use token metadata
                    value: routeStep.sentToken.substring(0, 3).toUpperCase()
                }));

                return  {
                    agentName,
                    nodes,
                    links
                }
            });

            setSolutionGraphs(solutionsGraphs);
        }
    }, [solutions]);

    useEffect(() => {
        if (!solutionGraphs) return;
    
        let nodes = Array.from(new Set(solutionGraphs.map(graph => graph.nodes).flat()));
        let links = solutionGraphs.map(graph => graph.links).flat();
    
        const container = d3.select(renderContainerRef.current);
        initializeSimulation(nodes, links, container);
    
        function resize() {
            const container = d3.select(renderContainerRef.current);
            const { width, height } = container.node().getBoundingClientRect();
            container.select("svg").attr("width", width).attr("height", height);
        }
    
        window.addEventListener("resize", resize);
        resize();
    
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, [solutionGraphs]);

    function initializeSimulation(nodes, links, container) {
        container.select("svg").remove(); // Remove existing SVG to avoid duplicates
    
        const { width, height } = container.node().getBoundingClientRect();
        
        // Define the width and height for the SVG's viewBox
        const viewBoxWidth = 1000;
        const viewBoxHeight = 1000;
    
        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("background-color", "transparent");
    
        const centerX = viewBoxWidth / 2;
        const centerY = viewBoxHeight / 2;
        
        const g = svg.append("g");
    
        // Build the arrow
        g.append("defs").selectAll("marker")
            .data(["end"])
            .enter().append("marker")
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 10)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "white");
    
        const link = g.append("g")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("class", "link")
            .attr("marker-end", "url(#end)")
            .style("stroke", "white");
    
        const linkLabels = g.append("g")
            .selectAll(".link-label")
            .data(links)
            .enter().append("text")
            .attr("class", "link-label")
            .attr("dy", ".35em")
            .style("fill", "white")
            .style("text-anchor", "middle")
            .text(d => d.value);
    
        const node = g.append("g")
            .selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .attr("fill", "white")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
    
        node.append("title")
            .text(d => d.name);
    
        let simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(160))
            .force("charge", d3.forceManyBody().strength(-2000))
            .force("center", d3.forceCenter(centerX, centerY))
            .force("gravity", d3.forceRadial(0.5, centerX, centerY))
            .on("tick", ticked);
    
        simulationRef.current = simulation;
        nodesRef.current = nodes;
        linksRef.current = links;

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
    
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            linkLabels
                .attr("x", d => (d.source.x + d.target.x) / 2)
                .attr("y", d => (d.source.y + d.target.y) / 2);
        }
    
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
    
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
    
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    useEffect(() => {
        if (!currentSolutionId || !solutionGraphs) return;

        const selectedGraph = solutionGraphs.find(graph => graph.agentName === currentSolutionId);
        if (!selectedGraph) return;

        const { nodes: newNodes, links: newLinks } = selectedGraph;
        updateSimulation(newNodes, newLinks);
    }, [currentSolutionId]);

    function updateSimulation(newNodes, newLinks) {
        const oldNodes = new Map(nodesRef.current.map(d => [d.id, d]));
        const nodes = newNodes.map(d => ({ ...oldNodes.get(d.id), ...d }));
        const links = newLinks.map(d => ({ ...d }));

        const container = d3.select(renderContainerRef.current);
        const svg = container.select("svg");
        const g = svg.select("g");

        let link = g.selectAll(".link")
            .data(links, d => [d.source, d.target])
            .join(
                enter => enter.append("line")
                    .attr("class", "link")
                    .attr("marker-end", "url(#end)")
                    .style("stroke", "white")
            );

        let node = g.selectAll(".node")
            .data(nodes, d => d.id)
            .join(
                enter => enter.append("circle")
                    .attr("class", "node")
                    .attr("r", 5)
                    .attr("fill", "white")
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended))
            );

        node.append("title")
            .text(d => d.name);

        let linkLabels = g.selectAll(".link-label")
            .data(links)
            .join(
                enter => enter.append("text")
                    .attr("class", "link-label")
                    .attr("dy", ".35em")
                    .style("fill", "white")
                    .style("text-anchor", "middle")
                    .text(d => d.value)
            );

        simulationRef.current.nodes(nodes);
        simulationRef.current.force("link").links(links);
        simulationRef.current.alpha(1).restart();

        nodesRef.current = nodes;
        linksRef.current = links;
    }

    return (
        <div className='relative'>
            {
                oneSolutionView &&
                <button className="absolute left-0 top-0 flex items-center py-2 px-3 rounded-md transition-colors duration-200 ease-in-out
                    bg-white hover:bg-hoverWhite active:bg-hoverWhite focus:outline-none focus:ring-2"
                    onClick={goBackToAllSolutionView}
                >
                    <img  src="/back-arrow.svg" className="mr-3" alt="" />
                    <p
                        className="text-backgroundPage"
                    >
                        Back
                    </p>
                </button>
            }
            <div ref={renderContainerRef} className="w-full h-[400px] md:h-[700px]"></div>
        </div>
    );
};

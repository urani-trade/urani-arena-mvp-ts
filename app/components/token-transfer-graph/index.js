"use client";

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import './index.css';

export const TokenTransferGraph = ({solutions}) => {
    const [graphData, setGraphData] = useState(null);
    const graphRef = useRef(null);

    const [oneSolutionView, setOneSolutionView] = useState(false);
    const [currentSolution, setCurrentSolution] = useState(null);

    const convertToLinks = (route) => {
        return route.map(item => ({
            source: item.srcName,
            destination: item.dstName,
            value: item.sentToken.substring(0, 3).toUpperCase()
        }));
    };



    useEffect(() => {
            if(solutions?.length > 0) {
                const data =   solutions.map((solution)=> {
                     const uniqueItems = new Set();

                     solution.route.forEach(item => {
                         uniqueItems.add(item.srcName);
                         uniqueItems.add(item.dstName);
                     });

                     const finalUniqueNameArray = Array.from(uniqueItems);


                        return  {
                                name: solution.agent.name,
                                nodes: finalUniqueNameArray,
                                links: convertToLinks(solution.route)
                            }
                });

                console.log('data',data);
                setGraphData(data);
            }

    }, [solutions]);



    const goBackToAllSolutionView = () => {
        setOneSolutionView(false);
        setCurrentSolution(null);
        renderAllGraphs();
    };

    const renderAllGraphs = () => {
        if (!graphData) return;

        const container = d3.select(graphRef.current);
        container.select("svg").remove(); // Remove any existing SVG to avoid duplicates
        const { width, height } = container.node().getBoundingClientRect();

        const viewBoxWidth = 700;
        const viewBoxHeight = 700;

        const svg = container
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("background-color", "transparent");

        const g = svg.append("g");

        const radius = Math.min(viewBoxWidth, viewBoxHeight) / 4;
        const angleStep = (2 * Math.PI) / graphData.length;
        const centerX = viewBoxWidth / 2;
        const centerY = viewBoxHeight / 2;

        graphData.forEach((graph, index) => {
            let xOffset = centerX + radius * Math.cos(index * angleStep) - viewBoxWidth / 8;
            let yOffset = centerY + radius * Math.sin(index * angleStep) - viewBoxHeight / 8;

            xOffset = Math.max(0, Math.min(xOffset, viewBoxWidth - 100));
            yOffset = Math.max(0, Math.min(yOffset, viewBoxHeight - 100));

            const nodes = graph.nodes.map((node) => ({
                name: node,
                graph: graph.name,
            }));
            const links = graph.links.map((link) => ({
                source: nodes.find((node) => node.name === link.source),
                target: nodes.find((node) => node.name === link.destination),
                value: link.value,
                graph: graph.name,
            }));

            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id((d) => d.name).distance(100))
                .force("charge", d3.forceManyBody().strength(-200))
                .force("center", d3.forceCenter(0, 0))
                .on("tick", tick);

            d3.interval(() => {
                simulation.alpha(0.3).restart();
            }, 1000);

            const graphGroup = g
                .append("g")
                .attr("transform", `translate(${xOffset},${yOffset})`)
                .on("click", () => selectGraph(graph.name));

            graphGroup
                .append("defs")
                .selectAll("marker")
                .data(["end"])
                .enter()
                .append("marker")
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

            const link = graphGroup
                .append("g")
                .selectAll("path")
                .data(links)
                .enter()
                .append("path")
                .attr("class", "link")
                .attr("marker-end", "url(#end)")
                .style("stroke", "white");

            // Add labels to links
            graphGroup.selectAll(".link-label")
                .data(links)
                .enter()
                .append("text")
                .attr("class", "link-label")
                .attr("fill", "white")
                .attr("dy", -5)
                .append("textPath")
                .attr("xlink:href", (d, i) => `#link${i}`)
                .attr("startOffset", "50%")
                .style("text-anchor", "middle")
                .text(d => d.value);

            const node = graphGroup
                .selectAll(".node")
                .data(nodes)
                .enter()
                .append("g")
                .attr("class", "node")
                .call(
                    d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended)
                );

            node
                .append("rect")
                .attr("rx", 10)
                .attr("ry", 10)
                .attr("width", 60)
                .attr("height", 20)
                .attr("x", -30)
                .attr("y", -10)
                .attr("fill", "#C9CAF9")
                .attr("stroke", "none");

            node
                .append("text")
                .attr("x", -25)
                .attr("dy", ".35em")
                .style("fill", "#362B67")
                .text((d) => `${d.name.substring(0, 6)}...`);

            function tick() {
                node.attr("transform", (d) => `translate(${d.x},${d.y})`);

                link.attr("d", (d, i) => {
                    if (!d.source || !d.target) {
                        console.error('Missing source or target:', d);
                        return;
                    }

                    const sourceX = d.source.x || 0;
                    const sourceY = d.source.y || 0;
                    const targetX = d.target.x || 0;
                    const targetY = d.target.y || 0;

                    // Check for NaN values
                    if (isNaN(sourceX) || isNaN(sourceY) || isNaN(targetX) || isNaN(targetY)) {
                        console.error('Invalid coordinates for link:', d);
                        return '';
                    }

                    // Calculate offsets to avoid touching the nodes
                    const dx = targetX - sourceX;
                    const dy = targetY - sourceY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance === 0) return '';

                    const nx = dx / distance;
                    const ny = dy / distance;
                    const offset = 15; // distance from the node
                    const parallelOffset = 7; // distance between parallel lines

                    // Adjust the start and end points to avoid overlapping with nodes
                    const sourceOffsetX = sourceX + nx * offset;
                    const sourceOffsetY = sourceY + ny * offset;
                    const targetOffsetX = targetX - nx * offset;
                    const targetOffsetY = targetY - ny * offset;

                    // First line
                    const sourceOffsetX1 = sourceOffsetX + ny * parallelOffset;
                    const sourceOffsetY1 = sourceOffsetY - nx * parallelOffset;
                    const targetOffsetX1 = targetOffsetX + ny * parallelOffset;
                    const targetOffsetY1 = targetOffsetY - nx * parallelOffset;

                    // Second line
                    const sourceOffsetX2 = sourceOffsetX - ny * parallelOffset;
                    const sourceOffsetY2 = sourceOffsetY + nx * parallelOffset;
                    const targetOffsetX2 = targetOffsetX - ny * parallelOffset;
                    const targetOffsetY2 = targetOffsetY + nx * parallelOffset;

                    // Return path strings for two parallel lines
                    return `M${sourceOffsetX1},${sourceOffsetY1}L${targetOffsetX1},${targetOffsetY1}M${sourceOffsetX2},${sourceOffsetY2}L${targetOffsetX2},${targetOffsetY2}`;
                });

                graphGroup.selectAll(".link-label")
                    .attr("transform", function (d) {
                        if (d.target.x < d.source.x) {
                            const bbox = this.getBBox();
                            return `rotate(180, ${bbox.x + bbox.width / 2}, ${bbox.y + bbox.height / 2})`;
                        }
                        return 'rotate(0)';
                    });
            }
        });
    };


    useEffect(() => {
        if(graphData){
            renderAllGraphs();
        }

    }, [graphData]);

    const selectGraph = (graphName) => {
        setCurrentSolution(graphName);
        setOneSolutionView(true);

        const container = d3.select(graphRef.current);
        container.select("svg").remove();

        const selectedGraph = graphData.find((graph) => graph.name === graphName);
        if (!selectedGraph) return;

        const { width, height } = container.node().getBoundingClientRect();
        const viewBoxWidth = 700;
        const viewBoxHeight = 700;

        const nodes = selectedGraph.nodes.map((name) => ({
            name,
            graph: graphName,
        }));
        const links = selectedGraph.links.map((link) => ({
            source: nodes.find((node) => node.name === link.source),
            target: nodes.find((node) => node.name === link.destination),
            value: link.value,
            graph: graphName,
        }));

        const svg = container
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("background-color", "transparent");

        const g = svg.append("g");

        g.append("defs")
            .selectAll("marker")
            .data(["end"])
            .enter()
            .append("marker")
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

        const link = g
            .append("g")
            .selectAll("path")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("marker-end", "url(#end)")
            .style("stroke", "white");

        // Add labels to links
        g.selectAll(".link-label")
            .data(links)
            .enter()
            .append("text")
            .attr("class", "link-label")
            .attr("fill", "white")
            .attr("dy", -5)
            .append("textPath")
            .attr("xlink:href", (d, i) => `#link${i}`)
            .attr("startOffset", "50%")
            .style("text-anchor", "middle")
            .text(d => d.value);

        const node = g
            .selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(
                d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            )
            .on("click", (event, d) => {
                selectGraph(d.graph);
            });

        node
            .append("rect")
            .attr("rx", 10) // Rounded corners
            .attr("ry", 10) // Rounded corners
            .attr("width", 60)
            .attr("height", 20)
            .attr("x", -30)
            .attr("y", -10)
            .attr("fill", "#C9CAF9") // Fill color
            .attr("stroke", "none"); // Remove border

        node
            .append("text")
            .attr("x", -25)
            .attr("dy", ".35em")
            .style("fill", "#362B67") // Text color
            .text((d) => `${d.name.substring(0, 6)}...`);

        function tick() {
            node.attr("transform", (d) => `translate(${d.x},${d.y})`);

            link.attr("d", (d, i) => {
                if (!d.source || !d.target) {
                    console.error('Missing source or target:', d);
                    return '';
                }

                const sourceX = d.source.x || 0;
                const sourceY = d.source.y || 0;
                const targetX = d.target.x || 0;
                const targetY = d.target.y || 0;

                // Check for NaN values
                if (isNaN(sourceX) || isNaN(sourceY) || isNaN(targetX) || isNaN(targetY)) {
                    console.error('Invalid coordinates for link:', d);
                    return '';
                }

                // Calculate offsets to avoid touching the nodes
                const dx = targetX - sourceX;
                const dy = targetY - sourceY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance === 0) return '';

                const nx = dx / distance;
                const ny = dy / distance;
                const offset = 15; // distance from the node
                const parallelOffset = 7; // distance between parallel lines

                // Adjust the start and end points to avoid overlapping with nodes
                const sourceOffsetX = sourceX + nx * offset;
                const sourceOffsetY = sourceY + ny * offset;
                const targetOffsetX = targetX - nx * offset;
                const targetOffsetY = targetY - ny * offset;

                // First line
                const sourceOffsetX1 = sourceOffsetX + ny * parallelOffset;
                const sourceOffsetY1 = sourceOffsetY - nx * parallelOffset;
                const targetOffsetX1 = targetOffsetX + ny * parallelOffset;
                const targetOffsetY1 = targetOffsetY - nx * parallelOffset;

                // Second line
                const sourceOffsetX2 = sourceOffsetX - ny * parallelOffset;
                const sourceOffsetY2 = sourceOffsetY + nx * parallelOffset;
                const targetOffsetX2 = targetOffsetX - ny * parallelOffset;
                const targetOffsetY2 = targetOffsetY + nx * parallelOffset;

                // Return path strings for two parallel lines
                return `M${sourceOffsetX1},${sourceOffsetY1}L${targetOffsetX1},${targetOffsetY1}M${sourceOffsetX2},${sourceOffsetY2}L${targetOffsetX2},${targetOffsetY2}`;
            });

            g.selectAll(".link-label")
                .attr("transform", function (d) {
                    if (d.target.x < d.source.x) {
                        const bbox = this.getBBox();
                        return `rotate(180, ${bbox.x + bbox.width / 2}, ${bbox.y + bbox.height / 2})`;
                    }
                    return 'rotate(0)';
                });
        }

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d) => d.name).distance(100))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(viewBoxWidth / 2, viewBoxHeight / 2))
            .alphaDecay(0)
            .on("tick", tick);

        // Zoom to the selected graph
        svg.transition()
            .duration(750)
            .attr(
                "viewBox",
                `${viewBoxWidth / 4} ${viewBoxHeight / 4} ${viewBoxWidth / 2} ${viewBoxHeight / 2}`
            )
            .attr("preserveAspectRatio", "xMidYMid meet");
    };

    // Dragging functions
    function dragstarted(event, d) {
        if (!event.active) d3.forceSimulation().alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) d3.forceSimulation().alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return (
        <div>
            <div>
                {
                    oneSolutionView &&
                    <button className="flex items-center py-2 px-3 rounded-md transition-colors duration-200 ease-in-out
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
            </div>
            <div ref={graphRef} className="w-full h-[600px] md:h-[700px]"></div>
        </div>

    );
};

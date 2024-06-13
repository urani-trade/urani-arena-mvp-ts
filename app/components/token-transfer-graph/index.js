"use client";  // Ensure this component is treated as a Client Component

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
                     const uniqueItems = new Set(); // Змінюємо на Set для унікальності

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

    useEffect(() => {
        if (!graphData) return;

        // Flatten the nodes and links arrays for D3
        const nodes = [];
        const links = [];
        const nodeMap = new Map();

        graphData.forEach(graph => {
            graph.nodes.forEach(nodeName => {
                if (!nodeMap.has(nodeName)) {
                    const node = { name: nodeName, graph: graph.name };
                    nodes.push(node);
                    nodeMap.set(nodeName, node);
                }
            });
            graph.links.forEach(link => {
                links.push({ source: nodeMap.get(link.source), target: nodeMap.get(link.destination), value: link.value, graph: graph.name });
            });
        });

        const container = d3.select(graphRef.current);
        container.select("svg").remove(); // Remove any existing SVG to avoid duplicates
        const { width, height } = container.node().getBoundingClientRect();

        // Define the width and height for the SVG's viewBox
        const viewBoxWidth = 1000;
        const viewBoxHeight = 1000;

        const centerX = viewBoxWidth / 2;
        const centerY = viewBoxHeight / 2;

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.name).distance(160))
            .force("charge", d3.forceManyBody().strength(-2000))
            .force("center", d3.forceCenter(centerX, centerY))
            .force("gravity", d3.forceRadial(0.5, centerX, centerY))
            .force("tangential", tangentialForce(2, centerX, centerY))
            .alphaDecay(0)
            .on("tick", tick);

        // Periodically reset alpha to maintain stability
        d3.interval(() => {
            simulation.alpha(0.3).restart();
        }, 1000);

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("background-color", "transparent");

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

        // Add the links and the arrows
        const path = g.append("g").selectAll("path")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("marker-end", "url(#end)")
            .style("stroke", "white");

        // Add the link labels
        const linkLabels = g.append("g").selectAll(".link-label")
            .data(links)
            .enter().append("text")
            .attr("class", "link-label")
            .attr("dy", ".35em")
            .style("fill", "white")
            .style("text-anchor", "middle")
            .text(d => d.value);

        // Define the nodes
        const node = g.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        // Add the wide outlined rectangles for the nodes
        node.append("rect")
            .attr("width", 60)
            .attr("height", 20)
            .attr("x", -30)
            .attr("y", -10)
            .attr("fill", "transparent")
            .attr("stroke", "white");

        // Add the text
        node.append("text")
            .attr("x", -25)
            .attr("dy", ".35em")
            .style("fill", "white")
            .text(d => `${d.name.substring(0, 6)}...`);

        // Initialize the hull paths
        let hullPath = g.selectAll(".hull");

        function tick() {
            node.attr("transform", d => `translate(${d.x},${d.y})`);

            path.attr("d", d => {
                const lineOffset = 25;
                const totalLength = Math.sqrt(Math.pow(d.target.x - d.source.x, 2) + Math.pow(d.target.y - d.source.y, 2));
                const reductionRatio = lineOffset / totalLength;

                const sourceX = d.source.x + (d.target.x - d.source.x) * reductionRatio;
                const sourceY = d.source.y + (d.target.y - d.source.y) * reductionRatio;
                const targetX = d.target.x - (d.target.x - d.source.x) * reductionRatio;
                const targetY = d.target.y - (d.target.y - d.source.y) * reductionRatio;

                const delta = calculatePerpendicularOffset(d, 4);
                return `M${sourceX + delta.dx},${sourceY + delta.dy}L${targetX + delta.dx},${targetY + delta.dy}`;
            });

            linkLabels
                .attr("x", d => {
                    const offset = 20;
                    const delta = calculatePerpendicularOffset(d, offset);
                    return (d.source.x + d.target.x) / 2 + delta.dx;
                })
                .attr("y", d => {
                    const offset = 20;
                    const delta = calculatePerpendicularOffset(d, offset);
                    return (d.source.y + d.target.y) / 2 + delta.dy;
                })
                .attr("transform", d => {
                    const angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x) * 180 / Math.PI;
                    const x = (d.source.x + d.target.x) / 2 + calculatePerpendicularOffset(d, 10).dx;
                    const y = (d.source.y + d.target.y) / 2 + calculatePerpendicularOffset(d, 10).dy;
                    return `rotate(${(angle > 90 || angle < -90) ? angle + 180 : angle},${x},${y})`;
                });

            // Update hulls
            const hulls = d3.groups(nodes, d => d.graph).map(([graph, nodes]) => {
                const points = nodes.map(node => [node.x, node.y]);
                const hull = d3.polygonHull(points);
                return { graph, hull };
            });

            hullPath = hullPath.data(hulls)
                .join("path")
                .attr("class", "hull")
                .attr("d", d => d.hull ? d3.line()(d.hull) : null)
                .attr("fill", "transparent")
                .on("click", function(event, d) {
                    const clickedGraph = d.graph;

                    //go to one solution view
                    setCurrentSolution(clickedGraph);
                    setOneSolutionView(true);

                    // Disable tangential force
                    simulation.force("tangential", null);

                    // Apply a strong radial force outward to non-clicked nodes
                    simulation.force("radialOutward", d3.forceRadial(1000, centerX, centerY)
                        .strength(d => d.graph === clickedGraph ? 0 : 0.01));

                    // Apply a strong radial force inward to clicked nodes
                    simulation.force("gravity", d3.forceRadial(0, centerX, centerY)
                        .strength(d => d.graph === clickedGraph ? 0.2 : 0));

                    simulation.alpha(1).restart();

                    // Delay the zoom to allow the graph to settle in the center
                    setTimeout(() => {
                        svg.transition()
                            .duration(750)
                            .attr("viewBox", `${centerX - viewBoxWidth / 4} ${centerY - viewBoxHeight / 4} ${viewBoxWidth / 2} ${viewBoxHeight / 2}`);
                    }, 1000);
                });
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

        function tangentialForce(strength, cx, cy) {
            return function() {
                nodes.forEach(d => {
                    const dx = d.x - cx;
                    const dy = d.y - cy;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance === 0) return;
                    const forceX = -dy / distance * strength;
                    const forceY = dx / distance * strength;
                    d.vx += forceX;
                    d.vy += forceY;
                });
            };
        }

        function resize() {
            const container = d3.select(graphRef.current);
            const { width, height } = container.node().getBoundingClientRect();

            svg.attr("width", width).attr("height", height);
        }

        window.addEventListener("resize", resize);
        resize();

        for (let i = 0; i < 600; ++i) simulation.tick();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, [graphData]);

    const calculatePerpendicularOffset = (d, offset) => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const perpendicularX = -dy / length * offset;
        const perpendicularY = dx / length * offset;
        return {
            dx: perpendicularX,
            dy: perpendicularY
        };
    }

    const goBackToAllSolutionView = () => {
        setOneSolutionView(false);
        setCurrentSolution(null);

        const container = d3.select(graphRef.current);
        container.select("svg").remove();

        const { width, height } = container.node().getBoundingClientRect();
        const viewBoxWidth = 1000;
        const viewBoxHeight = 1000;
        const centerX = viewBoxWidth / 2;
        const centerY = viewBoxHeight / 2;

        const nodes = [];
        const links = [];
        const nodeMap = new Map();

        graphData.forEach(graph => {
            graph.nodes.forEach(nodeName => {
                if (!nodeMap.has(nodeName)) {
                    const node = { name: nodeName, graph: graph.name };
                    nodes.push(node);
                    nodeMap.set(nodeName, node);
                }
            });
            graph.links.forEach(link => {
                links.push({ source: nodeMap.get(link.source), target: nodeMap.get(link.destination), value: link.value, graph: graph.name });
            });
        });

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.name).distance(160))
            .force("charge", d3.forceManyBody().strength(-2000))
            .force("center", d3.forceCenter(centerX, centerY))
            .force("gravity", d3.forceRadial(0.5, centerX, centerY))
            .force("tangential", tangentialForce(2, centerX, centerY))
            .alphaDecay(0)
            .on("tick", tick);

        d3.interval(() => {
            simulation.alpha(0.3).restart();
        }, 1000);

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("background-color", "transparent");

        const g = svg.append("g");

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

        const path = g.append("g").selectAll("path")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("marker-end", "url(#end)")
            .style("stroke", "white");

        const linkLabels = g.append("g").selectAll(".link-label")
            .data(links)
            .enter().append("text")
            .attr("class", "link-label")
            .attr("dy", ".35em")
            .style("fill", "white")
            .style("text-anchor", "middle")
            .text(d => d.value);

        const node = g.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
            .on("click", (event, d) => {
                selectGraph(d.graph);
            });

        node.append("rect")
            .attr("width", 60)
            .attr("height", 20)
            .attr("x", -30)
            .attr("y", -10)
            .attr("fill", "transparent")
            .attr("stroke", "white");

        node.append("text")
            .attr("x", -25)
            .attr("dy", ".35em")
            .style("fill", "white")
            .text(d => `${d.name.substring(0, 6)}...`);

        let hullPath = g.selectAll(".hull");

        function tick() {
            node.attr("transform", d => `translate(${d.x},${d.y})`);

            path.attr("d", d => {
                const lineOffset = 25;
                const totalLength = Math.sqrt(Math.pow(d.target.x - d.source.x, 2) + Math.pow(d.target.y - d.source.y, 2));
                const reductionRatio = lineOffset / totalLength;

                const sourceX = d.source.x + (d.target.x - d.source.x) * reductionRatio;
                const sourceY = d.source.y + (d.target.y - d.source.y) * reductionRatio;
                const targetX = d.target.x - (d.target.x - d.source.x) * reductionRatio;
                const targetY = d.target.y - (d.target.y - d.source.y) * reductionRatio;

                const delta = calculatePerpendicularOffset(d, 4);
                return `M${sourceX + delta.dx},${sourceY + delta.dy}L${targetX + delta.dx},${targetY + delta.dy}`;
            });

            linkLabels
                .attr("x", d => {
                    const offset = 20;
                    const delta = calculatePerpendicularOffset(d, offset);
                    return (d.source.x + d.target.x) / 2 + delta.dx;
                })
                .attr("y", d => {
                    const offset = 20;
                    const delta = calculatePerpendicularOffset(d, offset);
                    return (d.source.y + d.target.y) / 2 + delta.dy;
                })
                .attr("transform", d => {
                    const angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x) * 180 / Math.PI;
                    const x = (d.source.x + d.target.x) / 2 + calculatePerpendicularOffset(d, 10).dx;
                    const y = (d.source.y + d.target.y) / 2 + calculatePerpendicularOffset(d, 10).dy;
                    return `rotate(${(angle > 90 || angle < -90) ? angle + 180 : angle},${x},${y})`;
                });

            const hulls = d3.groups(nodes, d => d.graph).map(([graph, nodes]) => {
                const points = nodes.map(node => [node.x, node.y]);
                const hull = d3.polygonHull(points);
                return { graph, hull };
            });

            hullPath = hullPath.data(hulls)
                .join("path")
                .attr("class", "hull")
                .attr("d", d => d.hull ? d3.line()(d.hull) : null)
                .attr("fill", "transparent")
                .on("click", (event, d) => {
                    selectGraph(d.graph);
                });
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

        function tangentialForce(strength, cx, cy) {
            return function() {
                nodes.forEach(d => {
                    const dx = d.x - cx;
                    const dy = d.y - cy;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance === 0) return;
                    const forceX = -dy / distance * strength;
                    const forceY = dx / distance / strength;
                    d.vx += forceX;
                    d.vy += forceY;
                });
            };
        }

        function resize() {
            const container = d3.select(graphRef.current);
            const { width, height } = container.node().getBoundingClientRect();

            svg.attr("width", width).attr("height", height);
        }

        window.addEventListener("resize", resize);
        resize();
    };

    const selectGraph = (graphName) => {
        setCurrentSolution(graphName);
        setOneSolutionView(true);

        const container = d3.select(graphRef.current);
        container.select("svg").remove();

        const selectedGraph = graphData.find(graph => graph.name === graphName);
        if (!selectedGraph) return;

        const { width, height } = container.node().getBoundingClientRect();
        const viewBoxWidth = 1000;
        const viewBoxHeight = 1000;
        const centerX = viewBoxWidth / 2;
        const centerY = viewBoxHeight / 2;

        const nodes = selectedGraph.nodes.map(name => ({ name, graph: graphName }));
        const links = selectedGraph.links.map(link => ({
            source: nodes.find(node => node.name === link.source),
            target: nodes.find(node => node.name === link.destination),
            value: link.value,
            graph: graphName
        }));

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.name).distance(160))
            .force("charge", d3.forceManyBody().strength(-2000))
            .force("center", d3.forceCenter(centerX, centerY))
            .force("gravity", d3.forceRadial(0.5, centerX, centerY))
            .force("tangential", tangentialForce(2, centerX, centerY))
            .alphaDecay(0)
            .on("tick", tick);

        d3.interval(() => {
            simulation.alpha(0.3).restart();
        }, 1000);

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("background-color", "transparent");

        const g = svg.append("g");

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

        const path = g.append("g").selectAll("path")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("marker-end", "url(#end)")
            .style("stroke", "white");

        const linkLabels = g.append("g").selectAll(".link-label")
            .data(links)
            .enter().append("text")
            .attr("class", "link-label")
            .attr("dy", ".35em")
            .style("fill", "white")
            .style("text-anchor", "middle")
            .text(d => d.value);

        const node = g.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
            .on("click", (event, d) => {
                selectGraph(d.graph);
            });

        node.append("rect")
            .attr("width", 60)
            .attr("height", 20)
            .attr("x", -30)
            .attr("y", -10)
            .attr("fill", "transparent")
            .attr("stroke", "white");

        node.append("text")
            .attr("x", -25)
            .attr("dy", ".35em")
            .style("fill", "white")
            .text(d => `${d.name.substring(0, 6)}...`);

        // Apply initial scale
        svg.attr("transform", "scale(0.8)");

        // Animate the scaling effect
        setTimeout(() => {
            svg.transition()
                .duration(750)
                .attr("viewBox", `${centerX - viewBoxWidth / 4} ${centerY - viewBoxHeight / 4} ${viewBoxWidth / 2} ${viewBoxHeight / 2}`);
        }, 1000);

        function tick() {
            node.attr("transform", d => `translate(${d.x},${d.y})`);

            path.attr("d", d => {
                const lineOffset = 25;
                const totalLength = Math.sqrt(Math.pow(d.target.x - d.source.x, 2) + Math.pow(d.target.y - d.source.y, 2));
                const reductionRatio = lineOffset / totalLength;

                const sourceX = d.source.x + (d.target.x - d.source.x) * reductionRatio;
                const sourceY = d.source.y + (d.target.y - d.source.y) * reductionRatio;
                const targetX = d.target.x - (d.target.x - d.source.x) * reductionRatio;
                const targetY = d.target.y - (d.target.y - d.source.y) * reductionRatio;

                const delta = calculatePerpendicularOffset(d, 4);
                return `M${sourceX + delta.dx},${sourceY + delta.dy}L${targetX + delta.dx},${targetY + delta.dy}`;
            });

            linkLabels
                .attr("x", d => {
                    const offset = 20;
                    const delta = calculatePerpendicularOffset(d, offset);
                    return (d.source.x + d.target.x) / 2 + delta.dx;
                })
                .attr("y", d => {
                    const offset = 20;
                    const delta = calculatePerpendicularOffset(d, offset);
                    return (d.source.y + d.target.y) / 2 + delta.dy;
                })
                .attr("transform", d => {
                    const angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x) * 180 / Math.PI;
                    const x = (d.source.x + d.target.x) / 2 + calculatePerpendicularOffset(d, 10).dx;
                    const y = (d.source.y + d.target.y) / 2 + calculatePerpendicularOffset(d, 10).dy;
                    return `rotate(${(angle > 90 || angle < -90) ? angle + 180 : angle},${x},${y})`;
                });
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

        function tangentialForce(strength, cx, cy) {
            return function() {
                nodes.forEach(d => {
                    const dx = d.x - cx;
                    const dy = d.y - cy;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance === 0) return;
                    const forceX = -dy / distance * strength;
                    const forceY = dx / distance * strength;
                    d.vx += forceX;
                    d.vy += forceY;
                });
            };
        }

        function resize() {
            const container = d3.select(graphRef.current);
            const { width, height } = container.node().getBoundingClientRect();

            svg.attr("width", width).attr("height", height);
        }

        window.addEventListener("resize", resize);
        resize();
    };



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
            <div ref={graphRef} className="w-full h-[400px] md:h-[700px]"></div>
        </div>

    );
};

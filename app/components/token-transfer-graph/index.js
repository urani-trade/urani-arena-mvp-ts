"use client";  // Ensure this component is treated as a Client Component

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import { addressMapping } from './address-mapping';
import './index.css';

const transactionId = "2jMfRuwbvSUVXAr8m9BiG2sgL1gyEfQndMABSS9sfy5zEjZwMC1SNCWSSBGNUrW9cwJ9mEcx1YAt9ixvitSBE6Wt";

export const TokenTransferGraph = () => {
    const [graphData, setGraphData] = useState(null);
    const graphRef = useRef(null);

    const fetchTransactionData = async () => {
        try {
            const response = await axios.get(`https://pro-api.solscan.io/v1.0/transaction/${transactionId}`,
                {
                    headers: {
                        'accept': '*/*',
                        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE3MTcxNTgxMzU4MDgsImVtYWlsIjoiZ3JpZmYuaG93bEBnbWFpbC5jb20iLCJhY3Rpb24iOiJ0b2tlbi1hcGkiLCJpYXQiOjE3MTcxNTgxMzV9.jeI5psnDpF_HyLXRZyAA9MS1ULAHoIndd3myiLNroyg'
                    }
            });
            const data = response.data;
            const tokenTransfers = [];

            data.innerInstructions.forEach(instructionSet => {
                instructionSet.parsedInstructions.forEach(instruction => {
                    let source, destination, amount, symbol, decimals;

                    switch (instruction.type) {
                        case 'transfer':
                        case 'spl-transfer':
                        case 'spl-transfer-checked':
                            source = instruction.extra?.sourceOwner || instruction.params.authority || instruction.params.source;
                            destination = instruction.extra?.destinationOwner || instruction.params.destination;
                            amount = instruction.params.amount;
                            symbol = instruction.extra ? instruction.extra.symbol : '';
                            decimals = instruction.extra ? instruction.extra.decimals : 0;
                            break;
                        case 'sol-transfer':
                            source = instruction.params.source;
                            destination = instruction.params.destination;
                            amount = instruction.params.amount;
                            symbol = 'SOL';
                            decimals = 9; // SOL has 9 decimals
                            break;
                        default:
                            return; // Skip other types
                    }

                    if (source && destination && parseInt(amount) && symbol) {
                        // Use the addressMapping to resolve names
                        const resolvedSource = addressMapping[source] ? addressMapping[source].title : source;
                        const resolvedDestination = addressMapping[destination] ? addressMapping[destination].title : destination;
                        const resolvedAmount = parseInt(amount) / Math.pow(10, decimals); // Convert amount to proper decimal value

                        tokenTransfers.push({
                            source: resolvedSource,
                            destination: resolvedDestination,
                            value: `${resolvedAmount.toFixed(decimals)} ${symbol}`,
                            symbol,
                            amount: resolvedAmount,
                            tokenAddress: instruction.params.mint,
                        });
                    }
                });
            });

            // Filter unique nodes and links
            const uniqueNodes = new Set();
            const uniqueLinks = [];

            tokenTransfers.forEach(transfer => {
                uniqueNodes.add(transfer.source);
                uniqueNodes.add(transfer.destination);
                uniqueLinks.push(transfer);
            });

            const nodes = Array.from(uniqueNodes);

            setGraphData([{
                name: `transaction ${data.txHash}`,
                nodes,
                links: uniqueLinks,
            }]);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    };

    useEffect(() => {
        fetchTransactionData();
    }, []);

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
        console.log(container.node())

        // Define the width and height for the SVG's viewBox
        const viewBoxWidth = 1000;
        const viewBoxHeight = 1000;

        const centerX = viewBoxWidth / 2;
        const centerY = viewBoxHeight / 2;

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.name).distance(160))
            .force("charge", d3.forceManyBody().strength(-2000))
            .force("center", d3.forceCenter(centerX, centerY))
            // .force("gravity", d3.forceRadial(0.5, centerX, centerY))
            // .force("tangential", tangentialForce(2, centerX, centerY))
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
            .attr("fill", "green");

        // Add the links and the arrows
        const path = g.append("g").selectAll("path")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("marker-end", "url(#end)")
            .style("stroke", "green");

        // Add the link labels
        const linkLabels = g.append("g").selectAll(".link-label")
            .data(links)
            .enter().append("text")
            .attr("class", "link-label")
            .attr("dy", ".35em")
            .style("fill", "green")
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
            .attr("stroke", "green");

        // Add the text
        node.append("text")
            .attr("x", -25)
            .attr("dy", ".35em")
            .style("fill", "green")
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

                    // Disable tangential force
                    simulation.force("tangential", null);

                    // Apply a strong radial force outward to non-clicked nodes
                    simulation.force("radialOutward", d3.forceRadial(1500, centerX, centerY)
                        .strength(d => d.graph === clickedGraph ? 0 : 0.01));

                    // // Apply a strong radial force inward to clicked nodes
                    // simulation.force("gravity", d3.forceRadial(0, centerX, centerY)
                    //     .strength(d => d.graph === clickedGraph ? 0.2 : 0));

                    simulation.alpha(1).restart();

                    // Delay the zoom to allow the graph to settle in the center
                    setTimeout(() => {
                        svg.transition()
                            .duration(750)
                            .attr("viewBox", `${centerX - viewBoxWidth / 4} ${centerY - viewBoxHeight / 4} ${viewBoxWidth / 2} ${viewBoxHeight / 2}`);
                    }, 300);
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

        for (let i = 0; i < 600; ++i) simulation.tick();

        // Resize the SVG when the window is resized
        function resize() {
            const container = d3.select(graphRef.current);
            const { width, height } = container.node().getBoundingClientRect();

            svg.attr("width", width).attr("height", height);
        }
        window.addEventListener("resize", resize);
        resize();
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

    return (
        <div ref={graphRef} className="w-full h-[400px] md:h-[700px]"></div>
    );
};

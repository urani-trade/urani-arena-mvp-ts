"use client";  // Ensure this component is treated as a Client Component

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import './token-transfer-graph.css';

export const TokenTransferGraph = () => {
    const [data, setData] = useState(null);
    const graphRef = useRef(null);

    useEffect(() => {
        // Load the data from the CSV file
        d3.csv("data.csv")
            .then(setData)
            .catch(error => {
                console.error('Error loading data:', error);
            });
    }, []);

    useEffect(() => {
        if (!data) return;

        const container = d3.select(graphRef.current);
        container.select("svg").remove(); // Remove any existing SVG to avoid duplicates
        const { width, height } = container.node().getBoundingClientRect();

        // Define the width and height for the SVG's viewBox
        const viewBoxWidth = width * 1.3;  // Make the SVG twice as wide as the container
        const viewBoxHeight = height * 1.3; // Make the SVG 1.5 times as tall as the container

        // Compute the distinct nodes from the links
        var nodes = {};
        data.forEach(function(link) {
            if (!nodes[link.source]) {
                nodes[link.source] = { name: link.source };
            }
            if (!nodes[link.target]) {
                nodes[link.target] = { name: link.target };
            }
        });

        // Create an array of nodes
        var nodeArray = Object.values(nodes);

        // Update links to reference the node objects
        data.forEach(function(link) {
            link.source = nodes[link.source];
            link.target = nodes[link.target];
        });

        var centerX = viewBoxWidth / 2;
        var centerY = viewBoxHeight / 2;

        var simulation = d3.forceSimulation(nodeArray)
            .force("link", d3.forceLink(data).id(d => d.name).distance(160))
            .force("charge", d3.forceManyBody().strength(-2000))
            .force("center", d3.forceCenter(centerX, centerY))
            .force("gravity", d3.forceRadial(0.5, centerX, centerY))
            .force("tangential", tangentialForce(2, centerX, centerY))
            .alphaDecay(0)
            .on("tick", tick);

        // Periodically reset alpha to maintain stability
        d3.interval(function() {
            simulation.alpha(0.3).restart();
        }, 1000);

        var svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("background-color", "transparent");

        var g = svg.append("g");

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
        var path = g.append("g").selectAll("path")
            .data(data)
            .enter().append("path")
            .attr("class", "link")
            .attr("marker-end", "url(#end)")
            .style("stroke", "green");

        // Add the link labels
        var linkLabels = g.append("g").selectAll(".link-label")
            .data(data)
            .enter().append("text")
            .attr("class", "link-label")
            .attr("dy", ".35em")
            .style("fill", "green")
            .text(function(d) { return d.value; });

        // Define the nodes
        var node = g.selectAll(".node")
            .data(nodeArray)
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
            .text(function(d) { return d.name; });

        function tick() {
            node.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            path.attr("d", function(d) {
                var lineOffset = 25;
                var totalLength = Math.sqrt(Math.pow(d.target.x - d.source.x, 2) + Math.pow(d.target.y - d.source.y, 2));
                var reductionRatio = lineOffset / totalLength;

                var sourceX = d.source.x + (d.target.x - d.source.x) * reductionRatio;
                var sourceY = d.source.y + (d.target.y - d.source.y) * reductionRatio;
                var targetX = d.target.x - (d.target.x - d.source.x) * reductionRatio;
                var targetY = d.target.y - (d.target.y - d.source.y) * reductionRatio;

                var delta = calculatePerpendicularOffset(d, 4);
                var isNorthLine = d.target.y < d.source.y;
                if (isNorthLine) {
                    delta.x = -delta.x;
                    delta.y = -delta.y;
                }
                return "M" +
                    (sourceX + delta.dx) + "," +
                    (sourceY + delta.dy) + "L" +
                    (targetX + delta.dx) + "," +
                    (targetY + delta.dy);
            });

            linkLabels
                .attr("x", function(d) {
                    var offset = 10;
                    var delta = calculatePerpendicularOffset(d, offset);
                    if (delta.dx < 0) {
                        offset = 25;
                        delta = calculatePerpendicularOffset(d, offset);
                    }
                    var midwayX = (d.source.x + d.target.x) / 2;
                    return midwayX + delta.dx;
                })
                .attr("y", function(d) {
                    var offset = 10;
                    var delta = calculatePerpendicularOffset(d, offset);
                    var midwayY = (d.source.y + d.target.y) / 2;
                    return midwayY + delta.dy;
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
                nodeArray.forEach(function(d) {
                    var dx = d.x - cx;
                    var dy = d.y - cy;
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance === 0) return;
                    var forceX = -dy / distance * strength;
                    var forceY = dx / distance * strength;
                    d.vx += forceX;
                    d.vy += forceY;
                });
            };
        }

        function resize() {
            const container = d3.select(graphRef.current);
            const { width, height } = container.node().getBoundingClientRect();

            svg.attr("width", width).attr("height", height);
            svg.attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
            simulation.force("center", d3.forceCenter(viewBoxWidth / 2, viewBoxHeight / 2));
            simulation.alpha(0.3).restart();
        }

        window.addEventListener("resize", resize);
        resize();

        for (var i = 0; i < 600; ++i) simulation.tick();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, [data]);

    const calculatePerpendicularOffset = (d, offset) => {
        var dx = d.target.x - d.source.x;
        var dy = d.target.y - d.source.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        var perpendicularX = -dy / length * offset;
        var perpendicularY = dx / length * offset;
        return {
            dx: perpendicularX,
            dy: perpendicularY
        };
    }

    return (
        <div ref={graphRef} style={{ width: '100%', height: '80vh' }}></div>
    );
};

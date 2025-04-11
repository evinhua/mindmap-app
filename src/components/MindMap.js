import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MindMap = ({ 
  nodes, 
  links, 
  selectedNode, 
  onNodeClick, 
  onNodeUpdate,
  onDeleteLink,
  connectionMode,
  sourceNode
}) => {
  const svgRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Debug the props on every render
  console.log("MindMap render - nodes:", nodes.length, "links:", links.length);
  console.log("Links data:", JSON.stringify(links));

  // Main D3 rendering effect
  useEffect(() => {
    if (!svgRef.current) return;
    console.log("Running D3 effect with links:", links.length);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create a main group for all elements
    const g = svg.append('g');

    // Draw a background rect to catch clicks
    g.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'transparent')
      .on('click', () => {
        if (!connectionMode) {
          onNodeClick(null);
        }
      });

    // DRAW PERMANENT LINKS
    if (links && links.length > 0) {
      console.log("Drawing permanent links:", links.length);
      
      links.forEach(link => {
        const sourceNode = nodes.find(node => node.id === link.source);
        const targetNode = nodes.find(node => node.id === link.target);
        
        if (sourceNode && targetNode) {
          console.log(`Drawing link from ${sourceNode.id} to ${targetNode.id}`);
          
          // Calculate start and end points
          const startX = sourceNode.x + sourceNode.width/2;
          const startY = sourceNode.y + sourceNode.height/2;
          const endX = targetNode.x + targetNode.width/2;
          const endY = targetNode.y + targetNode.height/2;
          
          // Draw a simple line with bright color for visibility
          g.append('line')
            .attr('id', `link-${link.id}`)
            .attr('x1', startX)
            .attr('y1', startY)
            .attr('x2', endX)
            .attr('y2', endY)
            .attr('stroke', 'red')  // Use a bright color for testing
            .attr('stroke-width', 3)
            .attr('stroke-opacity', 1);
            
          // Add a delete button (circle) at the middle of the line
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          
          g.append('circle')
            .attr('id', `delete-${link.id}`)
            .attr('r', 8)
            .attr('fill', 'blue')  // Use a bright color for testing
            .attr('cx', midX)
            .attr('cy', midY)
            .attr('opacity', 0.7)  // Make it visible for testing
            .on('click', (event) => {
              event.stopPropagation();
              onDeleteLink(link.id);
            });
        } else {
          console.warn(`Could not find nodes for link: ${link.id}`);
        }
      });
    }

    // DRAW TEMPORARY CONNECTION LINE (if in connection mode)
    if (connectionMode && sourceNode) {
      console.log("Drawing temporary connection line from source node:", sourceNode.id);
      
      // Calculate start point from source node
      const startX = sourceNode.x + sourceNode.width/2;
      const startY = sourceNode.y + sourceNode.height/2;
      
      // Draw a temporary line from source node to mouse position
      const tempLine = g.append('line')
        .attr('id', 'temp-connection-line')
        .attr('x1', startX)
        .attr('y1', startY)
        .attr('x2', startX) // Initially same as start point
        .attr('y2', startY) // Initially same as start point
        .attr('stroke', 'green')
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '5,5')
        .attr('stroke-opacity', 1);
      
      // Update the line end point on mouse move
      svg.on('mousemove', (event) => {
        if (connectionMode) {
          const [mouseX, mouseY] = d3.pointer(event);
          tempLine.attr('x2', mouseX).attr('y2', mouseY);
        }
      });
    }

    // DRAW NODES
    if (nodes && nodes.length > 0) {
      console.log("Drawing nodes:", nodes.length);
      
      nodes.forEach(node => {
        const nodeGroup = g.append('g')
          .attr('class', `node ${selectedNode && node.id === selectedNode.id ? 'selected' : ''}`)
          .attr('id', `node-${node.id}`)
          .attr('transform', `translate(${node.x}, ${node.y})`)
          .on('click', (event) => {
            event.stopPropagation();
            console.log(`Node ${node.id} clicked`);
            onNodeClick(node);
          });
        
        // Add rectangle
        nodeGroup.append('rect')
          .attr('width', node.width)
          .attr('height', node.height)
          .attr('rx', 5)
          .attr('ry', 5)
          .style('fill', node.style.fill)
          .style('stroke', connectionMode && sourceNode && node.id !== sourceNode.id ? 'green' : node.style.stroke)
          .style('stroke-width', selectedNode && node.id === selectedNode.id ? '2px' : '1px');
        
        // Add text
        nodeGroup.append('text')
          .attr('x', node.width / 2)
          .attr('y', node.height / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .style('font-size', node.style.fontSize)
          .style('font-family', node.style.fontFamily)
          .style('font-weight', node.style.fontWeight)
          .style('font-style', node.style.fontStyle)
          .style('text-decoration', node.style.textDecoration)
          .style('text-align', node.style.textAlign)
          .text(node.text);
        
        // Make node draggable (only if not in connection mode)
        if (!connectionMode) {
          const drag = d3.drag()
            .on('start', (event) => {
              dragStartRef.current = { x: node.x, y: node.y };
            })
            .on('drag', (event) => {
              const newX = dragStartRef.current.x + event.x - event.subject.x;
              const newY = dragStartRef.current.y + event.y - event.subject.y;
              
              // Update node position
              node.x = newX;
              node.y = newY;
              
              // Update the node's position in the DOM
              d3.select(`#node-${node.id}`)
                .attr('transform', `translate(${newX}, ${newY})`);
              
              // Update links connected to this node
              links.forEach(link => {
                if (link.source === node.id || link.target === node.id) {
                  const sourceNode = nodes.find(n => n.id === link.source);
                  const targetNode = nodes.find(n => n.id === link.target);
                  
                  if (sourceNode && targetNode) {
                    // Calculate new start and end points
                    const startX = sourceNode.x + sourceNode.width/2;
                    const startY = sourceNode.y + sourceNode.height/2;
                    const endX = targetNode.x + targetNode.width/2;
                    const endY = targetNode.y + targetNode.height/2;
                    
                    // Update link line
                    d3.select(`#link-${link.id}`)
                      .attr('x1', startX)
                      .attr('y1', startY)
                      .attr('x2', endX)
                      .attr('y2', endY);
                    
                    // Update delete button position
                    const midX = (startX + endX) / 2;
                    const midY = (startY + endY) / 2;
                    
                    d3.select(`#delete-${link.id}`)
                      .attr('cx', midX)
                      .attr('cy', midY);
                  }
                }
              });
            })
            .on('end', (event) => {
              // Update the node in the state
              onNodeUpdate({
                ...node,
                x: node.x,
                y: node.y
              });
            });
          
          nodeGroup.call(drag);
        }
      });
    }

  }, [nodes, links, selectedNode, onNodeClick, onNodeUpdate, onDeleteLink, connectionMode, sourceNode]);

  return (
    <svg 
      ref={svgRef} 
      width="100%" 
      height="100%" 
      style={{ cursor: connectionMode ? 'crosshair' : 'default' }}
    />
  );
};

export default MindMap;

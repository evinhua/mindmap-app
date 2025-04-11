import React, { useState } from 'react';
import MindMap from './components/MindMap';
import SidePanel from './components/SidePanel';
import Toolbar from './components/Toolbar';

function App() {
  // Initialize with two test nodes
  const [nodes, setNodes] = useState([
    {
      id: 'node-1',
      text: 'Node 1',
      x: 200,
      y: 200,
      width: 150,
      height: 60,
      style: {
        fill: '#ffffff',
        stroke: '#000000',
        fontSize: '14px',
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'center'
      }
    },
    {
      id: 'node-2',
      text: 'Node 2',
      x: 500,
      y: 200,
      width: 150,
      height: 60,
      style: {
        fill: '#ffffff',
        stroke: '#000000',
        fontSize: '14px',
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'center'
      }
    }
  ]);
  
  // Initialize with a test link
  const [links, setLinks] = useState([
    {
      id: 'link-1',
      source: 'node-1',
      target: 'node-2'
    }
  ]);
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [connectionMode, setConnectionMode] = useState(false);
  const [sourceNode, setSourceNode] = useState(null);
  const [renderKey, setRenderKey] = useState(0); // Force re-render key

  const handleAddNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      text: 'New Node',
      x: window.innerWidth / 2 - 150,
      y: window.innerHeight / 2 - 100,
      width: 150,
      height: 60,
      style: {
        fill: '#ffffff',
        stroke: '#000000',
        fontSize: '14px',
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'center'
      }
    };
    
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
  };

  const handleUpdateNode = (updatedNode) => {
    setNodes(nodes.map(node => 
      node.id === updatedNode.id ? updatedNode : node
    ));
    setSelectedNode(updatedNode);
  };

  const handleDeleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setLinks(links.filter(link => link.source !== nodeId && link.target !== nodeId));
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleStartConnection = () => {
    if (selectedNode) {
      console.log("Starting connection from node:", selectedNode.id);
      setConnectionMode(true);
      setSourceNode(selectedNode);
    }
  };

  const handleCancelConnection = () => {
    setConnectionMode(false);
    setSourceNode(null);
  };

  const handleNodeClick = (node) => {
    console.log("Node clicked:", node ? node.id : "null", "Connection mode:", connectionMode);
    
    if (connectionMode && node) {
      if (sourceNode && sourceNode.id !== node.id) {
        console.log(`Creating connection from ${sourceNode.id} to ${node.id}`);
        
        // Check if this connection already exists
        const connectionExists = links.some(
          link => (link.source === sourceNode.id && link.target === node.id) || 
                 (link.source === node.id && link.target === sourceNode.id)
        );
        
        if (!connectionExists) {
          const newLink = {
            id: `link-${Date.now()}`,
            source: sourceNode.id,
            target: node.id
          };
          
          console.log("Adding new link:", newLink);
          
          // Create a new array with the new link
          const newLinks = [...links, newLink];
          setLinks(newLinks);
          
          // Force re-render
          setRenderKey(prev => prev + 1);
          
          console.log("New links array:", newLinks);
        } else {
          console.log("Connection already exists");
        }
      }
      // Reset connection mode
      setConnectionMode(false);
      setSourceNode(null);
    } else {
      setSelectedNode(node);
    }
  };

  const handleDeleteLink = (linkId) => {
    console.log("Deleting link:", linkId);
    setLinks(links.filter(link => link.id !== linkId));
    // Force re-render
    setRenderKey(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Toolbar 
          onAddNode={handleAddNode} 
          onStartConnection={handleStartConnection}
          onCancelConnection={handleCancelConnection}
          connectionMode={connectionMode}
          selectedNode={selectedNode}
        />
        <MindMap 
          key={`mindmap-${renderKey}`} // Force re-render when links change
          nodes={nodes} 
          links={links} 
          selectedNode={selectedNode}
          onNodeClick={handleNodeClick}
          onNodeUpdate={handleUpdateNode}
          onDeleteLink={handleDeleteLink}
          connectionMode={connectionMode}
          sourceNode={sourceNode}
        />
        {connectionMode && (
          <div className="connection-mode">
            Click on another node to create a connection
          </div>
        )}
      </div>
      {selectedNode && (
        <SidePanel 
          node={selectedNode} 
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
        />
      )}
    </div>
  );
}

export default App;

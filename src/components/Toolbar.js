import React from 'react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

const Toolbar = ({ 
  onAddNode, 
  onStartConnection,
  onCancelConnection, 
  connectionMode, 
  selectedNode,
  nodes,
  links,
  onLoadData
}) => {
  console.log("Toolbar render - selectedNode:", selectedNode ? selectedNode.id : "none", "connectionMode:", connectionMode);
  
  const handleExport = async () => {
    try {
      // Get the SVG element
      const svgElement = document.querySelector('svg');
      
      if (!svgElement) {
        alert('No mindmap to export');
        return;
      }
      
      // Create a clone of the SVG to avoid modifying the original
      const svgClone = svgElement.cloneNode(true);
      
      // Set a white background
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', '100%');
      rect.setAttribute('height', '100%');
      rect.setAttribute('fill', 'white');
      svgClone.insertBefore(rect, svgClone.firstChild);
      
      // Create a container for the SVG
      const container = document.createElement('div');
      container.appendChild(svgClone);
      document.body.appendChild(container);
      
      // Convert to PNG
      const dataUrl = await toPng(container, { 
        backgroundColor: 'white',
        width: svgElement.clientWidth,
        height: svgElement.clientHeight
      });
      
      // Remove the container
      document.body.removeChild(container);
      
      // Save the image
      saveAs(dataUrl, 'mindmap.png');
    } catch (error) {
      console.error('Error exporting mindmap:', error);
      alert('Failed to export mindmap');
    }
  };

  const handleSave = () => {
    try {
      // Create a data object with nodes and links
      const data = {
        nodes,
        links
      };
      
      // Convert to JSON string
      const json = JSON.stringify(data, null, 2);
      
      // Create a blob and save it
      const blob = new Blob([json], { type: 'application/json' });
      saveAs(blob, 'mindmap.json');
      
      console.log("Saved mindmap data:", data);
    } catch (error) {
      console.error('Error saving mindmap:', error);
      alert('Failed to save mindmap');
    }
  };

  const handleLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          if (data.nodes && data.links) {
            // Pass the loaded data to the parent component
            onLoadData(data);
            console.log("Loaded mindmap data:", data);
          } else {
            alert('Invalid mindmap file format');
          }
        } catch (error) {
          console.error('Error parsing mindmap file:', error);
          alert('Failed to parse mindmap file');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  const handleConnectClick = () => {
    if (connectionMode) {
      onCancelConnection();
    } else if (selectedNode) {
      onStartConnection();
    }
  };

  return (
    <div className="toolbar">
      <div>
        <button onClick={onAddNode}>Add Node</button>
        <button 
          onClick={handleConnectClick}
          disabled={!selectedNode && !connectionMode}
          style={{ 
            backgroundColor: connectionMode ? '#e74c3c' : '#3498db',
            fontWeight: connectionMode ? 'bold' : 'normal'
          }}
        >
          {connectionMode ? 'Cancel Connection' : 'Connect Nodes'}
        </button>
      </div>
      <div>
        <button onClick={handleLoad}>Load</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleExport}>Export as PNG</button>
      </div>
    </div>
  );
};

export default Toolbar;

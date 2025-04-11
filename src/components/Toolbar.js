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
      
      // Create a deep clone of the SVG
      const svgClone = svgElement.cloneNode(true);
      
      // Set a white background
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', '100%');
      rect.setAttribute('height', '100%');
      rect.setAttribute('fill', 'white');
      svgClone.insertBefore(rect, svgClone.firstChild);
      
      // Set explicit width and height
      const boundingBox = svgElement.getBoundingClientRect();
      svgClone.setAttribute('width', boundingBox.width);
      svgClone.setAttribute('height', boundingBox.height);
      
      // Convert SVG to a data URL
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      // Create an image from the SVG
      const img = new Image();
      img.onload = () => {
        try {
          // Create a canvas to draw the image
          const canvas = document.createElement('canvas');
          canvas.width = boundingBox.width;
          canvas.height = boundingBox.height;
          
          // Draw the image on the canvas
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          
          // Convert canvas to PNG
          canvas.toBlob((blob) => {
            saveAs(blob, 'mindmap.png');
            URL.revokeObjectURL(svgUrl);
          });
        } catch (error) {
          console.error('Error creating PNG:', error);
          alert('Failed to create PNG');
        }
      };
      
      img.onerror = () => {
        console.error('Error loading SVG as image');
        alert('Failed to load SVG as image');
        URL.revokeObjectURL(svgUrl);
      };
      
      img.src = svgUrl;
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

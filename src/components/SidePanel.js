import React, { useState, useEffect } from 'react';

const SidePanel = ({ node, onUpdateNode, onDeleteNode }) => {
  const [nodeText, setNodeText] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [fontWeight, setFontWeight] = useState('');
  const [fontStyle, setFontStyle] = useState('');
  const [textDecoration, setTextDecoration] = useState('');
  const [textAlign, setTextAlign] = useState('');
  const [fillColor, setFillColor] = useState('');
  const [strokeColor, setStrokeColor] = useState('');

  useEffect(() => {
    if (node) {
      setNodeText(node.text);
      setFontFamily(node.style.fontFamily);
      setFontSize(node.style.fontSize);
      setFontWeight(node.style.fontWeight);
      setFontStyle(node.style.fontStyle);
      setTextDecoration(node.style.textDecoration);
      setTextAlign(node.style.textAlign);
      setFillColor(node.style.fill);
      setStrokeColor(node.style.stroke);
    }
  }, [node]);

  const handleTextChange = (e) => {
    setNodeText(e.target.value);
    updateNode({ text: e.target.value });
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
    updateNode({ style: { ...node.style, fontFamily: e.target.value } });
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    updateNode({ style: { ...node.style, fontSize: e.target.value } });
  };

  const handleFontWeightChange = (e) => {
    setFontWeight(e.target.value);
    updateNode({ style: { ...node.style, fontWeight: e.target.value } });
  };

  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
    updateNode({ style: { ...node.style, fontStyle: e.target.value } });
  };

  const handleTextDecorationChange = (e) => {
    setTextDecoration(e.target.value);
    updateNode({ style: { ...node.style, textDecoration: e.target.value } });
  };

  const handleTextAlignChange = (e) => {
    setTextAlign(e.target.value);
    updateNode({ style: { ...node.style, textAlign: e.target.value } });
  };

  const handleFillColorChange = (color) => {
    setFillColor(color);
    updateNode({ style: { ...node.style, fill: color } });
  };

  const handleStrokeColorChange = (color) => {
    setStrokeColor(color);
    updateNode({ style: { ...node.style, stroke: color } });
  };

  const updateNode = (updates) => {
    onUpdateNode({
      ...node,
      ...updates
    });
  };

  const colorOptions = [
    '#ffffff', '#f8bbd0', '#e1bee7', '#bbdefb', '#c8e6c9', 
    '#fff9c4', '#ffecb3', '#ffccbc', '#d7ccc8', '#f5f5f5'
  ];

  const strokeOptions = [
    '#000000', '#e91e63', '#9c27b0', '#2196f3', '#4caf50',
    '#ffeb3b', '#ff9800', '#ff5722', '#795548', '#9e9e9e'
  ];

  if (!node) return null;

  return (
    <div className="side-panel">
      <h3>Node Properties</h3>
      
      <div className="control-group">
        <label htmlFor="node-text">Text</label>
        <input
          id="node-text"
          type="text"
          value={nodeText}
          onChange={handleTextChange}
        />
      </div>

      <div className="control-group">
        <label htmlFor="font-family">Font Family</label>
        <select
          id="font-family"
          value={fontFamily}
          onChange={handleFontFamilyChange}
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="font-size">Font Size</label>
        <select
          id="font-size"
          value={fontSize}
          onChange={handleFontSizeChange}
        >
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="font-weight">Font Weight</label>
        <select
          id="font-weight"
          value={fontWeight}
          onChange={handleFontWeightChange}
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="font-style">Font Style</label>
        <select
          id="font-style"
          value={fontStyle}
          onChange={handleFontStyleChange}
        >
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="text-decoration">Text Decoration</label>
        <select
          id="text-decoration"
          value={textDecoration}
          onChange={handleTextDecorationChange}
        >
          <option value="none">None</option>
          <option value="underline">Underline</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="text-align">Text Align</label>
        <select
          id="text-align"
          value={textAlign}
          onChange={handleTextAlignChange}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div className="control-group">
        <label>Fill Color</label>
        <div className="color-picker">
          {colorOptions.map(color => (
            <div
              key={color}
              className={`color-option ${fillColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleFillColorChange(color)}
            />
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Border Color</label>
        <div className="color-picker">
          {strokeOptions.map(color => (
            <div
              key={color}
              className={`color-option ${strokeColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleStrokeColorChange(color)}
            />
          ))}
        </div>
      </div>

      <button 
        className="danger" 
        onClick={() => onDeleteNode(node.id)}
      >
        Delete Node
      </button>
    </div>
  );
};

export default SidePanel;

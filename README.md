# Mindmap Application

A React application for creating and editing mindmaps using D3.js.

## Features

- Create text nodes with customizable properties
- Connect nodes with lines
- Edit node text, font, style, color, and more
- Delete nodes and connections
- Export mindmap as PNG
- Save and load mindmaps as JSON files

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   cd mindmap-app
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## How to Use

1. **Add a Node**: Click the "Add Node" button to create a new node
2. **Edit a Node**: Click on a node to select it and edit its properties in the side panel
3. **Connect Nodes**: 
   - Select a node
   - Click "Connect Nodes" button
   - Click on another node to create a connection
4. **Delete a Node**: Select a node and click the "Delete Node" button in the side panel
5. **Delete a Connection**: Hover over the middle of a connection line and click the red dot that appears
6. **Export Mindmap**: Click the "Export as PNG" button to save the mindmap as an image
7. **Save/Load Mindmap**: Use the "Save" and "Load" buttons to save and load your mindmap as a JSON file

## Technologies Used

- React
- D3.js
- html-to-image (for PNG export)
- file-saver (for saving files)
- uuid (for generating unique IDs)

## Future Improvements

- Add undo/redo functionality
- Implement zoom and pan for large mindmaps
- Add different node shapes and connection styles
- Support for nested nodes/hierarchical structures
- Collaborative editing features

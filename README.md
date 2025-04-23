# Mind Map Application

An interactive mind map application built with React and D3.js that allows users to create, connect, and organize nodes visually.

## Features

- Create nodes with customizable text
- Choose from multiple node shapes (rectangle, ellipse, diamond, hexagon, cloud, parallelogram)
- Connect nodes with interactive lines
- Drag and reposition nodes while maintaining connections
- Delete nodes and connections
- Visual feedback during connection creation
- Export mind maps as PNG images

## Live Demo

You can try the application here: [Mind Map App Demo](https://evinhua.github.io/mindmap-app/)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/evinhua/mindmap-app.git
   ```

2. Navigate to the project directory:
   ```
   cd mindmap-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Use

1. **Add Nodes**: Click the "Add Node" button to create a new node
2. **Select Nodes**: Click on a node to select it
3. **Change Node Shape**: Select a node and choose a shape from the dropdown in the side panel
4. **Connect Nodes**: 
   - Select a node
   - Click the "Connect Nodes" button
   - Click on another node to create a connection
5. **Move Nodes**: Drag nodes to reposition them (connections will follow)
6. **Delete Connections**: Click on the blue circle in the middle of a connection
7. **Delete Nodes**: Select a node and click "Delete Node" in the side panel
8. **Edit Node Text**: Select a node and modify its text in the side panel

## Technologies Used

- React
- D3.js for visualization and interactions
- HTML5/CSS3
- JavaScript ES6+

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and D3.js
- Inspired by visual thinking and mind mapping techniques

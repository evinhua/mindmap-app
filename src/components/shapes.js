// Shape definitions for the mindmap app nodes
import * as d3 from 'd3';

// Shape generator functions that return SVG path data
export const shapes = {
  // Standard rectangle with rounded corners
  rectangle: (width, height) => {
    return {
      path: (x, y) => {
        const rx = 5; // corner radius
        const ry = 5;
        return `M${x},${y + ry}
                Q${x},${y} ${x + rx},${y}
                L${x + width - rx},${y}
                Q${x + width},${y} ${x + width},${y + ry}
                L${x + width},${y + height - ry}
                Q${x + width},${y + height} ${x + width - rx},${y + height}
                L${x + rx},${y + height}
                Q${x},${y + height} ${x},${y + height - ry}
                Z`;
      },
      textPosition: (x, y, width, height) => ({ x: x + width / 2, y: y + height / 2 }),
      dimensions: { width, height }
    };
  },
  
  // Ellipse/oval shape
  ellipse: (width, height) => {
    return {
      path: (x, y) => {
        const rx = width / 2;
        const ry = height / 2;
        const cx = x + rx;
        const cy = y + ry;
        return `M${cx - rx},${cy}
                A${rx},${ry} 0 1,0 ${cx + rx},${cy}
                A${rx},${ry} 0 1,0 ${cx - rx},${cy}
                Z`;
      },
      textPosition: (x, y, width, height) => ({ x: x + width / 2, y: y + height / 2 }),
      dimensions: { width, height }
    };
  },
  
  // Diamond shape
  diamond: (width, height) => {
    return {
      path: (x, y) => {
        const middleX = x + width / 2;
        const middleY = y + height / 2;
        return `M${middleX},${y}
                L${x + width},${middleY}
                L${middleX},${y + height}
                L${x},${middleY}
                Z`;
      },
      textPosition: (x, y, width, height) => ({ x: x + width / 2, y: y + height / 2 }),
      dimensions: { width, height }
    };
  },
  
  // Hexagon shape
  hexagon: (width, height) => {
    return {
      path: (x, y) => {
        const middleX = x + width / 2;
        const quarterWidth = width / 4;
        return `M${x + quarterWidth},${y}
                L${x + width - quarterWidth},${y}
                L${x + width},${y + height / 2}
                L${x + width - quarterWidth},${y + height}
                L${x + quarterWidth},${y + height}
                L${x},${y + height / 2}
                Z`;
      },
      textPosition: (x, y, width, height) => ({ x: x + width / 2, y: y + height / 2 }),
      dimensions: { width, height }
    };
  },
  
  // Cloud shape (simplified)
  cloud: (width, height) => {
    return {
      path: (x, y) => {
        const w = width;
        const h = height;
        // Create a simplified cloud using multiple arcs
        return `M${x + w*0.2},${y + h*0.5}
                a${w*0.1},${h*0.1} 0 1,1 ${w*0.15},${-h*0.1}
                a${w*0.15},${h*0.15} 0 1,1 ${w*0.2},${-h*0.05}
                a${w*0.15},${h*0.15} 0 1,1 ${w*0.2},${h*0.1}
                a${w*0.15},${h*0.15} 0 1,1 ${w*0.15},${h*0.15}
                a${w*0.15},${h*0.15} 0 1,1 ${-w*0.05},${h*0.1}
                a${w*0.15},${h*0.15} 0 1,1 ${-w*0.3},${h*0.05}
                a${w*0.15},${h*0.15} 0 1,1 ${-w*0.25},${-h*0.15}
                a${w*0.1},${h*0.1} 0 1,1 ${-w*0.1},${-h*0.1}
                Z`;
      },
      textPosition: (x, y, width, height) => ({ x: x + width / 2, y: y + height / 2 }),
      dimensions: { width, height }
    };
  },
  
  // Parallelogram shape
  parallelogram: (width, height) => {
    return {
      path: (x, y) => {
        const offset = width / 6;
        return `M${x + offset},${y}
                L${x + width},${y}
                L${x + width - offset},${y + height}
                L${x},${y + height}
                Z`;
      },
      textPosition: (x, y, width, height) => ({ x: x + width / 2, y: y + height / 2 }),
      dimensions: { width, height }
    };
  }
};

// Function to get shape data based on shape name
export const getShapeData = (shapeName, width, height) => {
  if (shapes[shapeName]) {
    return shapes[shapeName](width, height);
  }
  // Default to rectangle if shape not found
  return shapes.rectangle(width, height);
};

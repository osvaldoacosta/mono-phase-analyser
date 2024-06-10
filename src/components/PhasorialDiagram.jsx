import React from "react";

const PhasorialDiagram = ({ vectors }) => {
  const toRadians = (angle) => (angle * Math.PI) / 180;

  const calculateEndPoints = (vectors) => {
    let x = 250;
    let y = 250;
    const points = [{ x, y }];

    vectors.forEach((vector) => {
      const dx = vector.intensity * Math.cos(toRadians(vector.angle));
      const dy = vector.intensity * Math.sin(toRadians(vector.angle));
      x += dx;
      y -= dy; // SVG y-axis is inverted
      points.push({ x, y });
    });

    return points;
  };

  const points = calculateEndPoints(vectors);

  return (
    <div>
      <svg width="500" height="500" style={{ border: "1px solid black" }}>
        <line
          x1={points[0].x}
          y1={points[0].y}
          x2={points[points.length - 1].x}
          y2={points[points.length - 1].y}
          stroke="red"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        {vectors.map((vector, index) => (
          <React.Fragment key={index}>
            <line
              x1={points[index].x}
              y1={points[index].y}
              x2={points[index + 1].x}
              y2={points[index + 1].y}
              stroke="black"
              markerEnd="url(#arrow)"
            />
            <text
              x={(points[index].x + points[index + 1].x) / 2}
              y={(points[index].y + points[index + 1].y) / 2}
              fontSize="12"
              fill="black"
            >
              {vector.name}
            </text>
          </React.Fragment>
        ))}
        <text
          x={points[points.length - 1].x + 5}
          y={points[points.length - 1].y - 5}
          fontSize="12"
          fill="red"
        >
          Vp/a
        </text>
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,10 L10,5 z" fill="#000" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default PhasorialDiagram;

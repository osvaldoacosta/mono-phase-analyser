import React, { useEffect, useRef } from "react";
import svgPanZoom from "svg-pan-zoom";

const Phasor = ({
  vectors,
  independentVectors,
  expressaoVpSobreA,
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const panZoomInstance = svgPanZoom(svgRef.current, {
      zoomEnabled: true,
      controlIconsEnabled: true,
      fit: true,
      center: true,
    });

    return () => panZoomInstance.destroy();
  }, []);

  const toRadians = (angle) => (angle * Math.PI) / 180;

  const calculateEndPoints = (vectors) => {
    let x = 250;
    let y = 250;
    const points = [{ x, y }];

    vectors.forEach((vector) => {
      if (vector.intensity < 30) {
        vector.intensity += 30;
      }
      const dx = vector.intensity * Math.cos(toRadians(vector.angle));
      const dy = vector.intensity * Math.sin(toRadians(vector.angle));
      x += dx;
      y -= dy; // SVG y-axis is inverted
      points.push({ x, y });
    });

    return points;
  };

  const generateColor = (index) => {
    const colors = [
      "red",
      "blue",
      "green",
      "orange",
      "purple",
      "brown",
      "pink",
    ];
    return colors[index % colors.length];
  };

  const points = calculateEndPoints(vectors);

  return (
    <div>
      <svg
        ref={svgRef}
        width="800"
        height="800"
        style={{ border: "1px solid black" }}
      >
        <line
          x1={points[0].x}
          y1={points[0].y}
          x2={points[points.length - 1].x}
          y2={points[points.length - 1].y}
          stroke="brown"
          strokeWidth="2"
        />
        {vectors.map((vector, index) => (
          <React.Fragment key={index}>
            <line
              x1={points[index].x}
              y1={points[index].y}
              x2={points[index + 1].x}
              y2={points[index + 1].y}
              stroke={generateColor(index)}
              strokeWidth="2"
            />
            <text
              x={(points[index].x + points[index + 1].x + 10) / 2}
              y={(points[index].y + points[index + 1].y + 20) / 2}
              fontSize="9"
              fontWeight="bold"
              fill="black"
            >
              {vector.name}
            </text>
          </React.Fragment>
        ))}

        {independentVectors.length > 0 &&
          independentVectors.map((vector, index) => {
            const dx = vector.intensity * Math.cos(toRadians(vector.angle));
            const dy = vector.intensity * Math.sin(toRadians(vector.angle));
            const endX = 250 + dx;
            const endY = 250 - dy; // SVG y-axis is inverted

            return (
              <React.Fragment key={`independent-${index}`}>
                <line
                  x1={250}
                  y1={250}
                  x2={endX}
                  y2={endY}
                  stroke={generateColor(index + vectors.length)}
                  strokeWidth="2"
                />
                <text
                  x={(250 + endX - 40) / 2}
                  y={(250 + endY + 20) / 2}
                  fontSize="9"
                  fill="black"
                  fontWeight="bold"
                >
                  {vector.name}
                </text>
              </React.Fragment>
            );
          })}
        <text
          x={points[points.length - 1].x + 5}
          y={points[points.length - 1].y - 5}
          fontSize="10"
          fill="brown"
        >
          Vp/a = {expressaoVpSobreA}
        </text>
      </svg>
    </div>
  );
};

export default Phasor;

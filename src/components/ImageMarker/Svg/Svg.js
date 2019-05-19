import React, { useState } from "react";

export default function Svg(props) {
  const { width, height } = props.size;
  const [viewBox, setViewBox] = useState([0, 0, width, height]);

  return (
    <svg width={width} height={height} viewBox={viewBox.join(" ")}>
      <image
        href={props.src}
        x={0}
        y={0}
        width={width}
        height={height}
      />
    </svg>
  );
}

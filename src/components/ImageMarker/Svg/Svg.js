import React, { useState, useCallback } from "react";
import useGetPosition from "./useGetPosition";

export default function Svg(props) {
  const { width, height } = props.size;
  const [viewBox, setViewBox] = useState([0, 0, width, height]);

  const [element, setElement] = useState(void 0);
  const getPosition = useGetPosition(viewBox, element);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onMouseMove = useCallback(
    event => {
      if (getPosition) {
        setPos(getPosition(event));
      }
    },
    [getPosition]
  );

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox.join(" ")}
      ref={element => setElement(element)}
      onMouseMove={onMouseMove}
    >
      <image
        href={props.src}
        x={0}
        y={0}
        width={width}
        height={height}
      />
      <circle
        r={5}
        cx={pos.x}
        cy={pos.y}
        fill="lawngreen"
        stroke="hotpink"
      />
    </svg>
  );
}

import React from "react";
import { useZoom } from "./useZoom";
import useKey from "./useKey";
import { usePan } from "./usePan";
import { useDrawRects } from "./useDrawRects";

export default function App({ boundingClientRect = {} }) {
  const { width, height } = boundingClientRect;
  const [viewBox, setViewBox] = React.useState([0, 0, width, height]);
  const { onWheel } = useZoom(viewBox, setViewBox, width, height);
  const { onMouseDown: pan } = usePan(viewBox, setViewBox, width, height);
  const { onMouseDown: draw, rects } = useDrawRects(boundingClientRect, viewBox);
  const modifier = useKey("Shift");

  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox={viewBox.join(" ")}
      onWheel={onWheel}
      onMouseDown={e => {
        if (modifier) pan(e);
         else draw(e);
      }}
      onDoubleClick={e => {
        setViewBox([0, 0, width, height]);
      }}
    >
      <image
        href="img.jpg"
        x={0}
        y={0}
        width={`${width}px`}
        height={`${height}px`}
      />
      {rects.map(rect => (
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          fill="none"
          stroke="blue"
          stokeWidth="2"
        />
      ))}
    </svg>
  );
}

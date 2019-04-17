import React from "react";
import { useZoom } from "./useZoom";
import { usePan } from "./usePan";

export default function App({ width, height }) {
  const [viewBox, setViewBox] = React.useState([0, 0, width, height]);
  const { onWheel } = useZoom(viewBox, setViewBox, width, height);
  const { onMouseDown } = usePan(viewBox, setViewBox, width, height);

  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox={viewBox.join(" ")}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
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
    </svg>
  );
}

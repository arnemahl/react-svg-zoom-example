import React from "react";
import { fullWidth, fullHeight } from "./dimensions.js";
import { useZoom } from "./useZoom";
import { usePan } from "./usePan";

export default function App() {
  const [viewBox, setViewBox] = React.useState([0, 0, fullWidth, fullHeight]);

  const { onWheel, zoom } = useZoom(viewBox, setViewBox);
  const { onMouseDown } = usePan(viewBox, setViewBox, zoom);

  return (
    <svg
      width="500px"
      height="500px"
      viewBox={viewBox.join(" ")}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
    >
      <rect x={0} y={0} width={100} height={100} fill="black" />
      <rect x={1} y={1} width={98} height={98} fill="blue" />
      <rect x={45} y={45} width={10} height={10} fill="black" />
    </svg>
  );
}

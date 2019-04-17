import React from "react";
import { useZoom } from "./useZoom";
import useKey from "./useKey";
import { usePan } from "./usePan";

export default function App({ boundingClientRect = {} }) {
  const { width, height } = boundingClientRect;
  const [viewBox, setViewBox] = React.useState([0, 0, width, height]);
  const { onWheel } = useZoom(viewBox, setViewBox, width, height);
  const { onMouseDown: pan } = usePan(viewBox, setViewBox, width, height);
  //const { onMouseDown: draw, element } = draw(viewBox, width, height); TODO
  const modifier = useKey("Shift");

  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox={viewBox.join(" ")}
      onWheel={onWheel}
      onMouseDown={e => {
        if (modifier) pan(e);
        //  else draw(e);
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
    </svg>
  );
}

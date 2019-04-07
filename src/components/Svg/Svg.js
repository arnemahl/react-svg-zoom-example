import React from 'react';

const fullWidth = 100;
const fullHeight = 100;

export default function App() {
  const [viewBox, setViewBox] = React.useState([0, 0, fullWidth, fullHeight])

  const onWheel = React.useCallback((event) => {
    const d = event.deltaY / 10
    const [x, y, width, height] = viewBox
    const nextViewBox = [x - d / 2, y - d / 2, width + d, height + d]

    // Prevent zooming too far in
    if (nextViewBox[3] <= 0 || nextViewBox[4] <= 0) {
      return
    }

    // Prevent zooming too far out
    if (nextViewBox[3] > fullWidth || nextViewBox[4] <= fullHeight) {
      return
    }

    setViewBox(nextViewBox)
  }, [viewBox, setViewBox])

  return (
    <svg
      width="500px"
      height="500px"
      viewBox={viewBox.join(" ")}
      onWheel={onWheel}
    >
      <rect
        x={0}
        y={0}
        width={100}
        height={100}
        fill="black"
      />
      <rect
        x={1}
        y={1}
        width={98}
        height={98}
        fill="blue"
      />
      <rect
        x={45}
        y={45}
        width={10}
        height={10}
        fill="black"
      />
    </svg>
  );
}

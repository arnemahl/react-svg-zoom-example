import React from 'react';

const fullWidth = 100;
const fullHeight = 100;

function usePan(viewBox, setViewBox) {
  const [pressedPos, setPressedPos] = React.useState(void 0)

  const onMouseDown = React.useCallback((event) => {
    const { screenX, screenY } = event
    setPressedPos({ screenX, screenY })
  }, [setPressedPos])

  // onMouseMove
  React.useEffect(
    () => {
      if (!pressedPos) {
        return
      }

      function onMouseMove(event) {
        const [x, y, width, height] = viewBox
        const dx = event.movementX * width / fullWidth
        const dy = event.movementY * height / fullHeight
        const [nextX, nextY, nextWidth, nextHeight] = [x - dx, y - dy, width, height]

        // Prevent panning too far
        if (
          nextX < 0 ||
          nextY < 0 ||
          nextX + nextWidth > fullWidth ||
          nextY + nextHeight > fullHeight
        ) {
          return
        }

        setViewBox([nextX, nextY, nextWidth, nextHeight])
      }
      window.addEventListener("mousemove", onMouseMove)
      return () => {
        window.removeEventListener("mousemove", onMouseMove)
      }
    },
    [pressedPos, viewBox, setViewBox]
  )

  // onMouseUp
  React.useEffect(
    () => {
      if (!pressedPos) {
        return
      }

      function onMouseUp() {
        setPressedPos(void 0)
      }

      window.addEventListener("mouseup", onMouseUp)
      return () => {
        window.removeEventListener("mouseup", onMouseUp)
      }
    },
    [pressedPos, setPressedPos],
  )

  return { onMouseDown }
}

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

  const { onMouseDown } = usePan(viewBox, setViewBox)

  return (
    <svg
      width="500px"
      height="500px"
      viewBox={viewBox.join(" ")}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
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

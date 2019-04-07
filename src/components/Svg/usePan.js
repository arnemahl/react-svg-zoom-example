import React from 'react';
import { fullWidth, fullHeight } from './dimensions.js'

export function usePan(viewBox, setViewBox) {
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
        const dx = event.movementX * width / fullWidth / 2
        const dy = event.movementY * height / fullHeight / 2
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

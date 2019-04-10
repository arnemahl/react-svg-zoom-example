import React from 'react';
import { fullWidth, fullHeight } from './dimensions.js'

export function useZoom(viewBox, setViewBox) {
  const onWheel = React.useCallback((event) => {
    const [x, y, width, height] = viewBox
    const d = event.deltaY * (0.003 * Math.max(width, height))
    let [nextX, nextY, nextWidth, nextHeight] = [x - d / 2, y - d / 2, width + d, height + d]

    // Prevent zooming too far in
    if (nextWidth <= 0 || nextHeight <= 0) {
      return
    }

    // Prevent zooming too far out
    if (nextWidth > fullWidth || nextHeight > fullHeight) {
      setViewBox([0, 0, fullWidth, fullHeight])
      return
    }

    // Prevent zooming out to the side
    // (When zooming out, go back to original viewBox so we keep stuff centerd)
    if (nextX < 0) {
      nextX = 0
    }
    if (nextY < 0) {
      nextY = 0
    }
    if (nextX + nextWidth > fullWidth) {
      nextX = fullWidth - nextWidth
    }
    if (nextY + nextHeight > fullHeight) {
      nextY = fullHeight - nextHeight
    }

    setViewBox([nextX, nextY, nextWidth, nextHeight])
  }, [viewBox, setViewBox])

  return { onWheel }
}

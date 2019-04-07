import React from 'react';
import { fullWidth, fullHeight } from './dimensions.js'

export function useZoom(viewBox, setViewBox) {
  const onWheel = React.useCallback((event) => {
    const d = event.deltaY / 10
    const [x, y, width, height] = viewBox
    const [nextX, nextY, nextWidth, nextHeight] = [x - d / 2, y - d / 2, width + d, height + d]

    // Prevent zooming too far in
    if (nextWidth <= 0 || nextHeight <= 0) {
      return
    }

    // Prevent zooming too far out
    if (nextWidth > fullWidth || nextHeight > fullHeight) {
      return
    }

    setViewBox([nextX, nextY, nextWidth, nextHeight])
  }, [viewBox, setViewBox])

  return { onWheel }
}

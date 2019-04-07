import React from 'react';
import { fullWidth, fullHeight } from './dimensions.js'

export function useZoom(viewBox, setViewBox) {
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

  return { onWheel }
}

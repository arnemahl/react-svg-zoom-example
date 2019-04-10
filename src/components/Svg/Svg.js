import React from 'react';
import AlloyFinger from 'alloyfinger/react/AlloyFinger'
import { fullWidth, fullHeight } from './dimensions.js'
import { useZoom } from './useZoom'
import { usePan } from './usePan'

export default function App({ width, height }) {
  const [viewBox, setViewBox] = React.useState([0, 0, fullWidth, fullHeight])

  const { onWheel, zoom } = useZoom(viewBox, setViewBox)
  const { onMouseDown } = usePan(viewBox, setViewBox, zoom)

  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox={viewBox.join(" ")}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onDoubleClick={e => {
        setViewBox([0,0,fullWidth,fullHeight])
      }}
    >
    <image
      href="https://3lhowb48prep40031529g5yj-wpengine.netdna-ssl.com/wp-content/uploads/2012/09/photo22.jpg"
      x={0}
        y={0}
        width={`${width}px`}
      height={`${height}px`}
    />
    </svg>
  );
}

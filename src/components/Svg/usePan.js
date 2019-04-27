import React from "react";
import { fullWidth, fullHeight } from "./dimensions.js";

export function usePan(viewBox, setViewBox) {
  const [pressedPos, setPressedPos] = React.useState(void 0);

  const onMouseDown = React.useCallback(
    event => {
      const { screenX, screenY } = event;
      setPressedPos({ screenX, screenY });
    },
    [setPressedPos]
  );

  // onMouseMove
  React.useEffect(() => {
    if (!pressedPos) {
      return;
    }

    function onMouseMove(event) {
      const [x, y, width, height] = viewBox;
      const dx = (event.movementX * width) / fullWidth / 2;
      const dy = (event.movementY * height) / fullHeight / 2;
      const [nextX, nextY, nextWidth, nextHeight] = [
        x - dx,
        y - dy,
        width,
        height
      ];

      // Math.max/min: Prevent panning too far
      setViewBox([
        Math.max(0, Math.min(fullWidth - nextWidth, nextX)),
        Math.max(0, Math.min(fullHeight - nextHeight, nextY)),
        nextWidth,
        nextHeight
      ]);
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [pressedPos, viewBox, setViewBox]);

  // onMouseUp
  React.useEffect(() => {
    if (!pressedPos) {
      return;
    }

    function onMouseUp() {
      setPressedPos(void 0);
    }

    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [pressedPos, setPressedPos]);

  return { onMouseDown };
}

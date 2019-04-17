import React from "react";

export function useDrawRects(boundingClientRect, viewBox) {
  const [rect, setRect] = React.useState(void 0);
  const [finishedRects, setFinishedRects] = React.useState([]);

  const getPos = React.useMemo(() => (event) => {
    return {
      x: event.screenX - boundingClientRect.x,
      y: event.screenY - boundingClientRect.y,
    };
  }, [boundingClientRect, viewBox]);

  const onMouseDown = React.useCallback(
    event => {
      setRect({
        start: getPos(event),
        end: getPos(event),
      });
    },
    [getPos, setRect],
  );

  // onMouseMove
  React.useEffect(() => {
    if (!rect) {
      return;
    }

    function onMouseMove(event) {
      setRect({
        start: rect.start,
        end: getPos(event),
      });
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [getPos, rect, setRect]);

  const formatRect = React.useMemo(
    () => ({ start, end }) => {
      const x = Math.min(start.x, end.x);
      const y = Math.min(start.y, end.y);
      const width = Math.max(start.x, end.x) - x;
      const height = Math.max(start.y, end.y) - y;
      return { x, y, width, height };
    },
    [],
  );

  const allRects = React.useMemo(
    () => (rect ? finishedRects.concat(formatRect(rect)) : finishedRects),
    [finishedRects, formatRect, rect],
  );

  // onMouseUp
  React.useEffect(() => {
    if (!rect) {
      return;
    }

    function onMouseUp() {
      setFinishedRects(allRects);
      setRect(void 0);
    }

    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [rect, allRects, setFinishedRects, setRect]);

  return {
    onMouseDown,
    rects: allRects,
  };
}

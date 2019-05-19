import { useMemo } from "react";

const add = n2 => num => num + n2;
const subtract = n2 => num => num - n2;
const multiply = n2 => num => num * n2;

export default function useGetPosition(viewBox, element) {
  return useMemo(() => {
    if (!element) {
      return void 0
    }
    return function getPosition(event) {
      const [vbX, vbY, vbWidth, vbHeight] = viewBox;
      const bcr = element.getBoundingClientRect();

      return {
        x: [event.clientX]
          .map(subtract(bcr.x))
          .map(multiply(vbWidth / bcr.width))
          .map(add(vbX)),
        y: [event.clientY]
          .map(subtract(bcr.y))
          .map(multiply(vbHeight / bcr.height))
          .map(add(vbY)),
      }
    }
  }, [viewBox, element]);
}

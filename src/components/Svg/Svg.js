import React from 'react';

export default function App() {
  const width = 100;
  const height = 100;

  const [viewBox, setViewBox] = React.useState([0, 0, width, height])

  React.useEffect(() => {
    window.addEventListener('scroll', console.log)
  }, [viewBox, setViewBox])

  return (
    <svg
      width="500px"
      height="500px"
      viewBox={viewBox.join(" ")}
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

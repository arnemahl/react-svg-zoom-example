import React from 'react';
import Svg from 'components/Svg/Svg';

export default function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div>
        <h1>Hello</h1>
        <Svg width={300} height={200} />
      </div>
    </div>
  );
}

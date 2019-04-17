import React from "react";
import Svg from "components/Svg/Svg";
import Sizer from "components/Sizer/Sizer";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div style={{ width: "100%", maxWidth: "1000px" }}>
        <h1>Hello</h1>
        <Sizer>
          <Svg />
        </Sizer>
      </div>
    </div>
  );
}

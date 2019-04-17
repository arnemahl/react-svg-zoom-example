import React from "react";
import Svg from "components/Svg/Svg";
import Sizer from "components/Sizer/Sizer";

export default function App() {
  return (
    <div>
      <div style={{ width: "100%", maxWidth: "1000px" }}>
        <Sizer>
          <Svg />
        </Sizer>
      </div>
    </div>
  );
}

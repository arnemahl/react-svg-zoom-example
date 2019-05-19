import React, { useState } from "react";
import ImageSize from "components/ImageSize/ImageSize";
import Svg from "./Svg/Svg";

export default function ImageMarker(props) {
  const [size, setSize] = useState(void 0);

  return (
    <div>
      ImageMarker
      <ImageSize onSize={setSize} src={props.src} />
      {size && <Svg size={size} src={props.src} />}
    </div>
  );
}

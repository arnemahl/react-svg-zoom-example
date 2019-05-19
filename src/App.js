import React from "react";
import ImageMarker from "components/ImageMarker/ImageMarker"

const imageUrls = ["/img.jpg"];

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
        {imageUrls.map(src => (
          <ImageMarker key={src} src={src} />
        ))}
      </div>
    </div>
  );
}

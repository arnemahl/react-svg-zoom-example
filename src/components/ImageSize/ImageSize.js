import React from "react";
import * as S from "./ImageSize.style";

export default function ImageSize(props) {
  function setSize(event) {
    const { width, height } = event.target.getBoundingClientRect();
    props.onSize({
      width,
      height,
      heightToWidth: height / width
    });
  }

  return (
    <S.Container>
      <S.Img src={props.src} onLoad={setSize} />
    </S.Container>
  );
}

import { useState } from "react";
import styles from "./palette.module.css";

export default function (props) {
  const setColor = () => {
    props.setCurrentColor(props.color);
  };

  return (
    <span
      style={{ backgroundColor: props.color }}
      onClick={setColor}
      className={
        props.currentColor == props.color
          ? styles.paletteButtonSelected
          : styles.paletteButton
      }
    ></span>
  );
}

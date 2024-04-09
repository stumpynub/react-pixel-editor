import styles from "./AnimBar.module.css";
import { BsPlayFill as PlayButton } from "react-icons/bs";
import { BsStopFill as StopButton } from "react-icons/bs";
import { BsArrowRightShort as NextButton } from "react-icons/bs";
import { BsArrowLeftShort as PrevButton } from "react-icons/bs";
import AnimBarButton from "./AnimBarButton";
import { useEffect, useRef, useState } from "react";

export default function AnimBar(props) {
  
  function play() {
    props.setPlaying();
  }

  return (
    <div className={styles.animBar}>
      <AnimBarButton onClick={play}>
        {props.playing ? <StopButton /> : <PlayButton />}
      </AnimBarButton>
    </div>
  );
}

import FrameSelectCard from "./FrameSelectCard";
import styles from "./selector.module.css";
import { useEffect, useRef, useState } from "react";

export default function (props) {
  let ref = useRef(null);
  let [playbackSpeed, setPlaybackSpeed] = useState(0.5);
  let [activeIndex, setActiveIndex] = useState(0);
  let [canvasCount, setCanvasCount] = useState(0);

  useEffect(() => {
    setActiveCanvas(activeIndex);
  }, [activeIndex, [props.canvasList]]);

  useInterval(() => {
    if (props.playing) {
      playNextFrame();
    }
  }, (playbackSpeed * 1000) / 3);

  function playNextFrame() {
    let frame = activeIndex + 1;
    setActiveCanvas(frame);
  }

  function playPrevFrame() {
    let frame = activeIndex - 1;
    setActiveCanvas(frame);
  }

  function playNextFrame() {
    if (props.playing) {
      let frame = activeIndex + 1;
      setActiveCanvas(frame);
    }
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef(null);

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function setActiveCanvas(index) {
    let canvasList = Array.from(document.getElementsByClassName("canvas"));

    setCanvasCount(canvasList.length);

    if (index > canvasList.length - 1 || index < 0) {
      index = 0;
    }

    canvasList.forEach((canvas) => {
      let canvasIndex = canvasList.indexOf(canvas);

      if (index === canvasIndex) {
        canvas.style.display = "inline-table";
      } else {
        canvas.style.display = "none";
      }
    });
    setActiveIndex(index);
  }

  function setCount() {
    let canvasList = Array.from(document.getElementsByClassName("canvas"));
    setCanvasCount(canvasList.length);
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return (
    <div ref={ref} className={styles.selector}>
      {props.canvasList.map((canvas) => (
          <FrameSelectCard
          setCount={setCount}
          canvasCount={canvasCount}
          setActive={setActiveCanvas}
          activeIndex={activeIndex}
          canvasList={props.canvasList}
          removeCanvas={props.removeCanvas}
          ></FrameSelectCard>
          ))}
        {props.children}
    </div>
  );
}

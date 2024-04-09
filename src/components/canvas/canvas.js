import { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";
import Pixel from "./Pixel";

export default function (props) {
  const [mousePressed, setMousePressed] = useState(false);
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  function setPressed() {
    setMousePressed(!mousePressed);
  }

  return (
    <table ref={ref} className="canvas" index={index} onClick={setPressed}>
      <tbody>
        {props.canvasHeight.map(() => (
          <tr>
            {props.canvasWidth.map((index) => (
              <Pixel 
                key={index}
                currentColor={props.currentColor}
                canvas={ref.current}
                canvasWidth={props.canvasWidth}
                canvasHeight={props.canvasHeight}
                className={styles.canvas}
                gridEnabled={props.gridEnabled}
                color={props.currentColor}
                mouseStates={props.mouseStates}
                activeTool={props.activeTool}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";
import Pixel from "./pixel";

export default function (props) {
  let [mousePressed, setMousePressed] = useState(false);
  let [index, setIndex] = useState(0);
  let width = [...Array(32).keys()];
  let height = [...Array(32).keys()];
  let ref = useRef(null);


  function setPressed() {
    setMousePressed(!mousePressed);
  }

  return (
    <table ref={ref} className="canvas" index={index} onClick={setPressed}>
      <tbody>
        {width.map(() => (
          <tr>
            {height.map(() => (
              <Pixel
                currentColor={props.currentColor}
                canvas={ref.current}
                className="canvas"
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

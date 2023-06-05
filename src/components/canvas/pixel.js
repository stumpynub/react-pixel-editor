import { useEffect, useRef, useState } from "react";
import style from "./pixel.module.css";
import { click } from "@testing-library/user-event/dist/click";

export default function Pixel(props) {
  const hoverColor = "grey";

  let [color, setColor] = useState("transparent");
  let ref = useRef(null);


  function changeColorOnOver() {
    if (props.activeTool === "pen") {
      if (props.mouseStates.leftMouse) {
        console.log("hi")
        setPixelColor(props.currentColor);
      }
      if (props.mouseStates.rightMouse) {
        console.log("hi")
        setPixelColor("transparent");
      } 
    }
  }

  function changeColorOnClick(e) {
    if (props.activeTool === "pen") {
      if (e.button == 0) {
        setPixelColor(props.currentColor);
      }
      if (e.button == 1) {
        setPixelColor("white");
      }
    }

    if (props.activeTool === "fill") {
      floodFill(ref.current);
    }
  }

  function setPixelColor(color) {
    setColor(color);
  }

  function floodFill(pixel) {
    let pixels = [];
    let queue = [];

    Array.from(props.canvas.childNodes[0].children).forEach((row) => {
      Array.from(row.children).forEach((pixel) => {
        pixels.push(pixel);
      });
    });

    let max = 32 * 32;
    let clicked = pixels.indexOf(ref.current);
    let targetColor = pixels[clicked].style.backgroundColor;

    queue.push(pixels[clicked]);

    while (queue.length > 0) { 
      let left = pixels.indexOf(queue[0]) - 1;
      let right =  pixels.indexOf(queue[0]) + 1
      let up =  pixels.indexOf(queue[0]) - 32
      let down = pixels.indexOf(queue[0]) + 32
      
      const moveAndPush = (index) => {
        let isValid = index >= 0 && index < max && pixels[index].style.backgroundColor !== props.currentColor

        queue.forEach((pixel) => { 
          if(pixel === queue[index]) { 
            queue.splice(index, 1)
          }
        })

        if (!isValid) { 
          return 
        }

        let isTargetColor = pixels[index].style.backgroundColor === targetColor
        if (pixels[index].style.backgroundColor !== props.currentColor && isTargetColor) { 
          queue.push(pixels[index])
        }
      }

      moveAndPush(right)
  
      if (queue[0].style.backgroundColor === props.currentColor) { 
        queue.shift()
      } else { 
        queue[0].style.backgroundColor = props.currentColor
      }
    }
  }

  function mouseLeave() {
    if (!props.leftPressed || !props.rightPressed) {
    }
  }

  return (
    <td
      ref={ref}
      className={props.gridEnabled ? style.grid : style.noGrid}
      style={{ backgroundColor: color }}
      onMouseOver={changeColorOnOver}
      onMouseLeave={mouseLeave}
      onMouseDown={changeColorOnClick}
    ></td>
  );
}

import { useEffect, useRef, useState } from "react";
import style from "./pixel.module.css";
import { click } from "@testing-library/user-event/dist/click";
import canvas from "./Canvas";

export default function Pixel(props) {
  let [color, setColor] = useState("transparent");
  let ref = useRef(null);

  function changeColorOnOver() {
    if (props.activeTool === "pen") {
      if (props.mouseStates.leftMouse) setPixelColor(props.currentColor)
      if (props.mouseStates.rightMouse) {
        setPixelColor("rgba(0, 0, 0, 0")
      };
    }
  }

  function changeColorOnClick(e) {
    if (props.activeTool === "pen") {
      if (e.button == 0) {
        setPixelColor(props.currentColor);
      }
      if (e.button == 2) {
        setPixelColor("rgba(0, 0, 0, 0");
        console.log("hi")
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
    let canvasHeight = props.canvasHeight.length; 
    let canvasWidth = props.canvasWidth.length; 
    let canvasArea = canvasWidth * canvasHeight; 

    let pixels = [];
    let queue = [];
    let completedQueue = [];  
    
    Array.from(props.canvas.childNodes[0].children).forEach((row) => {
      Array.from(row.children).forEach((pixel) => {
        pixels.push(pixel);
      });
    });

    let clicked = pixels.indexOf(ref.current);
    let targetColor = pixels[clicked].style.backgroundColor;

    queue.push(pixels[clicked]);

    
    while (queue.length > 0) {

      let queueCurrent = queue[0]; 
      let queueCurrentIndex = pixels.indexOf(queueCurrent); 

      queue[0].style.backgroundColor = props.currentColor
      queue.splice(0, 1); 

      const validPixel = (index) => {
        let vPixel = pixels[index];
        let validIndex = index >= 0 && index < (canvasArea);
        
        if (completedQueue.includes(vPixel)) {
          return false
        };

        if (!validIndex) {
          return false;
        }
        
        let validColor =
          vPixel.style.backgroundColor === targetColor &&
          vPixel.style.backgroundColor !== props.currentColor;

        if (!validColor) {
          return false;
        }

        return true;
      };

      const moveAndPush = (index) => {
        let right = index + 1;
        let left = index - 1;
        let up = index - canvasWidth;
        let down = index + canvasWidth;

      
        if (validPixel(right) === true  && (queueCurrentIndex + 1) % canvasWidth != 0) { 
          queue.push(pixels[right]);
          completedQueue.push(pixels[right])
        }
        
        if (validPixel(left) && queueCurrentIndex % canvasWidth != 0) { 
          queue.push(pixels[left]);
          completedQueue.push(pixels[left])
        }

        if (validPixel(up) === true) {
          queue.push(pixels[up]);
          completedQueue.push(pixels[up])
        }
        
        if (validPixel(down) === true) {
          queue.push(pixels[down]);
          completedQueue.push(pixels[down])
        }
      };
      
      if (completedQueue.length >= canvasArea) { 
        queue = []
      } 
      
      moveAndPush(queueCurrentIndex); 

    }

    completedQueue = []

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

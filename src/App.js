import "./App.css";
import Canvas from "./components/canvas/Canvas";
import React, { useContext, useRef, useState } from "react";
import Toolbar from "./components/toolbar/Toolbar";
import FrameSelect from "./components/selector/FrameSelect";
import AnimBar from "./components/anim/AnimBar";
import PaletteHolder from "./components/palette/PaletteHolder";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { exportComponentAsPNG } from "react-component-export-image";

function App() {
  const tools = {
    pen: "pen",
    erase: "erase",
    fill: "fill",
  };

  const [mouseStates, setMouseStates] = useState({
    leftMouse: false,
    middleMouse: false,
    rightMouse: false,
  });

  const [gridEnabled, setGridEnabled] = useState(true);
  const [animPlaying, setAnimPlaying] = useState(false);
  const [canvasList, setCanvasList] = useState([
    { id: uuidv4(), canvas: null },
  ]);
  const [activeTool, setActiveTool] = useState(tools.pen);
  const [canvasWidth, setCanvasWidth] = useState([...Array(32).keys()]);
  const [canvasHeight, setCanvasHeight] = useState([...Array(32).keys()]);
  const [currentColor, setCurrentColor] = useState("black");
  const [scale, setScale] = useState(1);
  const [translation, setTranslation] = useState({x: 0, y: 0})

  document.addEventListener("contextmenu", (event) => event.preventDefault());

  function setMouseStateDown(e) {
    const state = mouseStates;

    switch (e.button)  {
      case 0:
        state.leftMouse = true;  
      case 1: 
        state.middleMouse = true; 
      case 2: 
    }
    
    setMouseStates(state);
  }

  function setMouseStateUp(e) {
    const state = mouseStates;
    if (e.button === 0) state.leftMouse = false;
    if (e.button === 1) state.middleMouse = false;
    if (e.button === 2) state.rightMouse = false;
    
    setMouseStates(state);
  }


  function setMouseMove(e) { 
   
  }

  function setScroll(e)  { 
    setScale(scale + e.deltaY * 0.001)
  }

  function setGrid() {
    setGridEnabled(!gridEnabled);
  }

  function setPlaying() {
    setAnimPlaying(!animPlaying);
  }

  function addCanvas() {
    if (canvasList.length >= 20) {
      return;
    }

    const entry = { id: uuidv4() };
    setCanvasList([...canvasList, entry]);
  }

  function removeCanvas(id) {
    const list = canvasList.filter((canvas) => canvas.id !== id);
    setCanvasList(list);
  }

  function setTool(t) {
    setActiveTool(t);
  }

  return (
    <div
      className="App"
      onMouseDown={setMouseStateDown}
      onMouseUp={setMouseStateUp}
      onWheel={setScroll}
      onMouseMove={setMouseMove}
    >
      <Toolbar
        activeTool={activeTool}
        setGridEnabled={setGrid}
        gridEnabled={gridEnabled}
        setTool={setTool}
        setCanvasWidth={(n) => {
          setCanvasWidth([...Array(n).keys()]);
        }}
        setCanvasHeight={(n) => {
          setCanvasHeight([...Array(n).keys()]);
        }}
      ></Toolbar>

      <PaletteHolder
        setCurrentColor={setCurrentColor}
        currentColor={currentColor}
      />

      <div className="canvas-holder" id="canvas-holder">
        {canvasList.map(
          (c) =>
            (c.canvas = (
              <Canvas
                key={c.id}
                gridEnabled={gridEnabled}
                mouseStates={mouseStates}
                activeTool={activeTool}
                currentColor={currentColor}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
                scale={scale}
              />
            ))
        )}
      </div>

      <div className="timeline">
        <AnimBar setPlaying={setPlaying} playing={animPlaying} />

        <FrameSelect
          playing={animPlaying}
          canvasList={canvasList}
          removeCanvas={removeCanvas}
        >
          <AiOutlinePlusCircle
            fill="white"
            onClick={() => {
              addCanvas();
            }}
            className={canvasList.length > 0 ? "add-canvas-btn" : "center"}
          />
        </FrameSelect>
      </div>
    </div>
  );
}

export default App;

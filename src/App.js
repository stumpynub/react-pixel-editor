import "./App.css";
import Canvas from "./components/canvas/canvas";
import React, { useEffect, useRef, useState } from "react";
import Toolbar from "./components/toolbar/toolbar";
import Selector from "./components/selector/selector";
import AnimBar from "./components/anim/animBar";
import PaletteHolder from "./components/palette/paletteHolder";
import canvas from "./components/canvas/canvas";

function App() {
  const tools = {
    pen: "pen",
    erase: "erase",
    fill: "fill",
  };

  let [mouseStates, setMouseStates] = useState({"leftMouse": false, "middleMouse": false , "rightMouse": false})
  let [gridEnabled, setGridEnabled] = useState(true);
  let [animPlaying, setAnimPlaying] = useState(false);
  let [canvasList, setCanvasList] = useState([]);
  let [activeTool, setActiveTool] = useState(tools.pen);
  let [currentColor, setCurrentColor] = useState("black");

  document.addEventListener("contextmenu", (event) => event.preventDefault());

  function setMouseStatesTrue(e) {
    let state = mouseStates
    if (e.button === 0) {
      state.leftMouse = true 
    }

    if (e.button === 2) {
      state.rightMouse = true 
    }
    setMouseStates(state)
  }

  function setMouseStatesFalse(e) {
    let state = mouseStates
    if (e.button === 0) {
      state.leftMouse = false 
      
    }
    if (e.button === 2) {
      state.rightMouse = false 
    }
    setMouseStates(state)
  }

  function setGrid() {
    setGridEnabled(!gridEnabled);
  }

  function setPlaying() {
    setAnimPlaying(!animPlaying);
  }

  function addCanvas() {
    let id =
      canvasList.length >= 1 ? canvasList[canvasList.length - 1].id + 1 : 0;
    let canvas = {
      id: id,
      canvas: null,
    };

    setCanvasList([...canvasList, canvas]);
  }

  function removeCanvas(id) {
    setCanvasList(canvasList.filter((canvas) => canvas.id != id));
  }

  function setTool(t) {
    setActiveTool(t);
  }

  return (
    <div
      className="App"
      onMouseDown={setMouseStatesTrue}
      onMouseUp={setMouseStatesFalse}
    >
      <Toolbar
        activeTool={activeTool}
        setGridEnabled={setGrid}
        gridEnabled={gridEnabled}
        setTool={setTool}
      ></Toolbar>

      <PaletteHolder setCurrentColor={setCurrentColor} />

      <div className="canvas-holder">
        {canvasList.map((canvas) => (
          <Canvas
            id={canvas.id}
            canvasList={canvasList}
            gridEnabled={gridEnabled}
            mouseStates={mouseStates}
            activeTool={activeTool}
            currentColor={currentColor}
          />
        ))}
      </div>

      <AnimBar setPlaying={setPlaying} playing={animPlaying} />
      <Selector
        playing={animPlaying}
        canvasList={canvasList}
        removeCanvas={removeCanvas}
      >
        <button type="button" onClick={addCanvas} className="add-canvas-btn">
          +
        </button>
      </Selector>
    </div>
  );
}

export default App;

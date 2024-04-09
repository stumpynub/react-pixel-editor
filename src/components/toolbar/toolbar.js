import { MdGridOn, MdGridOff, MdPinDrop } from "react-icons/md";
import { HiEyeDropper } from "react-icons/hi2";
import { BsPen, BsPenFill, BsFillBucketFill } from "react-icons/bs";
import ToolbarButton from "./ToolbarButton";
import style from "./toolbar.module.css";
import NumberInput from "../inputs/NumberInput";

export default function Toolbar(props) {
  function setGrid() {
    props.setGridEnabled();
  }

  function setCanvasWidth(n) {
    props.setCanvasWidth(n);
  }

  function setCanvasHeight(n) {
    props.setCanvasHeight(n);
  }

  return (
    <div className={style.toolbar}>
      <ToolbarButton
        activeTool={props.activeTool}
        selected={props.activeTool == "fill"}
        setTool={props.setTool}
        tool={"fill"}
      >
        <BsFillBucketFill />
      </ToolbarButton>

      <ToolbarButton
        activeTool={props.activeTool}
        selected={props.activeTool == "pen"}
        setTool={props.setTool}
        tool={"pen"}
      >
        <BsPenFill />
      </ToolbarButton>

      <ToolbarButton onClick={setGrid} selected={props.gridEnabled}>
        {props.gridEnabled ? <MdGridOn /> : <MdGridOff />}
      </ToolbarButton>

      <NumberInput label="x:" onChanged={setCanvasWidth} />
      <NumberInput label="y:" onChanged={setCanvasHeight} />
    </div>
  );
}

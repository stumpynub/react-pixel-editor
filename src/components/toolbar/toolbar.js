import { MdGridOn, MdGridOff, MdPinDrop } from 'react-icons/md';
import { HiEyeDropper } from 'react-icons/hi2';
import { BsPen, BsPenFill, BsFillBucketFill} from 'react-icons/bs';
import ToolbarButton from "./toolbarButton";
import style from "./toolbar.module.css"
export default function Toolbar(props) { 


    function setGrid() { 
        props.setGridEnabled()
        console.log(props.activeTool)
    }

    return (
      <div className={style.toolbar}>
        <ToolbarButton activeTool={props.activeTool} selected={props.activeTool == "fill"} setTool={props.setTool} tool={"fill"}>
          <BsFillBucketFill />
        </ToolbarButton>

        <ToolbarButton activeTool={props.activeTool} selected={props.activeTool == "pen"} setTool={props.setTool} tool={"pen"}>
          <BsPenFill />
        </ToolbarButton>

        <ToolbarButton onClick={setGrid} selected={props.gridEnabled}>
          {props.gridEnabled ? <MdGridOn /> : <MdGridOff />}
        </ToolbarButton>

      </div>
    );
}
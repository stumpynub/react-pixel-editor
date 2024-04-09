import { AiOutlinePlusCircle, AiOutlinePlusSquare } from "react-icons/ai";
import Palettebutton from "./PaletteButton";
import styles from "./palette.module.css";
import { Fragment, useEffect, useState } from "react";
import { SketchPicker   } from "react-color";
export default function (props) {

    const [pickerToggled, setPickerToggled] = useState(false);     

    function addColor() { 
        console.log("added color"); 
    }

    function togglePicker() { 
        setPickerToggled(!pickerToggled); 
    }

    function setColor(color, event) { 
        props.setCurrentColor(color.hex)
    }

  return (
    <div>
    <div className={styles.paletteHolder}>
      <Palettebutton
        currentColor={props.currentColor}
        setCurrentColor={props.setCurrentColor}
        color={"red"}
      />
      <Palettebutton
        currentColor={props.currentColor}
        setCurrentColor={props.setCurrentColor}
        color={"black"}
      />
      <Palettebutton
        currentColor={props.currentColor}
        setCurrentColor={props.setCurrentColor}
        color={"blue"}
      />
      <Palettebutton
        currentColor={props.currentColor}
        setCurrentColor={props.setCurrentColor}
        color={"green"}
      />
      <Palettebutton
        currentColor={props.currentColor}
        setCurrentColor={props.setCurrentColor}
        color={"white"}
      />
      <Palettebutton
        currentColor={props.currentColor}
        setCurrentColor={props.setCurrentColor}
        color={"pink"}
      />

      <AiOutlinePlusSquare
        fill="white"
        onClick={togglePicker}
        className={styles.addBttn}
      />    

    </div>

    <SketchPicker className={ pickerToggled ? styles.pickerShow : styles.pickerHide} onChangeComplete={setColor}/>

    </div>
  );
}

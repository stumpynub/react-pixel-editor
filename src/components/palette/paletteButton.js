import { useState } from "react"
import styles from "./palette.module.css"

export default  function Palettebutton (props) { 

    const setColor = () => { 
        props.setCurrentColor(props.color) 
    }

    return (
        <span style={{backgroundColor: props.color}} onClick={setColor} className={styles.paletteButton}></span>
    )
}
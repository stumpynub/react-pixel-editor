import Palettebutton from "./paletteButton";
import styles from "./palette.module.css"
export default function PaletteHolder(props) { 
    return (
        <div className={styles.paletteHolder}>
            <Palettebutton setCurrentColor={props.setCurrentColor} color={"red"} /> 
            <Palettebutton setCurrentColor={props.setCurrentColor} color={"black"} /> 
            <Palettebutton setCurrentColor={props.setCurrentColor} color={"blue"} /> 
            <Palettebutton setCurrentColor={props.setCurrentColor} color={"green"} /> 
        </div>
    )
}
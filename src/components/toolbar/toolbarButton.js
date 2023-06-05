import style from "./toolbarButton.module.css"

export default function ToolbarButton(props) { 

    function onClick() {
        if (props.tool){
            props.setTool(props.tool)
        } else{ 
            props.onClick()
        }
    }

    return (
        <span className={props.selected ? `${style.selected}  ${style.button}` :style.button } onClick={onClick}>
            {props.children}
        </span>
    )
}
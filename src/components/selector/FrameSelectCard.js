import { AiFillDelete as Delete } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import styles from "./selector.module.css";


export default function FrameSelectCard(props) {
  let [isActive, setIsActive] = useState(false);
  let [isHovered, setIsHovered] = useState(false);
  let [index, setIndex] = useState(0);
  let [id, setId] = useState("");
  let ref = useRef(null);

  useEffect(() => {
    let index = Array.from(ref.current.parentNode.children).indexOf(
      ref.current
    );
    setIndex(index);
    setId(props.canvasList[index].id);
    setIsActive(index === props.activeIndex);
  }, [props.activeIndex, props.canvasList]);

  function setActiveCanvas() {
    props.setActive(index);
  }

  function setHoverTrue() {
    setIsHovered(true);
  }

  function setHoverFalse() {
    setIsHovered(false);
  }

  function removeCanvas() {
    props.removeCanvas(id);
  }

  return (
    <span
      ref={ref}
      onClick={setActiveCanvas}
      className={
        isActive
          ? `${styles.selectorCard} ${styles.selectorCardActive}`
          : styles.selectorCard
      }
      onMouseOver={setHoverTrue}
      onMouseLeave={setHoverFalse}
    >
      <Delete
        className={isHovered ? styles.deleteShow : styles.deleteHide}
        onClick={removeCanvas}
      />
      <p>{index + 1}</p>
    </span>
  );
}

import { AiFillDelete as Delete } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import styles from "./selector.module.css";
import { unmountComponentAtNode } from "react-dom";

export default function SelectorCard(props) {
  let [isActive, setIsActive] = useState(false);
  let [isHovered, setIsHovered] = useState(false);
  let [index, setIndex] = useState(0);
  let ref = useRef(null);

  useEffect(() => {
    let index = Array.from(ref.current.parentNode.children).indexOf(
      ref.current
    );
    setIndex(index);
    setIsActive(index === props.activeIndex);
  }, [props.activeIndex, props.cavnasList]);

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
    props.removeCanvas(index)
  }

  return (
    <span
      ref={ref}
      onClick={setActiveCanvas}
      className={
        isActive
          ? `${styles.SelectorCard} ${styles.SelectorCardActive}`
          : styles.SelectorCard
      }
      onMouseOver={setHoverTrue}
      onMouseLeave={setHoverFalse}
    >
      <Delete
        className={isHovered ? styles.DeleteShow : styles.DeleteHide}
        onClick={removeCanvas}
      />
      <p>{index + 1}</p>
    </span>
  );
}

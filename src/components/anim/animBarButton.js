import styles from "./animBar.module.css";

export default function AnimBarButton(props) {
  function onClick() {
    props.onClick();
  }
  return (
    <div className={styles.animBarButton} onMouseDown={onClick}>
      {props.children}
    </div>
  );
}

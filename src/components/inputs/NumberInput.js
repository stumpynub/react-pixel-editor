import { Fragment, version } from "react";
import styles from "./NumberInput.module.css";
import { useState } from "react";

export default function (props) {
  const [value, setValue] = useState(32);

  function validateNumber(event) {
    let val = parseFloat(event.target.value);

    if (val <= 0 || isNaN(val)) {
      val = 0;
    }

    val = Math.round(val);
    val = Math.min(val, 32);
    event.target.value = val.toString();
    props.onChanged(val);
  }

  return (
    <Fragment>
      <label className={styles.label}>{props.label}</label>
      <input
        className={styles.numberInput}
        onChange={validateNumber}
        placeholder="32"
      />
    </Fragment>
  );
}

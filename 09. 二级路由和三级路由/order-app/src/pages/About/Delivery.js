import React from "react";
import styles from "./TabPane.scss";

export default function Delivery() {
  return (
    <div className={styles.tabpane}>
      <p className={styles.title}>快递信息</p>
      <div className={styles.content}>快递信息</div>
    </div>
  );
}

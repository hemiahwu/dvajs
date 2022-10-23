import React from "react";
import styles from "./TabPane.scss";

export default function History() {
  return (
    <div className={styles.tabpane}>
      <p className={styles.title}>历史订餐</p>
      <div className={styles.content}>历史订餐</div>
    </div>
  );
}

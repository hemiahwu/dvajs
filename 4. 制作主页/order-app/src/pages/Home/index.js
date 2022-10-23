import React from "react";
import style from "./index.scss";

export default function index(props) {
  return (
    <div className={style.home}>
      <div className={style.background}>
        <h1>欢迎大家品尝pizza！</h1>
        <h2>这里有你非常喜欢的pizza！</h2>
      </div>
    </div>
  );
}

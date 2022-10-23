import React from "react";
import { connect } from "dva";
import style from "./index.scss";

function index(props) {
  return (
    <div className={style.home}>
      <div className={style.background}>
        <h1>欢迎大家品尝pizza！</h1>
        <h2>这里有你非常喜欢的pizza！</h2>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default connect(({ home }) => ({ ...home }))(index);

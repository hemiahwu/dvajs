import React from "react";
import styles from "./TabPane.scss";
// 引入Switch(排他性路由: 取其中匹配的第一个路由)、Route(路由)、Redirect(重定向)等组件
import { Switch } from "dva/router";
import SubRoutes, { RedirectRoute } from "Utils/SubRoutes";

export default function Contact({ app, routes, location }) {
  return (
    <div className={styles.tabpane}>
      <p className={styles.title}>联系我们</p>
      <div className={styles.content}>
        <a href="/#/about/contact/phone">电话</a>
        <a href="/#/about/contact/address">地址</a>
        <div className={styles.info}>
          {/* 三级路由配置 */}
          <Switch>
            {/* 渲染路由 */}
            {routes.map((route, i) => {
              return <SubRoutes key={i} {...route} app={app} />;
            })}
            {/* 重定向 */}
            <RedirectRoute
              exact={true}
              from={"/about/contact"}
              routes={routes}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

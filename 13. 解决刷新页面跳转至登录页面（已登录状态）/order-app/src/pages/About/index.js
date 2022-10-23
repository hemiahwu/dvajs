import React, { Component } from "react";
import { Tabs } from "antd";
import style from "./index.scss";
// 引入Switch(排他性路由: 取其中匹配的第一个路由)、Route(路由)、Redirect(重定向)等组件
import { Switch } from "dva/router";
import SubRoutes, { RedirectRoute } from "Utils/SubRoutes";

const { TabPane } = Tabs;

export class index extends Component {
  // 点击切换tab路由
  handleChangeTab = key => {
    window.location.href = "/#" + key;
  };

  render() {
    const { routes = [], app, location } = this.props;
    console.log(routes);
    const pathnames = location ? location.pathname.split("/") : [];
    const activeKey =
      pathnames.length > 2 ? `/${pathnames[1]}/${pathnames[2]}` : "";
    return (
      <div className={style.about}>
        <Tabs
          className={style.tabs}
          tabPosition={"left"}
          activeKey={activeKey}
          onChange={this.handleChangeTab}
        >
          <TabPane tab="历史订餐" key="/about/history" />
          <TabPane tab="联系我们" key="/about/contact" />
          <TabPane tab="点餐文档" key="/about/orderingguide" />
          <TabPane tab="快递信息" key="/about/delivery" />
        </Tabs>
        <div className={style.routes}>
          {/* 二级路由配置 */}
          <Switch>
            {/* 渲染路由 */}
            {routes.map((route, i) => {
              return <SubRoutes key={i} {...route} app={app} />;
            })}
            {/* 重定向 */}
            <RedirectRoute exact={true} from={"/about"} routes={routes} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default index;

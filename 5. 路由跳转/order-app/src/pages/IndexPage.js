import React from "react";
import { connect } from "dva";
import { Layout } from "antd";
import Headers from "./Header";
import style from "./IndexPage.scss";
// 引入Switch(取其中匹配的第一个路由)、Route(路由)、Redirect(重定向)等组件
import { Switch, Route, Redirect } from "dva/router";
// 引入Home，Menus，Admin，Login，Register组件
import Home from "./Home";
import Menus from "./Menus";
import Admin from "./Admin";
import Login from "./User/Login";
import Register from "./User/Register";

const { Header, Content } = Layout;

const RouteConfig = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/menus",
    component: Menus
  },
  {
    path: "/admin",
    component: Admin
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  }
];

function IndexPage(props) {
  return (
    <Layout className={style.layout}>
      <Header className={style.header}>
        <Headers {...props} />
      </Header>
      <Content className={style.content}>
        {/* 一级路由配置 */}
        <Switch>
          {RouteConfig.map(props => {
            return <Route {...props} />;
          })}
          <Redirect to="/home" />
          {/* <Route path="/home" component={Home} />
          <Route path="/menus" component={Menus} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect to="/home" /> */}
        </Switch>
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);

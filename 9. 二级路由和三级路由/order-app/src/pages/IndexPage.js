import React from "react";
import { connect } from "dva";
import { Layout } from "antd";
import Headers from "./Header";
import style from "./IndexPage.scss";
// 引入Switch(排他性路由: 取其中匹配的第一个路由)、Route(路由)、Redirect(重定向)等组件
import { Switch } from "dva/router";
import SubRoutes, { RedirectRoute, NoMatchRoute } from "Utils/SubRoutes";

const { Header, Content } = Layout;

function IndexPage(props) {
  const { routes, app } = props;

  return (
    <Layout className={style.layout}>
      <Header className={style.header}>
        <Headers {...props} />
      </Header>
      <Content className={style.content}>
        {/* 一级路由配置 */}
        <Switch>
          {/* 渲染路由 */}
          {routes.map((route, i) => {
            return <SubRoutes key={i} {...route} app={app} />;
          })}
          {/* 
              重定向方式：
              如果路由配置中没有redirect: true（通过循环渲染重定向）
              则默认第一个路由为重定向路由
              <Redirect exact from={"/"} to={routes[0].path} /> 
            */}
          <RedirectRoute exact={true} from={"/"} routes={routes} />
          {/* 输入的链接不存在时 跳转至 NoMatch 组件 */}
          <NoMatchRoute />
        </Switch>
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);

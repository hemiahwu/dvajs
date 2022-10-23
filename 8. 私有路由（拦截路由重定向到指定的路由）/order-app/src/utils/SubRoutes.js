import React from "react";
import { Route, Redirect } from "dva/router";
import dynamic from "dva/dynamic";
import NoMatch from "../components/NoMatch";
import { connect } from "dva";

// 按需加载组件
const dynamicCom = (app, models, component, routes, isAuthority, userInfo) =>
  dynamic({
    app,
    models: () => models,
    component: () =>
      component().then(res => {
        console.log("isAuthority:", isAuthority, "userInfo:", userInfo);
        // isAuthority为true为私有路由进入判断
        if (isAuthority) {
          // 私有路由条件：如果userInfo中id信息没有（条件不满足）则重定向至登录页面，如果条件满足则执行下一个return
          if (!userInfo.id) {
            return () => <Redirect to="/login" />;
          }
        }
        const Component = res.default || res;
        return props => <Component {...props} app={app} routes={routes} />;
      })
  });

// 把子路由配置传入到相关的组件中
// export default function SubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       render={props => <route.component {...props} routes={route.routes} />}
//     />
//   );
// }
function SubRoutes({
  path,
  routes,
  component,
  app,
  model,
  isAuthority,
  userInfo
}) {
  return (
    <Route
      path={path}
      component={dynamicCom(
        app,
        model,
        component,
        routes,
        isAuthority,
        userInfo
      )}
    />
  );
}

export default connect(({ global }) => ({
  userInfo: global.userInfo
}))(SubRoutes);

// 重定向组件
export function RedirectRoute({ routes, from, exact }) {
  const routeR = routes.filter(item => {
    return item.redirect;
  });
  const to = routeR.length ? routeR[0].path : routes[0].path;
  return <Redirect exact={exact} from={from} to={to} />;
}

// 路由不匹配时跳转至NoMatch
export function NoMatchRoute({ status = 404 }) {
  return <Route render={props => <NoMatch {...props} status={status} />} />;
}

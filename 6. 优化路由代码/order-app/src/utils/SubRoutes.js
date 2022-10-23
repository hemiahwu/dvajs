import React from "react";
import { Route, Redirect } from "dva/router";
import NoMatch from "../components/NoMatch";

// 把子路由配置传入到相关的组件中
// export default function SubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       render={props => <route.component {...props} routes={route.routes} />}
//     />
//   );
// }
export default function SubRoutes({ path, routes, component: Component }) {
  return (
    <Route
      path={path}
      render={props => <Component {...props} routes={routes} />}
    />
  );
}

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

import React from "react";
import { Router, Switch } from "dva/router";
import SubRoutes from "./utils/SubRoutes";

const isAuthority = true;

const RouteConfig = [
  {
    path: "/",
    component: () => import("./pages/IndexPage"),
    model: [],
    routes: [
      {
        path: "/home",
        model: [import("./models/home")],
        component: () => import("./pages/Home"),
        redirect: true,
        isAuthority
      },
      {
        path: "/menus",
        model: [],
        component: () => import("./pages/Menus"),
        isAuthority
      },
      {
        path: "/admin",
        model: [],
        component: () => import("./pages/Admin"),
        isAuthority
      },
      {
        path: "/about",
        model: [],
        component: () => import("./pages/About"),
        isAuthority
      },
      {
        path: "/login",
        model: [],
        component: () => import("./pages/User/Login")
      },
      {
        path: "/register",
        model: [],
        component: () => import("./pages/User/Register")
      }
    ]
  }
];

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        {RouteConfig.map((route, i) => (
          <SubRoutes key={i} {...route} app={app} />
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;

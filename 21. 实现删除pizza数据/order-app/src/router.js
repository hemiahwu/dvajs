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
        isAuthority,
        routes: [
          {
            path: "/about/history",
            model: [],
            component: () => import("./pages/About/History")
          },
          {
            path: "/about/contact",
            model: [],
            component: () => import("./pages/About/Contact"),
            routes: [
              {
                path: "/about/contact/phone",
                model: [],
                component: () => import("./pages/About/Phone")
              },
              {
                path: "/about/contact/address",
                model: [],
                component: () => import("./pages/About/Address")
              }
            ]
          },
          {
            path: "/about/orderingguide",
            model: [],
            component: () => import("./pages/About/OrderingGuide")
          },
          {
            path: "/about/delivery",
            model: [],
            component: () => import("./pages/About/Delivery")
          }
        ]
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

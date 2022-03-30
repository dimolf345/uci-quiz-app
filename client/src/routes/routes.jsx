import React from "react";
// eslint-disable-next-line import/no-cycle
import Home from "../pages/Home/home.component";
import Login from "../pages/Login/login.component";
import SignUp from "../pages/SignUp/signup.component";

const ROUTES = [
  {
    name: "home",
    text: "Home",
    path: "/",
    element: <Home />,
    icon: "",
    exact: true,
    role: ["guest", "user", "admin"],
  },
  {
    name: "login",
    text: "Login",
    path: "/signin",
    element: <Login />,
    icon: "",
    role: ["guest"],
  },
  {
    name: "signup",
    text: "Registrati",
    path: "/signup",
    element: <SignUp />,
    icon: "",
    role: ["guest"],
  },
];

function filterByRole(role) {
  return ROUTES.filter((route) => route.role.includes(role));
}

//selectRoutes dynamically adapt the useful routes considering first if the user is logged or not, and then if there is come other filter
export function selectRoutes(role, filter = []) {
  const routesByRole = filterByRole(role);
  if (filter.length > 0) {
    return routesByRole.filter((route) => filter.includes(route.name));
  }
  return routesByRole;
}

export default ROUTES;

import React from "react";
import Home from "../pages/Home/Home.component";
import SignUp from "../pages/SignUp/signup.component";

function Login() {
  return <h1>Login Page</h1>;
}

function NotFound() {
  return <h1>Stupidooooo</h1>;
}

const ROUTES = [
  {
    name: "home",
    text: "Home",
    path: "/",
    element: <Home />,
    icon: "",
    exact: true,
    admin: false,
    logged: false,
  },
  {
    name: "login",
    text: "Login",
    path: "/signin",
    element: <Login />,
    icon: "",
    admin: false,
    logged: false,
  },
  {
    name: "signup",
    text: "Registrati",
    path: "/signup",
    element: <SignUp />,
    icon: "",
    admin: false,
    logged: false,
  },
  {
    name: "notfound",
    text: "Pagina non trovata",
    path: "*",
    element: <NotFound />,
    admin: false,
    logged: false,
  },
];

function filterByAdminAndLogged(isAdmin, isLogged) {
  if (isAdmin) return ROUTES.filter((route) => route.admin || route.logged);
  return ROUTES.filter((route) => route.logged === isLogged);
}

//selectRoutes dynamically adapt the useful routes considering first if the user is logged or not, and then if there is come other filter
export function selectRoutes(admin = false, logged = false, filter = []) {
  const firstFilter = filterByAdminAndLogged(admin, logged);
  if (filter.length > 0) {
    return firstFilter.filter((route) => filter.includes(route.name));
  }
  return firstFilter;
}

export default ROUTES;

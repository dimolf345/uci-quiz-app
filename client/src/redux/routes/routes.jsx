import React from "react";
import Home from "../../pages/Home/Home.component";

function Auth() {
  return <h1>Porca Madonna</h1>;
}

function Test2() {
  return <h1>Stupidooooo</h1>;
}

const routes = [
  {
    text: "home",
    path: "/",
    element: <Home />,
    exact: true,
  },
  {
    text: "test",
    path: "/auth",
    element: <Auth />,
  },
  {
    text: "Error",
    path: "*",
    element: <Test2 />,
  },
];

export default routes;

// <Route path="/auth" element={<Auth />} />
// <Route path="*" element={<Test2 />} />

import React from "react";
// eslint-disable-next-line import/no-cycle
import Home from "../pages/Home/home.component";
import Login from "../pages/Login/login.component";
import SignUp from "../pages/SignUp/signup.component";
import QuizSettings from "../pages/Quiz-Settings/quiz-settings.component";
import CreateQuestion from "../pages/CreateQuestion/create-question.component";
import QuestionPage from "../pages/QuestionPage/question-page.component";

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
  {
    name: "quiz-settings",
    text: "Prova un quiz",
    path: "/quiz-settings",
    element: <QuizSettings />,
    icon: "",
    role: ["guest", "user", "admin"],
  },
  {
    name: "add-question",
    text: "Aggiungi domanda",
    path: "/add-question",
    element: <CreateQuestion />,
    icon: "",
    role: ["admin"],
  },
  {
    name: "quiz-question",
    text: "Carica una domanda",
    path: "/quizzes/:quizId",
    element: <QuestionPage />,
    icon: "",
    role: ["user", "admin"],
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

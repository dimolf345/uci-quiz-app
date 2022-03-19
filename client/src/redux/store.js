import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-extraneous-dependencies
import logger from "redux-logger";

const middlewares = [];

//adds redux logger middleware only in development mode
if (import.meta.env.MODE === "development") {
  middlewares.push(logger);
}

const reducer = {};

export default configureStore({
  reducer,
  middleware: middlewares,
});

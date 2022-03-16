import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-extraneous-dependencies
import logger from "redux-logger";

const middlewares = [];

//adds redux logger middleware only in development mode
if (import.meta.env.DEV) {
  middlewares.push(logger);
}

export default configureStore({
  reducer: {},
  middleware: middlewares,
});

import { createSelector } from "reselect";

const selectRoutes = (state) => state.routes;

export const getAllRoutes = createSelector([selectRoutes], (routes) => routes);

export const getSelectedRoutes = createSelector(
  [selectRoutes],
  (routes, selected) => routes.filter((route) => selected.includes(route.name))
);

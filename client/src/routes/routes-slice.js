import { createSlice } from "@reduxjs/toolkit";

import initialState from "./routes";

const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    getRoutes: (state) => state,
  },
});

export default routesSlice.reducer;

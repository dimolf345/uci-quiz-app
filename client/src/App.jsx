import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "./layout/Layout.component";
import appRoutes from "./redux/routes/routes";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            {appRoutes.map((route) => {
              const { path, text, element, exact } = route;
              return <Route path={path} exact={exact} element={element} />;
            })}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

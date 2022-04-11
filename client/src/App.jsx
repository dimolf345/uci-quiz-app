import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "./layout/Layout.component";
import appRoutes from "./routes/routes";
import NotFound from "./pages/Notfound/notfound.component";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            {appRoutes.map((route) => {
              const { path, element, exact } = route;
              return (
                <Route
                  key={route.name}
                  path={path}
                  exact={exact}
                  element={element}
                />
              );
            })}
            <Route key="notfound" path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "./layout/Layout.component";

const theme = createTheme();

const Test = () => {
  return <h1>Porco dio</h1>;
};

const Auth = () => {
  return <h1>Porca Madonna</h1>;
};

const NotFound = () => {
  return <h1>Not found</h1>;
};

const Test2 = () => {
  return <h1>Stupidooooo</h1>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Test />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Test2 />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

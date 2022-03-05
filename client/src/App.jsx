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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Test />} />
            <Route path="/auth" element={<Auth />}></Route>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TopNavBar from "./TopNavbar/TopNavbar.component";

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      {/* Top Navbar */}
      <TopNavBar />
      {/* Drawer hidden on mobile */}
      {/* Main component with children */}
      {/* Bottom menu only on mobile */}
      {children}
    </>
  );
};

export default Layout;

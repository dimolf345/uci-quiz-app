import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import TopNavBar from "./TopNavbar/TopNavbar.component";
import Sidebar from "./Sidebar/Sidebar.component";
import MainWrapper from "./MainWrapper/MainWrapper.component";
import BottomNavigation from "./BottomNavigation/BottomNavigation.component";

import { sidebarWidth } from "./Sidebar/Siderbar.styles";

const Layout = ({ children }) => {
  const showSidebar = useMediaQuery("(min-width:900px)");
  return (
    <>
      <CssBaseline />
      {/* Top Navbar */}
      <TopNavBar />
      {/* Drawer hidden on mobile */}
      <Sidebar showSidebar={showSidebar} />
      {/* Main component with children */}
      <MainWrapper sidebarWidth={sidebarWidth} addPadLeft={showSidebar}>
        {children}
      </MainWrapper>
      {!showSidebar && <BottomNavigation />}
      {/* Bottom menu only on mobile */}
    </>
  );
};

export default Layout;

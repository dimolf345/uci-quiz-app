import React from "react";
import Toolbar from "@mui/material/Toolbar";

const MainWrapper = ({ children, addPadLeft, sidebarWidth }) => {
  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 56px)",
  };
  const mainStyles = {
    flexGrow: 1,
    paddingLeft: addPadLeft ? sidebarWidth : 0,
  };
  return (
    <div style={wrapperStyle}>
      <Toolbar />
      <main style={mainStyles}>{children}</main>
    </div>
  );
};

export default MainWrapper;

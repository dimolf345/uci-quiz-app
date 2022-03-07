import React from "react";
import Toolbar from "@mui/material/Toolbar";

import PropTypes from "prop-types";

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

MainWrapper.propTypes = {
  addPadLeft: PropTypes.bool,
  sidebarWidth: PropTypes.number,
};

export default MainWrapper;

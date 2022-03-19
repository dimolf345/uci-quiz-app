import React from "react";
import Toolbar from "@mui/material/Toolbar";

import PropTypes from "prop-types";

function MainWrapper({ children, addPadLeft, sidebarWidth }) {
  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    height: addPadLeft ? "100vh" : "calc(100vh - 56px)",
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
}

MainWrapper.defaultProps = {
  addPadLeft: false,
  sidebarWidth: 200,
  children: {},
};

MainWrapper.propTypes = {
  children: PropTypes.element,
  addPadLeft: PropTypes.bool,
  sidebarWidth: PropTypes.number,
};

export default MainWrapper;

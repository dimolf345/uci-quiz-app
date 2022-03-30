import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAtom } from "jotai";

import { userAtom, roleAtom } from "../../atom";
import styles from "./Siderbar.styles";
import { selectRoutes } from "../../routes/routes";

function Sidebar({ showSidebar }) {
  const role = useAtom(roleAtom)[0];
  console.log(role);
  const menuItems = selectRoutes(role);
  const classes = styles();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Drawer
      sx={{ display: showSidebar ? "block" : "none" }}
      classes={{
        paper: classes.sidebar,
      }}
      className={classes.sidebar}
      anchor="left"
      variant="permanent"
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            selected={location.pathname === item.path}
            component="a"
            key={item.name}
            onClick={() => navigate(item.path)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

Sidebar.defaultProps = {
  showSidebar: false,
};

Sidebar.propTypes = {
  showSidebar: PropTypes.bool,
};

export default Sidebar;

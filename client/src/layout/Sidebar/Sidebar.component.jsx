import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

import styles from "./Siderbar.styles";

const menuItems = [
  {
    text: "I miei quiz",
    path: "/my-quizzes",
    icon: "",
  },
  {
    text: "Nuovo quiz",
    path: "/quiz",
    icon: "",
  },
  {
    text: "Il mio profilo",
    path: "/profile",
    icon: "",
  },
  {
    text: "About",
    path: "/about",
    icon: "",
  },
  {
    text: "Riporta un bug",
    path: "/bugs",
    icon: "",
  },
];

const Sidebar = (props) => {
  const classes = styles();
  let navigate = useNavigate();
  return (
    <Drawer
      sx={{ display: props.showSidebar ? "block" : "none" }}
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
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

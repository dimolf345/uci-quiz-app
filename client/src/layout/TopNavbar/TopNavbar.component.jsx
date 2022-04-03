import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAtom } from "jotai";

import styles from "./TopNavbar.styles";
import { userAtom } from "../../atom";

function TopNavBar() {
  const fullText = useMediaQuery("(min-width:600px)");
  const user = useAtom(userAtom)[0];
  const navigate = useNavigate();
  const classes = styles();
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            size="large"
            aria-label="dropdown-control"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>
        </Box>
        <Typography className={classes.heading} variant="h5" component="h2">
          {fullText && <span>Nave Martinengo - </span>}F 596
        </Typography>
        <Box sx={{ flexGrow: 0 }} className={fullText ? classes.userIcon : ""}>
          <IconButton
            size="large"
            aria-label="dropdown-control"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => navigate("/signin")}
          >
            {fullText && user.name && <Typography>{user.name}</Typography>}
            <AccountCircle sx={{ ml: 1 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavBar;

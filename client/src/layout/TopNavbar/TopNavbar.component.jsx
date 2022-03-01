import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./TopNavbar.styles";

const TopNavBar = () => {
  const classes = styles();
  return (
    <React.Fragment>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="dropdown-control"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography className={classes.heading} variant="h5" component="h2">
              Nave Martinengo - F596
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};

export default TopNavBar;

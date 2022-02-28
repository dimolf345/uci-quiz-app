import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";

const TopNavBar = () => {
  return (
    <React.Fragment>
      <AppBar>
        <Container>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography>Nave Martinengo - F596</Typography>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};

export default TopNavBar;

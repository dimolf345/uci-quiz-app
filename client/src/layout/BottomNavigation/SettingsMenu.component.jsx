import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const options = [
  {
    text: "About",
    path: "/about",
  },
  {
    text: "Il mio profilo",
    path: "/profile",
  },
];

function OptionsMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <IconButton
        size="large"
        aria-label="display profile and about links"
        aria-controls="more-links"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="more-links"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {options.map((option) => (
          <MenuItem key={option.text} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{option.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default OptionsMenu;

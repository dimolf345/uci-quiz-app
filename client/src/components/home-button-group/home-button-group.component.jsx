import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

import styles from "./home-button-group.styles";

function HomeButtonGroup({ routes }) {
  const classes = styles();
  const navigate = useNavigate();
  return (
    <Box className={classes.buttonGroup}>
      {routes.map((route) => (
        <Button
          component="a"
          key={route.text}
          variant="contained"
          onClick={() => navigate(route.path)}
        >
          {route.text}
        </Button>
      ))}
    </Box>
  );
}

HomeButtonGroup.defaultProps = {
  routes: [],
};

HomeButtonGroup.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default HomeButtonGroup;

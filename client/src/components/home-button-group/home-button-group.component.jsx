import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

import styles from "./home-button-group.styles";

function HomeButtonGroup({ routes }) {
  const classes = styles();
  return (
    <Box className={classes.buttonGroup}>
      {routes.map((route) => (
        <Button key={route.text} className={classes.button} variant="contained">
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

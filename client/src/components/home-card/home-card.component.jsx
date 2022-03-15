import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from "./home-card.styles";
import HomeButtonGroup from "../home-button-group/home-button-group.component";

const testRoutes = [
  {
    text: "Login",
    path: "/login",
  },
  {
    text: "Nuovo quiz",
    path: "/quiz-settings",
  },
  {
    text: "Registrati",
    path: "/signup",
  },
];

function HomeCard() {
  const classes = styles();
  return (
    <Box className={classes.homecard}>
      <Typography
        className={classes.title}
        color="primary"
        align="center"
        component="h1"
        variant="h4"
      >
        Quiz per U.C.I.
      </Typography>
      <Typography variant="subtitle2" fontStyle="italic" align="center">
        Perchè l&apos;abilitazione alla guardia non te la regala nessuno.
      </Typography>
      <HomeButtonGroup routes={testRoutes} />
    </Box>
  );
}

export default HomeCard;

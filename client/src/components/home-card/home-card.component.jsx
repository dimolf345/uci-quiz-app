import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";

import styles from "./home-card.styles";
import HomeButtonGroup from "../home-button-group/home-button-group.component";
import { selectRoutes } from "../../routes/routes";
import { roleAtom } from "../../atom";

function HomeCard() {
  const classes = styles();
  const role = useAtom(roleAtom)[0];
  const routes =
    role === "guest"
      ? selectRoutes(role, ["login", "signup"])
      : selectRoutes(role, ["quiz-settings", "add-question"]);
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
      <HomeButtonGroup routes={routes} />
    </Box>
  );
}

export default HomeCard;

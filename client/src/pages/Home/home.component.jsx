import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";

import HomeCard from "../../components/home-card/home-card.component";
import styles from "./home.styles";

function Home() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const classes = styles(isDesktop);
  //set different background image based on useMediaQuery value
  const backgroundImg = `url('/images/martinengo-${
    isDesktop ? "desktop.jpg" : "mobile.jpeg"
  }')`;

  return (
    <Box className={classes.background} sx={{ backgroundImage: backgroundImg }}>
      <HomeCard />
    </Box>
  );
}

export default Home;

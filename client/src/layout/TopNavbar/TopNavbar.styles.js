import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => {
  return {
    menuIcon: {
      display: {
        xs: "none",
        md: "flex",
      },
      flexGrow: 0,
    },
    heading: {
      textAlign: "center",
      flexGrow: 1,
      flexWrap: "nowrap",
    },
    userIcon: {
      position: "absolute",
      right: 24,
    },
  };
});

export default styles;

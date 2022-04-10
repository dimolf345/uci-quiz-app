import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => ({
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
    flexGrow: 0,
  },
}));

export default styles;

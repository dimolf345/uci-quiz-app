import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => ({
  background: {
    minHeight: "100%",
    marginTop: -2,
    display: "flex",
    flexDirection: "column",
    justifyContent: (isDesktop) => (isDesktop ? "center" : "flex-end"),
    alignItems: (isDesktop) => (isDesktop ? "" : "center"),
    border: "1px solid transparent",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    paddingLeft: (isDesktop) => isDesktop && "2rem",
  },
}));

export default styles;

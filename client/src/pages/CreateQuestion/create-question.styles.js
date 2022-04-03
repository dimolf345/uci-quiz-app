import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  centered: {
    minHeight: "100%",
    width: "100%",
    margin: "-2px auto 0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: theme.breakpoints.values.md,
    paddingTop: "3rem",
  },
}));

export default styles;

import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => ({
  centered: {
    minHeight: "100%",
    width: "100%",
    marginTop: -2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: "2rem",
    alignItems: "center",
    padding: "2rem",
  },
  form: {
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
  },
}));

export default styles;

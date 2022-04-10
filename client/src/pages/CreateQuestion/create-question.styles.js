import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => ({
  centered: {
    minHeight: "100%",
    width: "100%",
    padding: "2rem",
    marginTop: -2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
  },
}));

export default styles;

import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => ({
  centered: {
    minHeight: "100%",
    width: "100%",
    marginTop: -2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: "1rem",
    alignItems: "center",
    padding: "2rem",
  },
  form: {
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
  },
  fieldset: {
    borderRadius: 10,
    marginBottom: "2rem",
  },
}));

export default styles;

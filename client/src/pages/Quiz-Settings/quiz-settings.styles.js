import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
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
  formGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldset: {
    borderRadius: 10,
    marginBottom: "2rem",
  },
}));

export default styles;

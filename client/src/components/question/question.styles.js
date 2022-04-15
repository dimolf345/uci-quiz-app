import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => ({
  form: {
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
  },
  fieldset: {
    borderRadius: 10,
    marginBottom: "2rem",
  },
  answer: {
    marginBottom: "1rem",
    border: "2px solid red",
    cursor: "pointer",
  },
}));

export default styles;

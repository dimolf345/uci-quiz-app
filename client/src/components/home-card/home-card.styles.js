import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  homecard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255, 0.65)",
    padding: "1rem 0",
    maxWidth: 500,
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    color: theme.palette.primary,
  },
}));

export default styles;

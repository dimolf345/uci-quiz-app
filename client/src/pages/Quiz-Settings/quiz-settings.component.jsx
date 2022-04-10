import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import styles from "./quiz-settings.styles";

const CATEGORIES = ["Sap", "Locali", "Marinaresco", "Segnali", "Generale"];

function QuizSettings() {
  const classes = styles();
  const [quizCategories, setQuizCategories] = useState([]);
  return (
    <Box className={classes.centered}>
      <Typography color="primary" fontWeight="bold" component="h2" variant="h4">
        Crea un quiz
      </Typography>
      <form className={classes.form}>
        <FormGroup sx={{ display: "flex" }}>
          {CATEGORIES.map((category) => (
            <FormControlLabel control={<Checkbox />} label={category} />
          ))}
        </FormGroup>
      </form>
    </Box>
  );
}

export default QuizSettings;

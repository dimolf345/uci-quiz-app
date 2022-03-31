import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import CustomTextField from "../../components/form/customTextField.component";
import MultiTextInput from "../../components/form/multiTextInput.component";
import { fetchPOST } from "../../utils/fetchAPI/postAPI";

import styles from "./create-question.styles";

function CreateQuestion() {
  const [title, setTitle] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const classes = styles();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Box className={classes.centered}>
      <Typography
        sx={{ mb: 2 }}
        fontWeight="bold"
        color="primary"
        element="h3"
        variant="h5"
      >
        Compila la domanda
      </Typography>
      <form style={{ padding: "2rem", width: "100%" }}>
        {/* Question Title */}
        <CustomTextField
          handleChange={handleTitleChange}
          fieldName="Titolo della domanda"
          type="text"
          value={title}
          multiline={true}
          minRows={3}
        />
        <MultiTextInput inputs={wrongAnswers} setInput={setWrongAnswers} />
      </form>
    </Box>
  );
}

export default CreateQuestion;

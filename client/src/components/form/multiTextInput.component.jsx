import React, { useState } from "react";
import PropTypes from "prop-types";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import CustomTextField from "./customTextField.component";

function MultipleTextInput({ inputs, setInput, fieldName }) {
  const [newAnswer, setNewAnswer] = useState("");
  const [answerError, setAnswerError] = useState(false);

  const handleClick = (delIndex) => {
    setInput(inputs.filter((el, index) => index !== delIndex));
  };
  return (
    <>
      <Typography fontWeight="bold" color="primary" align="center" id="test">
        Riposte errate
      </Typography>
      <ul aria-describedby="test" style={{ padding: 0 }}>
        {inputs.map((input, index) => (
          <li key={input} style={{ display: "flex", marginBottom: "1rem" }}>
            <OutlinedInput
              label={`${fieldName} ${index + 1}`}
              disabled
              value={input}
              type="text"
              variant="outlined"
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      handleClick(index);
                    }}
                    color="error"
                    size="large"
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </li>
        ))}
      </ul>
      <CustomTextField
        type="text"
        error={answerError}
        value={newAnswer}
        helperText={answerError ? "Inserire testo non nullo" : ""}
        required={inputs.length === 0}
        handleChange={(e) => setNewAnswer(e.target.value)}
        fieldName="Nuova risposta errata"
      />
      <Container align="center">
        <Button
          onClick={() => {
            if (newAnswer.trim() === "") {
              setAnswerError(true);
              return;
            }
            setInput([...inputs, newAnswer]);
            setNewAnswer("");
            setAnswerError(false);
          }}
          variant="outlined"
        >
          Aggiungi risposta errata
        </Button>
      </Container>
    </>
  );
}

MultipleTextInput.defaultProps = {
  fielName: "Nuovo campo di testo",
};

MultipleTextInput.propTypes = {
  inputs: PropTypes.array.isRequired,
  setInput: PropTypes.func.isRequired,
  fieldName: PropTypes.string,
};

export default MultipleTextInput;

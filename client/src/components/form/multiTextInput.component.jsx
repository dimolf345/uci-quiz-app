import React, { useState } from "react";

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
  return (
    <>
      <Typography fontWeight="bold" color="primary" align="center" id="test">
        Riposte errate
      </Typography>
      <ul aria-describedby="test" style={{ padding: 0 }}>
        {inputs.map((input, index) => (
          <li key={index} style={{ display: "flex", marginBottom: "1rem" }}>
            <OutlinedInput
              label={`Risposta errata ${index + 1}`}
              disabled
              value={input}
              type="text"
              variant="outlined"
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      inputs.length === 1
                        ? setInput([])
                        : setInput(inputs.slice(index, 1));
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
          }}
          variant="outlined"
        >
          Aggiungi campo
        </Button>
      </Container>
    </>
  );
}

export default MultipleTextInput;

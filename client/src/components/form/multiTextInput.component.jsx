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
  const [newAnswer, setNewAnswer] = React.useState("");
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
        value={newAnswer}
        required={inputs.length === 0}
        handleChange={(e) => setNewAnswer(e.target.value)}
        fieldName="Nuova risposta errata"
      />
      <Container align="center">
        <Button
          onClick={() => {
            setInput([...inputs, newAnswer]);
            setNewAnswer("");
          }}
          variant="contained"
        >
          Aggiungi campo
        </Button>
      </Container>
    </>
  );
}

export default MultipleTextInput;

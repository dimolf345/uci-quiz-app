import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAtom } from "jotai";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";

import CustomTextField from "../../components/form/customTextField.component";
import MultiTextInput from "../../components/form/multiTextInput.component";
import { fetchPOST } from "../../utils/fetchAPI/postAPI";
import { roleAtom } from "../../atom";

import styles from "./create-question.styles";

const FIELDS = {
  title: "",
  correctAnswer: "",
};

const CATEGORIES = ["sap", "locali", "marinaresco", "segnali", "generale"];

function CreateQuestion() {
  const navigate = useNavigate();
  const role = useAtom(roleAtom)[0];
  const [formFields, setFormField] = useState(FIELDS);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = styles();

  const handleChange = (field) => (event) => {
    setFormField({ ...formFields, [field]: event.target.value });
  };

  useEffect(() => {
    if (role !== "admin") navigate("/");
  }, [role]);

  const resetFormFields = () => {
    setFormField(FIELDS);
    setWrongAnswers([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    resetFormFields();
    const response = await fetchPOST("/questions", {
      ...formFields,
      wrongAnswers,
      category,
    });
    if (response) {
      setIsLoading(false);
      // eslint-disable-next-line no-alert
      alert(response.status);
    }
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
      <form onSubmit={handleSubmit} style={{ padding: "2rem", width: "100%" }}>
        {/* Question Title */}
        <CustomTextField
          handleChange={handleChange("title")}
          fieldName="Titolo della domanda"
          type="text"
          value={formFields.title}
          multiline
          minRows={3}
        />
        {/* Correct Answer */}
        <CustomTextField
          handleChange={handleChange("correctAnswer")}
          fieldName="Risposta corretta"
          type="text"
          autoComplete="off"
          value={formFields.correctAnswer}
        />
        {/* Wrong Answers */}
        <MultiTextInput inputs={wrongAnswers} setInput={setWrongAnswers} />
        {/* Category */}
        <TextField
          sx={{ my: 2 }}
          select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Seleziona la categoria della domanda"
          id="cateogry"
          fullWidth
        >
          {CATEGORIES.map((category) => (
            <MenuItem key={category} value={category}>
              {`Categoria ${category.toUpperCase()}`}
            </MenuItem>
          ))}
        </TextField>
        <Container align="center">
          <LoadingButton
            loading={isLoading}
            loadingIndicator="Attendi..."
            variant="contained"
            endIcon={<SendIcon />}
            type="submit"
          >
            Invia domanda
          </LoadingButton>
        </Container>
      </form>
    </Box>
  );
}

export default CreateQuestion;

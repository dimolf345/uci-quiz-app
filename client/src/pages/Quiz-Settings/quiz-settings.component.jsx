import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import RocketLaunch from "@mui/icons-material/RocketLaunch";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAtom } from "jotai";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

import styles from "./quiz-settings.styles";
import CustomSlider from "../../components/form/slider.component";
import { quizAtom } from "../../atom";
import { fetchPOST } from "../../utils/fetchAPI/postAPI";

const CATEGORIES = ["SAP", "Locali", "Marinaresco", "Segnali", "Generale"];

function QuizSettings() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const classes = styles();
  const [quizCategories, setQuizCategories] = useState([]);
  const [questions, setQuestions] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useAtom(quizAtom);
  const navigate = useNavigate();

  const handleChange = (category) => {
    if (quizCategories.includes(category)) {
      setQuizCategories(
        quizCategories.filter((element) => element !== category)
      );
    } else {
      setQuizCategories([...quizCategories, category]);
    }
  };

  useEffect(() => {
    if (quiz !== "") setQuiz("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetchPOST("/quizzes", {
      questions,
      categories: quizCategories.map((category) => category.toLowerCase()),
    });
    if (response) {
      setIsLoading(false);
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-undef
      if (response.status === "success") {
        setQuiz(response.quiz._id);
        alert("Quiz creato con successo");
      }
    }
  };

  return (
    <Box className={classes.centered}>
      <Typography
        color="primary"
        fontWeight="bold"
        component="h2"
        variant="h4"
        gutterBottom
      >
        Crea un quiz
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <fieldset className={classes.fieldset}>
          <legend>
            <Typography color="primary" fontWeight="bold" gutterBottom>
              Seleziona le categorie
            </Typography>
          </legend>
          <Typography align="justify">
            Seleziona il tipo di domande che verranno selezionate per il quiz.
            Se nessuna categoria è selezionata, verranno incluse tutte le
            categorie.
          </Typography>
          <FormGroup
            sx={isDesktop ? { flexDirection: "row" } : {}}
            className={isDesktop ? classes.formGroup : ""}
          >
            {CATEGORIES.map((category) => (
              <FormControlLabel
                key={category}
                onChange={() => handleChange(category)}
                control={
                  <Checkbox checked={quizCategories.includes(category)} />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </fieldset>
        <fieldset className={classes.fieldset}>
          <legend>
            <Typography color="primary" fontWeight="bold" gutterBottom>
              Seleziona il numero di domande
            </Typography>
          </legend>

          <CustomSlider
            label="Seleziona il numero di domande"
            value={questions}
            setValue={setQuestions}
          />
        </fieldset>
        <Container align="center">
          {quiz === "" ? (
            <LoadingButton
              loading={isLoading}
              loadingIndicator="Attendi..."
              variant="contained"
              endIcon={<SendIcon />}
              type="submit"
            >
              Crea il quiz
            </LoadingButton>
          ) : (
            <Button
              onClick={() => navigate(`/quizzes/${quiz}`)}
              endIcon={<RocketLaunch />}
              color="success"
              variant="contained"
              component="a"
            >
              Inizia il Quiz
            </Button>
          )}
        </Container>
      </form>
    </Box>
  );
}

export default QuizSettings;

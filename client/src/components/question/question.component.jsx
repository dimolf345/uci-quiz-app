import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import Button from "@mui/material/Button";

import styles from "./question.styles";
import { fetchGET, fetchPATCH } from "../../utils/fetchAPI/postAPI";
import { questionsAtom } from "../../atom";

function Question({ quizId, questionNr, answers }) {
  const classes = styles();
  const [myAnswer, setMyAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [numOfQuestions, setNumOfQuestions] = useAtom(questionsAtom);

  useEffect(async () => {
    const response = await fetchGET(`/quizzes/${quizId}`);
    if (response.status === "success") {
      setMyAnswer(response.quiz.answers[questionNr]);
      setNumOfQuestions(response.quiz.answers.length);
      setIsLoading(false);
    }
  }, [questionNr]);

  useEffect(async () => {
    const response = await fetchPATCH(`/quizzes/${quizId}/${questionNr}`, {
      answer: myAnswer,
    });
  }, [myAnswer]);

  return (
    <form className={classes.form}>
      <fieldset className={classes.fieldset}>
        <legend>
          <Typography color="primary" fontWeight="bold" gutterBottom>
            Scegli una delle risposte
          </Typography>
        </legend>

        <Container>
          {answers &&
            answers.map((answer) => {
              const isSelected = answer === myAnswer;
              return (
                <Box sx={{ mb: 2, cursor: "pointer" }}>
                  <Button
                    variant="outlined"
                    className={classes.answer}
                    onClick={() => setMyAnswer(answer)}
                    fullWidth
                    focused={isSelected}
                    value={answer}
                  >
                    {answer}
                  </Button>
                </Box>
              );
            })}
        </Container>
      </fieldset>
    </form>
  );
}

Question.propTypes = {
  quizId: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  questionNr: PropTypes.number.isRequired,
};

export default Question;

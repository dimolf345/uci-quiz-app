import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

import { fetchGET } from "../../utils/fetchAPI/postAPI";
import styles from "./question-page.styles";
import Question from "../../components/question/question.component";
import { roleAtom, questionsAtom } from "../../atom";

function QuestionPage(props) {
  const classes = styles();
  const { quizId } = useParams();
  const [questionNr, setQuestionNr] = useState(0);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const numOfQuestions = useAtom(questionsAtom)[0];

  useEffect(async () => {
    const response = await fetchGET(`/quizzes/${quizId}/${questionNr}`);
    if (response.status === "success") {
      setQuestion(response.question);
      setIsLoading(false);
    }
  }, [questionNr]);

  const handleClick = (nextIndex) => {
    if (questionNr + nextIndex < 0) {
      setQuestionNr(numOfQuestions - 1);
      return;
    }
    if (questionNr + nextIndex > numOfQuestions - 1) {
      setQuestionNr(0);
      return;
    }
    setQuestionNr(questionNr + nextIndex);
  };

  return (
    <Box className={classes.centered}>
      {/* Question number */}
      <Typography
        gutterBottom
        fontWeight="bold"
        component="h3"
        variant="h5"
        color="primary"
      >
        Domanda {questionNr + 1}
      </Typography>
      {/* Question Title */}
      <Typography
        align="center"
        gutterBottom
        fontWeight="bold"
        component="h4"
        variant="h6"
        color="primary"
      >
        {isLoading ? "Sto caricando..." : question.title}
      </Typography>
      <Question
        quizId={quizId}
        questionNr={questionNr}
        setQuestionNr={setQuestionNr}
        answers={question.answers}
      />
      {/* Action buttons */}
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => handleClick(-1)}
          startIcon={<ChevronLeft />}
          variant="outlined"
        >
          Precedente
        </Button>
        <Button
          onClick={() => handleClick(1)}
          endIcon={<ChevronRight />}
          variant="outlined"
        >
          Successiva
        </Button>
      </Container>
    </Box>
  );
}

QuestionPage.propTypes = {};

export default QuestionPage;

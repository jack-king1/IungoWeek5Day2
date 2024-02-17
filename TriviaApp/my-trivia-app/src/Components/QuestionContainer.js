import React, { useState, useEffect, useContext } from "react";
import { TriviaContext } from "../TriviaContexts";
import StartScreen from "./Screens/StartScreen";
import BooleanLayout from "./Questions/BooleanLayout";
import MultipleLayout from "./Questions/MultipleLayout";
import QuizScreen from "./Screens/QuizScreen";

function QuestionContainer(props) {
    const triviaContext = useContext(TriviaContext);
    const [startQuiz, setStartQuiz] = useState(false);

    const colours = ["green", "red", "blue", "yellow"];

    function StartQuiz() {
        setStartQuiz(true);
    }

    function AnswerSelected(selectedAnswer) {
        //Check if answer was correct
        //Check question count and reset if needed.
        // if (questionCount >= triviaContext.questionCount) {
        //     setQustionCount(0);
        //     setStartQuiz(false);
        //     triviaContext.GetNewQuestions();
        // } else {
        //     setQustionCount(questionCount + 1);
        // }
    }

    return (
        <div
            className={`text-white flex h-full ${
                !startQuiz ? "justify-center items-center" : "justify-start"
            }`}
        >
            {triviaContext.loaded ? (
                !startQuiz ? (
                    <StartScreen action={StartQuiz} />
                ) : (
                    <QuizScreen colours={colours} />
                )
            ) : null}
        </div>
    );
}

export default QuestionContainer;

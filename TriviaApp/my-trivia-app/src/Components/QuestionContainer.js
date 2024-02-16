import React, { useState, useEffect, useContext } from "react";
import { TriviaContext } from "../TriviaContexts";

function QuestionContainer(props) {
    const triviaContext = useContext(TriviaContext);
    const [startQuiz, setStartQuiz] = useState(false);
    const [questionCount, setQustionCount] = useState(0);
    const [baseTrivia, setBaseTrivia] = useState(null);
    const [possibleAnswers, setPossibleAnswers] = useState([]);

    useEffect(() => {
        console.log("Had Loaded: ", triviaContext.loaded);
        if (triviaContext.loaded) {
            console.log("Trivia has been loaded!");
            SetPossibleAnswers();
        } else {
            return;
        }
    }, [triviaContext]);

    useEffect(() => {
        SetPossibleAnswers();
    }, [questionCount]);

    function ResetQuiz() {
        setStartQuiz(false);
    }

    function StartQuiz() {
        setStartQuiz(true);
    }

    function StartScreen() {
        return (
            <div className="flex justify-center items-center flex-col gap-10">
                <div className="text-6xl font-kanit">
                    Welcome, Press 'Start' to play!
                </div>
                <button
                    onClick={StartQuiz}
                    className="font-kanit text-3xl w-2/3 h-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                    Start Game
                </button>
            </div>
        );
    }

    function SetPossibleAnswers() {
        if (
            triviaContext.trivia == undefined ||
            triviaContext.trivia.length <= 0
        ) {
            console.log("Trivia seems to be undefined: ", triviaContext);
            return;
        }
        console.log("Context before setting answers: ", triviaContext);
        let shuffledAnswers =
            triviaContext.trivia.results[questionCount].incorrect_answers;
        shuffledAnswers = [
            ...shuffledAnswers,
            triviaContext.trivia.results[questionCount].correct_answer,
        ];

        shuffledAnswers.map(replaceEntity);
        setPossibleAnswers(shuffledAnswers);
    }

    function replaceEntity(string) {
        let newString = string.replace(/^&#039;|&#039;$|&quot;/g, "");
        return newString;
    }

    function AnswerSelected(selectedAnswer) {
        if (
            selectedAnswer ==
            triviaContext.trivia.results[questionCount].correct_answer
        ) {
            console.log("Correct!");
        } else {
            console.log(
                "Wrong Answer! Correct Answer: ",
                triviaContext.trivia.results[questionCount].correct_answer,
                "You selected: ",
                selectedAnswer
            );
        }
        setQustionCount(questionCount + 1);
    }

    function BooleanLayout() {
        return (
            <div className="flex flex-row gap-4 items-center justify-center flex-grow">
                <button
                    onClick={() => AnswerSelected("True")}
                    className="font-kanit text-3xl w-1/2 h-20 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                >
                    True
                </button>
                <button
                    onClick={() => AnswerSelected("False")}
                    className="font-kanit text-3xl w-1/2 h-20 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                >
                    False
                </button>
            </div>
        );
    }

    function MultipleLayout() {
        return (
            <div className="flex flex-col gap-4 items-center justify-center flex-grow">
                <div className="flex flex-row items-center justify-center w-full gap-4">
                    <button
                        onClick={() => AnswerSelected([possibleAnswers[0]])}
                        className="font-kanit text-3xl w-1/2 h-20 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                    >
                        {possibleAnswers[0]}
                    </button>
                    <button
                        onClick={() => AnswerSelected([possibleAnswers[1]])}
                        className="font-kanit text-3xl w-1/2 h-20 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    >
                        {possibleAnswers[1]}
                    </button>
                </div>
                <div className="flex flex-row items-center justify-center w-full gap-4">
                    <button
                        onClick={() => AnswerSelected([possibleAnswers[2]])}
                        className="font-kanit text-3xl w-1/2 h-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    >
                        {possibleAnswers[2]}
                    </button>
                    <button
                        onClick={() => AnswerSelected([possibleAnswers[3]])}
                        className="font-kanit text-3xl w-1/2 h-20 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
                    >
                        {possibleAnswers[3]}
                    </button>
                </div>
            </div>
        );
    }

    function QuizScreen() {
        return (
            <div className="w-full h-full flex flex-col">
                <div className="grid grid-cols-4 gap-2"></div>
                <div className="col-span-4 text-start text-2xl">
                    {triviaContext.trivia.results[questionCount].category}
                </div>
                <div className="col-span-4 text-5xl pt-4 text-center">
                    {replaceEntity(
                        triviaContext.trivia.results[questionCount].question
                    )}
                </div>
                {triviaContext.trivia.results[questionCount].type == "boolean"
                    ? BooleanLayout()
                    : MultipleLayout()}
            </div>
        );
    }

    return (
        <div
            className={`text-white flex h-full ${
                !startQuiz ? "justify-center items-center" : "justify-start"
            }`}
        >
            {triviaContext.loaded
                ? !startQuiz
                    ? StartScreen()
                    : QuizScreen()
                : null}
        </div>
    );
}

export default QuestionContainer;

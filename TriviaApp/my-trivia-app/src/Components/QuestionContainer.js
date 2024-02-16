import React, { useState, useEffect, useContext } from "react";
import { TriviaContext } from "../TriviaContexts";
import AnswerBtn from "./AnswerBtn";

function QuestionContainer(props) {
    const triviaContext = useContext(TriviaContext);
    const [startQuiz, setStartQuiz] = useState(false);
    const [questionCount, setQustionCount] = useState(0);
    const [baseTrivia, setBaseTrivia] = useState(null);
    const [possibleAnswers, setPossibleAnswers] = useState([]);

    const colours = ["green", "red", "blue", "yellow"];

    //setup answers once context has loaded api
    useEffect(() => {
        console.log("Had Loaded: ", triviaContext.loaded);
        if (triviaContext.loaded) {
            console.log("Trivia has been loaded!");
            SetPossibleAnswers();
        }

        if (triviaContext.reloaded) {
            console.log("fetching new questioms...");
            SetPossibleAnswers();
        }
    }, [triviaContext]);

    //on count reset, get new answers to questions
    useEffect(() => {
        SetPossibleAnswers();
    }, [questionCount]);

    function StartQuiz() {
        setStartQuiz(true);
    }

    function StartScreen() {
        return (
            <div className="flex justify-center items-center flex-col gap-10">
                <div className="text-6xl font-kanit">
                    Welcome To Trivia Night!
                </div>
                <button
                    onClick={StartQuiz}
                    className="font-kanit text-3xl w-2/3 h-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                    Start Game
                </button>
                <button className="font-kanit bg-red-500 hover:bg-blue-400  border-red-700 hover:border-red-500 rounded"></button>
                <button className=" bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"></button>
                <button className=" bg-yellow-500 hover:bg-yellow-400  border-yellow-700 hover:border-yellow-500"></button>
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
        let newString = string.replace(
            /^&#039;|&#039;$|&quot;|&#039;|&#039/g,
            ""
        );
        let newString2 = newString.replace("&eacute;", "e");
        return newString2;
    }

    function AnswerSelected(selectedAnswer) {
        //Check if answer was correct
        if (
            selectedAnswer ==
            triviaContext.trivia.results[questionCount].correct_answer
        ) {
            console.log("Correct!");
            //emit event listener to trigger animatons
            triviaContext.emit("userGuess", true);
        } else {
            console.log(
                "Wrong Answer! Correct Answer: ",
                //emit event listener to trigger animatons
                triviaContext.trivia.results[questionCount].correct_answer,
                "You selected: ",
                selectedAnswer
            );
            //Call event listener
            triviaContext.emit("userGuess", false);
        }

        //Check question count and reset if needed.
        if (questionCount >= 9) {
            setQustionCount(0);
            setStartQuiz(false);
            triviaContext.GetNewQuestions();
        } else {
            setQustionCount(questionCount + 1);
        }
    }

    function BooleanLayout() {
        return (
            <div className="flex flex-row gap-4 items-center justify-center flex-grow">
                {possibleAnswers.map((answer, index) => {
                    return (
                        <AnswerBtn
                            key={index}
                            action={AnswerSelected}
                            answer={index == 0 ? "True" : "False"}
                            color={colours[index]}
                        />
                    );
                })}
            </div>
        );
    }

    function MultipleLayout() {
        return (
            <div className="flex flex-col gap-4 items-center justify-center flex-grow">
                <div className="flex flex-row items-center justify-center w-full gap-4">
                    {possibleAnswers.map((answer, index) => {
                        return (
                            <AnswerBtn
                                key={index}
                                action={AnswerSelected}
                                answer={replaceEntity(possibleAnswers[index])}
                                color={colours[index]}
                            />
                        );
                    })}
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

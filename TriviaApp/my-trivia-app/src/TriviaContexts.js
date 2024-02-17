import React, { createContext, useState, useEffect } from "react";
import { fetchTrivia } from "./API/TriviaAPI";

// Create the AuthContext
export const TriviaContext = createContext();
//const googleAuthSecretId = process.env.REACT_APP_SECRETGOOGLEAUTH;
// AuthContext provider component
export const TriviaProvider = ({ children }) => {
    const [trivia, setTrivia] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [reloaded, setReloaded] = useState(false);
    const [playerQuestionCount, setPlayerQuestionCount] = useState(0);
    const [possibleAnswers, setPossibleAnswers] = useState([]);
    const [eventListeners, setEventListeners] = useState({});
    const [score, setScore] = useState(0);
    const totalQuestionsAmount = 20;

    useEffect(() => {
        // Define an async function inside the useEffect
        setLoaded(false);
        async function fetchData() {
            try {
                const response = await fetchTrivia(totalQuestionsAmount);
                // Do something with the data
                console.log(response);
                setTrivia(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        // Call the async function
        fetchData();
    }, []);

    useEffect(() => {
        try {
            console.log(
                "Assigning first questions... ",
                trivia.results[playerQuestionCount]
            );
            ConfigurePossibleAnswers();
            setLoaded(true);
        } catch {
            console.log("Trivia is probably empty array.");
        }
    }, [trivia]);

    useEffect(() => {
        //user guess so move onto next question.
        ConfigurePossibleAnswers();
    }, [playerQuestionCount]);

    function PlayAgain() {}

    function GetNewQuestions() {
        setLoaded(false);
        async function fetchData() {
            try {
                const response = await fetchTrivia(totalQuestionsAmount);
                // Do something with the data
                console.log(response);
                setTrivia(response);
                setReloaded(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        // Call the async function
        fetchData();
    }

    // Function to subscribe to an event
    const subscribe = (eventName, callback) => {
        setEventListeners((prevListeners) => ({
            ...prevListeners,
            [eventName]: [...(prevListeners[eventName] || []), callback],
        }));
        console.log("Subscribed!");
    };

    //calls all subsribed functions
    const emit = (eventName, payload) => {
        const listeners = eventListeners[eventName] || [];
        console.log("Calling all subs!", listeners);
        listeners.forEach((callback) => callback(payload));
    };

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    //Context funcionality
    function ConfigurePossibleAnswers() {
        try {
            let shuffledAnswers =
                trivia.results[playerQuestionCount].incorrect_answers;
            shuffledAnswers = [
                ...shuffledAnswers,
                trivia.results[playerQuestionCount].correct_answer,
            ];

            shuffledAnswers.map(decodeHtml);

            console.log("Shuffled Answers: ", shuffledAnswers);
            setPossibleAnswers(shuffledAnswers);
        } catch {}
    }

    function UserGuess(guess) {
        if (guess == decodeHtml(GetCurrentQuestion().correct_answer)) {
            console.log("Correct!");
            //emit event listener to trigger animatons
            emit("userGuess", true);
            setScore(score + 1);
        } else {
            console.log(
                "Wrong Answer! Correct Answer: ",
                //emit event listener to trigger animatons
                decodeHtml(GetCurrentQuestion().correct_answer),
                "You selected: ",
                guess
            );
            //Call event listener
            emit("userGuess", false);
        }
        //check player question count vs totalQuestions and take to end game screen.
        if (playerQuestionCount == totalQuestionsAmount - 1) {
            console.log("LIMIT REACHED GO TO END SCREEN!!!");
        } else {
            setPlayerQuestionCount(playerQuestionCount + 1);
        }
    }

    function GetCurrentQuestion() {
        console.log(
            "Getting Question: ",
            trivia.results[playerQuestionCount],
            "Count: ",
            playerQuestionCount
        );
        try {
            return trivia.results[playerQuestionCount];
        } catch {
            return trivia.results[0];
        }
    }

    function GetPossibleAnswers() {
        try {
            console.log("Getting Answers: ", possibleAnswers);
            return possibleAnswers;
        } catch {
            return ["Im Gay", "You're Gay", "Were Gay", "No ones gay!"];
        }
    }

    // Value provided by the AuthContext
    const triviaContextValue = {
        trivia,
        loaded,
        reloaded,
        playerQuestionCount,
        score,
        GetPossibleAnswers,
        GetCurrentQuestion,
        GetNewQuestions,
        subscribe,
        emit,
        decodeHtml,
        UserGuess,
        PlayAgain,
    };

    return (
        <TriviaContext.Provider value={triviaContextValue}>
            {children}
        </TriviaContext.Provider>
    );
};

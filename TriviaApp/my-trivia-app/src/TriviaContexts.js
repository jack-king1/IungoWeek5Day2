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
    const [playerGuessTrigger, setPlayerGuessTrigger] = useState({
        trigger: false,
        guess: false,
    });
    const [eventListeners, setEventListeners] = useState({});

    useEffect(() => {
        // Define an async function inside the useEffect
        setLoaded(false);
        async function fetchData() {
            try {
                const response = await fetchTrivia();
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
        console.log(trivia);
        setLoaded(true);
    }, [trivia]);

    function GetNewQuestions() {
        setLoaded(false);
        async function fetchData() {
            try {
                const response = await fetchTrivia();
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

    // Value provided by the AuthContext
    const triviaContextValue = {
        trivia,
        loaded,
        reloaded,
        GetNewQuestions,
        subscribe,
        emit,
    };

    return (
        <TriviaContext.Provider value={triviaContextValue}>
            {children}
        </TriviaContext.Provider>
    );
};

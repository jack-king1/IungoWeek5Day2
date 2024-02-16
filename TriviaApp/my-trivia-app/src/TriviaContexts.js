import React, { createContext, useState, useEffect } from "react";
import { fetchTrivia } from "./API/TriviaAPI";

// Create the AuthContext
export const TriviaContext = createContext();
//const googleAuthSecretId = process.env.REACT_APP_SECRETGOOGLEAUTH;
// AuthContext provider component
export const TriviaProvider = ({ children }) => {
    const [trivia, setTrivia] = useState([]);
    const [loaded, setLoaded] = useState(false);

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

    // Value provided by the AuthContext
    const triviaContextValue = {
        trivia,
        loaded,
    };

    return (
        <TriviaContext.Provider value={triviaContextValue}>
            {children}
        </TriviaContext.Provider>
    );
};

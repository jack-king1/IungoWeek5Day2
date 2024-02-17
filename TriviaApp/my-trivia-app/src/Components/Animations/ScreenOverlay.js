import { useState, useEffect, useContext } from "react";
import { TriviaContext } from "../../TriviaContexts";

function ScreenOverlay() {
    const triviaContext = useContext(TriviaContext);
    const [playerAnim, setPlayerAnim] = useState(false);
    const [displayText, setPlayerText] = useState(false);

    useEffect(() => {
        triviaContext.subscribe("userGuess", TriggerAnimation);
    }, []);

    function TriggerAnimation(value) {
        console.log("Player Guess: ", value);
        setPlayerAnim(true);
        setPlayerText(value);
        setTimeout(() => {
            setPlayerAnim(false);
        }, 1000); // Adjust the interval as needed
    }

    return (
        <div
            className={`absolute h-screen w-screen pointer-events-none flex justify-center items-center ${
                playerAnim ? "animate-slide-in-out" : ""
            }`}
        >
            {playerAnim ? (
                <div
                    className={`text-8xl text-white w-full text-center ${
                        displayText ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                    {displayText ? "CORRECT!" : "INCORRECT!"}
                </div>
            ) : null}
        </div>
    );
}

export default ScreenOverlay;

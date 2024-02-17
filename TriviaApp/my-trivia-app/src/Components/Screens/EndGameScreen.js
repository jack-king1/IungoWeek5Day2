import { useState, useContext } from "react";
import { TriviaContext } from "../../TriviaContexts";
import AnswerBtn from "../Btns/AnswerBtn";

function EndGameScreen() {
    const triviaContext = useContext(TriviaContext);
    return (
        <div className="flex flex-col">
            <div>Score: {triviaContext.score}</div>
            <AnswerBtn
                answer={"Play Again!"}
                action={triviaContext.PlayAgain}
            />
        </div>
    );
}

export default EndGameScreen;

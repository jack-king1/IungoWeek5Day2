import { useState, useContext } from "react";
import { TriviaContext } from "../../TriviaContexts";
import AnswerBtn from "../Btns/AnswerBtn";

function EndGameScreen() {
    const triviaContext = useContext(TriviaContext);
    return (
        <div className="flex flex-col">
            <div className="text-6xl text-center">
                Score: {triviaContext.score}
            </div>
            <div className="w-full">
                <AnswerBtn
                    answer={"Play Again!"}
                    action={triviaContext.PlayAgain}
                    color={"green"}
                />
            </div>
        </div>
    );
}

export default EndGameScreen;

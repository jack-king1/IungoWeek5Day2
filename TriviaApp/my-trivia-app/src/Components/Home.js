import { useState, useEffect, useContext } from "react";
import { fetchTrivia } from "../API/TriviaAPI";
import QuestionItem from "./QuestionItem";
import QuestionContainer from "./QuestionContainer";
import { TriviaContext } from "../TriviaContexts";

function Home() {
    return (
        <div className="flex-grow flex justify-center items-center">
            <div className="w-2/3 bg-gradient-to-br from-pink-700 to-pink-900 h-2/3 rounded-3xl p-8 flex flex-col">
                <QuestionContainer />
            </div>
        </div>
    );
}

export default Home;

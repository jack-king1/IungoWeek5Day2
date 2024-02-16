import React from "react";

function AnswerBtn(props) {
    return (
        <button
            onClick={() => props.action(props.answer)}
            className={`font-kanit text-3xl w-1/2 h-20 bg-${props.color}-500 hover:bg-${props.color}-400 text-white font-bold py-2 px-4 border-b-4 border-${props.color}-700 hover:border-${props.color}-500 rounded`}
        >
            {props.answer}
        </button>
    );
}

export default AnswerBtn;

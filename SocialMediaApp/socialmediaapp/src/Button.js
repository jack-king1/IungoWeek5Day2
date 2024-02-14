import React from "react";
import { FaUserPlus } from "react-icons/fa";

function Button(props) {
    return (
        <div
            onClick={() => props.action(props.lineID)}
            className="w-20 h-20 bg-green-600 flex justify-center text-center rounded-3xl hover:cursor-pointer"
        >
            <div className="m-auto">
                <FaUserPlus className="text-3xl" />
            </div>
        </div>
    );
}

export default Button;

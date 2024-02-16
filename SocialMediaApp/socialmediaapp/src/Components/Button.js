import React from "react";
import { useState, useEffect } from "react";
import { FaUserPlus, FaArrowRight } from "react-icons/fa";

function Button(props) {
    const [toggle, setToggle] = useState(false);

    const HandleClick = () => {
        if (toggle) {
            console.log("My Props: ", props);
            props.unaction(props.id);
        } else {
            props.action(props.lineID);
        }
        setToggle(!toggle);
    };

    return (
        <div
            onClick={() => HandleClick()}
            className={`w-20 h-full ${
                toggle ? "bg-red-600" : "bg-green-600"
            }  flex justify-center text-center rounded-r-3xl hover:cursor-pointer`}
        >
            {toggle ? (
                <FaArrowRight className="m-auto" />
            ) : (
                <div className="m-auto">
                    <FaUserPlus className="text-3xl" />
                </div>
            )}
        </div>
    );
}

export default Button;

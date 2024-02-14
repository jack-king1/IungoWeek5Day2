import React from "react";
import { useState } from "react";
import "../Styles/ColourBtnStyle.css";

function ColourBtn(props) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const containerStyle = {
        backgroundColor: isHovered ? props.hover : props.col,
        // Add other styles as needed
    };
    return (
        <div
            className="colourbtn hover"
            style={containerStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => props.action(props.col)}
        >
            <p>Colour Btn</p>
        </div>
    );
}

export default ColourBtn;

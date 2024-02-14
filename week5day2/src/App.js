import logo from "./logo.svg";
import "./App.css";
import ColourBtn from "./Components/ColourBtn";
import { useState } from "react";

function App() {
    const [background, setBackground] = useState("");
    const [colourOptions, setColourOptions] = useState([
        ["red", "blue"],
        ["green", "red"],
        ["blue", "green"],
    ]);

    return (
        <div className="App">
            <header
                className="App-header"
                style={{ backgroundColor: background }}
            >
                {colourOptions.map((colour) => {
                    return (
                        <ColourBtn
                            action={setBackground}
                            col={colour[0]}
                            hover={colour[1]}
                        />
                    );
                })}
                {/* <ColourBtn
                    action={setBackground}
                    col="#b91c1c"
                    hover="#dc2626"
                /> */}
            </header>
        </div>
    );
}

export default App;

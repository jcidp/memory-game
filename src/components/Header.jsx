import { useState } from "react";
import "../styles/Header.scss";
import Instructions from "./Instructions";

function Header() {
    const [showInstructions, setShowInstructions] = useState(false);

    const toggleInstructions = () => {
        setShowInstructions(!showInstructions);
    };

    return <header className="header">
        <h1 className="header__title">Poke Memory</h1>
        <div className="header__instructions-container">
            <button className="header__instructions" onClick={toggleInstructions}>How to play</button>
        </div>
        <Instructions isVisible={showInstructions} onClick={toggleInstructions} />
    </header>
}

export default Header;
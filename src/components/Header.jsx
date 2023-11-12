import { useState } from "react";
import "../styles/Header.scss";
import Instructions from "./Instructions";

function Header() {
    const [showInstructions, setShowInstructions] = useState(false);

    const toggleInstructions = (e) => {
        if (e.target.dataset.clickable) setShowInstructions(!showInstructions);
    };

    return <header className="header">
        <h1 className="header__title">Poke Memory</h1>
        <div className="header__btn-container">
            <button className="header__btn" onClick={toggleInstructions} data-clickable>How to play</button>
            <div className="header__underline"></div>
        </div>
        <Instructions isVisible={showInstructions} onClick={toggleInstructions} />
    </header>
}

export default Header;
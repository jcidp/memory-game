import { useState } from "react";
import "../styles/Header.scss";
import Instructions from "./Instructions";

function Header() {
    const toggleVisibility = () => {
        const backdrop = document.querySelector(".backdrop");
        const instructions = document.querySelector(".instructions");
        backdrop.classList.toggle("hidden");
        instructions.classList.toggle("hidden");
    }

    const toggleInstructions = (e) => {
        if (e.target.dataset.clickable) toggleVisibility();
    };

    return <header className="header">
        <div className="wrapper">
            <h1 className="header__title">Poke Memory</h1>
            <div className="header__btn-container">
                <button className="header__btn" onClick={toggleInstructions} data-clickable>How to play</button>
                <div className="header__underline"></div>
            </div>
            <Instructions onClick={toggleInstructions} />
        </div>
    </header>
}

export default Header;
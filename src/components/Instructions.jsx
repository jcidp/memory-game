import "../styles/Instructions.scss";

function Instructions({onClick}) {
    if (!localStorage.getItem("highScore")) {
        setTimeout(() => {
            const backdrop = document.querySelector(".backdrop");
            const instructions = document.querySelector(".instructions");
            backdrop.classList.remove("hidden");
            instructions.classList.remove("hidden");
        }, 0)
    }

    return <>
        <div className="backdrop hidden" onClick={onClick} data-clickable></div>
        <div className="instructions hidden" >
            <h2 className="instructions__heading">Instructions</h2>
            <p className="instructions__text">Each round, we'll load a set of cards with Pokemon in them.</p>
            <p className="instructions__text">Your mission: <strong>click on all the Pokemon in the set to catch them, but without repeating Pokemon!</strong></p>
            <p className="instructions__text">If you click the same pokemon twice during a round, you lose.</p>
            <p className="instructions__text">If you click all the pokemon in a round without repeating, you'll get a new set with more cards.</p>
            <p className="instructions__text">Pokemon CAN repeat between rounds. You won't lose by clicking a Pokemon you clicked in a previous round.</p>
            <p className="instructions__text">Try to catch as many Pokemon as you can.</p>
            <p className="instructions__text">Catch 'em all to become a Pokemon Master!</p>
            <button className="instructions__close" onClick={onClick} data-clickable>X</button>
        </div>
    </>
}

export default Instructions;
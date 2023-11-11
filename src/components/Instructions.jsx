import "../styles/Instructions.scss";

function Instructions({isVisible, onClick}) {
    return <div className="instructions" style={{display: isVisible ? "block" : "none"}}>
        <h2 className="instructions__heading">Instructions</h2>
        <p className="instructions__text">Each round, we'll load a set of cards with Pokemon in them.</p>
        <p className="instructions__text">Your mission is to <strong>click on all the Pokemon in the set to catch them, but without repeating Pokemon!</strong></p>
        <p className="instructions__text">If you click the same pokemon twice during a round, you lose.</p>
        <p className="instructions__text">If you click all the pokemon in a set without repeating, you'll get a new set with more cards.</p>
        <p className="instructions__text">Pokemon CAN repeat between rounds. You won't lose by clicking a Pokemon you clicked in a previous round.</p>
        <p className="instructions__text">Try to catch as many Pokemon as you can.</p>
        <p className="instructions__text">Catch 'em all to become a Pokemon Master!</p>
        <button className="instructions__close" onClick={onClick}>X</button>
    </div>
}

export default Instructions;
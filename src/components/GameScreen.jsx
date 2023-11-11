import "../styles/GameScreen.scss";
import Card from "./Card";
import { useEffect, useState } from "react";
import Scores from "./Scores";

function GameScreen() {
    const [cardNumber, setCardNumber] = useState(8);
    const [idList, setIdList] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const localHighScore = +localStorage.getItem("highScore");
        if (localHighScore) setHighScore(localHighScore);
    }, []);

    const createIdList = () => {
        const newIds = [];
        while (newIds.length < cardNumber) {
            const randomId = Math.floor(Math.random() * 1008) + 1;
            if (!newIds.some(id => id.id === randomId)) {
                newIds.push({
                    id: randomId,
                    clicked: false,
                });
            }
        }
        setIdList(newIds);
    };

    const shuffleArray = list => {
        const array = [...list];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const endGame = () => {
        setIsGameOver(true);
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("highScore", score);
        }
    };

    const handleCardClick = e => {
        const clickedId = +e.target.closest(".card").id;
        if (idList.some(pkmId => pkmId.id === clickedId && pkmId.clicked)) return endGame();
        setScore(score + 1);
        if (idList.filter(pkmId => pkmId.clicked).length + 1 === cardNumber) {
            setCardNumber(cardNumber + 4);
            return;
        }
        setIdList(idList.map(pkmId => {
            if (pkmId.id === clickedId) return {...pkmId, clicked: true};
            return pkmId;
        }));
    };

    const resetGame = () => {
        setCardNumber(8);
        setIdList([]);
        setScore(0)
        setIsGameOver(false);
    };

    if (cardNumber !== idList.length) createIdList();

    const shuffledIds = shuffleArray(idList);

    return (<main>
        <Scores score={score} highScore={highScore} />
        <div className="wrapper">
        {isGameOver ? 
            <div className="game-over">
                <h2 className="game-over__heading">Game Over</h2>
                <div className="game-over__content">
                    <p className="game-over__text">You caught <strong>{score} pokemon</strong>!</p>
                    <p className="game-over__text">You're on your way to become a Pokemon Master</p>
                    <p className="game-over__text">Play again to cath 'em all!</p>
                    <button className="game-over__reset" onClick={resetGame}>Play again</button>
                </div>
                <img className="game-over__gif" src="https://media.giphy.com/media/dw3l0UwMQQI5QK9z8V/giphy.gif" alt="Raichu fainting" />
            </div> :
            <div className="grid">
                {shuffledIds.map(id => 
                    <Card key={id.id} id={id.id} onClick={handleCardClick} />     
                )}
            </div>
        }
        </div>
    </main>)
}

export default GameScreen;
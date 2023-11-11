import "../styles/GameScreen.scss";
import Card from "./Card";
import { useState } from "react";

function GameScreen() {
    const [cardNumber, setCardNumber] = useState(8);
    const [idList, setIdList] = useState([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    const createIdList = () => {
        const newIds = [];
        while (newIds.length < cardNumber) {
            const randomId = Math.floor(Math.random() * 1017) + 1;
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
    }

    const endGame = () => {
        setIsGameOver(true);
        // TODO: Set High Score in Local Storage
    }

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
    }

    if (cardNumber !== idList.length) createIdList();

    const shuffledIds = shuffleArray(idList);

    return (<main>
        <p>{score}</p>
        {isGameOver ? 
            <h2>Game Over</h2> :
            <div className="grid">
                {shuffledIds.map(id => 
                    <Card key={id.id} id={id.id} onClick={handleCardClick} />     
                )}
            </div>
        }
    </main>)
}

export default GameScreen;
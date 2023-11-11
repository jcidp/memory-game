import "../styles/GameScreen.scss";
import Card from "./Card";
import { useEffect, useState } from "react";

function GameScreen() {
    const [cardNumber, setCardNumber] = useState(8);
    const [idList, setIdList] = useState([]);

    const fillList = () => {
        const newIds = [...idList];
        while (newIds.length < cardNumber) {
            const randomId = Math.floor(Math.random() * 1017) + 1;
            if (!newIds.includes(randomId)) newIds.push(randomId);
        }
        setIdList(newIds);
    };

    const shuffleIds = () => {
        const array = [...idList];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    if (cardNumber !== idList.length) fillList();

    const shuffledIds = shuffleIds();

    return (<main>
        <p>Click on every Pokemon in the set once. Every time you do, we'll load a new set with more Pokemon. Let's see how many Pokemon you can click in a row without repeating within sets.</p>
        <div className="grid">
            {shuffledIds.map(id => 
                <Card key={id} id={id} />     
            )}
        </div>
    </main>)
}

export default GameScreen;
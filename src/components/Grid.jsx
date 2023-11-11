import "../styles/Grid.scss";
import Card from "./Card";
import { useEffect, useState } from "react";

function Grid() {
    const [cardNumber, setCardNumber] = useState(8);
    const [idList, setIdList] = useState([]);

    const fillList = () => {
        const newIds = [];
        for (let i = 0; i < cardNumber - idList.length; i++) {
            newIds.push(Math.floor(Math.random() * 980) + 1);
        }
        setIdList([...idList, ...newIds]);
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

    console.log(shuffledIds);

    return (
        <div className="grid">
            {shuffledIds.map(id => 
                <Card key={id} id={id} />     
            )}
        </div>
    )
}

export default Grid;
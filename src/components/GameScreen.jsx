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
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const localHighScore = +localStorage.getItem("highScore");
        if (localHighScore) setHighScore(localHighScore);
    }, []);

    useEffect(() => {
        setIsMuted(localStorage.getItem("isMuted") === "true");
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
        const grid = document.querySelector(".grid");
        grid.classList.add("fading");
        grid.addEventListener("animationend", () => {
            setIsGameOver(true);
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem("highScore", score);
            }
        });
    };

    const hideCards = () => {
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.classList.add("hidden");
        });
    }

    const handleCardClick = e => {
        const clickedId = +e.target.closest(".card").id;
        if (idList.some(pkmId => pkmId.id === clickedId && pkmId.clicked)) return endGame();
        hideCards();
        startNewMusic("audio", 72, 41);

        setTimeout(() => {
            setScore(score + 1);
            if (idList.filter(pkmId => pkmId.clicked).length + 1 === cardNumber) {
                setCardNumber(cardNumber + 4);
                return;
            }
            setIdList(shuffleArray(idList.map(pkmId => {
                if (pkmId.id === clickedId) return {...pkmId, clicked: true};
                return pkmId;
            })));
        }, 500);
    };

    const resetGame = () => {
        const endScreen = document.querySelector(".game-over");
        endScreen.classList.add("fading");
        endScreen.addEventListener("animationend", () => {
            setCardNumber(8);
            setIdList([]);
            setScore(0)
            setIsGameOver(false);
        });
        startNewMusic("audio", 72, 41, "victory");
    };

    const startNewMusic = (playId, cutoffTime, restartTime, pauseId) => {
        pauseId && document.getElementById(pauseId).pause();
        const music = document.getElementById(playId);
        if (music.duration == 0 || music.paused) {
            if (isMuted) music.muted = true;
            music.volume = 0.4;
            music.currentTime = 0;
            music.play();
            music.addEventListener("timeupdate", (e) => {
                if (e.target.currentTime > cutoffTime) music.currentTime = restartTime;
            });
        }
    }

    const toggleMuteMusic = () => {
        const audios = document.querySelectorAll("audio");
        audios.forEach(audio => {
            audio.muted = !isMuted;
        });
        setIsMuted(!isMuted);
        localStorage.setItem("isMuted", isMuted ? "false" : "true");
    }

    if (cardNumber !== idList.length) createIdList();

    if (isGameOver) {
        setTimeout(() => {
            startNewMusic("victory", 24, 12.9, "audio");
        }, 0);
    }

    return (<main>
        <Scores score={score} highScore={highScore} isMuted={isMuted} toggleMuteMusic={toggleMuteMusic} />
        <div className="wrapper">
        {isGameOver ? 
            <div key={"game-over"} className="game-over">
                <h2 className="game-over__heading">Game Over</h2>
                <div className="game-over__content">
                    <p className="game-over__text">You caught <strong>{score} pokemon</strong>!</p>
                    <p className="game-over__text">You're on your way to become a Pokemon Master</p>
                    <p className="game-over__text">Play again to cath 'em all!</p>
                    <button className="game-over__reset" onClick={resetGame}>Play again</button>
                </div>
                <img className="game-over__gif" src="https://media.giphy.com/media/dw3l0UwMQQI5QK9z8V/giphy.gif" alt="Raichu fainting" />
                <audio id="victory" preload='auto' src="src/assets/pokemon-victory.mp3"></audio>
            </div> :
            <div key={"grid"} className="grid">
                {idList.map(id => 
                    <Card key={id.id} id={id.id} onClick={handleCardClick}/>     
                )}
            </div>
        }
        </div>
    </main>)
}

export default GameScreen;
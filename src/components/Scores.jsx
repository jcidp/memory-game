import "../styles/Scores.scss"

function Scores({score, highScore}) {
    return (
        <div className="scores">
            <p>High Score: {highScore}</p>
            <p>Current Score: {score}</p>
        </div>
    );
}

export default Scores;
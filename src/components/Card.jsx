import "../styles/Card.scss";

const urlStart = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

function Card({id}) {
    return (
        <div className="card">
            <img className="card__img" src={urlStart + id + ".png"} alt={`Image of pokemon ${id}`} />
            <p className="card__name">{id}</p>
        </div>
    );

}

export default Card;
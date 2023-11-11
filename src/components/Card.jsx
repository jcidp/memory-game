import "../styles/Card.scss";
import { useEffect, useState } from "react";

const imgUrlBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

function Card({id}) {
    const [name, setName] = useState("");

    useEffect(() => {
        async function fetchPokemonFromId() {
            const results = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
            const pokemon = await results.json();
            const name = pokemon.name.replace("-", " ")
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            setName(name);
        }

        fetchPokemonFromId();
    }, [id])

    return (
        <div className="card">
            <img className="card__img" src={imgUrlBase + id + ".png"} alt={`Image of pokemon ${id}`} />
            <p className="card__name">{name}</p>
        </div>
    );

}

export default Card;
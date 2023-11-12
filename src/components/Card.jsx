import "../styles/Card.scss";
import { useEffect, useState } from "react";

const imgUrlBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

function Card({id, onClick}) {
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

    useEffect(() => {
        const hideCards = () => {
            const cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                card.classList.remove("hidden");
            });
        }

        setTimeout(hideCards, 500);
    })

    return (
        <div className="card hidden" onClick={onClick} id={id}>
            <img className="card__img--back" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="A card with the image of a Pokeball." />
            <img className="card__img" src={imgUrlBase + id + ".png"} alt={`Official artwork of ${name}`} />
            <p className="card__name">{name}</p>

        </div>
    );

}

export default Card;
import { useContext } from "react";
import { PokemonContext } from "../context/pokemon";

const Pokemons = () => {

    const {pokemons,newGame, responder} = useContext(PokemonContext);

    if(!pokemons.length) return;

    return ( 
        <div className="pokemons">
            <ul className='lista-respuestas'>
                {pokemons.map(pokemon => (
                    <li className='respuesta' key={pokemon.id}>
                        <button className='opciones' type="button" onClick={()=>responder(pokemon)}>{pokemon.name}</button>
                    </li>
                ))}
            </ul>
            <div className='div-centrado'>
                <button className='mx-auto nuevo-juego' type="button" onClick={newGame}>Nuevo juego</button>
            </div>
            
        </div>
     );
}
 
export default Pokemons;
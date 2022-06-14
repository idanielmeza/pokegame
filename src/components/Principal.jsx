import Pokemons from './pokemons';
import Imagen from './imagen';
import Loader from './loading';
import { PokemonContext } from '../context/pokemon';
import { useContext } from 'react';

const Princpal = () => {

    const {loading} = useContext(PokemonContext);

    if(loading) return <Loader />;

    return ( 
        <div>
            <Imagen/>
            <Pokemons/>
        </div>
     );
}
 
export default Princpal;
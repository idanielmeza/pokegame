import {createContext,useState,useEffect} from 'react';
import clienteAxios from '../config/axios';

export const PokemonContext = createContext();


const PokemonProvider = ({children}) => {
    const [pokemons,setPokemons] = useState([]);
    const [pokemon,setPokemon] = useState(null);
    const [imagen,setImagen] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [correcto,setCorrecto] = useState(false);
    const [msg, setMsg] = useState('Quien es ese pokemon?');
    
    const genId = () => {

        const pokemonsArr = Array.from( Array(650) )
        
        return pokemonsArr.map( ( _ , index ) => index + 1 )
    
    }

    const mixPokemons = () => {
        const mixedPokemons = genId().sort( () => Math.random() - 0.5 )
        return mixedPokemons.splice(0,6);
    }

    const getPokemons = async (ids) => {
        
        const respuesta = Math.floor(Math.random() * ids.length);

        const id = ids[respuesta];

        setPokemon(id);

        const [a,b,c,d,e,f] = ids;

        const promises = [
            clienteAxios.get(`pokemon/${a}`),
            clienteAxios.get(`pokemon/${b}`),
            clienteAxios.get(`pokemon/${c}`),
            clienteAxios.get(`pokemon/${d}`),
            clienteAxios.get(`pokemon/${e}`),
            clienteAxios.get(`pokemon/${f}`)
        ]

        try{
            const data = await Promise.all(promises);
            const image = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ id }.svg`);
            setImagen(image.url);
            const pokemonsArr = data.map(p => p.data);
            setPokemons(pokemonsArr);
            setLoading(false);
        }catch(e){
            setError(true);
        }

    }

    const newGame = ()=>{
        setPokemons([]);
        setPokemon(null);
        setImagen(null);
        setLoading(true);
        setError(false);
        setCorrecto(false);
        setMsg('Quien es ese pokemon?');

        getPokemons(mixPokemons());
    }

    const responder = (respuesta) => {
        if(respuesta.id == pokemon){
            setMsg(`Correcto es ${respuesta.name}`);
            setCorrecto(true);
            setTimeout(()=>{
                newGame();
            },2000);
            
        }else{
            const correcto = pokemons.find(p => p.id == pokemon);
            setMsg(`Incorrecto es ${correcto.name}`);
            setCorrecto(true);
            setError(true);
            setTimeout(()=>{
                newGame();
            },2000);
        }
    }
    
    useEffect(() => {
        
        newGame()
        
    },[]);

    return (
        <PokemonContext.Provider value={{
            pokemon,
            setPokemon,
            loading,
            setLoading,
            error,
            setError,
            imagen,
            newGame,
            responder,
            pokemons,
            correcto,
            msg
        }}>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider;
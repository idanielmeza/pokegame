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
    const [msg, setMsg] = useState('¿Quien es ese pokemon?');
    const [puntuacion, setPuntuacion] = useState(0);
    const [puntuacionMaxima, setPuntuacionMaxima] = useState(0);
    
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

        const puntiacionLocalStorage = localStorage.getItem('puntuacion');
        const puntiacionMaximaLocalStorage = localStorage.getItem('puntuacionMaxima');

        if(puntiacionLocalStorage){
            setPuntuacion(Number(puntiacionLocalStorage));
        }
        if(puntiacionMaximaLocalStorage){
            setPuntuacionMaxima(Number(puntiacionMaximaLocalStorage));
        }else if(!puntiacionMaximaLocalStorage && puntiacionLocalStorage){
            setPuntuacionMaxima(Number(puntiacionLocalStorage));
        }

        setPokemons([]);
        setPokemon(null);
        setImagen(null);
        setLoading(true);
        setError(false);
        setCorrecto(false);
        setMsg('¿Quien es ese pokemon?');

        getPokemons(mixPokemons());
    }

    const responder = (respuesta) => {
        if(respuesta.id == pokemon){
            setMsg(`Correcto es ${respuesta.name}`);
            
            localStorage.setItem('puntuacion',Number(puntuacion) + 1);
            setPuntuacion(Number(puntuacion) + 1);

            if(puntuacion >= puntuacionMaxima){
                localStorage.setItem('puntuacionMaxima',Number(puntuacion)+1);
                setPuntuacionMaxima(Number(puntuacion)+1);
            }


            setCorrecto(true);
            setTimeout(()=>{
                newGame();
            },900);
            
        }else{
            const correcto = pokemons.find(p => p.id == pokemon);
            setMsg(`Incorrecto es ${correcto.name}`);
            setPuntuacion(0);
            localStorage.setItem('puntuacion',0);
            setCorrecto(true);
            setError(true);
            setTimeout(()=>{
                newGame();
            },900);
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
            msg,
            puntuacion,
            puntuacionMaxima
        }}>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider;
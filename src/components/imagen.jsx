import { useContext } from "react";
import { PokemonContext } from "../context/pokemon";
import Logo from './logo.svg';

const Imagen = () => {

    const { imagen , correcto ,msg, error, puntuacion, puntuacionMaxima} = useContext(PokemonContext);

    if(!imagen) return;

    return ( 
        <div className='container'>
            <img className='logo' src={Logo}/>
            <div className="card mx-auto">
                <img className={`${!correcto ? 'ocultar-pokemon imagen' : 'imagen'}`} src={imagen} alt="pokemon" />
            </div>
            <div className='puntuacion-contenedor'>
                <p className='puntuaciones'>Record: {puntuacionMaxima}</p>
                <p className='puntuaciones'>Puntuacion: {puntuacion}</p>
            </div>
            <p className={`${error && correcto ? "mx-auto texto-error" : !error && correcto ? "mx-auto texto-correcto" : "mx-auto texto"}`}>{msg}</p>
        </div>
     );
}
 
export default Imagen;
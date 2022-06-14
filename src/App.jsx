import PokemonProvider from "./context/pokemon";
import Principal from "./components/Principal";

const App = () => {

  return ( 
    <PokemonProvider>
      <Principal />
    </PokemonProvider>
   );
}
 
export default App;

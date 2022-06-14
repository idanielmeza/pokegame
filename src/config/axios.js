import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});

export default clienteAxios;
import axios from 'axios';
const DOMAIN = 'https://pokeapi.co/api/v2';


export const listPockemon = async ({ offset = 0, limit = 10 }) => {
    return await axios.get(`${DOMAIN}/pokemon?offset=${offset}&limit=${limit}`);
}

export const getPockemon = async (id: string) => {
    return await axios.get(`${DOMAIN}/pokemon/${id}`);
}

export const get = async (url: string) => {
    return await axios.get(`${url}`);
}


import axios from 'axios';


export const userApi = axios.create({
    baseURL: 'https://localhost:7041'
});
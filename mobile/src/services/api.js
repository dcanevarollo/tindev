import axios from 'axios';

/**
 * @author Douglas Canevarollo
 * 
 * Faz a comunicação com a API NodeJS.
 */
const api = axios.create({
    baseURL: 'http://192.168.0.108:8080'
});

export default api;

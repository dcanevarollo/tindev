import axios from 'axios';

/**
 * @author Douglas Canevarollo
 * 
 * Componente responsável por fazer a comunicação com a API Node desenvolvida.
 */
const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export default api;

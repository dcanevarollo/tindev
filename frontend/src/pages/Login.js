import React, { useState } from 'react';
import './css/Login.css';

import api from '../services/api';

import logo from "../assets/logo.svg";

/**
 * @author Douglas Canevarollo
 * 
 * Página de login da aplicação.
 * 
 * @param history : desestruturação de componente padrão do React. History diz respeito ao histórico de rotas
 * adentradas.
 */
export default function Login({ history }) {
    /* Armazena o estado de determinado elemento. */
    let [username, setUsername] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        /* Envia a API (atráves do método POST da rota /developers) o username digitado pelo usuário. É utilizada a 
        short sintax do ES6 (username: username). */
        const response = await api.post('/developers', {
            username
        });
        
        /* Armazena o usuário logado e seu id do JSON de resposta da API. */
        const { newDeveloper } = response.data;
        const { _id: developerId } = newDeveloper;

        /* Insere no histórico de rotas o redirecionamento para a página Main. */
        history.push(`/developer/${developerId}`);        
    }

    /* No evento de modificação do campo de texto, o nome do usuário digitado será armazenado pelo React. */
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input 
                    placeholder="Digite seu usuário do GitHub" 
                    value={username} 
                    onChange={event => setUsername(event.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

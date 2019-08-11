import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './css/Main.css';

import api from '../services/api';

import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";
import itsamatch from '../assets/itsamatch.png';

/**
 * @author Douglas Canevarollo
 * 
 * Componente da página principal da aplicação: listagem de desenvolvedores.
 * @param match : armazena todos os parâmetros que foram passados a esse componente.
 */
export default function Main({ match }) {
    let [developers, setDevelopers] = useState([]);
    let [matchDeveloper, setMatchDeveloper] = useState(false);

    /**
     * Define uma ação para quando o parâmetro em match for alterado (o id do usuário logado, no caso), fazendo uma cha-
     * mada a API Node. useEffect() aceita um vetor de parâmetros sensíveis a engatilharem a função.
     */
    useEffect(() => {
        /**
         * Carrega os desenvolvedores cadastrados na plataforma pela API.
         */
        async function loadDevelopers() {
            /* Busca o JSON de desenvolvedores utilizando a rota GET /developers da API, definindo os headers necessá-
            rios para a requisição. */
            const response = await api.get('/developers', {
                headers: {
                    user: match.params.developerId
                }
            })

            setDevelopers(response.data);
        }

        loadDevelopers();
    }, [match.params.developerId]);

    /**
     * Usado para se conectar com o WebSocket. Iniciará quando um usuário se logar (vetor de sensibilidade possui o id
     * do usuário que acabou de se logar).
     */
    useEffect(() => {
        /* Inicia uma conexão WebSocket cliente, passando, como segundo argumento, uma query que poderá ser usado pela
        API em tempo real. Essa query enviara um JSON contendo o id do usuário que acabou de se conectar. */
        const webSocket = io('http://localhost:8080', {
            query: { developerId: match.params.developerId }
        });

        webSocket.on('match', developer => {
            setMatchDeveloper(developer);
        });
    }, [match.params.developerId]);

    /**
     * Acionado quando o usuário curte algum desenvolvedor.
     */
    async function handleLike(receiverId) {
        /* Em um POST, o segundo parâmetro da requisição é o corpo da mesma (será nulo nesse caso). Em seguida que
        é possível argumentar os cabeçalhos. */
        await api.post(`/developers/${receiverId}/likes`, null, {
            headers: {
                sender: match.params.developerId
            }
        });

        /* Atualiza o vetor de desenvolvedores removendo o desenvolvedor que sofreu o like. */
        setDevelopers(developers.filter(developer => developer._id !== receiverId));
    }

    /**
     * Acionado quando o usuário curte algum desenvolvedor.
     */
    async function handleDislike(receiverId) {
        await api.post(`/developers/${receiverId}/dislikes`, null, {
            headers: {
                sender: match.params.developerId
            }
        });

        /* Atualiza o vetor de desenvolvedores removendo o desenvolvedor que sofreu o dislike. */
        setDevelopers(developers.filter(developer => developer._id !== receiverId));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
            
            { developers.length > 0 ? (
                <ul>
                    {developers.map(developer => (
                        <li key={developer._id}>
                            <img src={developer.avatar} alt={developer.name} />
                            <footer>
                                <strong>{developer.name}</strong>
                                { developer.bio != null ? 
                                    <p>{developer.bio}</p> : <p>Nenhuma biografia adicionada.</p> }
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(developer._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(developer._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">Acabou :(</div>
            ) }

            { matchDeveloper && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match!" />

                    <img className="avatar" src={matchDeveloper.avatar} alt={matchDeveloper.name} />
                    <strong>{matchDeveloper.name}</strong>
                    <p>{matchDeveloper.bio}</p>

                    <button type="button" onClick={() => setMatchDeveloper(false)}>FECHAR</button>
                </div>
            ) }
        </div>
    );
}

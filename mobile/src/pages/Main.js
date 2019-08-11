import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    SafeAreaView,  // Essa view só ocupara o espaço seguro do dispositivo (não considerando navbar, por exemplo).
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import styles from './styles/MainStyle';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import itsamatch from '../assets/itsamatch.png';

/**
 * @author Douglas Canevarollo
 * 
 * Carrega a tela de visualização dos desenvolvedores (tela principal).
 * 
 * @param navigation : passado pelo componente de Login, um dos seus parâmetros terá o id do usuário logado.
 */
export default function Main({ navigation }) {
    const developerId = navigation.getParam('developerId');
    let [developers, setDevelopers] = useState([]);
    let [matchDeveloper, setMatchDeveloper] = useState(false);

    /**
     * Define uma ação para quando o parâmetro em match for alterado (o id do usuário logado, no caso). useEffect() a-
     * ceita um vetor de parâmetros sensíveis a engatilharem a função.
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
                    user: developerId
                }
            })

            setDevelopers(response.data);
        }

        loadDevelopers();
    }, [developerId]);

    /**
     * Usado para se conectar com o WebSocket. Iniciará quando um usuário se logar (vetor de sensibilidade possui o id
     * do usuário que acabou de se logar).
     */
    useEffect(() => {
        /* Inicia uma conexão WebSocket cliente, passando, como segundo argumento, uma query que poderá ser usado pela
        API em tempo real. Essa query enviara um JSON contendo o id do usuário que acabou de se conectar. */
        const webSocket = io('http://192.168.0.108:8080', {
            query: { developerId: developerId }
        });

        webSocket.on('match', developer => {
            setMatchDeveloper(developer);
        });
    }, [developerId]);

    /**
     * Acionado quando o usuário curte algum desenvolvedor.
     */
    async function handleLike() {
        /* Armazeno o primeiro desenvolvedor na variável firstDeveloper e o restante em rest. */
        let [firstDeveloper, ...rest] = developers;
        
        /* Em um POST, o segundo parâmetro da requisição é o corpo da mesma (será nulo nesse caso). Em seguida que
        é possível argumentar os cabeçalhos. */
        await api.post(`/developers/${firstDeveloper._id}/likes`, null, {
            headers: {
                sender: developerId
            }
        });

        /* Atualiza o vetor de desenvolvedores com a lista rest (todos menos o que sofreu o dislike). */
        setDevelopers(rest);
    }

    /**
     * Acionado quando o usuário curte algum desenvolvedor.
     */
    async function handleDislike() {
        let [firstDeveloper, ...rest] = developers;

        await api.post(`/developers/${firstDeveloper._id}/dislikes`, null, {
            headers: {
                sender: developerId
            }
        });
        
        setDevelopers(rest);
    }

    /**
     * Acionado quando o usuário clica no logo para voltar a tela de login.
     */
    async function handleLogout() {
        /* Remove todo cache de login armazenado. */
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <View style={styles.cardContainer}>
                {/* Aplicamos zIndex aos cards para posicionarmos um sobre o outro. */}
                { developers.length > 0 ? (
                    developers.map((developer, index) => (
                        <View key={developer._id} style={[styles.card, { zIndex: developers.length - index }]}>
                            <Image style={styles.avatar} source={{ uri: developer.avatar }} />
    
                            <View style={styles.footer}>
                                <Text style={styles.name}>{developer.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>
                                    {developer.bio != null ? developer.bio : "Nenhuma biografia adicionada."}
                                </Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyList}>Acabou :(</Text>
                ) }
            </View>

            { developers.length > 0 ? (
                <View style={[styles.buttonsContainer, { zIndex: 0 }]}>
                    <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={like} />
                    </TouchableOpacity>
                </View>
            ) : <View /> }

            { matchDeveloper && (
                <View style={[styles.matchContainer, { zIndex: developers.length }]}>
                    <Image style={styles.matchImage} source={itsamatch} />

                    <Image style={styles.matchAvatar} source={{uri: matchDeveloper.avatar}} />
                    <Text style={styles.matchName}>{matchDeveloper.name}</Text>
                    <Text style={styles.matchBio}>{matchDeveloper.bio}</Text>

                    <TouchableOpacity onPress={() => setMatchDeveloper(false)}>
                        <Text style={styles.closeMatch}>FECHAR</Text>
                    </TouchableOpacity>
                </View>
            ) }
        </SafeAreaView>
    );
}

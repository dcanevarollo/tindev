import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    Platform,
    KeyboardAvoidingView,  // Para usuários iOS, precisamos evitar que o teclado se sobreponha à view.
    Text,
    Image,
    TextInput,
    TouchableOpacity  // Simlar a um botão, porém sem estilizações próprias da plataforma (S.O.).
} from 'react-native';

import styles from './styles/LoginStyle';

/* O React Native decide qual tamanho utilizar de acordo com a densidade de pixel do host. */
import logo from '../assets/logo.png';

import api from '../services/api';

/**
 * @author Douglas Canevarollo
 * 
 * Componente da view de Login.
 * @param navigation : árvore de navegação do React Native (similar ao history do ReactJS).
 */
export default function Login({ navigation }) {
    let [ developer, setDeveloper ] = useState('');

    /**
     * Ao carregar da tela (e somente essa vez, pois o parâmetro 2 está vazio), verificará se existe um usuário em
     * cache. Se existir, não será necessário refazer o login, redirecionando automaticamente para a tela principal.
     */
    useEffect(() => {
        
        /* Se encontrou um item em 'loggedDeveloper', realiza a ação (then()). */
        AsyncStorage.getItem('loggedDeveloper').then(developerId => {
            if (developerId != null)
                navigation.navigate('Main', { developerId });
        })
    }, []);

    /**
     * Acionado quando o usuário pressiona o botão "Entrar".
     */
    async function handleLogin() {
        const response = await api.post('/developers', {
            username: developer
        })

        const { newDeveloper } = response.data;
        const { _id: developerId } = newDeveloper;

        /* Armazena em cache o id do usuário que fez o login. */
        await AsyncStorage.setItem('loggedDeveloper', developerId);

        navigation.navigate('Main', { developerId });
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}  // Somente ativará esta funcionalidade no iOS.
            style={styles.container}
        >
            <Image source={logo} />

            <TextInput
                autoCapitalize="none"  // Não inicia o texto com letras maiúsculas (acessibilidade).
                autoCorrect={false}  // Não sugere correções ortográficas.
                placeholder="Digite seu usuário do GitHub"
                placeholderTextColor="#999"
                style={styles.input}
                value={developer}
                onChangeText={setDeveloper}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

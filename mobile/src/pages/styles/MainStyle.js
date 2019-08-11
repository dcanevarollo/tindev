import { StyleSheet } from 'react-native';

/**
 * @author Douglas Canevarollo
 * 
 * Componente de estilização da tela principal.
 */
export default style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'  // Adiciona um espaço entre os elementos deste container.
    },

    logo: {
        marginTop: 32
    },

    cardContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },

    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',  // Permite com que o borderRadius para o elemento seja aplicado.
        position: 'absolute',  // Para que o primeiro card fique sobreposto aos demais carregados.
        margin: 30,
        /* Para que o card oculpe todo o espaço possível dos 500px alocados a ele. */
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },

    avatar: {
        flex: 1,
        height: 300
    },

    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 16
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
        lineHeight: 18
    },

    buttonsContainer: {
        flexDirection: 'row',  // Os botões devem ficar um do lado do outro (por padrão, ficam um em cima do outro).
        marginBottom: 32
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,  // Botões totalmente redondos -> radius como a metade da largura e altura.
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,  // Causa um efeito de sombra nos botões (no Android).
        /* O restante é tratado o efeito de sombra para iOS. */
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },

    emptyList: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },

    matchContainer: {
        /* Copia todos os atributos já predefinidos do React Native. */
        ... StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    matchAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',
        marginVertical: 30
    },

    matchImage: {
        height: 60,
        /* Redimensiona o tamanho da imagem para que ela caiba em seu container. */
        resizeMode: 'contain'
    },

    matchName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff'
    },

    matchBio: {
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30
    },

    closeMatch: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold'
    }
});

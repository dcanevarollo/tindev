import { StyleSheet } from 'react-native';

/**
 * @author Douglas Canevarollo
 * 
 * Componente de estilização da tela de login.
 */
export default style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',  // Faz com que o elemento oculpe toda a largura possível.
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginTop: 20,
        paddingHorizontal: 16
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 8,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

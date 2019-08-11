/* Seria possível utilizar o createStackNavigator para trocar de telas com animações e permitindo renavegações entre as
páginas (ir e voltar do login, por exemplo). Existem vários outros componentes de navegação (bottom navigation, mate-
rial top navigation, etc) que podem ser explorados. Consultar documentação do React Navigation. */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';

/**
 * @author Douglas Canevarollo
 * 
 * Arquivo de configuração de rotas da aplicação.
 */
export default createAppContainer(
    createSwitchNavigator({
        Login,  // Primeira view a ser aberta.
        Main
    })
);
import React from 'react';
import { YellowBox } from 'react-native';

/**
 * Ignore os avisos (warnings) de web sockets não reconhecidos.
 */
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

import Routes from './routes';

/**
 * @author Douglas Canevarollo
 * 
 * Componente de inicialização do aplicativo. Faz a chamada a tela de Login.
 */
export default function App() {
  return (
    <Routes />
  );
}

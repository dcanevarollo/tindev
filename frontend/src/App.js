import React from 'react';
import './App.css';

import Routes from './routes';

/**
 * @author Douglas Canevarollo
 * 
 * Componente inicial da aplicação. Chama, por padrão, o arquivo de rotas do React.
 */
function App() {
  return (
    <Routes />
  );
}

/* Exporta esse arquivo para ser utilizado por outros. */
export default App;

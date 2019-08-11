import React from 'react';
import ReactDOM from 'react-dom';  // Importa o React para web DOM (árvore de elementos).

import App from './App';

/**
 * Efetua as renderizações dentro do elemento #root da index.html.
 * 
 * @argument App : componente principal a ser renderizado.
 * @argument root : elemento pai do componente renderizado.
 */
ReactDOM.render(<App />, document.getElementById('root'));

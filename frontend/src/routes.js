import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

/* Páginas do sistema. */
import Login from './pages/Login';
import Main from './pages/Main';

/**
 * @author Douglas Canevarollo
 * 
 * Define e exporta as rotas de telas para o React.
 * Quando a rota a ser acessada for exatamente (exact) "/", então a página de login será exibida. Isso deve ser feito 
 * pois o React compara com a "regra do prefixo menos longo" para rotear.
 */
export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/developer/:developerId" component={Main} />
        </BrowserRouter>
    );
}

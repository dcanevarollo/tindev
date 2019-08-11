const express = require('express');
const DeveloperController = require('./controllers/DeveloperController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

/* Define o gerenciador de rotas do Express. */
const routes = express.Router();

/**
 * Roteamento de requisições HTTP para o controlador dos desenvolvedores (DeveloperController).
 */
routes.get('/developers', DeveloperController.index);
routes.post('/developers', DeveloperController.store);

/**
 * Roteamento de requisições HTTP para os controladores de likes e dislikes (LikeController & DislikeController).
 */
routes.post('/developers/:receiver/likes', LikeController.store);
routes.post('/developers/:receiver/dislikes', DislikeController.store);

/* Exporta as rotas definidas neste arquivo para utilização em outros. */
module.exports = routes;

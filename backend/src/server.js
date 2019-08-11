/* Variáveis const são similares a finals em Java (não podem ter seu valor alterado). */

/* O Express facilita a manipulação dos end-points da aplicação. */
const express = require('express');

/* O Mongoose é um ODM (ORM para bancos não-relacionais) que permitirá que trabalhemos com a sintaxe do JS na manipula-
ção do banco de dados MongoDB. */
const mongoose = require('mongoose');

/* O Cors é responsável por permitir que o servidor seja acessado por qualquer endereço. */
const cors = require('cors');

/* Importa o arquivo de rotas definidas para a aplicação. Como não é uma dependência importada e sim um arquivo criado,
o './' deverá vir antes para indicar o caminho do mesmo (. = pasta atual). */
const routes = require('./routes');

/* Inicializa o servidor de rotas do protocolo HTTP por meio do Express. */
const httpServer = express();

/* Extrai do protocolo HTTP padrão do Node apenas o servidor HTTP adicionado acima. */
const server = require('http').Server(httpServer);

/* Para que possa ser utilizado o protocolo WebSocket de maneira facilitada, importamos a lib socket.io. 
require('socket.io') retorna uma função, onde passaremos como argumento para ela o servidor criado. 
Assim, a aplicação aceitará tanto conexões via HTTP quanto conexões via WebSocket. */
const io = require('socket.io')(server);

/* Armazenaremos os usuários logados no servidor Node (não recomendado para produção. Utilizar um banco key-value, como
o Reddis, por exemplo) em um JSON da forma chave: valor == _id_user: id_socket. */
let connectedUsers = {};

/**
 * Toda conexão via WebSocket chamará o método abaixo. O socket responsável por intermediar a conexão terá um identifi-
 * cador que poderemos utilizar para, claro, identificar o usuário conectado.
 */
io.on('connection', socket => {
    /* No momento do handshake do WebSocket, armazenará o objeto developerId da query recebida. */
    const { developerId } = socket.handshake.query;

    /* Adiciona ao nosso "banco JSON" o valor socket.id a chave developerId. */
    connectedUsers[developerId] = socket.id;
});

/** 
 * Conecta o banco de dados à aplicação.
 */
mongoose.connect('mongodb+srv://dcanevarollo:j672fb3i@omnistack-1nrd1.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

/**
 * Middleware (interceptador) de toda requisição feita a API. Este poderá fazer o que desejar com a requisição, inclusi-
 * ve enviar uma resposta.
 * 
 * @param req : requisição feita a API.
 * @param res : resposta que o servidor dará.
 * @param next : permite que o fluxo siga normalmente após a interceptação.
 * @returns continua o fluxo da aplicação normalmente.
 */
httpServer.use((req, res, next) => {
    /* Armazena as duas variáveis abaixo a requisição para ela ser repassada aos outros controllers. */
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

/**
 * Informa ao Express que utilizaremos JSON nas requisições, faz com que o servidor use o arquivo routes.js importado e
 * utiliza cors() para permitir que outros endereços acessem a API Rest.
 */
httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);


/** 
 * Faz com que o servidor aceite requisições na porta 8080. 
 */
server.listen(8080);

const Developer = require('../models/Developer');

/**
 * @author Douglas Canevarollo
 * 
 * Controlador da lógica de negócios relacionados aos Likes em de determinado desenvolvedor.
 * Todos os métodos serão exportáveis e utilizáveis pelas requisições/respotas.
 */
module.exports = {

    /**
     * Armazena um like efetuado pelo usuário logado (sender) para o usuário alvo (receiver).
     * 
     * @param req : requisição efetuada pelo cliente. 
     * @param res : resposta que o servidor emitirá.
     * @returns JSON contendo a resposta do servidor: emissor e o receptor.
     */
    async store(req, res) {
        const { sender: senderId } = req.headers;
        const { receiver: receiverId } = req.params;

        const sender = await Developer.findById(senderId);
        const receiver = await Developer.findById(receiverId);

        /* "Bad request" - receptor do like não encontrado. */
        if (receiver == null)
            return res.status(400).json({  
                error: "Developer not found.",
                success: false
            });

        /* Se o receptor já deu like no emissor do like, temos um match! */
        if (receiver.likes.includes(senderId)) {
            /* Armazena os sockets de conexão (se houver) de cada usuário. */
            const senderSocket = req.connectedUsers[senderId];
            const receiverSocket = req.connectedUsers[receiverId];

            /* Se houver conexão, avisa os usuários. O cenário ideal seria armazenar essas informações dentro de uma
            collection do MongoDB ou como chave e valor do Reddit, para que o usuário pudesse ser avisado mesmo que não
            estivesse logado no momento. */
            if (senderSocket != null)
                req.io.to(senderSocket).emit('match', receiver);

            if (receiverSocket != null)
                req.io.to(receiverSocket).emit('match', sender);
        }

        /* Insere o id do receptor do like (Mongo armazena o id com a chave '_id') no vetor de likes do desenvolvedor
        que emitiu o like (apenas se isso não foi feito anteriormente). */
        if (!sender.likes.includes(receiverId)) {
            sender.likes.push(receiver._id);
            await sender.save();  // Atualiza as informações no banco de dados.
        }

        return res.json({
            sender: sender,
            receiver: receiver,
            success: true
        })
    }

};

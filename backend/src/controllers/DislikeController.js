const Developer = require('../models/Developer');

/**
 * @author Douglas Canevarollo
 * 
 * Controlador da lógica de negócios relacionados aos Dislikes em de determinado desenvolvedor.
 * Todos os métodos serão exportáveis e utilizáveis pelas requisições/respotas.
 */
module.exports = {

    /**
     * Armazena um dislike efetuado pelo usuário logado (sender) para o usuário alvo (receiver).
     * 
     * @param req : requisição efetuada pelo cliente. 
     * @param res : resposta que o servidor emitirá.
     * @returns JSON contendo a resposta do servidor: emissor, receptor e booleano de sucesso.
     */
    async store(req, res) {
        const { sender: senderId } = req.headers;
        const { receiver: receiverId } = req.params;

        const sender = await Developer.findById(senderId);
        const receiver = await Developer.findById(receiverId);

        /* "Bad request" - receptor do dislike não encontrado. */
        if (receiver == null)
            return res.status(400).json({  
                error: "Developer not found.",
                success: false
            });

        /* Insere o id do receptor do dislike (Mongo armazena o id com a chave '_id') no vetor de dislikes do 
        desenvolvedor que emitiu o dislike (apenas se isso não foi feito anteriormente). */
        if (!sender.dislikes.includes(receiverId)) {
            sender.dislikes.push(receiver._id);
            await sender.save();  // Atualiza as informações no banco de dados.
        }

        return res.json({
            sender: sender,
            receiver: receiver,
            success: true
        })
    }

}

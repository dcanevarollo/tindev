const axios = require('axios');
const Developer = require('../models/Developer');

/**
 * @author Douglas Canevarollo
 * 
 * Controlador da lógica de negócios relacionados à entidade Developer.
 * Todos os métodos serão exportáveis e utilizáveis pelas requisições/respotas.
 */
module.exports = {

    /**
     * Busca todos os desenvolvedores cadastrados na plataforma, com exceção do próprio usuário logado e daqueles que o
     * usuário logado já deu like ou dislike.
     * 
     * @param req : requisição efetuada pelo cliente. 
     * @param res : resposta que o servidor emitirá.
     * @returns JSON contendo a resposta do servidor: lista de objetos Developers encontrados.
     */
    async index(req, res) {
        /* Primeiro, busca o usuário logado no banco de dados e carrega à memória. */
        const { user: loggedUserId } = req.headers;

        const loggedUser = await Developer.findById(loggedUserId);

        /* Busca os desenvolvedores cadastrados para serem exibidos somente se... */
        const developers = await Developer.find({
            /* ($and simula o and do SQL. Abaixo serão descritas cláusulas de restrição à consulta) */
            $and: [
                { _id: { $ne: loggedUserId } },  // ...não for o próprio usuário logado ($ne = not equals) e...
                { _id: { $nin: loggedUser.likes} },  // ...o usuário logado ainda não deu like e...
                { _id: { $nin: loggedUser.dislikes } }  // ...o usuário logado ainda não deu dislike.
            ]
        });

        return res.json(developers);
    },

    /**
     * Armazena um usuário no banco de dados de acordo com seu username do GitHub (passado na requisição).
     * Será um método assíncrono pois deve aguardar a respota da API do GitHub.
     * 
     * @param req : requisição efetuada pelo cliente. 
     * @param res : resposta que o servidor emitirá.
     * @returns JSON contendo a resposta do servidor: novo desenvolvedor, se foi cadastrado de fato e booleano de 
     * sucesso.
     */
    async store(req, res) {
        /* Armazena apenas o atributo username do JSON de requisição. */
        const { username } = req.body;

        /* Se o usuário já foi cadastrado não vamos cadastrá-lo novamente. */
        let newDeveloper = await Developer.findOne({ user: username }); 
        if (newDeveloper != null)
            return res.json({
                newDeveloper: newDeveloper,
                status: "Already stored.",
                success: false
            });

        /* A requisição demora um pouco para ser efetuada, logo o servidor deve aguardar a resposta para prosseguir com
        o restante do código. Assim, utilizamos 'await'. */
        const gitResponse = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = gitResponse.data;

        newDeveloper = await Developer.create({
            name: name,
            user: username, 
            bio: bio,
            avatar: avatar
        });

        return res.json({
            newDeveloper: newDeveloper,
            status: "Stored",
            success: true
        });
    }

};

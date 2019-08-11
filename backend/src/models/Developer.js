/* Importa apenas o Scheme o model do Mongoose. */
const { Schema, model } = require('mongoose');

/**
 * @author Douglas Canevarollo
 * 
 * Arquivo de representação do modelo Developer da aplicação.
 */

/**
 * Define o esquema utilizado no banco de dados para esta entidade.
 */
const DeveloperSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    bio: String,  // Não obrigatório.
    avatar: {
        type: String,  // Armazenará o caminho para a imagem.
        required: true
    },
    /* Os likes e deslikes serão vetores que armazenarão o id do desenvolvedor que foi curtido ou não-curtido. */
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Developer'  // Referência (semelhante a uma chave estrangeira) à entidade Developer (auto-relacionamento).
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }]
}, {
    timestamps: true  // Automaticamente define o carimbo de data/hora de criação e atualização de cada registro.
});

module.exports = model('Developer', DeveloperSchema);

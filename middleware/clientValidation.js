const { checkSchema } = require('express-validator');

const clientSchema = checkSchema({
    nome: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Nome é obrigatório e deve ser uma string'
    },
    email: {
        isEmail: true,
        notEmpty: true,
        errorMessage: 'Email é obrigatório e deve ser um email válido'
    },
    cpf: {
        isString: true,
        notEmpty: true,
        errorMessage: 'CPF é obrigatório e deve ser uma string'
    },
    telefone: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Telefone é obrigatório e deve ser uma string'
    }
});

module.exports = {
    clientSchema
};

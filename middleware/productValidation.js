const { checkSchema } = require('express-validator');

const productSchema = checkSchema({
    nome: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Nome é obrigatório e deve ser uma string'
    },
    descricao: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Descrição é obrigatória e deve ser uma string'
    },
    preco: {
        isFloat: true,
        notEmpty: true,
        errorMessage: 'Preço é obrigatório e deve ser um número'
    },
    precoVenda: {
        isFloat: true,
        notEmpty: true,
        errorMessage: 'Preço de Venda é obrigatório e deve ser um número'
    },
    quantidade: {
        isInt: true,
        notEmpty: true,
        errorMessage: 'Quantidade é obrigatória e deve ser um número inteiro'
    }
});

module.exports = {
    productSchema
};


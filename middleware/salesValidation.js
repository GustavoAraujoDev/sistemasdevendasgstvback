const { checkSchema } = require('express-validator');

const salesSchema = checkSchema({
    total_price: {
        isFloat: true,
        notEmpty: true,
        errorMessage: 'Nome é obrigatório e deve ser uma string'
    },
    pagamento: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Descrição é obrigatória e deve ser uma string'
    },
    situacao: {
        isFloat: true,
        notEmpty: true,
        errorMessage: 'Preço é obrigatório e deve ser um número'
    }
});

module.exports = {
    salesSchema
};


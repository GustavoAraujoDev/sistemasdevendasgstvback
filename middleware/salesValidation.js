const Joi = require('joi');

// Schema para validação de itens da venda
const itemVendaSchema = Joi.object({
    productid: Joi.number().integer().required(),
    nome: Joi.string().max(255).required(),
    descricao: Joi.string().max(255),
    preco: Joi.number().precision(2).required(),
    precovenda: Joi.number().precision(2).required(),
    quantidade: Joi.number().integer().positive().required(),
});

// Schema para validação de venda
const vendaSchema = Joi.object({
    totalprice: Joi.number().precision(2).required(),
    pagamento: Joi.string().max(255).required(),
    situacao: Joi.string().max(255).required(),
    datavenda: Joi.date().required(),
    clienteid: Joi.number().integer().required(),
    items: Joi.array().items(itemVendaSchema).required(),
});

module.exports = {
    vendaSchema,
};

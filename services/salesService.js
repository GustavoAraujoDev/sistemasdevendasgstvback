const salesModel = require('../models/salesModel');

const getTotalVendas = () => {
    return new Promise((resolve, reject) => {
        salesModel.getTotalVendas((err, total) => {
            if (err) {
                reject(err);
            } else {
                resolve(total);
            }
        });
    });
};

const inserirVenda = (items, totalPrice, pagamento, situacao, clienteId) => {
    return new Promise((resolve, reject) => {
        salesModel.inserirVenda(items, totalPrice, pagamento, situacao, clienteId, (err, vendaId) => {
            if (err) {
                reject(err);
            } else {
                resolve(vendaId);
            }
        });
    });
};

const listarVendas = () => {
    return new Promise((resolve, reject) => {
        salesModel.listarVendas((err, vendas) => {
            if (err) {
                reject(err);
            } else {
                resolve(vendas);
            }
        });
    });
};

const listarItensVenda = (vendaId) => {
    return new Promise((resolve, reject) => {
        salesModel.listarItensVenda(vendaId, (err, itensVenda) => {
            if (err) {
                reject(err);
            } else {
                resolve(itensVenda);
            }
        });
    });
};

const modificarVenda = (situacao, vendaId) => {
    return new Promise((resolve, reject) => {
        salesModel.modificarVenda(situacao, vendaId, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const excluirVenda = (vendaId) => {
    return new Promise((resolve, reject) => {
        salesModel.excluirVenda(vendaId, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = {
    getTotalVendas,
    inserirVenda,
    listarVendas,
    listarItensVenda,
    modificarVenda,
    excluirVenda
};

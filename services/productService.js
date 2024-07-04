const productModel = require('../models/productModel');
const logger = require('../config/logger');

const getAllProducts = async () => {
    return await productModel.search();
};

const createProduct = async (Nome, Descricao, Preco, PrecoVenda, Quantidade) => {
    return await productModel.insertData(Nome, Descricao, Preco, PrecoVenda, Quantidade);
};

const updateProduct = async (ProductID, Nome, Descricao, Preco, PrecoVenda, Quantidade) => {
    return await productModel.modifyData(ProductID, Nome, Descricao, Preco, PrecoVenda, Quantidade);
};

const deleteProduct = async (ProductID) => {
    return await productModel.deleteData(ProductID);
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};

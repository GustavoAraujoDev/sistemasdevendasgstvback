const Productservice = require('../services/productService');
const logger = require('../config/logger');
const getAllProducts = async (req, res) => {
    try {
        const Products = await Productservice.getAllProducts();
        res.json(Products);
    } catch (err) {
        logger.error(`Erro ao buscar Products: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

const createProduct = async (req, res) => {
    const { Nome, Descricao, Preco, PrecoVenda, Quantidade } = req.body;
    try {
        await Productservice.createProduct(Nome, Descricao, Preco, PrecoVenda, Quantidade);
        res.status(201).json({ message: 'Product criado com sucesso' });
    } catch (err) {
        logger.error(`Erro ao criar Product: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    const { ProductID } = req.params;
    const { Nome, Descricao, Preco, PrecoVenda, Quantidade } = req.body;
    try {
        await Productservice.updateProduct(ProductID, Nome, Descricao, Preco, PrecoVenda, Quantidade);
        res.json({ message: 'Product atualizado com sucesso' });
    } catch (err) {
        logger.error(`Erro ao atualizar Product: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    const { ProductID } = req.params;
    try {
        await Productservice.deleteProduct(ProductID);
        res.json({ message: 'Product excluído com sucesso' });
    } catch (err) {
        logger.error(`Erro ao excluir Product: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};

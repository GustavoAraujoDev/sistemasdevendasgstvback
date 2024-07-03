const productService = require('../services/productService');
const logger = require('../config/logger');
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: err.message });
    }
};

const addProduct = async (req, res) => {
    const { Nome, Descricao, Preco, PrecoVenda, Quantidade } = req.body;
    try {
        await productService.addProduct(Nome, Descricao, Preco, PrecoVenda, Quantidade);
        res.status(201).json({ message: 'Product criado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao excluir produto' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.body);
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct
};

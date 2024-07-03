const productModel = require('../models/productModel');
const logger = require('../config/logger');

const getAllProducts = async () => {
    try {
        const products = await productModel.getAllProducts();
        logger.info('Successfully fetched all products');
        return products;
    } catch (error) {
        logger.error(`Error fetching products: ${error.message || error}`);
        throw new Error(`Error fetching products: ${error.message || error}`);
    }
};

const addProduct = async (Nome, Descricao, Preco, PrecoVenda, Quantidade) => {
    try {
        const products = await productModel.insertProduct(Nome, Descricao, Preco, PrecoVenda, Quantidade);
        logger.info('Successfully added product', { product });
        return products;
    } catch (error) {
        logger.error(`Error inserting product: ${error.message || error}`);
        throw new Error(`Error inserting product: ${error.message || error}`);
    }
};

const deleteProduct = async (id) => {
    try {
        await productModel.deleteProduct(id);
        logger.info(`Successfully deleted product with id ${id}`);
    } catch (error) {
        logger.error(`Error deleting product: ${error.message || error}`);
        throw new Error(`Error deleting product: ${error.message || error}`);
    }
};

const updateProduct = async (product) => {
    try {
        await productModel.updateProduct(product);
        logger.info(`Successfully updated product with id ${product.id}`, { product });
        return product;
    } catch (error) {
        logger.error(`Error updating product: ${error.message || error}`);
        throw new Error(`Error updating product: ${error.message || error}`);
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct
};
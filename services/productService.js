const productModel = require('../models/productModel');
const logger = require('../config/logger');

const getAllProducts = async () => {
    try {
        const rows = await new Promise((resolve, reject) => {
            productModel.getAllProducts((err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
        logger.info('Successfully fetched all products');
        return rows;
    } catch (error) {
        logger.error(`Error fetching products: ${error.message}`);
        throw new Error(`Error fetching products: ${error.message}`);
    }
};


const addProduct = async (product) => {
    try {
        // Validate the product object if necessary
        await new Promise((resolve, reject) => {
            productModel.insertProduct(product, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
        logger.info('Successfully added product');
        return product;
    } catch (error) {
        logger.error(`Error inserting product: ${error.message}`);
        throw new Error(`Error inserting product: ${error.message}`);
    }
};

const deleteProduct = async (id) => {
    try {
        await new Promise((resolve, reject) => {
            productModel.deleteProduct(id, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
        logger.info(`Successfully deleted product with id ${id}`);
    } catch (error) {
        logger.error(`Error deleting product: ${error.message}`);
        throw new Error(`Error deleting product: ${error.message}`);
    }
};

const updateProduct = async (product) => {
    try {
        // Validate the product object if necessary
        await new Promise((resolve, reject) => {
            productModel.updateProduct(product, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
        logger.info(`Successfully updated product with id ${product.id}`);
        return product;
    } catch (error) {
        logger.error(`Error updating product: ${error.message}`);
        throw new Error(`Error updating product: ${error.message}`);
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct
};
const productModel = require('../models/productModel');

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        productModel.getAllProducts((err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

const addProduct = (product) => {
    return new Promise((resolve, reject) => {
        productModel.insertProduct(product, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(product);
        });
    });
};

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        productModel.deleteProduct(id, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

const updateProduct = (product) => {
    return new Promise((resolve, reject) => {
        productModel.updateProduct(product, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(product);
        });
    });
};

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct
};

const Produto = require('../models/productModel');

class ProdutoService {
    async create(produtoData) {
        return await Produto.create(produtoData);
    }

    async findAll() {
        return await Produto.findAll();
    }

    async findById(id) {
        return await Produto.findByPk(id);
    }

    async update(id, produtoData) {
        const produto = await this.findById(id);
        if (produto) {
            return await produto.update(produtoData);
        }
        throw new Error('Produto not found');
    }

    async delete(id) {
        const produto = await this.findById(id);
        if (produto) {
            return await produto.destroy();
        }
        throw new Error('Produto not found');
    }
}

module.exports = new ProdutoService();

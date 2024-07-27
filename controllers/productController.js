const produtoService = require('../services/productService');

class ProdutoController {
    async create(req, res, next) {
        try {
            const produto = await produtoService.create(req.body);
            res.status(201).json(produto);
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const produtos = await produtoService.findAll();
            res.json(produtos);
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        try {
            const produto = await produtoService.findById(req.params.id);
            if (produto) {
                res.json(produto);
            } else {
                res.status(404).json({ error: 'Produto not found' });
            }
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const produto = await produtoService.update(req.params.id, req.body);
            res.json(produto);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await produtoService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ProdutoController();

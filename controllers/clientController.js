const clienteService = require('../services/clientService');

class ClienteController {
    async create(req, res, next) {
        try {
            const cliente = await clienteService.create(req.body);
            res.status(201).json(cliente);
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const clientes = await clienteService.findAll();
            res.json(clientes);
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        try {
            const cliente = await clienteService.findById(req.params.id);
            if (cliente) {
                res.json(cliente);
            } else {
                res.status(404).json({ error: 'Cliente not found' });
            }
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const cliente = await clienteService.update(req.params.id, req.body);
            res.json(cliente);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await clienteService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ClienteController();

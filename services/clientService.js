const Cliente = require('../models/clientModel');

class ClienteService {
    async create(clienteData) {
        return await Cliente.create(clienteData);
    }

    async findAll() {
        return await Cliente.findAll();
    }

    async findById(id) {
        return await Cliente.findByPk(id);
    }

    async update(id, clienteData) {
        const cliente = await this.findById(id);
        if (cliente) {
            return await cliente.update(clienteData);
        }
        throw new Error('Cliente not found');
    }

    async delete(id) {
        const cliente = await this.findById(id);
        if (cliente) {
            return await cliente.destroy();
        }
        throw new Error('Cliente not found');
    }
}

module.exports = new ClienteService();

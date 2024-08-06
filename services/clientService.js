const Cliente = require('../models/clientModel');

class ClienteService {
    async create(clienteData) {
        try {
        return await Cliente.create(clienteData);
    } catch (err) {
        logger.error(`Error in ClienteService findAll: ${err.message}`);
        throw err;
    }
    }

    async findAll() {    
        try {
        return await Cliente.findAll();
    } catch (err) {
        logger.error(`Error in ClienteService findAll: ${err.message}`);
        throw err;
    }
    }

    async findById(id) {
        try{
        return await Cliente.findByPk(id);
    } catch (err) {
        logger.error(`Error in ClienteService findById: ${err.message}`);
        throw err;
    }
    }

    async update(id, clienteData) {
        try{
        const cliente = await this.findById(id);
        if (cliente) {
            return await cliente.update(clienteData);
        }
        throw new Error('Cliente not found');
    } catch (err) {
        logger.error(`Error in ClienteService update: ${err.message}`);
        throw err;
    }
    }

    async delete(id) {
        try{
        const cliente = await this.findById(id);
        if (cliente) {
            return await cliente.destroy();
        }
        throw new Error('Cliente not found');
    } catch (err) {
        logger.error(`Error in ClienteService delete: ${err.message}`);
        throw err;
    }
    }
}

module.exports = new ClienteService();

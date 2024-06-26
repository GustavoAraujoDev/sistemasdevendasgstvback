const clientService = require('../services/clientService');
const logger = require('../config/logger');

const getAllClients = async (req, res) => {
    try {
        const clients = await clientService.getAllClients();
        res.json(clients);
    } catch (err) {
        logger.error(`Erro ao buscar clientes: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

const createClient = async (req, res) => {
    const { nome, email, cpf, telefone } = req.body;
    try {
        await clientService.createClient(nome, email, cpf, telefone);
        res.status(201).json({ message: 'Cliente criado com sucesso' });
    } catch (err) {
        logger.error(`Erro ao criar cliente: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

const updateClient = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, telefone } = req.body;
    try {
        await clientService.updateClient(id, nome, email, cpf, telefone);
        res.json({ message: 'Cliente atualizado com sucesso' });
    } catch (err) {
        logger.error(`Erro ao atualizar cliente: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        await clientService.deleteClient(id);
        res.json({ message: 'Cliente excluído com sucesso' });
    } catch (err) {
        logger.error(`Erro ao excluir cliente: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllClients,
    createClient,
    updateClient,
    deleteClient
};

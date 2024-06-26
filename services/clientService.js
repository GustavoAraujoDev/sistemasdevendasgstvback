const clientModel = require('../models/clientModel');

const getAllClients = async () => {
    return await clientModel.search();
};

const createClient = async (nome, email, cpf, telefone) => {
    return await clientModel.insertData(nome, email, cpf, telefone);
};

const updateClient = async (id, nome, email, cpf, telefone) => {
    return await clientModel.modifyData(id, nome, email, cpf, telefone);
};

const deleteClient = async (id) => {
    return await clientModel.deleteData(id);
};

module.exports = {
    getAllClients,
    createClient,
    updateClient,
    deleteClient
};

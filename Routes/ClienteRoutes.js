const express = require("express");
const router = express.Router();
const controller = require("../database/ClienteData");

// Rota GET para buscar todos os clientes
router.get("/", (req, res) => {
    controller.search((result) => {
        res.json(result);
    });
});

// Rota POST para criar um novo cliente
router.post("/", (req, res) => {
    const { nome, email, cpf, telefone } = req.body;
    controller.insertData.run(nome, email, cpf, telefone, () => {
        console.log("Dados criados com sucesso.");
        res.status(201).end();
    });
});

// Rota DELETE para deletar um cliente
router.delete("/", (req, res) => {
    const { id } = req.body;
    controller.deleteData.run(id, () => {
        console.log("Dados excluídos com sucesso.");
        res.status(204).end();
    });
});

// Rota PUT para atualizar um cliente
router.put("/", (req, res) => {
    const { Nome, email, cpf, telefone, id } = req.body;
    controller.modifyData.run(Nome, email, cpf, telefone, id, () => {
        console.log("Dados modificados com sucesso.");
        res.status(200).end();
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../database/ProductData");

// Rota GET para buscar todos os produtos
router.get("/", (req, res) => {
    controller.search((result) => {
        res.json(result);
    });
});

// Rota POST para criar um novo produto
router.post("/", (req, res) => {
    const { Nome, Descricao, Preco, PrecoVenda, Quantidade } = req.body;
    controller.insertData.run(Nome, Descricao, Preco, PrecoVenda, Quantidade, () => {
        console.log("Dados criados com sucesso.");
        res.status(201).end();
    });
});

// Rota DELETE para deletar um produto
router.delete("/", (req, res) => {
    const { ProductID } = req.body;
    controller.deleteData.run(ProductID, () => {
        console.log("Dados excluídos com sucesso.");
        res.status(204).end();
    });
});

// Rota PUT para atualizar um produto
router.put("/", (req, res) => {
    const { Nome, Descricao, Preco, PrecoVenda, Quantidade, ProductID } = req.body;
    controller.modifyData.run(Nome, Descricao, Preco, PrecoVenda, Quantidade, ProductID, () => {
        console.log("Dados modificados com sucesso.");
        res.status(200).end();
    });
});

module.exports = router;

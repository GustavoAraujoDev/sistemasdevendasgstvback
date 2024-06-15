const express = require("express");
const router = express.Router();
const controller = require("../database/VendasData");

// Rota GET para listar todas as vendas ou itens de uma venda específica
router.get("/:type(ItensVendas)?/:id?", (req, res) => {
    if (req.params.type === "ItensVendas" && req.params.id) {
        // Listar itens de venda pelo ID da venda
        const vendaId = req.params.id;
        controller.listarItensVenda(vendaId, (err, itens) => {
            if (err) {
                res.status(500).json({ error: "Erro ao listar itens da venda." });
            } else {
                res.status(200).json(itens);
            }
        });
    } else {
        // Listar todas as vendas
        controller.listarVendas((err, vendas) => {
            if (err) {
                res.status(500).json({ error: "Erro ao listar vendas." });
            } else {
                res.status(200).json(vendas);
            }
        });
    }
});

// Rota POST para inserir nova venda
router.post("/", (req, res) => {
    const { items, totalPrice, pagamento, situacao, id } = req.body;
    controller.inserirVenda(items, totalPrice, pagamento, situacao, id, (err, vendaId) => {
        if (err) {
            res.status(500).json({ error: "Erro ao inserir venda." });
        } else {
            res.status(201).json({ message: "Venda inserida com sucesso.", vendaId });
        }
    });
});

// Rota PUT para modificar uma venda
router.put("/", (req, res) => {
    const { situacao, vendaId } = req.body;
    controller.modificarVenda(situacao, vendaId, (err) => {
        if (err) {
            res.status(500).json({ error: "Erro ao modificar venda." });
        } else {
            res.status(200).json({ message: "Venda modificada com sucesso." });
        }
    });
});

// Rota DELETE para excluir uma venda
router.delete("/", (req, res) => {
    const { id } = req.body;
    controller.excluirVenda(id, (err) => {
        if (err) {
            res.status(500).json({ error: "Erro ao excluir venda." });
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;

const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/vendas/total', salesController.getTotalVendas);
router.post('/vendas', salesController.inserirVenda);
router.get('/vendas', salesController.listarVendas);
router.get('/vendas/:vendaId/itens', salesController.listarItensVenda);
router.put('/vendas/:vendaId', salesController.modificarVenda);
router.delete('/vendas/:vendaId', salesController.excluirVenda);

module.exports = router;

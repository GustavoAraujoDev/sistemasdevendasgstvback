const express = require('express');
const vendaController = require('../controllers/salesController');
const { vendaSchema } = require('../middleware/salesValidation');
const validate = require('../middleware/validateRequest')
const router = express.Router();

router.post('/vendas', validate(vendaSchema), vendaController.criarVenda);
router.get('/vendas', vendaController.listarVendas);
router.get('/vendas/itens', vendaController.listarItensVenda);
router.get('/vendas/:id', vendaController.buscarVendaPorId);
router.put('/vendas/:id', validate(vendaSchema), vendaController.atualizarVenda);
router.delete('/vendas/:id', vendaController.deletarVenda);

module.exports = router;

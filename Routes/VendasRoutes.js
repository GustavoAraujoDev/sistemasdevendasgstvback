const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();
const validateRequest = require('../middlewares/validateRequest');
const { salesSchema } = require('../middlewares/salesValidation');

router.get('/vendas/total', salesController.getTotalVendas);
router.post('/vendas', validateRequest(salesSchema), salesController.inserirVenda);
router.get('/vendas', salesController.listarVendas);
router.get('/vendas/:vendaId/itens', salesController.listarItensVenda);
router.put('/vendas/:vendaId', salesController.modificarVenda);
router.delete('/vendas/:vendaId', salesController.excluirVenda);

module.exports = router;

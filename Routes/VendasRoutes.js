const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();
const validateRequest = require('../middleware/validateRequest');
const { salesSchema } = require('../middleware/salesValidation');

router.get('/total', salesController.getTotalVendas);
router.post('/', validateRequest(salesSchema), salesController.inserirVenda);
router.get('/', salesController.listarVendas);
router.get('/:vendaId/itens', salesController.listarItensVenda);
router.put('/:VendaId', salesController.modificarVenda);
router.delete('/:VendaId', salesController.excluirVenda);

module.exports = router;

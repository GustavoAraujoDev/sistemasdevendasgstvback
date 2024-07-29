const express = require('express');
const vendaController = require('../controllers/salesController');
const { vendaSchema } = require('../middleware/salesValidation');
const validate = require('../middleware/validateRequest')
const router = express.Router();

router.post('/', validate(vendaSchema), vendaController.criarVenda);
router.get('/', vendaController.listarVendas);
router.get('/itens', vendaController.listarItensVenda);
router.get('/:id', vendaController.buscarVendaPorId);
router.get('/:id', vendaController.buscarItensVendaPorId);
router.put('/:id', validate(vendaSchema), vendaController.atualizarVenda);
router.delete('/:id', vendaController.deletarVenda);

module.exports = router;

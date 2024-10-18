const express = require('express');
const vendaController = require('../controllers/salesController');
const { vendaSchema } = require('../middleware/salesValidation');
const validate = require('../middleware/validateRequest');
const router = express.Router();

router.post('/', validate(vendaSchema), vendaController.create);
router.post('/itens', validate(vendaSchema), vendaController.createItem);
router.get('/', vendaController.getAll);
router.get('/:id', vendaController.getById);
router.get('/itens/:id', vendaController.getItems);
router.put('/:id', validate(vendaSchema), vendaController.update);
router.delete('/:id', vendaController.delete);
router.delete('/itens/:id', vendaController.deleteItem);
module.exports = router;

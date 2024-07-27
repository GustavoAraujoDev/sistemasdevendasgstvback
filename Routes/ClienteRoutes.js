const express = require('express');
const clienteController = require('../controllers/clientController');
const validate = require('../middleware/validateRequest');
const Joi = require('joi');
const clienteSchema = require('../middleware/clientValidation');

const router = express.Router();


router.post('/', validate(clienteSchema), clienteController.create);
router.get('/', clienteController.findAll);
router.get('/:id', clienteController.findById);
router.put('/:id', validate(clienteSchema), clienteController.update);
router.delete('/:id', clienteController.delete);

module.exports = router;

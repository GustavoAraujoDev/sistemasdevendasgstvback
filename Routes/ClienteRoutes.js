const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientcontroller');
const validateRequest = require('../middleware/validateRequest');
const { clientSchema } = require('../middleware/clientValidation');

router.get('/', clientController.getAllClients);
router.post('/', validateRequest(clientSchema), clientController.createClient);
router.put('/:id', validateRequest(clientSchema), clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;

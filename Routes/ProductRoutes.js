const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateRequest = require('../middleware/validateRequest');
const { productSchema } = require('../middleware/productValidation');

router.get('/', productController.getAllProducts);
router.post('/', validateRequest(productSchema), productController.createProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', validateRequest(productSchema), productController.updateProduct);

module.exports = router;

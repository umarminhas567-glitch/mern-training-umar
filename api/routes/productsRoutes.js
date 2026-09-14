const express = require('express');
const router = express.Router();

const {productValidationRules, validateProduct}= require("../middleware/productValidation");
const produtController = require('../controller/produtController');
const { authenticate, requireRole } = require('../middleware/authMiddleware');

router.get('/', authenticate, produtController.getAllProducts);
router.post('/', authenticate, requireRole('manager', 'admin'), productValidationRules, validateProduct, produtController.createProduct);
router.put('/:id', authenticate, requireRole('manager', 'admin'), produtController.updateProduct);
router.delete('/:id', authenticate, requireRole('admin'), produtController.deleteProduct);

module.exports = router;
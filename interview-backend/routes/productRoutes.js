const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { rateLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.post('/', protect, rateLimiter, createProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put('/:id', protect, updateProduct);

router.delete('/:id', protect, deleteProduct);

module.exports = router;
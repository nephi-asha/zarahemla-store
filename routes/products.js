const router = require('express').Router();
const productsController = require('../controllers/products');
const { isAuthenticated } = require('../middleware/authenticate');
const { productRules, validate } = require('../middleware/validate');

// Not protected
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

// Protected Routes
router.post('/', isAuthenticated, productRules(), validate, productsController.createProduct);
router.put('/:id', isAuthenticated, productRules(), validate, productsController.updateProduct);
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;

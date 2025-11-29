const router = require('express').Router();
const productsController = require('../controllers/products');
const { isAuthenticated } = require('../middleware/authenticate');
const { productValidationRules, validate } = require('../middleware/validate');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

router.post('/', isAuthenticated, productValidationRules(), validate, productsController.createProduct);
router.put('/:id', isAuthenticated, productValidationRules(), validate, productsController.updateProduct);
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;
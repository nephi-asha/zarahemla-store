const router = require('express').Router({ mergeParams: true });
const controller = require('../controllers/carts');
const { isAuthenticated } = require('../middleware/authenticate');
const { cartRules, validate } = require('../middleware/validate');

router.get('/', isAuthenticated, controller.getUserCarts);
router.get('/:cartId', isAuthenticated, controller.getCartById);
router.post('/', isAuthenticated, cartRules(), validate, controller.createCart);
router.put('/:cartId', isAuthenticated, cartRules(), validate, controller.updateCart);
router.delete('/:cartId', isAuthenticated, controller.deleteCart);

module.exports = router;
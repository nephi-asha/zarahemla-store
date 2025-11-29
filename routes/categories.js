const router = require('express').Router();
const controller = require('../controllers/categories');
const { isAuthenticated } = require('../middleware/authenticate');
const { categoryRules, validate } = require('../middleware/validate');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);

router.post('/', isAuthenticated, categoryRules(), validate, controller.createCategory);
router.put('/:id', isAuthenticated, categoryRules(), validate, controller.updateCategory);
router.delete('/:id', isAuthenticated, controller.deleteCategory);

module.exports = router;
const router = require('express').Router();
const controller = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');
const { userRules, validate } = require('../middleware/validate');

router.get('/:username', isAuthenticated, controller.getUser);
router.put('/:username', isAuthenticated, userRules(), validate, controller.updateUser);
router.delete('/:username', isAuthenticated, controller.deleteUser);
router.post('/', userRules(), validate, controller.createUser);

module.exports = router;
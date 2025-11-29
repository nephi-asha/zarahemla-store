const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/auth', require('./auth'));

router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/user', require('./users'));

router.use('/user/:username/carts', require('./carts'));

router.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
});

module.exports = router;
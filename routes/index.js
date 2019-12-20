const express = require('express');
const router = express.Router();
const user_routers = require('./users');
const product_routers = require('./products');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', forwardAuthenticated, (_req, res) => {
    // res.json({ message: 'welcome to nncthang-api' });
    res.render('index');
})

router.use('/users', user_routers);
router.use('/api/products', product_routers);


router.get('/success', ensureAuthenticated, (req, res) =>
  res.render('success', {
    user: req.user
  })
);


module.exports = router;
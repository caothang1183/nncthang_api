const express = require('express');
const router = express.Router();
const user_routers = require('./api/users');
const product_routers = require('./api/products');


router.get('/', (_req, res) => {
    res.json({ message: 'welcome to nncthang-api' });
})

router.use('/users', user_routers);
router.use('/products', product_routers);

router.get('/*', (req, res) => {
    res.status(404).json({
      message: 'Not Found',
      description: 'Router not found'
    });
  });
module.exports = router;
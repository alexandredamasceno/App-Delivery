const express = require('express');

const salesController = require('../controllers/sales');
const { validateJWT } = require('../middlewares/validateJWT');

const router = express.Router();

router.route('/')
    .post(validateJWT, salesController.addSale)
    .get(salesController.getSales);

module.exports = router;

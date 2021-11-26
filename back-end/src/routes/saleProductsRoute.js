const express = require('express');
const { getSaleProduct, addNewSales } = require('../controllers/salesProducts');

const router = express.Router();

router.route('/:id')
.get(getSaleProduct);

router.post('/', addNewSales);

module.exports = router;
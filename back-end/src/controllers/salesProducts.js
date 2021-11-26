const saleProductsService = require('../services/salesProducts');

const getSaleProduct = async (req, res, next) => {
  const { id } = req.params;

  const saleWithProducts = await saleProductsService.getSaleProduct(id);
  if (!saleWithProducts) {
    return next('saleNotFound');
  }
  res.status(200).json(saleWithProducts);
};

const addNewSales = async (req, res) => {
  const { saleId, productId, quantity } = req.body;

  const sale = await saleProductsService.addSales(saleId, productId, quantity);

  return res.status(201).json(sale);
};

module.exports = {
  getSaleProduct,
  addNewSales,
};
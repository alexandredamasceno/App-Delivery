const { Sale, Product, User, SalesProduct } = require('../database/models');

const getSaleProduct = async (id) => {
  const saleWithProduct = await Sale.findAll({
    where: { id },
    include: [
      {
        model: Product,
        as: 'products',
        through: {
          attributes: ['quantity'],
        },
      },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: User, as: 'seller', attributes: { exclude: ['password'] } },
    ],
  }).catch((e) => console.log(e));

  if (saleWithProduct.length === 0) {
    return null;
  }
  return saleWithProduct;
};

const addSales = async (saleId, productId, quantity) => {
  const saleProductAdded = await SalesProduct.create({ saleId, productId, quantity });

  return saleProductAdded.dataValues;
};

module.exports = {
  getSaleProduct,
  addSales,
};

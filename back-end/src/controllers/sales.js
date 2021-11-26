const salesService = require('../services/sales');

const addSale = async (req, res) => {
    const { objSale, objSaleProduct } = req.body;
    const { id } = req.user;
    const objeto = {
        id,
        objSale,
        objSaleProduct,
    };
    const saleAdded = await salesService.addNewSale(objeto);

    return res.status(201).json(saleAdded);
};

const getSales = async (req, res) => {
    const allSales = await salesService.getAllSales();

    return res.status(200).json({ sales: allSales });
};

module.exports = {
    addSale,
    getSales,
};

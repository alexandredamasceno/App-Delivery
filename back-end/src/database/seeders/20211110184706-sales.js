"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      "sales",
      [
        {
          user_id: 1,
          seller_id: 2,
          total_price: 23,
          delivery_address: 'avenida nula',
          delivery_number: 345,
          sale_date: new Date('2011-08-01T19:58:00.000Z'),
          status: 'entregue',
        },
        {
          user_id:1,
          seller_id: 2,
          total_price: 56,
          delivery_address: 'avenida xablau',
          delivery_number: 678,
          sale_date: new Date('2011-08-01T19:58:00.000Z'),
          status: 'pendente',
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("sales", null, {});
  },
};
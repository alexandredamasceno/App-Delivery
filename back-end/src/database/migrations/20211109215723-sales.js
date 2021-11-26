"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id',
      },
      sellerId: {
        type: Sequelize.INTEGER,
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'seller_id',
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(9,2),
        defaultValue: 0.00,
        field: 'total_price',
      },
      deliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
        field: 'delivery_address',
      },
      deliveryNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
        field: 'delivery_number',
      },
      saleDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date('2011-08-01T19:58:00.000Z'),
        field: 'sale_date',
      },
      status:{
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("sales");
  },
};


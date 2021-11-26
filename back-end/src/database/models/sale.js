module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, foreingKey: true },
      sellerId: { type: DataTypes.INTEGER, foreingKey: true },
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING(100),
      deliveryNumber: DataTypes.STRING(50),
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING(50),
    },
    {
      timestamps: false,
      tableName: "sales",
      underscored: true,
    }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreingKey: "user_id", as: "user" });
    Sale.belongsTo(models.User, { foreingKey: "seller_id", as: "seller" });
  };
  return Sale;
};

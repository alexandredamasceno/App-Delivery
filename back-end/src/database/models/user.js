module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: DataTypes.STRING(255),
      email: DataTypes.STRING(255),
      password: DataTypes.STRING(255),
      role: DataTypes.STRING(255),
    },
    { timestamps: false, tableName: 'users', underscored: true },
  );
  User.associate = (models) => {
    User.hasMany(models.Sale, { foreingKey: 'user_id', as: 'user' });
    User.hasMany(models.Sale, { foreingKey: 'seller_id', as: 'seller' });
  };

  return User;
};

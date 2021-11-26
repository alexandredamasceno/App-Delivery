const { User } = require('../database/models');

const getUsers = async (role) => {
    const users = await User.findAll({ where: { role } });

    return users;
};

module.exports = {
    getUsers,
};

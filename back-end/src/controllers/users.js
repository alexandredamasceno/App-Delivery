const usersService = require('../services/users');

const getAllUsers = async (req, res) => {
    const { role } = req.query;

    const users = await usersService.getUsers(role);

    return res.status(200).json(users);
};

module.exports = {
    getAllUsers,
};

const userRepository = require('../repositories/userRepository');

exports.getUserById = async (id) => {
  return await userRepository.findById(id);
};

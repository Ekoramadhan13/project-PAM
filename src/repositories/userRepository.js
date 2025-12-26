const { User } = require('../../models');

// ================= AUTH =================
exports.findByEmail = (email) => {
  return User.findOne({ where: { email } });
};

exports.create = (data) => {
  return User.create(data);
};

// ================= USER =================
exports.findById = (id) => {
  return User.findByPk(id, {
    attributes: ['id', 'name', 'email', 'role', 'created_at']
  });
};

const userService = require('../services/userService');

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User tidak ditemukan'
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Admin logout
exports.logoutAdmin = async (req, res) => {
  try {
    // Sama seperti user logout, cukup hapus token di client
    return res.json({ message: 'Admin logout berhasil. Silakan login kembali.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

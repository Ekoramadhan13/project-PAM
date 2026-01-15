const userService = require('../services/userService');

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID user tidak valid'
      });
    }

    const user = await userService.getUserById(Number(id));

    if (!user) {
      return res.status(404).json({
        message: 'User tidak ditemukan'
      });
    }

    // Jangan kirim data sensitif
    const { password, ...safeUser } = user;

    return res.status(200).json({
      message: 'Data user berhasil diambil',
      data: safeUser
    });

  } catch (error) {
    console.error('getUserById error:', error);
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server'
    });
  }
};

// ===================== ADMIN LOGOUT =====================
exports.logoutAdmin = async (req, res) => {
  try {
    // Jika menggunakan JWT → logout cukup hapus token di client
    return res.status(200).json({
      message: 'Admin logout berhasil. Silakan login kembali.'
    });
  } catch (err) {
    console.error('logoutAdmin error:', err);
    return res.status(500).json({
      message: 'Gagal logout admin'
    });
  }
};

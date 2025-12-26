const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    if (role === 'ADMIN') {
      return res.status(403).json({ message: 'Admin tidak boleh registrasi' });
    }

    const user = await authService.register({
      name,
      email,
      password,
      role: 'USER'
    });

    res.status(201).json({
      message: 'Register berhasil',
      user
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib' });
    }

    const result = await authService.login(email, password);

    res.json({
      message: 'Login berhasil',
      token: result.token,
      user: result.user
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// User logout
exports.logoutUser = async (req, res) => {
  try {
    // Jika menggunakan JWT, logout di client cukup menghapus token.
    // Jika ingin server-side blacklist token, simpan token ke DB atau Redis
    return res.json({ message: 'Logout berhasil. Silakan login kembali.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

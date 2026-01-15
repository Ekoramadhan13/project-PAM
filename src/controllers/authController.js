const authService = require('../services/authService');
const validator = require('validator');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1️⃣ Admin tidak boleh registrasi (PRIORITAS)
    if (role === 'ADMIN') {
      return res.status(403).json({
        message: 'Admin tidak boleh registrasi'
      });
    }

    // 2️⃣ Cek data kosong
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Data tidak lengkap'
      });
    }

    // 3️⃣ Validasi nama
    if (name.trim().length < 3) {
      return res.status(400).json({
        message: 'Nama minimal 3 karakter'
      });
    }

    // 4️⃣ Validasi email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: 'Format email tidak valid'
      });
    }

    if (!email.endsWith('@gmail.com')) {
      return res.status(400).json({
        message: 'Email harus menggunakan @gmail.com'
      });
    }

    // 5️⃣ Validasi password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password minimal 8 karakter dan mengandung huruf & angka'
      });
    }

    // 6️⃣ Proses register
    const user = await authService.register({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      role: 'USER'
    });

    return res.status(201).json({
      message: 'Register berhasil',
      user
    });

  } catch (err) {
    return res.status(400).json({
      message: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email dan password wajib'
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: 'Format email tidak valid'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password minimal 8 karakter'
      });
    }

    const result = await authService.login(
      email.toLowerCase(),
      password
    );

    return res.status(200).json({
      message: 'Login berhasil',
      token: result.token,
      user: result.user
    });

  } catch (err) {
    return res.status(401).json({
      message: err.message
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    // JWT logout: hapus token di client
    return res.status(200).json({
      message: 'Logout berhasil. Silakan login kembali.'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Gagal logout'
    });
  }
};

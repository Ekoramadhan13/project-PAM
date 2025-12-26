const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

exports.register = async (payload) => {
  const existingUser = await userRepository.findByEmail(payload.email);
  if (existingUser) {
    throw new Error('Email sudah terdaftar');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return userRepository.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role: 'USER',
  });
};

exports.login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Email atau password salah');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Email atau password salah');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const { Cart, Product } = require('../../models');

// Tambah produk ke keranjang (stok admin TIDAK berkurang)
const addToCart = async (user_id, product_id, amount) => {
  if (!amount || amount <= 0) throw new Error('Jumlah harus lebih dari 0');

  const product = await Product.findByPk(product_id);
  if (!product) throw new Error('Produk tidak ditemukan');

  let item = await Cart.findOne({ where: { user_id, product_id } });
  if (item) {
    item.quantity += amount;
    await item.save();
  } else {
    item = await Cart.create({ user_id, product_id, quantity: amount });
  }

  return item;
};

// Update keranjang (stok admin TIDAK tersentuh)
const updateCart = async (user_id, product_id, action, amount) => {
  const item = await Cart.findOne({ where: { user_id, product_id } });
  if (!item) throw new Error('Produk tidak ada di keranjang');

  if (action === 'add') item.quantity += amount;
  else if (action === 'reduce') item.quantity -= amount;

  if (item.quantity <= 0) {
    await item.destroy();
    return null;
  }

  await item.save();
  return item;
};

// Hapus produk dari keranjang
const removeFromCart = async (user_id, product_id) => {
  const item = await Cart.findOne({ where: { user_id, product_id } });
  if (!item) throw new Error('Produk tidak ada di keranjang');

  await item.destroy();
};

// Lihat keranjang
const getCart = async (user_id) => {
  return await Cart.findAll({
    where: { user_id },
    include: [{ model: Product, as: 'product' }]
  });
};

module.exports = {
  addToCart,
  updateCart,
  removeFromCart,
  getCart
};

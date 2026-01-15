const cartRepository = require('../repositories/cartRepository');
const productService = require('../services/productService'); // ✅ jangan lupa require

// helper untuk menambahkan detail product ke setiap cart item
const withProductDetail = async (req, cartList) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  return Promise.all(cartList.map(async (cartItem) => {
    const product = await productService.getProductById(cartItem.product_id);
    return {
      ...cartItem.toJSON(), // pastikan cartItem bisa di toJSON()
      product: product
        ? {
            ...product.toJSON(),
            image_url: product.image_url ? `${baseUrl}${product.image_url}` : null
          }
        : null
    };
  }));
};

// ================= ADD TO CART =================
exports.addToCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id, amount } = req.body;

    const cart = await cartRepository.addToCart(user_id, product_id, amount);
    const cartWithProduct = await withProductDetail(req, [cart]); // embed product
    res.json({ message: 'Produk berhasil ditambahkan ke keranjang', data: cartWithProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ================= GET CART =================
exports.getCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    let cart = await cartRepository.getCart(user_id); // ambil semua cart
    cart = await withProductDetail(req, cart); // embed product
    res.json({ data: cart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ================= UPDATE CART =================
exports.updateCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id, action, amount } = req.body;

    const updated = await cartRepository.updateCart(user_id, product_id, action, amount);

    if (!updated) {
      return res.json({ message: 'Produk dihapus karena quantity 0' });
    }

    const updatedWithProduct = await withProductDetail(req, [updated]);
    res.json({ message: 'Keranjang berhasil diupdate', data: updatedWithProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ================= REMOVE FROM CART =================
exports.removeFromCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id } = req.body;

    await cartRepository.removeFromCart(user_id, product_id);
    res.json({ message: 'Produk berhasil dihapus dari keranjang' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

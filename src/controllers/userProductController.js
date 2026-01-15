const productUserService = require('../services/productUserService');

// helper untuk bikin full URL gambar
const withImageUrl = (req, product) => {
  if (!product) return product;

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  // untuk array
  if (Array.isArray(product)) {
    return product.map(p => ({
      ...p.toJSON(),
      image_url: p.image_url ? `${baseUrl}${p.image_url}` : null
    }));
  }

  // untuk single object
  return {
    ...product.toJSON(),
    image_url: product.image_url ? `${baseUrl}${product.image_url}` : null
  };
};

// ================= USER =================

// GET /api/user/products
exports.getAll = async (req, res) => {
  try {
    const products = await productUserService.getAllProducts();
    res.json(withImageUrl(req, products));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/user/products/:id
exports.getDetail = async (req, res) => {
  try {
    const product = await productUserService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    res.json(withImageUrl(req, product));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/user/products/search?q=&category=
exports.search = async (req, res) => {
  try {
    const { q, category } = req.query;
    const products = await productUserService.searchProducts(q, category);
    res.json(withImageUrl(req, products));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

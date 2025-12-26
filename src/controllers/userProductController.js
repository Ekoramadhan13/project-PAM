const productUserService = require('../services/productUserService');

// GET /api/user/products
exports.getAll = async (req, res) => {
  const products = await productUserService.getAllProducts();

  if (products.length === 0) {
    return res.json({
      message: 'Produk belum tersedia',
      data: []
    });
  }

  res.json(products);
};

// GET /api/user/products/:id
exports.getDetail = async (req, res) => {
  const product = await productUserService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  res.json(product);
};

// GET /api/user/products/search?q=&category=
exports.search = async (req, res) => {
  const { q, category } = req.query;

  const products = await productUserService.searchProducts(q, category);

  res.json(products);
};

const productService = require('../services/productService');

// helper untuk bikin full URL
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
exports.getAll = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await productService.getAllProducts(category);

    res.json(withImageUrl(req, products));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json(withImageUrl(req, product));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ADMIN =================
exports.create = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!category) {
      return res.status(400).json({ message: 'Category wajib diisi' });
    }

    const image_url = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const product = await productService.createProduct({
      name,
      description,
      price,
      stock,
      category,
      image_url
    });

    res.status(201).json({
      message: 'Produk berhasil ditambahkan',
      product: withImageUrl(req, product)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const image_url = req.file
      ? `/uploads/${req.file.filename}`
      : undefined;

    const updatedProduct = await productService.updateProduct(req.params.id, {
      ...req.body,
      ...(image_url && { image_url })
    });

    res.json({
      message: 'Produk berhasil diperbarui',
      product: withImageUrl(req, updatedProduct)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: 'Produk berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const productService = require('../services/productService');

// ================= USER =================
exports.getAll = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await productService.getAllProducts(category);
    res.json(products);
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
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ADMIN =================
exports.create = async (req, res) => {
  try {
    console.log('REQ BODY ===>', req.body);
    console.log('REQ FILE ===>', req.file);

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
      product
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

    await productService.updateProduct(req.params.id, {
      ...req.body,
      ...(image_url && { image_url })
    });

    res.json({ message: 'Produk berhasil diperbarui' });
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

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // akses file gambar

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');          // ADMIN
const productUserRoutes = require('./routes/productUserRoutes');  // USER
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/ordersRoutes');             // ORDERS (User + Admin)

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);           // ADMIN
app.use('/api/user/products', productUserRoutes);  // USER
app.use('/api/user/cart', cartRoutes);            // USER Cart
app.use('/api/orders', orderRoutes);              // Orders (User & Admin)

// Test root
app.get('/', (req, res) => {
  res.send('API Running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

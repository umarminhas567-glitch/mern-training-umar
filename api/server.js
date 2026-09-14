require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productsRoutes');

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
const corsOption = {
  origin: allowedOrigin,
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use(cors(corsOption));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

if (require.main === module) {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port', process.env.PORT || 5000);
  });
}

module.exports = app;
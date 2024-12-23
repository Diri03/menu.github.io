const express = require('express');
const cors = require('cors');
const db = require('./config/connection');
const categoryRoutes = require('./routes/categoriesRoutes');
const productRoutes = require('./routes/productsRoutes');
const logger = require('./middlewares/logger');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(logger); // Logging middleware

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
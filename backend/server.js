const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemon = require('nodemon');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ Connection Error:", err));

// Define Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/sales', require('./routes/sales'));
// Add this in your server.js file
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port http://localhost${PORT}`));
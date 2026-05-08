const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Process a new sale and update stock
router.post('/process', async (req, res) => {
  const { items, grandTotal, date } = req.body;

  try {
    // 1. Save the sale record to MongoDB
    const newSale = new Sale({ items, grandTotal, date });
    await newSale.save();

    // 2. Loop through items to deduct stock quantities
    for (const item of items) {
      await Product.findOneAndUpdate(
        { name: item.name },
        { $inc: { stock: -item.qty } } // Deduct quantity from stock
      );
    }

    res.status(201).json({ success: true, message: "Sale recorded and stock updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
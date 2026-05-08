const Sale = require('../models/Sale');
const Product = require('../models/Product');

// 1. Process a single sale (Online)
exports.processSale = async (req, res) => {
  const { items, grandTotal, date } = req.body;
  try {
    const newSale = new Sale({ items, grandTotal, date });
    await newSale.save();

    // Deduct stock for each item
    for (const item of items) {
      await Product.findOneAndUpdate(
        { name: item.name },
        { $inc: { stock: -item.qty } }
      );
    }
    res.status(201).json({ success: true, message: "Sale processed!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Sync multiple sales from Offline storage (Hybrid Sync)
exports.syncBulkSales = async (req, res) => {
  const { sales } = req.body; // sales is an array of sale objects
  try {
    for (const saleData of sales) {
      const newSale = new Sale({ ...saleData, status: 'synced' });
      await newSale.save();

      for (const item of saleData.items) {
        await Product.findOneAndUpdate(
          { name: item.name },
          { $inc: { stock: -item.qty } }
        );
      }
    }
    res.status(200).json({ success: true, message: "Bulk sync completed!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
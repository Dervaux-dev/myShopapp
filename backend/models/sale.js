const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      subtotal: { type: Number, required: true }
    }
  ],
  grandTotal: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  syncedFrom: { 
    type: String, 
    enum: ['mobile', 'web'], 
    default: 'mobile' 
  }
});

module.exports = mongoose.model('Sale', saleSchema);
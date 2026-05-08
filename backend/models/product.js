const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, // Bituma hatabaho ibicuruzwa bibiri bifite izina rimwe
    trim: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  stock: { 
    type: Number, 
    required: true, 
    default: 0 // Umubare w'ibihari mu ntangiriro
  },
  category: { 
    type: String, 
    default: "General" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Product', productSchema);
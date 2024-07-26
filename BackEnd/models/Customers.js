const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: String,
    name: String,
    address: String,
    birthdate: Date,
    email: String,
    active: Boolean,
    accounts: [Number],
    tier_and_details: {
      type: Map,
      of: {
        tier: String,
        id: String,
        active: Boolean,
        benefits: [String]
      }
    }
  });
  
  module.exports = mongoose.model('Customer', customerSchema);
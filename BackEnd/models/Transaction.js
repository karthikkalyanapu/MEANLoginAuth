const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  account_id: Number,
  transaction_count: Number,
  bucket_start_date: Date,
  bucket_end_date: Date,
  transactions: [
    {
      date: Date,
      amount: Number,
      transaction_code: String,
      symbol: String,
      price: String,
      total: String
    }
  ]
});

module.exports = mongoose.model('Transaction', transactionSchema);

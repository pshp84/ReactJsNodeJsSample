const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema({
  transactionId: {
    type: String,
  },
  userId: {
    type: String,
  },
  OrderId: {
    type: String,
  },
  code: {
    type: String,
  },
  Type: {
    type: String,
  },
  Mode: {
    type: String,
  },
  Status: {
    type: String,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);

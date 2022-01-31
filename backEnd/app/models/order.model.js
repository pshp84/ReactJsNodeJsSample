const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
  orderId: { type: String, unique: true },
  userId: { type: String, unique: true },
  status: String,
  tableNo: String,
  total: String,
  productStatus: String,
  name: String,
  sar: String,
  item: {
    type: String,
  },
  mobileNo: String,
  //items: [{ type: "ObjectId", ref: "Item"}],
  //discounts: [{ type: "ObjectId", ref: "discount" }],
});

module.exports = mongoose.model("StoreOrder", orderSchema);

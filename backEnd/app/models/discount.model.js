const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
  discountId: {
    type: String,
  },
  discountType: {
    type: String,
  },
  //enumdiscountType: ["Amount", "predefined", "percent"],
});

module.exports = mongoose.model("discount", discountSchema);

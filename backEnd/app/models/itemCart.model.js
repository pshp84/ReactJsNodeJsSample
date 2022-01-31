const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const cartSchema = mongoose.Schema({
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  discount: [
    {
      type: Schema.Types.ObjectId,
      ref: "discount",
    },
  ],
});

module.exports = mongoose.model("itemCart", cartSchema);

const mongoose = require("mongoose");
const ItemSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    itemNo: {
      type: String,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    otherItem: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: 32,
    },
    itemId: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      //required: true,
    },
    photo: {
      type: String,
    },
    photoBuffer: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", ItemSchema);

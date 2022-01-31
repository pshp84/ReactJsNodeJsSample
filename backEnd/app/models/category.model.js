const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
    },
    categoryImageBuffer: {
      data: Buffer,
      contentType: String,
    },
    categoryImage_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);

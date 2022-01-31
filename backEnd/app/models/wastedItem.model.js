const mongoose = require("mongoose");
const wasteItemSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    totalItems: {
      type: String,
      required: true,
    },
    wasteItem: {
      type: String,
      required: true,
    },
    itemId: {
      type: String,
    },
    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("extraItem", wasteItemSchema);

/*const mongoose = require("mongoose");
const wastedItemSchema = mongoose.Schema({
  id: String,
  itemId: {
    type: String,
  },
  itemName: {
    type: String,
  },
  totalItems: {
    type: String,
  },
  wasteItem: {
    type: String,
  }, 
});

module.exports = mongoose.model("wastedItem", wastedItemSchema);*/

const mongoose = require("mongoose");
const AuthSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    /*cpassword: {
      type: String, 
      required: true,
    },*/
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", AuthSchema);

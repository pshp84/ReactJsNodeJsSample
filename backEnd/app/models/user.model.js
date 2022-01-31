const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 32,
    },
    lastName: {
      type: String,
      maxlength: 32,
    },
    emailId: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      maxlength: 32,
    },
    phoneNo: {
      type: Number,
      maxlength: 12,
    },
    role: {
      type: String,
    },
    /*purchases: {
      type: Array,
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },*/
  },
  {
    timestamps: true,
    required: true,
    trim: true,
  }
);

//UserSchema.path("emailId").validate(async (emailId) => {
//const emailIdCount = await mongoose.models.User.countDocuments({ emailId });
//return !emailIdCount;
//}, "Email already exists");

module.exports = mongoose.model("User", UserSchema);

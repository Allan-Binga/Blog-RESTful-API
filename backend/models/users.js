const mongoose = require("mongoose");

//USER SCHEMA
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: { type: String, default: "" },
    bio: {
      type: String,
      maxlength: 300, // Limit to 300 characters
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmpassword: { type: String },
  profileImagePath: {
    type: String,
    default: "",
  },
  wishlist: {
    type: Array,
    default: [],
  },
  triplist: {
    type: Array,
    default: [],
  },
});

const Users = new mongoose.model("Users", userSchema);

module.exports = Users;

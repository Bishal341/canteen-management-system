const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { required: true, type: String, trim: true},
  email: { required: true, type: String, unique: true, lowercase: true, trim: true},
  password: { required: true, type: String,},
  role: {type: String, enum: ["user", "admin", "staff"], default: "user"},
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
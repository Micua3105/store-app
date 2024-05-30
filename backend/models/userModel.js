const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email:{
    type: String,
    required: true
  },
  password: String,
  profilePic: String,
  role: String
}, {
  timestamps: true //createdAt, updatedAt
});

const userModel= mongoose.model("user", userSchema);

module.exports = userModel;
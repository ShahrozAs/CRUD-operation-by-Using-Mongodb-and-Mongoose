const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: Number,
  firstName: { type: String, required: true },
  lastName: { String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  token: String,
});

exports.User = mongoose.model("User", userSchema);

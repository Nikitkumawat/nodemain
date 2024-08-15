const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: Number,
  cart: [{ type: Schema.Types.ObjectId, ref: "product" }],
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
  token: String,
});

exports.user = mongoose.model("user", UserSchema);

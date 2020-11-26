const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  items: [],
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;

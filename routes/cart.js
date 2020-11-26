const express = require("express");
const mongoose = require("mongoose");

const Cart = require("../models/cart");

const router = express.Router();

router.post("/", (req, res, next) => {
  const items = req.body;
  console.log(items);

  cart = new Cart({
    _id: new mongoose.Types.ObjectId(),
    items: items,
  });
  cart
    .save()
    .then((doc) => {
      res.status(200).json({
        cart: doc,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Cart not saved.",
      });
    });
});

router.patch("/:cartID", (req, res, next) => {
  const id = req.params.cartID;
  const itemID = req.body.item;
  Cart.findById(id)
    .then((doc) => {
      console.log(doc);
      newItems = doc.items.filter((item) => item.itemID !== itemID);
      console.log(newItems);
      doc.items = newItems;
      doc.save();
      res.status(200).json({
        message: "Item removed from cart succesfully.",
        items: doc,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Cart not updated.",
      });
    });
});

router.get("/:cartID", (req, res, next) => {
  id = req.params.cartID;
  Cart.findById(id)
    .then((doc) => {
      res.status(200).json({
        cart: doc,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Cart not found.",
      });
    });
});

module.exports = router;

/**
 * @swagger
 *      components:
 *          schemas:
 *              Cart:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          description: Object ID
 *                      items:
 *                          type: array
 *                          items:
 *                              $ref: '#definitions/Items'
 */

/**
 * @swagger
 *
 * definitions:
 *   Items:
 *     type: object
 *     required:
 *       - itemID
 *       - quantity
 *     properties:
 *       itemID:
 *         type: string
 *       quantity:
 *         type: number
 *         format: int64
 *   ItemID:
 *     type: object
 *     required:
 *       - itemID
 *     properties:
 *       itemID:
 *         type: string
 */

/**
 * @swagger
 *  /cart/:
 *      post:
 *          summary: Creates a cart
 *          parameters:
 *            -  name: items
 *               description: Array of {itemID, quantity} type
 *               in: body
 *               schema:
 *                  type: array
 *                  items:
 *                      $ref: '#definitions/Items'
 *          responses:
 *              '200':
 *                  description: The created cart
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Cart'
 */
/**
 * @swagger
 *  /cart/{cartId}:
 *      patch:
 *          summary: Removes an item from a cart
 *          parameters:
 *            -  name: cartId
 *               description: ID of the cart to update
 *               in: path
 *               schema:
 *                  type: string
 *            -  name: itemID
 *               description: ID of the item to remove
 *               in: body
 *               schema:
 *                  type: object
 *                  $ref: '#definitions/ItemID'
 *          responses:
 *              '200':
 *                  description: The updated cart
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Cart'
 *      get:
 *          summary: Returns a cart detail
 *          parameters:
 *            -  name: cartId
 *               description: ID of the cart to get
 *               in: path
 *               schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: The selected cart
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Cart'
 *
 *
 *
 *
 *
 */

const express = require("express");
const mongoose = require("mongoose");

const Cart = require("../models/cart");
const auth = require("../auth");

const router = express.Router();

router.post("/", auth, (req, res, next) => {
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

router.patch("/:cartID", auth, (req, res, next) => {
  const id = req.params.cartID;
  const itemID = req.body.itemID;
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

router.get("/:cartID", auth, (req, res, next) => {
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

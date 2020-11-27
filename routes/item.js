/**
 * @swagger
 *     components:
 *       schemas:
 *            Item:
 *                type: object
 *                properties:
 *                    _id:
 *                        type: string
 *                        description: Object ID of the item
 *                    name:
 *                        type: string
 *                        description: Name
 *                    price:
 *                        type: number
 *                    description:
 *                        type: string
 *                    photo:
 *                        type: string
 *
 *
 */
/**
 * @swagger
 *  /items/:
 *      get:
 *          summary: Gets Items list paginated & sorted as per the request options
 *          parameters:
 *            -  name: page
 *               description: Page number of the Items list to get
 *               in: query
 *               schema:
 *                  type: string
 *            -  name: limit
 *               description: Number of Items per page to get
 *               in: query
 *               schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: The created cart
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schemas/Item'
 */

const express = require("express");
const mongoose = require("mongoose");

const Item = require("../models/item");
const auth = require("../auth");

const router = express.Router();

router.get("/", auth, (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    Item.find()
        .sort({
            price: 1,
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .then((docs) => {
            res.status(200).json({
                items: docs,
            });
        });
});
router.get("/:itemID", auth, (req, res, next) => {
    id = req.params.itemID;
    Item.findById(id)
        .then((doc) => {
            res.status(200).json({
                items: doc,
            });
        })
        .catch((error) => {
            res.status(404).json({
                message: "Item not found.",
            });
        });
});

router.post("/", auth, (req, res, next) => {
    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        photo: "./path/to/photo",
    });
    item
        .save()
        .then((doc) => {
            res.status(200).json({
                items: doc,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Item not saved.",
            });
        });
});

router.patch("/:itemID", auth, (req, res, next) => {
    const id = req.params.itemID;
    const attrs = {};
    for (const attr of req.body) {
        attrs[attr.attrName] = attr.value;
    }
    Item.update({
            _id: id,
        }, {
            $set: attrs,
        })
        .then((doc) => {
            res.status(200).json({
                message: "Item updated succesfully.",
                items: doc,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Item not updated.",
            });
        });
});

router.delete("/:itemID", auth, (req, res, next) => {
    const id = req.params.itemID;
    Item.remove({
            _id: id,
        })
        .then((result) => {
            res.status(200).json({
                message: "Item deleted succesfully.",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Item not deleted.",
            });
        });
});

module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            res.status(500).json({
                message: "Signup failed.",
            });
        } else {
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
            });
            user
                .save()
                .then((doc) => {
                    res.status(200).json({
                        cart: doc,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message: "Signup failed.",
                    });
                });
        }
    });
});

router.post("/signin", (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (error) {
                    res.status(500).json({
                        message: "Signin faild"
                    });
                } else {
                    const token = jwt.sign(user.email, "smple key");
                    res.status(200).json({
                        token: token,
                    });
                }
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Signup failed.",
            });
        });
});

module.exports = router;
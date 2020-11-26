const express = require("express");
const app = express();
const mongoose = require("mongoose");
const itemRouter = require('./routes/item');

mongoose
    .connect("mongodb://localhost:27017/gebeya", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => {
        console.log("DB connection failed, check it!");
    });

app.use('/items', itemRouter);

// Error message for all unsupported routes 
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
});

module.exports = app;
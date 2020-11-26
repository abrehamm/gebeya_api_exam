const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    description: String,
    photo: String
});

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
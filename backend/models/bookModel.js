const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    id:{ type: Number, required: true },
    name:{ type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image:{ type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

const Book = require('../models/bookModel');

const getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

module.exports = { getBooks };

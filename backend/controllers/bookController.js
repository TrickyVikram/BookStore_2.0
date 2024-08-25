const Book = require('../models/bookModel');

const getBooks = async (req, res) => {
    try {
   
        
        // Retrieve books with pagination
        const books = await Book.find();
        
        // Log each book (optional, for debugging)
    
        // Send response with books data
        res.json(books);
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error retrieving books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { getBooks };

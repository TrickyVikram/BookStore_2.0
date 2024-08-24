import React, { useState, useEffect } from 'react';
import { getBooks, purchaseBook } from '../api/api';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks()
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    }, []);

    const handlePurchase = async (bookId) => {
        try {
            await purchaseBook(bookId);
            alert('Book purchased successfully!');
        } catch (error) {
            console.error('Error purchasing book', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Book List</h2>
            <ul className="list-group">
                {books.map(book => (
                    <li key={book._id} className="list-group-item">
                        {book.title}{book.price} {book.title} {book.price}
                        <button 
                            className="btn btn-primary float-right"
                            onClick={() => handlePurchase(book._id)}
                        >
                            Purchase
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;


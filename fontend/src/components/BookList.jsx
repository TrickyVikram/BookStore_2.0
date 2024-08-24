import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect } from 'react';
import { getBooks, purchaseBook } from '../api/api';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [purchasedBookId, setPurchasedBookId] = useState(null);

    useEffect(() => {
        getBooks()
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    }, []);

    const handlePurchase = async (bookId) => {
        try {
            await purchaseBook(bookId);
            setPurchasedBookId(bookId);  // Set the purchased book's ID
            setTimeout(() => setPurchasedBookId(null), 3000);  // Hide message after 3 seconds
        } catch (error) {
            console.error('Error purchasing book', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Book List</h2>
            <div className="row">
                {books.map(book => (
                    <div key={book._id} className="col-md-4 mb-4">
                        <div className="card h-100 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                            <figure>
                                <img src={book.image} alt="Book" className="card-img" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {book.name}
                                    <div className="">{book.category}</div>
                                </h2>
                                <p>{book.title}</p>
                                <div className="">${book.price}</div>
                                <div className="card-actions mt-3">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => handlePurchase(book._id)}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                                {purchasedBookId === book._id && (
                                    <div className="alert alert-success mt-3" role="alert">
                                        Book purchased successfully!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;

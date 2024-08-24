// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import 'animate.css/animate.min.css';

import React, { useState, useEffect } from 'react';
import { getBooks, purchaseBook } from '../api/api';

const Paid = () => {
    const [books, setBooks] = useState([]);
    const [purchasedBookId, setPurchasedBookId] = useState(null);

    useEffect(() => {
        getBooks()
            .then(response => {
                console.log(response.data); // Debug: Check API response
                setBooks(response.data);
            })
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handlePurchase = async (bookId) => {
        try {
            await purchaseBook(bookId);
            setPurchasedBookId(bookId);  // Set the purchased book's ID
            setTimeout(() => setPurchasedBookId(null), 3000);  // Hide message after 3 seconds
        } catch (error) {
            console.error('Error purchasing book:', error);
        }
    };

    const filterData = books.filter((item) => item.category === "Paid");

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Book List</h2>
            <div className="row">
                {filterData.length === 0 ? (
                    <div className="col-12 text-center">
                        <p>No books available in the "Paid" category.</p>
                    </div>
                ) : (
                    filterData.map(book => (
                        <div key={book._id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-lg border-0 transform hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 rounded-lg overflow-hidden">
                                <figure className="m-0">
                                    <img 
                                        src={book.image} 
                                        alt={book.name} 
                                        className="card-img-top transition-transform duration-300 hover:scale-110" 
                                        style={{ height: '300px', objectFit: 'cover', border: '1px solid red' }} // Debug: Add border for visibility
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h5 className="card-title text-truncate">
                                        {book.name}
                                        <span className="badge badge-pill badge-secondary ml-2">{book.category}</span>
                                    </h5>
                                    <p className="card-text text-muted">{book.title}</p>
                                    <div className="mb-3 font-weight-bold">${book.price}</div>
                                    <div className="card-actions mt-3">
                                        <button
                                            className="btn btn-primary btn-block"
                                            onClick={() => handlePurchase(book._id)}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                    {purchasedBookId === book._id && (
                                        <div className="alert alert-success mt-3 animate__animated animate__fadeIn" role="alert">
                                            Book purchased successfully!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Paid;

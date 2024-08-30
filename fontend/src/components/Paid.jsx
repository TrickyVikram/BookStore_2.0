import 'animate.css/animate.min.css';
import React, { useState, useEffect } from 'react';
import { getBooks, purchaseBook } from '../api/api';
import Notification from './notification/Notification';

const Paid = () => {
    const [books, setBooks] = useState([]);
    const [purchasedBookId, setPurchasedBookId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data);
                // Initialize filteredBooks with "Paid" category
                setFilteredBooks(response.data.filter((item) => item.category === "Paid"));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const filtered = books
            .filter((item) => item.category === "Paid")
            .filter(book =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

        setFilteredBooks(filtered);
    }, [searchQuery, books]);

    const handlePurchase = async (bookId) => {
        try {
            await purchaseBook(bookId);
            setPurchasedBookId(bookId);
            setShowNotification(true);
            setTimeout(() => {
                setPurchasedBookId(null) ;
                setShowNotification(false);
             }, 3000);
        } catch (error) {
            console.error('Error purchasing book:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Book List</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="row">
                {filteredBooks.length === 0 ? (
                    <div className="col-12 text-center">
                        <p>No books available in the "Paid" category matching your search. plz type : Name or Tital  </p>
                    </div>
                ) : (
                    filteredBooks.map(book => (
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
                                    {showNotification && <Notification />}
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

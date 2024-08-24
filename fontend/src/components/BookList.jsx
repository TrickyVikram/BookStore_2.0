import 'animate.css/animate.min.css';
import React, { useState, useEffect } from 'react';
import { getBooks, purchaseBook } from '../api/api';

let localData = [
    {
        "name": "The Alchemist",
        "title": "The Alchemist follows the journey of an Andalusian shepherd",
        "category": "Free",
        "price": 0,
        "image": "https://images.unsplash.com/photo-1606782866255-1b0b7f1d0b0e"
    },
    {
        "name": "The Alchemist",
        "title": "The Alchemist follows the journey of an Andalusian shepherd",
        "category": "Free",
        "price": 100,
        "image": "https://images.unsplash.com/photo-1606782866255-1b0b7f1d0b0e"
    }
];

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [purchasedBookId, setPurchasedBookId] = useState(null);
    const [filterData, setFilterData] = useState(localData.filter((item) => item.category === "Free"));

    useEffect(() => {
        getBooks()
            .then(response => {
                setBooks(response.data);
                setFilterData(response.data.filter((item) => item.category === "Free"));
            })
            .catch(error => console.error(error));
    }, []);

    const handlePurchase = async (bookId) => {
        try {
            await purchaseBook(bookId);
            setPurchasedBookId(bookId);
            setTimeout(() => setPurchasedBookId(null), 3000);
        } catch (error) {
            console.error('Error purchasing book', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Book List</h2>
            <div className="row">
                {filterData.map(book => (
                    <div key={book._id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-lg border-0 transform hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 rounded-lg overflow-hidden">
                            <figure className="m-0">
                                <img 
                                    src={book.image} 
                                    alt="Book" 
                                    className="card-img-top transition-transform duration-300 hover:scale-110" 
                                    style={{ height: '300px', objectFit: 'cover' }} 
                                />
                            </figure>
                            <div className="card-body p-4">
                                <h5 className="card-title text-truncate">
                                    {book.name}
                                    <span className="badge badge-pill badge-secondary ml-2">{book.category}</span>
                                </h5>
                                <p className="card-text text-muted">{book.title}</p>
                                <div className="mb-3 font-weight-bold">${book.price}</div>
                                {purchasedBookId === book._id && (
                                    <div className="alert alert-success mt-3 animate__animated animate__fadeIn" role="alert">
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

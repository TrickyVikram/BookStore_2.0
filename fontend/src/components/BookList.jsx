import 'animate.css/animate.min.css';
import React, { useState, useEffect } from 'react';
import { getBooks, purchaseBook } from '../api/api';

let localData = [
    {
        "id": "1",
        "title": "The Adventures of Captain Comet",
        "name": "Science Fiction",
        "price": 11,
        "category": "Free",
        "image": "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1722311756~exp=1722315356~hmac=d7bb0fb4f59fdfb76d1eef9ff64f2a0abf390427e0e6b2b9d6b1acfae22027c5&w=740"
    },
    {
        "id": "2",
        "title": "The Secret Garden",
        "name": "Fantasy",
        "price": 6,
        "category": "Free",
        "image": "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1722311756~exp=1722315356~hmac=d7bb0fb4f59fdfb76d1eef9ff64f2a0abf390427e0e6b2b9d6b1acfae22027c5&w=740"
    },
    {
        "id": "3",
        "title": "Mastering the Art of French Cooking",
        "name": "Cooking",
        "price": 25,
        "category": "Free",
        "image": "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1722311756~exp=1722315356~hmac=d7bb0fb4f59fdfb76d1eef9ff64f2a0abf390427e0e6b2b9d6b1acfae22027c5&w=740"
    },
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

    // const handlePurchase = async (bookId) => {
    //     try {
    //         await purchaseBook(bookId);
    //         setPurchasedBookId(bookId);
    //         setTimeout(() => setPurchasedBookId(null), 3000);
    //     } catch (error) {
    //         console.error('Error purchasing book', error);
    //     }
    // };

    const handleBooksView = (bookId) => {
        if (bookId) {
            alert(`View book with id: ${bookId}`);
        } else {
            alert('Book ID is undefined.');
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

                                <div className="card-actions mt-3">
                                    <button
                                        className="btn btn-primary m-2 btn-block"
                                        onClick={() => handleBooksView(book.id)}
                                    >
                                        View
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;

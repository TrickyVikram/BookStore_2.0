import 'animate.css/animate.min.css';
import React, { useState, useEffect } from 'react';
import { getBooks } from '../api/api';
import useAuth from '../hooks/useAuth';  // Custom hook to determine authentication status

const localData = [
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
        "title": "The Secret Computer",
        "name": "Computer",
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
    const [searchQuery, setSearchQuery] = useState('');
    const [filterData, setFilterData] = useState([]);
    const { isAuthenticated } = useAuth();  // Use custom hook or context to check authentication

    useEffect(() => {
        getBooks()
            .then(response => {
                setBooks(response.data);
                filterBooks(response.data);
            })
            .catch(error => {
                console.error(error);
                // Use localData as a fallback
                setBooks(localData);
                filterBooks(localData);
            });
    }, []);

    useEffect(() => {
        filterBooks(books);
    }, [searchQuery, books, isAuthenticated]);

    const filterBooks = (booksData) => {
        let filteredBooks;
        if (isAuthenticated) {
            filteredBooks = booksData;
        } else {
            filteredBooks = booksData.filter(book => book.category === "Free");
        }
        const searchFilteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilterData(searchFilteredBooks);
    };

    const handleBooksDownload = (bookId) => {
        if (bookId) {
            console.log('Download book with id:', bookId);
            alert(`Download book with id: ${bookId}`);
        } else {
            alert('Book ID is undefined.');
        }
    };

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
                {filterData.length === 0 ? (
                    <div className="col-12 text-center">
                        <p>No books available matching your search criteria. Please try typing a different name or title.</p>
                    </div>
                ) : (
                    filterData.map(book => (
                        <div key={book.id} className="col-md-4 mb-4">
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
                                    <p className=""><span className="badge rounded-pill text-bg-info">{book.title || 'No Title'}</span></p>
                                    <span className="card-text text-muted">{book.category}</span>
                                    <div className="card-actions mt-3">
                                        {/* {isAuthenticated && ( */}
                                            <>
                                                <button
                                                    className="btn btn-primary m-2 btn-block"
                                                    onClick={() => handleBooksView(book.id)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="btn btn-primary btn-block"
                                                    onClick={() => handleBooksDownload(book.id)}
                                                >
                                                    Download Book
                                                </button>
                                            </>
                                        {/* )} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookList;

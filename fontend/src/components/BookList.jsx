import 'animate.css/animate.min.css';
import React, { useState, useEffect } from 'react';
import { getBooks } from '../api/api';
import useAuth from '../hooks/useAuth';  // Custom hook to determine authentication status
import 'react-circular-progressbar/dist/styles.css'; // Import the styles

const localData = [
    // Sample local data
    {
        "topic": "mathematic",
        "books": {
            "math1": {
                "id": "1",
                "title": "Higher Education 12th Books",
                "name": "RS Aggarwal",
                "price": 350,
                "category": "Paid",
                "view": "https://ncert.nic.in/textbook/pdf/lekl126.pdf",
                "dwnd": "https://ncert.nic.in/textbook/pdf/lekl126.pdf",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUifnYjBMF6BemkUoGGN1SJ4smV3Aj1yrSSQ&s"
            },
            "math2": {
                "id": "2",
                "title": "Basic Mathematics",
                "name": "John Doe",
                "price": 200,
                "category": "Free",
                "view": "https://example.com/view",
                "dwnd": "https://example.com/download",
                "image": "https://example.com/image.jpg"
            }
            // Add more sample books here
        }
    }
    // Add more topics and books as needed
];

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading
    const { isAuthenticated } = useAuth();  // Use custom hook or context to check authentication

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                if (response.data && Array.isArray(response.data)) {
                    const topicArray = response.data.map(item => ({
                        topic: item.topic,
                        books: Object.keys(item.books).map(key => ({
                            id: key,
                            ...item.books[key]
                        }))
                    }));
                    setBooks(topicArray.flatMap(topic => topic.books));
                } else {
                    console.error('Invalid response format:', response.data);
                    setBooks(localData.flatMap(topic => topic.books)); // Use local data as fallback
                }
                setLoading(false); // Data loaded, stop loading
            } catch (error) {
                console.error('Error fetching books:', error);
                setBooks(localData.flatMap(topic => topic.books)); // Use local data as fallback
                setLoading(false); // Data loaded, stop loading
            }
        };

        fetchBooks();
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
            {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                filterData.length === 0 ? (
                    <div className="text-center">
                        <p>No books available matching your search criteria. Please try typing a different name or title.</p>
                    </div>
                ) : (
                    <div className="row">
                        {filterData.map(book => (
                            <div key={book.id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-lg border-0 transform hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 rounded-lg overflow-hidden">
                                    <figure className="m-0">
                                        <img
                                            src={book.image}
                                            alt={book.name}
                                            className="card-img-top transition-transform duration-300 hover:scale-110"
                                            style={{ height: '300px', objectFit: 'cover' }}
                                        />
                                    </figure>
                                    <div className="card-body p-4">
                                        <h5 className="card-title text-truncate">
                                            {book.name}
                                        </h5>
                                        <p><span className="badge rounded-pill text-bg-info">{book.title || 'No Title'}</span></p>
                                        <span className="card-text text-muted">{book.category}</span>
                                        <div className="card-actions mt-3">
                                            <a
                                                className="btn btn-primary m-2 btn-block"
                                                target="_blank"
                                                href={book.view}
                                                rel="noopener noreferrer"
                                            >
                                                View
                                            </a>
                                            <a
                                                className="btn btn-primary btn-block"
                                                target="_blank"
                                                href={book.dwnd}
                                                rel="noopener noreferrer"
                                            >
                                                Download Book
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default BookList;

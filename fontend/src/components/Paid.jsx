import 'animate.css/animate.min.css';
import React, { useState, useEffect } from 'react';
import { getBooks, purchaseBook } from '../api/api'; // Ensure purchaseBook is imported
import useAuth from '../hooks/useAuth';  // Custom hook to determine authentication status
import 'react-circular-progressbar/dist/styles.css'; // Import the styles
import Notification from './notification/Notification';

const Paid = () => {
    const [books, setBooks] = useState([]);
    const [purchasedBookId, setPurchasedBookId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [loading, setLoading] = useState(true);
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
                    const paidBooks = topicArray.flatMap(topic => topic.books).filter(book => book.category === "Paid");
                    setBooks(paidBooks);
                } else {
                    console.error('Invalid response format:', response.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const filtered = books
            .filter(book =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

        setFilteredBooks(filtered);
    }, [searchQuery, books]);

    const handlePurchase = async (bookId) => {
    
        try {
            console.log('Sending purchase request for bookId:', bookId);
            const response = await purchaseBook(bookId);
            console.log('Purchase response:', response);
          
            if (response.status === 200) {  // Check for successful response
                setPurchasedBookId(bookId);
                setShowNotification(true);
                setTimeout(() => {
                    setPurchasedBookId(null);
                    setShowNotification(false);
                }, 3000);
            } else {
                console.error('Purchase failed:', response.data);
        
            }
        } catch (error) {
            console.error('Error purchasing book:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Paid Books</h2>
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
                filteredBooks.length === 0 ? (
                    <div className="text-center">
                        <p>No books available in the "Paid" category matching your search. Please try typing a different name or title.</p>
                    </div>
                ) : (
                    <div className="row">
                        {filteredBooks.map(book => (
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
                                        <div className="mb-3 font-weight-bold">${book.price}</div>
                                        <div className="card-actions mt-3">
                                            <button
                                                className="btn btn-success btn-block mt-2"
                                                onClick={() => handlePurchase(book.id)}
                                            >
                                                Buy Now
                                            </button>
                                        </div>
                                        {purchasedBookId === book.id && (
                                            <div className="alert alert-success mt-3 animate__animated animate__fadeIn" role="alert">
                                                Book purchased successfully!
                                            </div>
                                        )}
                                        {showNotification && <Notification />}
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

export default Paid;

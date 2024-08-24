import React, { useState, useEffect } from 'react';
import { getProfile } from '../api/api';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getProfile()
            .then(response => {
                console.log('Profile data:', response.data); // Log profile data
                setProfile(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleBooksView = (bookId) => {
        if (bookId) {
            alert(`View book with id: ${bookId}`);
            
        } else {
            alert('Book ID is undefined.');
        }
    };

    const handleBooksDownload = (bookId) => {
        if (bookId) {
            console.log('Download book with id:', bookId);
            alert(`Download book with id: ${bookId}`);
        } else {
            alert('Book ID is undefined.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User Profile</h2>
            {profile ? (
                <div className="row">
                    {/* Profile Info */}
                    <div className="col-md-4">
                        <div className="card shadow-lg p-3 mb-5 bg-white rounded text-center dark:bg-gray-800 dark:text-white">
                            <div className="card-body">
                                <h4 className="card-title mb-3">{profile.name}</h4>
                                <p><strong>Email:</strong> {profile.email}</p>
                                <p><strong>Phone:</strong> {profile.phone}</p>
                                <p><strong>Address:</strong> {profile.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Purchased Books */}
                    <div className="col-md-8">
                        <h4 className="mb-4">Purchased Books</h4>
                        <div className="row">
                            {profile.purchaseBooks && profile.purchaseBooks.length > 0 ? (
                                profile.purchaseBooks.map(book => {
                                    console.log('Book data:', book); // Log each book's data
                                    return (
                                        <div key={book.id} className="col-md-6 mb-4">
                                            <div className="card h-100 shadow-lg bg-white rounded dark:bg-gray-800 dark:text-white">
                                                <figure>
                                                    <img
                                                        src={book.image || 'https://via.placeholder.com/150'}
                                                        alt={book.title}
                                                        className="card-img-top"
                                                    />
                                                </figure>
                                                <div className="card-body">
                                                    <h5 className="card-title">{book.title}</h5>
                                                    <p className="card-text">{book.name}</p>
                                                    <div className="text-right">
                                                        <h6>${book.price}</h6>
                                                    </div>
                                                    <div className="card-actions mt-3">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No books purchased yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;

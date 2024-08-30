import React, { useState, useEffect } from 'react';
import { getProfile } from '../api/api';  // Ensure this is the correct API import
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import EditProfile from './EditProfile';  // Import the EditProfile component

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await getProfile(token);

                setProfile(response.data);
                
                
            } catch (error) {
                console.error('Error fetching profile:', error);
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleBooksView = (bookId) => {
        if (bookId) {
            // navigate to book details page
        } else {
            alert('Book ID is undefined.');
        }
    };

    const handleBooksDownload = (bookId) => {
        if (bookId) {
            console.log('Initiating download for book with id:', bookId);
        } else {
            alert('Book ID is undefined.');
        }
    };

    const handleEditProfile = (updatedProfile) => {
        setProfile(prevState => ({ ...prevState, ...updatedProfile }));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User Profile</h2>

            {profile ? (
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-lg p-4 mb-5 bg-white rounded text-center">
                            <div className="card-body">
                                <img
                                    src={ `http://localhost:3000/${profile.image}` || 'https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png'}
                                    alt={profile.name}
                                    className="rounded-circle"
                                    style={{ height: '150px', objectFit: 'cover', marginBottom: '20px' }}
                                />
                                <h4 className="card-title mb-4">{profile.name}</h4>
                                <ul className="list-unstyled text-left">
                                    <li className="mb-3">
                                        <i className="fas fa-envelope fa-lg mr-3"></i>
                                        <strong>Email:</strong> {profile.email}
                                    </li>
                                    <li className="mb-3">
                                        <i className="fas fa-phone fa-lg mr-3"></i>
                                        <strong>Phone:</strong> {profile.phone || '123-456-7890'}
                                    </li>
                                    <li className="mb-3">
                                        <i className="fas fa-map-marker-alt fa-lg mr-3"></i>
                                        <strong>Address:</strong> {profile.address || 'India'}
                                    </li>
                                </ul>
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowEditModal(true)}
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <h4 className="mb-4">Purchased Books</h4>
                        <div className="row">
                            {profile.purchaseBooks && profile.purchaseBooks.length > 0 ? (
                                profile.purchaseBooks.map(book => (
                                    <div key={book._id} className="col-md-6 mb-4">
                                        <div className="card h-100 shadow-lg bg-white rounded">
                                            <figure>
                                                <img
                                                    src={book.image || "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg"}
                                                    alt={book.title || 'Book Image'}
                                                    className="card-img-top mx-auto"
                                                    style={{ height: '300px', objectFit: 'cover' }}
                                                />
                                            </figure>
                                            <div className="card-body">
                                                <p className=""><span className="badge rounded-pill text-bg-info">{book.title || 'No Title'}</span></p>
                                                <p className=""><span className="badge rounded-pill text-bg-info">{book.name || 'No Name'}</span></p>
                                                <div className="text-right">
                                                    <span className="badge rounded-pill text-bg-info">${book.price || '0.00'}</span>
                                                </div>
                                                <div className="card-actions mt-3">
                                                    <button
                                                        className="btn btn-primary m-2 btn-block"
                                                        onClick={() => handleBooksView(book._id)}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        className="btn btn-primary btn-block"
                                                        onClick={() => handleBooksDownload(book._id)}
                                                    >
                                                        Download
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center">
                                    <h5>No purchased books available.</h5>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p>Loading profile...</p>
                </div>
            )}

            <EditProfile
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                profile={profile}
                onProfileUpdate={handleEditProfile}
            />
        </div>
    );
};

export default Profile;

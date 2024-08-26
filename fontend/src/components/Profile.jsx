import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', phone: '', address: '', image: '' });
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
                setEditForm({
                    name: response.data.name || '',
                    phone: response.data.phone || '',
                    address: response.data.address || '',
                    image: response.data.image || '',
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleBooksView = (bookId) => {
        if (bookId) {
            // navigate(`/books/${bookId}`);
        } else {
            alert('Book ID is undefined.');
        }
    };

    const handleBooksDownload = (bookId) => {
        if (bookId) {
            console.log('Initiating download for book with id:', bookId);
            // alert(`Download functionality for book with id: ${bookId} is not yet implemented.`);
        } else {
            alert('Book ID is undefined.');
        }
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(editForm);
            setProfile(prevState => ({ ...prevState, ...editForm }));
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User Profile</h2>

            {profile ? (
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-lg p-4 mb-5 bg-white rounded text-center dark:bg-gray-800 dark:text-white">
                            <div className="card-body">
                                <img
                                    src={profile.image || 'https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png'}
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
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowEditModal(true)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        <h4 className="mb-4">Purchased Books</h4>
                        <div className="row">
                            {profile.purchaseBooks && profile.purchaseBooks.length > 0 ? (
                                profile.purchaseBooks.map(book => (
                                    <div key={book._id} className="col-md-6 mb-4">
                                        <div className="card h-100 shadow-lg bg-white rounded dark:bg-gray-800 dark:text-white">
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
                                                        Download Book
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
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

            {/* Edit Profile Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleEditFormChange}
                                placeholder="Enter your name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={editForm.phone}
                                onChange={handleEditFormChange}
                                placeholder="Enter your phone number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={editForm.address}
                                onChange={handleEditFormChange}
                                placeholder="Enter your address"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={editForm.image}
                                onChange={handleEditFormChange}
                                placeholder="Enter your image URL"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Profile;

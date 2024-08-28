import React, { useState, useEffect, useCallback } from 'react';
import { updateProfile } from '../api/api';  // Ensure this is the correct API import
import { Button, Form, Modal, Alert } from 'react-bootstrap';

const EditProfile = ({ show, onClose, profile, onProfileUpdate }) => {
    const [editForm, setEditForm] = useState({ name: '', phone: '', address: '', image: null });
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (profile) {
            setEditForm({
                name: profile.name || '',
                phone: profile.phone || '',
                address: profile.address || '',
                image: null,
            });
            setImagePreview(profile.image || '');
        }
    }, [profile]);

    const handleEditFormChange = useCallback((e) => {
        const { name, value } = e.target;
        setEditForm(prevState => ({ ...prevState, [name]: value }));
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            setEditForm(prevState => ({ ...prevState, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    }, []);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append('name', editForm.name);
        formData.append('phone', editForm.phone);
        formData.append('address', editForm.address);
        if (editForm.image) {
            formData.append('image', editForm.image);
        }

        try {
            const response = await updateProfile(formData);
            onProfileUpdate(response.data);
            onClose();
        } catch (error) {
            console.error('API error:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Error updating profile. Please try again.');
        }
    };

    const handleClose = () => {
        setEditForm({ name: '', phone: '', address: '', image: null });
        setImagePreview('');
        setError(null);
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
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
                    {/* <Form.Group className="mb-3" controlId="formImage">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                        />
                        {imagePreview && (
                            <div className="mt-3">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="img-fluid"
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfile;

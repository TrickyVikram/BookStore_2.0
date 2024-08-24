import React, { useState, useEffect } from 'react';
import { getProfile } from '../api/api';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getProfile()
            .then(response => setProfile(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container mt-5">
            <h2>User Profile</h2>
            {profile ? (
                <div>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Address:</strong> {profile.address}</p>
                    <h3>Purchased Books</h3>
                    <ul className="list-group">
                        {profile.purchaseBooks && profile.purchaseBooks.map(book => (
                            <li key={book._id} className="list-group-item">
                                <strong>{book.title}</strong> - ${book.price} ({book.category})
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;

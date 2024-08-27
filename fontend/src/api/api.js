import axios from 'axios';

const API = axios.create({
    baseURL:'http://localhost:4500/api/',
    // baseURL: 'https://bookstore-2-0.onrender.com/api/',
    headers: { 'Content-Type': 'application/json' },
});

export const register = (data) => API.post('/users/register', data);
export const login = (data) => API.post('/users/login', data);
export const getProfile = () => API.get('/users/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const purchaseBook = (bookId) => API.post('/users/purchase', { bookId }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const getBooks = () => API.get('/books');
export const getBook = (id) => API.get(`/books/${id}`);
export const logout = () => {
    localStorage.removeItem('token');
};

// Function to update user profile
export const updateProfile = async (formData) => {
    try {
        const response = await API.put('/users/update', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return  response.data
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error; // Optional: re-throw the error to handle it in the calling code
    }
};




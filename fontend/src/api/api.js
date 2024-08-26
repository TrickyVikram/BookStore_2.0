import axios from 'axios';

const API = axios.create({
    // baseURL: 'http://localhost:4500/api',
    baseURL: 'https://bookstore-2-0.onrender.com/api/',
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

export const getBookById = (id) => {
    return axios.get(`/api/books/${id}`);
};

export const updateProfile = async (profileData) => {
    alert(profileData)
    const response = await axios.put(`${API}/users/update`, profileData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};
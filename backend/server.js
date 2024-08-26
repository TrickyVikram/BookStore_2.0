const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { protect } = require('./middleware/authMiddleware');
const axios = require('axios');  // Adding axios to make the automatic request



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    connectTimeoutMS: 30000 
}).then(() => console.log('MongoDB connected')).catch((err) => console.error(err));

app.use('/api/books', (req, res, next) => {
    console.log("Books API hit");
    next();
}, bookRoutes);

app.use('/api/users', (req, res, next) => {
    console.log("Users API hit");
    next();
}, authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API works' });
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Automatic request to the server every 100ms
    // setInterval(() => {
    //     axios.get(`http://localhost:${PORT}/`)
    //         .then(response => {
    //         })
    //         .catch(error => {
    //             console.error("Error in automatic call:", error.message);
    //         });
    // }, 100);  
});

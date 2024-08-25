const express = require('express');
const { registerUser, loginUser, getUserProfile, purchaseBook, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/purchase', protect, purchaseBook);
router.put('/update', protect, updateUserProfile);  // New route for updating profile

module.exports = router;

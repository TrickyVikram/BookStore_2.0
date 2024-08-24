const express = require('express');
const { getBooks } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);

module.exports = router;

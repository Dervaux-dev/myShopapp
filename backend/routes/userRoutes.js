const express = require('express');
const router = express.Router();
// Import-inga ya function neza ukoresheje amadukubo { }
const { loginUser } = require('../controller/userController');

// Iyo umuntu akoze POST kuri /login, ihamagara loginUser
router.post('/login', loginUser);

module.exports = router;
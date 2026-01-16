const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
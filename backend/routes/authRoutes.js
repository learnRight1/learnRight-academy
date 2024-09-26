const express = require('express');
const authController = require('../controllers/authController'); // Ensure the path is correct

const router = express.Router();

// Log the imported controller to ensure it's defined correctly
console.log(authController);

// Registration Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

// Export the router
module.exports = router;

// backend/routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController'); // User controller for logic
const authMiddleware = require('../middleware/authMiddleware'); // Auth middleware to secure routes
const router = express.Router();

// Route to register a new user
router.post('/register', userController.register);

// Route to login a user
router.post('/login', userController.login);

// Route to get a user's profile (protected route)
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

// Route to update user's profile (protected route)
router.put(
  '/profile',
  authMiddleware.verifyToken,
  userController.updateProfile
);

// Export the router
module.exports = router;

// const express = require('express');
// const userController = require('../controllers/userController'); // User controller for logic
// const authMiddleware = require('../middleware/authMiddleware'); // Auth middleware to secure routes
// const router = express.Router();

// // Route to register a new user
// router.post('/register', userController.register);

// // Route to login a user
// router.post('/login', userController.login);

// // Route to get a user's profile (protected route)
// router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

// // Route to update user's profile (protected route)
// router.put(
//   '/profile',
//   authMiddleware.verifyToken,
//   userController.updateProfile
// );

// // Route to delete a user (protected route)
// router.delete('/:id', authMiddleware.verifyToken, userController.deleteUser);

// module.exports = router;

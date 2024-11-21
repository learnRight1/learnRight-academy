const express = require('express');
const enrollmentController = require('../controllers/enrollmentController'); // Enrollment controller for logic
const authMiddleware = require('../middleware/authMiddleware'); // Auth middleware to secure routes
const router = express.Router();

// Route to enroll a user in a course (protected)
router.post(
  '/enroll',
  authMiddleware.verifyToken,
  enrollmentController.enrollUser
);

// Route to get all enrollments for a user (protected)
router.get(
  '/enrollments',
  authMiddleware.verifyToken,
  enrollmentController.getUserEnrollments
);

// Route to remove a user's enrollment from a course (protected)
router.delete(
  '/enroll/:id',
  authMiddleware.verifyToken,
  enrollmentController.removeEnrollment
);

module.exports = router;

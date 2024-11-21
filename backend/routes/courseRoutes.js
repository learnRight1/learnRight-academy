const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware.verifyToken, courseController.createCourse);
router.get('/', authMiddleware.verifyToken, courseController.getCourses);

module.exports = router;

// const express = require('express');
// const courseController = require('../controllers/courseController'); // Course controller for logic
// const authMiddleware = require('../middleware/authMiddleware'); // Auth middleware to secure routes
// const router = express.Router();

// // Route to create a new course (protected)
// router.post('/', authMiddleware.verifyToken, courseController.createCourse);

// // Route to get all courses (protected)
// router.get('/', authMiddleware.verifyToken, courseController.getCourses);

// // Route to get a specific course by ID (protected)
// router.get('/:id', authMiddleware.verifyToken, courseController.getCourseById);

// // Route to update a course (protected)
// router.put('/:id', authMiddleware.verifyToken, courseController.updateCourse);

// // Route to delete a course (protected)
// router.delete(
//   '/:id',
//   authMiddleware.verifyToken,
//   courseController.deleteCourse
// );

// module.exports = router;

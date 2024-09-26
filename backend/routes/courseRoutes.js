const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware.verifyToken, courseController.createCourse);
router.get('/', authMiddleware.verifyToken, courseController.getCourses);

module.exports = router;

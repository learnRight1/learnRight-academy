const Course = require('../models/Course');

// Create Course
exports.createCourse = async (req, res) => {
  const { title, description, duration, level } = req.body;

  // Validate input
  if (
    !title ||
    !description ||
    !duration ||
    !level ||
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof duration !== 'number' ||
    typeof level !== 'string'
  ) {
    return res.status(400).json({
      message: 'Valid title, description, duration, and level are required.',
    });
  }

  if (title.length > 255 || level.length > 255) {
    return res.status(400).json({
      message: 'Title and level cannot exceed 255 characters.',
    });
  }

  try {
    // Create a new course
    const result = await Course.create({ title, description, duration, level });

    res.status(201).json({
      message: 'Course created successfully!',
      courseId: result.insertId,
    });
  } catch (error) {
    console.error('Error creating course:', error.message);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Course title already exists.' });
    }

    res.status(500).json({
      message: 'An error occurred while creating the course. Please try again.',
    });
  }
};

// Get All Courses
exports.getCourses = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Fetch courses with pagination
    const courses = await Course.findAll(limit, offset);
    const totalCourses = await Course.count();

    if (courses.length === 0) {
      return res.status(404).json({ message: 'No courses found.' });
    }

    res.status(200).json({
      courses,
      page: parseInt(page),
      limit: parseInt(limit),
      totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
    });
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ message: 'Error fetching courses.' });
  }
};

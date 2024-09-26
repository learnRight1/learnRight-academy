exports.createCourse = (req, res) => {
  const { title, description } = req.body;

  // Check if title and description are provided
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: 'Title and description are required' });
  }

  db.query(
    'INSERT INTO courses (title, description) VALUES (?, ?)',
    [title, description],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({
        message: 'Course created successfully!',
        courseId: results.insertId,
      });
    }
  );
};

exports.getCourses = (req, res) => {
  db.query('SELECT * FROM courses', (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

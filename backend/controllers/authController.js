const bcrypt = require('bcryptjs');
const db = require('../db'); // Adjust path as necessary

// Helper function to handle database queries
const queryDatabase = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Registration function
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate the input
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide name, email, and password.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user in the database

    await queryDatabase(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error); // Log the error
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate the input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email and password.' });
  }

  try {
    const results = await queryDatabase(
      'SELECT id, name, email, password, created_at FROM users WHERE email = ?',
      [email]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Exclude password from the response
    const { password: _, ...userData } = user; // Destructure to remove password

    res.status(200).json({ message: 'Login successful!', user: userData });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Error processing request.' });
  }
};

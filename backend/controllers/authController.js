const bcrypt = require('bcryptjs');
const db = require('../db/db'); // Database connection
const jwt = require('jsonwebtoken');
const {
  createUser,
  getUserByEmail,
  getUserForLogin,
} = require('../models/User'); // Ensure proper relative path

// Helper function to handle database queries
const queryDatabase = async (query, params) => {
  try {
    const [results] = await db.query(query, params);
    return results;
  } catch (err) {
    console.error(`Database Query Error: ${err.message}`);
    throw new Error('Database query failed.');
  }
};

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Full name, email, and password are required.' });
  }

  try {
    // Check if the email already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await createUser({ fullName, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error); // Log the actual error
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Fetching user for login...');
    const user = await getUserForLogin(email);

    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Checking password...');
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log('Generating token...');
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login successful!');
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};

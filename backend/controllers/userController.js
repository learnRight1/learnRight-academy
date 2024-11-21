// backend/controllers/userController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with the user data
    res.status(201).json({
      message: 'User registered successfully',
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with the token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get user profile (protected route)
exports.getProfile = async (req, res) => {
  try {
    // Find the user by ID from the decoded token
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user profile
    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update user profile (protected route)
exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.userId;

    // Find and update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the updated profile
    res.status(200).json({
      message: 'Profile updated successfully',
      user: { username: updatedUser.username, email: updatedUser.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating profile', error: error.message });
  }
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  // Logic to delete user from the database
  // For example, if you have a User model:
  User.destroy({ where: { id: userId } })
    .then(() => {
      res.status(200).json({ message: 'User deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error deleting user', error });
    });
};

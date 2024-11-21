// models/User.js
const db = require('../db/db'); // Import your database connection
const bcrypt = require('bcryptjs');

// Helper function to handle database queries
const queryDatabase = async (query, params) => {
  try {
    const [rows] = await db.query(query, params); // Destructuring to get rows
    return rows;
  } catch (err) {
    throw new Error(err.message); // Throwing an error will allow centralized error handling
  }
};

// Model for user registration
const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  await queryDatabase(query, [name, email, hashedPassword]);
};

// Model for checking if a user already exists by email
const getUserByEmail = async email => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const rows = await queryDatabase(query, [email]);
  return rows.length > 0 ? rows[0] : null;
};

// Model for getting user by email (for login)
const getUserForLogin = async email => {
  const query = 'SELECT id, name, email, password FROM users WHERE email = ?';
  const rows = await queryDatabase(query, [email]);
  return rows.length > 0 ? rows[0] : null;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserForLogin,
};

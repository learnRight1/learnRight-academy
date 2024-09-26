const express = require('express');
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(cors()); // Handles cross-origin requests

// Authentication routes
app.use('/api/auth', authRoutes); // All routes from authRoutes will be prefixed with /api/auth

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const courseRoutes = require('./routes/courseRoutes'); // Course routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes

const authMiddleware = require('./middleware/authMiddleware');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes); // Mount auth routes on /api/auth

app.use('/api/users', userRoutes); // User-related routes (register, login, profile)
app.use('/api/courses', courseRoutes); // Course-related routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const express = require('express');
// const app = express();
// const userRoutes = require('./routes/userRoutes');
// const courseRoutes = require('./routes/courseRoutes');
// const enrollmentRoutes = require('./routes/enrollmentRoutes');

// // Middleware for parsing JSON bodies
// app.use(express.json());

// // Use the routes in your app
// app.use('/api/users', userRoutes); // User routes
// app.use('/api/courses', courseRoutes); // Course routes
// app.use('/api/enrollments', enrollmentRoutes); // Enrollment routes

// // Error handling middleware (optional but recommended)
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send('Something went wrong!');
// });

// module.exports = app;

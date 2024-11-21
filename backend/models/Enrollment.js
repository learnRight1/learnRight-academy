const db = require('../db/db');

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

const Enrollment = {
  // Create a new enrollment
  createEnrollment: async (userId, courseId, dateEnrolled) => {
    const query = `
      INSERT INTO enrollments (userId, courseId, dateEnrolled) 
      VALUES (?, ?, ?)
    `;
    return queryDatabase(query, [userId, courseId, dateEnrolled]);
  },

  // Get all enrollments for a specific user
  getUserEnrollments: async userId => {
    const query = `
      SELECT e.*, c.title, c.description, c.level, c.duration 
      FROM enrollments e
      JOIN courses c ON e.courseId = c.id
      WHERE e.userId = ?
    `;
    return queryDatabase(query, [userId]);
  },

  // Get all users enrolled in a specific course
  getCourseEnrollments: async courseId => {
    const query = `
      SELECT e.*, u.fullName, u.email 
      FROM enrollments e
      JOIN users u ON e.userId = u.id
      WHERE e.courseId = ?
    `;
    return queryDatabase(query, [courseId]);
  },

  // Delete an enrollment
  deleteEnrollment: async (userId, courseId) => {
    const query = `
      DELETE FROM enrollments 
      WHERE userId = ? AND courseId = ?
    `;
    return queryDatabase(query, [userId, courseId]);
  },
};

module.exports = Enrollment;

const db = require('../db/db');

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

class Course {
  static async create({ title, description, duration, level }) {
    return queryDatabase(
      'INSERT INTO courses (title, description, duration, level, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [title.trim(), description.trim(), duration, level.trim()]
    );
  }

  static async findAll(limit, offset) {
    return queryDatabase('SELECT * FROM courses LIMIT ? OFFSET ?', [
      parseInt(limit),
      parseInt(offset),
    ]);
  }

  static async count() {
    const result = await queryDatabase(
      'SELECT COUNT(*) as total FROM courses',
      []
    );
    return result[0].total;
  }
}

module.exports = Course;

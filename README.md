# Project Name: LearnRightAcademy - Mini School Portal

## Description

LearnRight is a mini school portal designed for students, teachers, and administrators. It allows users to manage and view their school-related information, such as enrollment data, courses and class schedules ( later will show performance reports). The portal provides both a frontend (user interface) and backend (server and database) for full functionality.

This project includes a student login system, dashboard for viewing personalized data, and functionality for viewing, adding, and editing information.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Frontend](#frontend)
5. [Backend](#backend)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Contributing](#contributing)
9. [License](#license)

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js, MySQL
- Authentication: JWT (JSON Web Tokens)
- Password Hashing: bcrypt
- Other: dotenv, cors, body-parser

## Installation

### Prerequisites

1. **Node.js**: Make sure you have Node.js installed. You can check by running:

   ```bash
   node -v
   ```

2. MySQL: Install MySQL if you haven't already. You can download it from [here](https://dev.mysql.com/downloads/).

3. NPM Packages: This project uses various Node.js packages. To install the required dependencies, run the following command from the root project folder:

   ```bash
   npm install
   ```

4. Environment Variables: Create a `.env` file in the root directory and add the following environment variables:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_portal
   JWT_SECRET=your_jwt_secret
   ```

### Database Setup

1. Create a MySQL database named `schoolportal`:

   ```sql
   CREATE DATABASE schoolportal;
   ```

2. Run the necessary SQL queries to create the required tables:

   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       role ENUM('student', 'teacher', 'admin') NOT NULL
   );

   CREATE TABLE students (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT,
       first_name VARCHAR(255) NOT NULL,
       last_name VARCHAR(255) NOT NULL,
       enrollment_number VARCHAR(255) UNIQUE NOT NULL,
       FOREIGN KEY (user_id) REFERENCES users(id)
   );

   CREATE TABLE courses (
       id INT AUTO_INCREMENT PRIMARY KEY,
       course_name VARCHAR(255) NOT NULL,
       teacher_id INT,
       FOREIGN KEY (teacher_id) REFERENCES users(id)
   );
   ```

## Usage

1. Start the backend server:
   In the project root folder, run:

   ```bash
   npm start
   ```

   This will start the Express server, which will be running on `http://localhost:3000`.

2. Frontend Access:
   The frontend can be accessed directly through the browser by opening the HTML files (like `index.html`, `login.html`, etc.).

## Frontend

The frontend is designed to be simple and responsive. It includes:

- Login Page: Allows users to log in to the system based on their role (student, teacher, or admin).
- Dashboard: Displays user-specific data such as enrolled courses, personal details, and performance.
- Course Registration: Allows students to register for available courses (admin functionality).
- Enrollment Details: View student enrollment details and academic progress.

The frontend uses css for styling and simple JavaScript for interactivity.

### Features:

- Responsive design
- User login system with role-based access (student, teacher, admin)
- Dashboard to view student details, courses, and progress
- Admin interface for adding courses and assigning students

## Backend

The backend is built using Node.js and Express.js. It connects to a MySQL database to store user, student, and course data.

### Routes:

- POST /login: Authenticate the user and return a JWT token.
- POST /register: Register a new user.
- GET /students: Get all students for the authenticated admin.
- GET /courses: Get all courses available.
- POST /courses: Add a new course (admin functionality).
- POST /students/:id/register: Register a student for a course.

### Authentication:

- Uses JWT (JSON Web Tokens) to authenticate and authorize users.
- When users log in, a JWT token is returned, which must be sent in the header for subsequent requests to protected routes.

## API Endpoints

### 1. POST /login

- Description: Authenticates the user and returns a JWT token.
- Request Body:
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

### 2. POST /register

- Description: Registers a new user.
- Request Body:
  ```json
  {
    "fullName": "newuser",
    "password": "newpassword",
    "email": "newuser@example.com",
    "role": "student"
  }
  ```
- Response:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### 3. GET /students

- Description: Retrieves all students for the authenticated admin.
- Headers:
  - `Authorization`: Bearer JWT token
- Response:
  ```json
  [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "enrollment_number": "STU12345"
    },
    {
      "id": 2,
      "first_name": "Jane",
      "last_name": "Smith",
      "enrollment_number": "STU12346"
    }
  ]
  ```

### 4. POST /courses

- Description: Adds a new course (admin functionality).
- Request Body:
  ```json
  {
    "course_name": "Mathematics 101",
    "teacher_id": 1
  }
  ```
- Response:
  ```json
  {
    "message": "Course added successfully"
  }
  ```

### 5. POST /students/:id/register

- Description: Registers a student for a specific course.
- Response:
  ```json
  {
    "message": "Student registered for course successfully"
  }
  ```

## Database Schema

- Users Table:

  - `id`: Primary key
  - `firstName`: Unique username
  - `password`: Hashed password
  - `email`: Unique email address
  - `role`: Role of the user (`student`, `teacher`, `admin`)

- Students Table:

  - `id`: Primary key
  - `user_id`: Foreign key referencing `users(id)`
  - `firstName`: First name of the student
  - `lastName`: Last name of the student
  - `enrollment_number`: Unique enrollment number for the student

- Courses Table:
  - `id`: Primary key
  - `course_name`: Name of the course
  - `teacher_id`: Foreign key referencing `users(id)` for the course teacher

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

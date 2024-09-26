// You can dynamically load courses from backend if needed
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/dashboard/courses');
    const courses = await response.json();

    const coursesList = document.getElementById('coursesList');
    coursesList.innerHTML = '';

    courses.forEach(course => {
      const listItem = document.createElement('li');
      listItem.textContent = course.name;
      coursesList.appendChild(listItem);
    });
  } catch (err) {
    console.error('Error:', err);
  }
});

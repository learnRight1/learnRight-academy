// dashboard.js
document.addEventListener('DOMContentLoaded', async () => {
  const ctx = document.getElementById('enrollmentChart').getContext('2d');
  const token = localStorage.getItem('authToken');

  if (!token) {
    alert('Please log in to access the dashboard.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch(
      'http://localhost:5000/api/students/enrollments',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) throw new Error('Failed to load enrollment data');

    const data = await response.json();

    // Handle case where no courses or enrollment data is returned
    if (!data.courses || data.courses.length === 0) {
      console.log('No enrollment data available');
      alert('No enrollment data available.');
      return;
    }

    const courseNames = data.courses.map(course => course.name);
    const enrollmentNumbers = data.courses.map(
      course => course.enrollmentCount
    );

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: courseNames,
        datasets: [
          {
            label: 'Number of Enrollments',
            data: enrollmentNumbers,
            backgroundColor: 'rgba(0, 123, 255, 0.6)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  } catch (error) {
    console.error('Error:', error.message);
    alert('Failed to load dashboard data. Please try again later.');
  }
});

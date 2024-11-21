document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    window.location.href = 'login.html'; // Redirect to login if no token
    return;
  }

  try {
    const decodedToken = jwt.decode(token);
    if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
      window.location.href = 'login.html'; // Redirect if token is expired
      return;
    }

    const fullName = decodedToken.fullName;
    document.getElementById(
      'welcomeMessage'
    ).textContent = `Welcome, ${fullName}`;

    const ctx = document.getElementById('enrollmentChart').getContext('2d');
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
    const courseNames = data.courses.map(course => course.name);
    const enrollmentCounts = data.courses.map(course => course.count);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: courseNames,
        datasets: [
          {
            label: 'Number of Enrollments',
            data: enrollmentCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    window.location.href = 'login.html'; // Redirect if token is invalid or expired
  }
});

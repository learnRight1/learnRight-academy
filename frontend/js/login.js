document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    alert(data.message); // Provide feedback to the user
    localStorage.setItem('authToken', data.token);
    window.location.href = 'dashboard.html'; // Redirect to dashboard after successful login
  } catch (error) {
    console.error('Error:', error.message);
  }
});

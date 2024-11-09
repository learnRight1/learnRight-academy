document.getElementById('loginForm').addEventListener('submit', async event => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (result.success) {
      localStorage.setItem('authToken', result.token);
      alert('Login successful. Redirecting to dashboard.');
      window.location.href = 'dashboard.html';
    } else {
      alert('Login failed: ' + result.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
    alert('An error occurred during login. Please try again.');
  }
});

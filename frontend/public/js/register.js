document
  .getElementById('registerForm')
  .addEventListener('submit', async event => {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Registration successful. Redirecting to login.');
        window.location.href = 'login.html';
      } else {
        alert('Registration failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('An error occurred during registration. Please try again.');
    }
  });

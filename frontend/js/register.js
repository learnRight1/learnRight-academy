document.getElementById('registerForm').addEventListener('submit', async e => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!fullName || !email || !password) {
    return alert('Please fill in all fields.');
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register user');
    }

    const data = await response.json();
    alert(data.message);
    window.location.href = 'login.html'; // Redirect to login after successful registration
  } catch (error) {
    console.error('Error:', error.message);
  }
});

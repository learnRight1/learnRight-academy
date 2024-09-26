const registerUser = async event => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // Success message
    } else {
      alert(data.message); // Error message
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred.'); // Handle fetch errors
  }
};

// Attach the function to your form submit event
document
  .getElementById('registerForm')
  .addEventListener('submit', registerUser);

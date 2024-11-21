catch (error) {
  console.error("Registration Error: ", error.message);
  console.error("Full error details: ", error);
  res.status(500).json({ message: 'An error occurred. Please try again later.' });
}

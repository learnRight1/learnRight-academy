const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header (expecting 'Bearer <token>')
  const token = req.header('Authorization')?.split(' ')[1]; // 'Bearer <token>'

  // If no token is found in the header, send a 403 response
  if (!token) {
    return res
      .status(403)
      .json({ message: 'Access denied, no token provided' });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // You may use decoded.id or decoded.userId, depending on how your JWT is structured
    req.userId = decoded.id || decoded.userId; // Store the user ID in the request object

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token verification fails, send a 400 response with the error message
    res.status(400).json({ message: 'Invalid token', error: error.message });
  }
};

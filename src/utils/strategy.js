const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// Function to generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    roles: user.roles // Assuming roles are stored in the user object
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = generateToken;

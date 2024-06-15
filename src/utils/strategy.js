const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// Function to generate JWT token
const generateToken = (user) => {
  const payload = {
   
    id: user._id,
    email: user.email,
    role: user.role // Assuming roles are stored in the user object
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = generateToken;

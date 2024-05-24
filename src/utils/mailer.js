const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  pool: true,
  service: "hotmail",
  host: "smtp.office365.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1,
});

// Function to send an email
const sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text
        });
     
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendMail;

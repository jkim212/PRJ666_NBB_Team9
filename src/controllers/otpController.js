const OTP = require("../models/otp");
const otpService = require("../services/otpService");
const sendMail = require("../utils/mailer");
const getToken = require("../utils/strategy");
const user = require("../models/user");

const createOTP = async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Check if an OTP for the email already exists and delete it
    await OTP.findOneAndDelete({ email });

    // Generate a new OTP
    const otp = otpService.getOtp();

    // Create a new OTP entry
    const newOTP = new OTP({ email, otp });
    await newOTP.save();
    try {
      await sendMail(email, "OTP Verification", `Your OTP is: ${otp}`);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Send OTP via email or any other method

    res
      .status(201)
      .json({
        message: "OTP generated and sent successfully.",
        Sentemail: email,
      });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const optVerify = async (req, res) => {
  const { email, otp, role } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    // Find the OTP entry for the provided email
    const otpEntry = await OTP.findOne({ email });
    console.log(otpEntry);

    // If no OTP entry found for the email
    if (!otpEntry) {
      return res
        .status(404)
        .json({ error: "No OTP found for the provided email" });
    }

    // If the provided OTP matches the stored OTP
    if (otp === otpEntry.otp) {
      const existingUser = await user.findOne({ email });
      if (!existingUser) {
        gotuser = await user.create({
          email,
          role,
        });
      } else {
        gotuser = existingUser;
      }

      const toekn = getToken(gotuser);
      return res
        .status(200)
        .json({ message: "OTP verified successfully", token: toekn });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createOTP, optVerify };

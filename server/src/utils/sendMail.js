const nodemailer = require("nodemailer");
const OTP = require("../models/otpModel");
const bcrypt = require("bcrypt");

const sendOTP = async ({ email, otp }) => {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });
  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Your otp is ${otp}</p>`,
  };
  transporter.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    return infor;
  });
};

module.exports = sendOTP;

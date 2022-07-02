const bcrypt = require("bcrypt");
const OTP = require("../models/otpModel");

module.exports = {
  validOtp: async ({ otp, hashOtp }) => {
    try {
      const isValid = await bcrypt.compare(otp, hashOtp);
      return isValid;
    } catch (error) {}
  },
  insertOtp: async ({ email, otp, username, password, dateOfBirth }) => {
    try {
      const hashOtp = await bcrypt.hash(otp, 10);
      const Otp = await OTP.create({
        email,
        username,
        password,
        otp: hashOtp,
        dateOfBirth,
      });
      return Otp ? 1 : 0;
    } catch (error) {
      console.error(error);
    }
  },
};

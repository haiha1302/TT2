const User = require("../models/userModel");
const Otp = require("otp-generator");
const { insertOtp, validOtp } = require("./otpservice");
const OTP = require("../models/otpModel");
const sendOTP = require("../utils/sendMail");
const bcrypt = require("bcrypt");

module.exports = {
  verifyOtp: async ({ email, otp }) => {
    try {
      const otpHolder = await OTP.find({ email });
      if (!otpHolder.length) {
        return {
          code: 404,
          message: "Expired OTP!",
        };
      }
      //get last otp
      const lastOtp = otpHolder[otpHolder.length - 1];
      const isValid = await validOtp({
        otp,
        hashOtp: lastOtp.otp,
      });
      if (!isValid) {
        return {
          code: 401,
          message: "Invalid OTP",
        };
      }
      if (isValid && email === lastOtp.email) {
        const user = await User.create({
          email: email,
          username: lastOtp.username,
          password: lastOtp.password,
          dateOfBirth: lastOtp.dateOfBirth,
        });
        if (user) {
          await OTP.deleteMany({ email });
        }
        return {
          code: 201,
          element: user,
        };
      }
    } catch (error) {
      console.error(error);
    }
  },

  regisUser: async ({ email, password, username, dateOfBirth }) => {
    const user = await User.findOne({ email });
    if (!username || !email || !password) {
      return {
        code: 500,
        message: "Please fill all the field",
      };
    }
    if (await User.findOne({ username })) {
      return {
        code: 400,
        message: "This username has been used. Please change your username!",
      };
    }
    if (!/^[a-zA-z]*$/.test(username)) {
      return {
        code: 500,
        message: "Invalid username entered",
      };
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return {
        code: 500,
        message: "Invalid email entered",
      };
    }
    if (password.length < 8) {
      return {
        code: 400,
        message: "Password must be at least 8 characters",
      };
    }
    if (user) {
      return {
        code: 400,
        message: "This email is already in user!",
      };
    }

    //OTP
    const otp = Otp.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP is:", otp);
    // sendOTP({ email, otp: otp });
    return {
      code: 200,
      element: await insertOtp({
        email,
        otp: otp,
        username,
        password: await bcrypt.hash(password, 10),
        dateOfBirth,
      }),
      message: "Verify your email",
    };
  },

  logUser: async ({ username, password, res }) => {
    if (!username || !password) {
      return {
        code: 400,
        message: "username or password is not correct",
      };
    }
    const user = await User.findOne({ username });
    const isPass = await user.comparePassword(password);
    if (!isPass) {
      return {
        code: 400,
        message: "username or password is not correct",
      };
    }

    const token = user.getJWTToken();
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      code: 200,
      message: "Login success",
    };
  },
};

const { regisUser, verifyOtp, logUser } = require("../services/userService");
const User = require("../models/userModel");

//register
exports.register = async (req, res) => {
  const { email, username, password, dateOfBirth } = req.body;
  const { code, element, message } = await regisUser({
    email,
    username,
    password,
    dateOfBirth,
  });

  return res.status(code).json({
    code,
    element,
    message,
  });
};

//verify email
exports.verifyAcc = async (req, res) => {
  const { email, otp } = req.body;
  const { code, element, message } = await verifyOtp({ email, otp });
  return res.status(code).json({
    code,
    element,
    message,
  });
};

//login
exports.login = async (req, res) => {
  const { password, username } = req.body;
  const { code, message } = await logUser({ username, password, res });

  return res.status(code).json({
    code,
    message,
  });
};

//logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout" });
};

//user detail
exports.userDetail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return {
        code: 400,
        message: "user not found",
      };
    }
    return res.status(200).json({
      code: 200,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

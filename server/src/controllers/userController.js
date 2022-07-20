const { UserServices } = require('../services/userService');
const { OTPServices } = require('../services/otpService')
// const User = require('../models/userModel');

const UsersController = {
    //register
    register: async (req, res) => {
        const { email, username, password, dateOfBirth } = req.body;
        const { code, element, message } = await UserServices.registerUser({
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
    },

    //verify email
    verifyAcc: async (req, res) => {
        const { email, otp } = req.body;
        const { code, element, message } = await UserServices.verifyOtp({ email, otp });
        
        return res.status(code).json({
            code,
            element,
            message,
        });
    },

    //login
    login: async (req, res) => {
        const { email, password } = req.body;
        const { code, message, user } = await UserServices.loginUser({ email, password, res });

        return res.status(code).json({
            code,
            message,
            user
        });
    },

    //logout
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout' });
    },

    //user detail
    userDetail: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) {
                return {
                    code: 400,
                    message: 'user not found',
                };
            }
            return res.status(200).json({
                code: 200,
                user,
            });
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = { UsersController }


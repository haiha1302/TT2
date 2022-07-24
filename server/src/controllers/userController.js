const { UserServices } = require('../services/userService');
// const { OTPServices } = require('../services/otpService');
const { JWTServices } = require('../services/jwtServices');
// const User = require('../models/userModel');
const { DB } = require('../database')

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

        const token = JWTServices.createToken(user);

        res.cookie('access-token', token, {
            httpOnly: true,
            secure: false,
            // sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
            // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        res.status(code).json({
            code,
            message,
            user
        });
    },

    //logout
    logout: (req, res) => {
        res.clearCookie('access-token');
        res.status(200).json({ message: 'Logout' });
    },

    checkUser: async (req, res) => {
        const accessToken = req.cookies['access-token']

        if (!accessToken) res.status(401).send('JWT is missing')
        else {
            const decodeToken = await JWTServices.validateToken(accessToken)
            
            req.authenticated = true
            res.status(decodeToken.status).json(decodeToken)
        }
    },

    //user detail
    // userProfile: async (req, res) => {
    //     try {
    //         console.log('body', req.body)
    //         const idUser = req.body.idUser
    //         console.log('id', idUser)
    //         const user = await DB.users.findOne({ _id: idUser })

    //         if (!user) res.status(400).json({ msg: 'User is not found' })
    //         console.log('se', user)
    //         return res.status(200).json(user);
    //     } catch (error) {
    //         res.status(500).json({ msg: error.message })
    //     }
    // }
};

module.exports = { UsersController }


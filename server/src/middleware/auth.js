const jwt = require('jsonwebtoken');
// const { JWT } = require('../JWT/JWT')
const User = require('../models/userModel');
const Post = require('../models/postModel');

const Auth = {
    auth: async (req, res, next) => {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ message: 'You must be login' });
        }

        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(data.id);
    
        next();
    },
    
    authEdit: async (req, res, next) => {
        const userId = await User.findOne({ _id: req.user.id });
        const post = await Post.findOne({ user: userId });
    
        if (post === null) {
            return res.status(400).json({ message: 'You do not have permission for this post' });
        }
        next();
    }
}

module.exports = { Auth }
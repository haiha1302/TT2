// const jwt = require('jsonwebtoken');
const { JWTServices } = require('../services/jwtServices');
const { DB } = require('../database');
// const { JWT } = require('../JWT/JWT')
const User = require('../models/userModel');
const Post = require('../models/postModel');
const ObjectId = require('mongodb').ObjectID;

const Auth = {
    auth: async (req, res, next) => {
        const token = req.cookies['access-token'];

        if (!token) {
            return res.status(400).json({ message: 'You must be login' });
        }

        // const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const data = await JWTServices.validateToken(token);
        // console.log(data)
        req.user = await DB.users.findOne({ _id: data._id });

        next();
    },

    authEdit: async (req, res, next) => {
        // console.log(req)
        const userId = await DB.users.findOne({ _id: ObjectId(req.user._id) });
        console.log(userId._id);
        const post = await DB.posts.findOne({ author_id: userId._id.toString() });
        console.log('pos', post)
        if (post === null) {
            return res.status(400).json({ message: 'You do not have permission for this post' });
        }
        next();
    },
};

module.exports = { Auth };

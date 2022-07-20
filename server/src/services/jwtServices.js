const jwt = require('jsonwebtoken')
const { DB } = require('../database')
const dotenv = require('dotenv').config()

const JWTServices = {
    createToken: user => {
        console.log(`jwt sign: ${user}`)
        const accessToken = jwt.sign({
            username: user.username
        },
        process.env.SECRET_JWT_KEY,
        {
            expiresIn: '7d'
        }
        )
        return accessToken
    },

    validateToken: (req, res) => {
        const accessToken = req.cookies['access-token']

        if(!accessToken) res.status(400).json({ Error: 'User is not Authenticated' })

        jwt.verify(
            accessToken,
            process.env.SECRET_JWT_KEY,
            async (err, decoded) => {
                if(err) res.status(401).send('Invalid JWT')
                else {
                    const username = decoded.username
                    const user = await DB.users.findOne({ username: username })
                    req.authenticated = true

                    if(user) res.json({
                        username: user.username,
                        _id: user._id
                    })
                    else res.status(401).send('User is not found')
                }

            }
        )
    }

}

module.exports = { JWTServices }
const jwt = require('jwt')
const { DB } = require('./database')

const JWT = {
    createToken: user => {
        const accessToken = jwt.sign({
            username: user.username
        },
        process.env.SECRET_KEY,
        )
        return accessToken
    },

    validateToken: (req, res) => {
        const accessToken = req.cookies['access-token']

        if (!accessToken) {
            return res.status(400).json({
                Error: 'User not Authenticated!'
            })
        }

        jwt.verify(
            accessToken,
            process.env.SECRET_KEY,
            async(err, decoded) => {
                if (err) {
                    res.status(401).send('Invalid JWT!')
                } else {
                    const username = decoded.username
                    const user = await DB.users.findOne({
                        username: username
                    })
                    req.authenticated = true

                    if (user) {
                        res.status(200).json({
                            username: user.username,
                            id: user.uuid,
                            salt: user.salt,
                            hashed: user.hashed
                        })
                    } else {
                        res.status(401).send('User not found!')
                    }
                }
            }
        )
    }
}

module.exports = { JWT }
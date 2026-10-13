const jwt = require('jsonwebtoken')


const requireAuth = (req, res, next) => {
    const token = req.cookies?.jwt

    if(!token) {
        return res.status(401).json({msg: 'Unauthorize'})
    }

    try {
        const decoded = jwt.verify(token, 'secret')

        req.userId = decoded.id

        next()
    } catch(err) {
        return res.status(401).json({msg:'invalid token'})
    }
}

module.exports = {requireAuth}
const jwt = require('jsonwebtoken')

const generrateAccessToken = (uid , role) => jwt.sign({_id : uid, role} , process.env.JWT_SECRET, {expiresIn: '3d'})
const generrateRefreshToken = (uid) => jwt.sign({_id : uid} , process.env.JWT_SECRET, {expiresIn: '7d'})
module.exports = {
    generrateAccessToken,
    generrateRefreshToken
}

/// Accesstoken
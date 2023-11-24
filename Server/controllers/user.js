const asyncHandler = require('express-async-handler')
const User = require('../models/user')

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body
  if (!email || !password || !lastname || !firstname)
    return res.status(400).json({
        sucess: false,
      mes: "Missing input"
    });
    const respone = await User.create(req.body)
    return res.status(200).json({
        sucess : respone ? true : false,
        respone
    })
});
module.exports = {
    register
}
const asyncHandler = require('express-async-handler')
const User = require('../models/user')

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body
  if (!email || !password || !lastname || !firstname)
    return res.status(400).json({
        sucess: false,
      mes: "Missing input"
    });
    const user = await User.findOne({email : email})
    if(user) throw new Error('Has User ')
    else{
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success:  newUser ? true : false,
            mes : newUser ? 'Register succcessfull . GO to login' : ' Something went wrong'
        })
    }
});
const login = asyncHandler(async (req, res) => {
    const { email, password} = req.body
    if (!email || !password)
      return res.status(400).json({
          sucess: false,
        mes: "Missing input"
      });
      const response = await User.findOne({email : email})
    if(response && await response.isConrectPassword(password)){

        const {password , role , ...userData}  = response.toObject()   // hide 2 truong
        return res.status(200).json({
            success : true,
            userData
        })
    }else{
        throw new Error('Invalid credentials')
    }
  });
module.exports = {
    register,
    login
}
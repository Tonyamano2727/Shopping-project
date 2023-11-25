const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { generrateAccessToken,generrateRefreshToken } = require('../middlewares/jwt')



const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !lastname || !firstname)
    return res.status(400).json({
      sucess: false,
      mes: "Missing input",
    });
  const user = await User.findOne({ email: email });
  if (user) throw new Error("Has User ");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser
        ? "Register succcessfull . GO to login"
        : " Something went wrong",
    });
  }
});
// Refresh  token => Cấp mới access token 
// Access token => Xác thực người dùng , phân quyền người dùng
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      sucess: false,
      mes: "Missing input",
    });
  const response = await User.findOne({ email: email });
  if (response && (await response.isConrectPassword(password))) {
    // Tách password và role khỏi response
    const { password, role, ...userData } = response.toObject(); // hide 2 truong
    // Tạo access token 
    const Accesstoken = generrateAccessToken(response._id , role)
    // Tạo refresh token 
    const refreshToken = generrateRefreshToken(response._id)
    // Lưu refres token vào database
    await User.findByIdAndUpdate(response._id, {refreshToken}, {new : true})
    // Lưu refresh token vào cookie
    res.cookie('resfreshToken', refreshToken , {httpOnly: true, maxAge: 7*24*60*60*1000 })
    return res.status(200).json({
      success: true,
      Accesstoken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const {_id} = req.user
  const user = await User.findById({_id : _id}).select('-refreshToken -password -role');   // select is hide truong trong database
  return res.status(200).json({
    success : false,
    rs: user ? user : 'User not found'
  })
});


module.exports = {
  register,
  login,
  getCurrent
};

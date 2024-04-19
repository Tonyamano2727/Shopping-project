const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const {
  generrateAccessToken,
  generrateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const Sendemail = require("../ultils/sendemail");
const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname  } = req.body;
  if (!email || !password || !lastname || !firstname)
    return res.status(400).json({
      success: false,
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
      success: false,
      mes: "Missing input",
    });
  const response = await User.findOne({ email: email });
  if (response && (await response.isConrectPassword(password))) {
    // Tách password và role khỏi response
    const { password, role, refreshToken, ...userData } = response.toObject(); // hide 2 truong
    // Tạo access token
    const Accesstoken = generrateAccessToken(response._id, role);
    // Tạo refresh token
    const newrefreshToken = generrateRefreshToken(response._id);
    // Lưu refres token vào database
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newrefreshToken },
      { new: true }
    );
    // Lưu refresh token vào cookie
    res.cookie("refreshToken", newrefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
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
  //console.log('req   ', req);
  const { _id } = req.user;
  const user = await User.findById({ _id: _id }).select(
    "-refreshToken -password "
  ); // select is hide truong trong database
  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : "User not found",
  });
});

const refreshAcessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies;
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Check token có hợp lệ hay không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generrateAccessToken(response._id, response.role)
      : "Refresh token not matcheed",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");

  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout is done",
  });
});

// Client gửi email đã đăng kí
// Sever kiểm tra email có hợp lệ hay không => Nếu hợp lệ thì gửi mail + kèm theo link  (password change token)
// Client check email => click link
// Client gửi api kèm token
// Check token có giống token mà server gửi mail  hay không
// Nếu giống thì cho thay đổi và ngược lại

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordchangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}"> Click here</a>`;

  const data = {
    email,
    html,
  };
  const rs = await Sendemail(data);
  return res.status(200).json({
    success:true,
    mes: rs.response?.includes('OK') ? 'Check your email' : 'Email wrong try last'
    
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  if (!password || !token) throw new Error("Missing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangArt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Update password" : "Something went wrong",
  });
});

const getUser = asyncHandler(async (req, res) => {
  const respone = await User.find().select("-refreshToken -password -role"); // select is hide truong trong database
  return res.status(200).json({
    success: respone ? true : false,
    users: respone,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing input");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deleteUser: response
      ? `User with email ${response.email} deleted`
      : "no user delete",
  });
});

// client
const updateuser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password,-role");
  return res.status(200).json({
    success: response ? true : false,
    updateuser: response ? response : "Something went wrong",
  });
});

const updateuserbyadmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role ");
  return res.status(200).json({
    success: response ? true : false,
    updateuser: response ? response : "Something went wrong",
  });
});

const updateuserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    { new: true }
  ).select("-password -role");
  return res.status(200).json({
    success: response ? true : false,
    updateuseraddress: response ? response : "Something went wrong",
  });
});

const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;
  if (!pid || !quantity || !color) throw new Error("Missing input");
  const user = await User.findById(_id).select('cart')
  const alreadyProduct = user?.cart?.find(el => el.product && el.product.toString() === pid) // đã fix bug "mes": "Cannot read properties of undefined (reading 'toString')"
  if (alreadyProduct) {
      if(alreadyProduct.color === color){
        // const response = await User.updateOne({cart: {$elmenMatch: alreadyProduct}}, {$set : {"cart.$.quantity":quantity}},{new:true})
        // return res.status(200).json({
        //   success: response ? true : false,
        //   updateCart: response ? response : "Something went wrong",
        // });
        const response = await User.updateOne(
          { cart: { $elemMatch: alreadyProduct } },
          { $set: { "cart.$.quantity": quantity } },
          { new: true }
        );
        return res.status(200).json({
          success: response ? true : false,
          updateCart: response ? response : "Something went wrong",
        });
      }else{
        const response = await User.findByIdAndUpdate(
          _id,
          { $push: { cart: { product: pid, quantity, color } } },
          { new: true }
        );
        return res.status(200).json({
          success: response ? true : false,
          updateCart: response ? response : "Something went wrong",
        });
      }
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, color } } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      updateCart: response ? response : "Something went wrong",
    });
  }
});


module.exports = {
  register,
  login,
  getCurrent,
  refreshAcessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUser,
  deleteUser,
  updateuser,
  updateuserbyadmin,
  updateuserAddress,
  updateCart,
};

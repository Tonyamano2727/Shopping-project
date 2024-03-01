const Order = require("../models/order");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const {coupon} = req.body
  const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
  const products = userCart?.cart?.map(el => ({
    product : el.product._id,
    count: el.quantity,
    color: el.color
  }))
  const total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum , 0)
  if(coupon) total = Math.round(total * (1 - coupon/100)/1000) * 1000 // Làm tròn 3 số
  const rs = await Order.create({products, total, orderBy: _id})
  return res.json({
    success: rs ? true : false,
    rs: rs ? rs : "Something went wrong",
  });
});

const updateStatusorder = asyncHandler(async (req, res) => {
  const { oid } = req.params
  const { status } = req.body
  if (!status) throw new Error ('Missing status')
  const response = await Order.findByIdAndUpdate( oid , { status }, {new : true})
  return res.json({
    success: response ? true : false,
    response: response ? response : "Something went wrong",
  })
});

module.exports = {
    createOrder,
    updateStatusorder
}
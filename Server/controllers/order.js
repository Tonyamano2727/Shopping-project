const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const {products , total , address , status} = req.body
  if(address) {
    await User.findByIdAndUpdate( _id , { address , cart: [] })
  }
  const data = {products , total , postedBy: _id , address}
  if(status) data.status = status
  const rs = await Order.create(data)
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

const getUserOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const response = await Order.find({orderBy: _id})
  return res.json({
    success: response ? true : false,
    response: response ? response : "Something went wrong",
  })
});

const getOrderbyAdmin = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tách các trường dặt biệt
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operator cho đúng cú pháp mongoose      //gt is > // lt is <
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  // Filtering
  if (queries?.name)
    formatedQueries.name = { $regex: queries.name, $options: "i" };

  if (req.query.q) {
    delete formatedQueries.q;
    formatedQueries["$or"] = [
      { firstname: { $regex: req.query.q, $options: "i" } },
      { lastname: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }
  let queryConmmand = Order.find(formatedQueries);

  // Sorting
  //abc,efg => [abc,efg] => abc efg
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryConmmand = queryConmmand.sort(sortBy);
  }

  // fields limiting    // Lấy trường
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryConmmand = queryConmmand.select(fields);
  }

  // Pagination
  // limit: số object lấy về goin API
  // skip: 2
  // 1 2 3 ... 10

  // + conver kieu du lieu
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryConmmand.skip(skip).limit(limit);
  // Execute query
  // Số Lượng sản phẩm thõa mản điều kiện !== số lượng sp trả về 1 lần gọi API
  queryConmmand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Order.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      Order: response ? response : "Cant not get product",
    });
  });
  // const { _id } = req.admin
  // const response = await Order.find(_id)
  // return res.json({
  //   success: response ? true : false,
  //   response: response ? response : "Something went wrong",
  // })
});


module.exports = {
    createOrder,
    updateStatusorder,
    getUserOrder,
    getOrderbyAdmin
}
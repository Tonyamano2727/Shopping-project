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
  const data = {products , total , orderBy: _id , address}
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
  const queries = { ...req.query };
  // Tách các trường dặt biệt
  const { _id } = req.user
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operator cho đúng cú pháp mongoose      //gt is > // lt is <
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    matchedEl => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  // Filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };

  // Tìm kiếm theo status
  if (queries?.status)
    formatedQueries.status = { $regex: queries.status, $options: "i" };

  const qr = { ...formatedQueries, orderBy: _id };

  let queryConmmand = Order.find(qr);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryConmmand = queryConmmand.sort(sortBy);
  }

  // fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryConmmand = queryConmmand.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryConmmand.skip(skip).limit(limit);

  // Execute query
  queryConmmand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Order.find(qr).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      Order: response ? response : "Can't get User",
    });
  });
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
    macthedEl => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  let queryObject = {}
  if(queries?.q){
    delete formatedQueries.q
    queryObject = {$or: [
      {status: {$regex : queries.q , $options: 'i'}},
      ]}
  }
  const qr = {...formatedQueries , ...queryObject}
  let queryConmmand = Order.find(qr);
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryConmmand.skip(skip).limit(limit);
  queryConmmand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Order.find(queryObject).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      Order: response ? response : "Cant not get product",
    });
  });
});


module.exports = {
    createOrder,
    updateStatusorder,
    getUserOrder,
    getOrderbyAdmin
}
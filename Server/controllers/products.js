const { response } = require("express");
const Product = require("../models/products");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createproducts = asyncHandler(async (req, res) => {
  const {title , price , description , brand , category , color} = req.body
  const thumb = req?.files?.thumb[0]?.path
  const images = req.files?.images?.map(el => el.path)

  if (!(title && price && description && brand && category && color)) throw new Error("Missing input");
  req.body.slug = slugify(title);
  if(thumb) req.body.thumb = thumb
  if(images) req.body.images = images
  const newproducts = await Product.create(req.body);
  return res.status(200).json({
    success: newproducts ? true : false,
    mes: newproducts ? 'Product have created' : "Fail created product",
  });
});
const getproduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cant not get product",
  });
});

// Filtering, Sorting & pagination
const getallproducts = asyncHandler(async (req, res) => {
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
  let colorQueryObject = {}
  // Filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  if (queries?.category)
    formatedQueries.category = { $regex: queries.category, $options: "i" };
  if (queries?.color){
    delete formatedQueries.color
    const colorArr = queries.color?.split(',')
    const colorQuery = colorArr.map(el => ({color: {$regex : el , $options: 'i'}}))
    colorQueryObject = {$or: colorQuery}
  }
  let queryObject = {}
  if(queries?.q){
    delete formatedQueries.q
    queryObject = {$or: [
      {color: {$regex : queries.q , $options: 'i'}} , 
      {title: {$regex : queries.q , $options: 'i'}},
      {category: {$regex : queries.q , $options: 'i'}},
      {brand: {$regex : queries.q , $options: 'i'}},
      ]}
  }
  const qr = {...colorQueryObject, ...formatedQueries, ...queryObject}
  let queryConmmand = Product.find(qr);

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
    const counts = await Product.find(qr).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      products: response ? response : "Cant not get product",
    });
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const files = req?.files;
  if(files?.thumb) req.body.thumb = files?.thumb[0]?.path
  if(files?.images) req.body.images = files?.images?.map(el => el.path)
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updateProduct ? true : false,
    mes: updateProduct ? 'Updated' : "Cant not update product",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deleteProduct ? true : false,
    mes: deleteProduct ? 'Deleted' : "Cant not delete product",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star && !pid) throw new Error("Missing inputs");
  const ratingsProduct = await Product.findById(pid);
  const alreadyRatings = ratingsProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );
  // console.log({alreadyRatings})
  if (alreadyRatings) {
    // update star and comment
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRatings },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      { new: true }
    );
  } else {
    // add star and comment
    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id } },
      },
      { new: true }
    );
    console.log(response);
  }

  // Sum ratings
  const updateProduct = await Product.findById(pid);
  const ratingCount = updateProduct.ratings.length;
  const Sumratings = updateProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updateProduct.totalRatings = Math.round((Sumratings * 10) / ratingCount) / 10;

  await updateProduct.save();

  return res.status(200).json({
    status: true,
    updateProduct,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing input");
  const response = await Product.findByIdAndUpdate(
    pid,
    { $push: { images: { $each: req.files.map((el) => el.path) } } },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updateProduct: response ? response : "Cannot upload Images Products",
  });
});

module.exports = {
  createproducts,
  getproduct,
  getallproducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
};

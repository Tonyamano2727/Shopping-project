const Product = require('../models/products')
const asyncHandler = require ('express-async-handler')
const slugify = require('slugify')

const createproducts = asyncHandler(async (req,res) => {
    if(Object.keys(req.body).length === 0) throw new Error('Missing input')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newproducts = await Product.create(req.body)
    return res.status(200).json({
        success: newproducts ? true : false,
        createdproducts : newproducts ? newproducts: 'Cant not create new products'
    })

})
const getproduct = asyncHandler(async (req,res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData : product ? product : 'Cant not get product'
    })
})

// Filtering, Sorting & pagination
const getallproducts = asyncHandler(async (req,res) => {
    const products = await Product.find()
    return res.status(200).json({
        success: products ? true : false,
        productDatas : products ? products : 'Cant not get product'
    })
})

const updateProduct = asyncHandler(async (req,res) => {
    const { pid } = req.params
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(pid , req.body ,{new:true})
    return res.status(200).json({
        success: updateProduct ? true : false,
        updateProduct : updateProduct ? updateProduct : 'Cant not update product'
    })
})

const deleteProduct = asyncHandler(async (req,res) => {
    const { pid } = req.params
    
    const deleteProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deleteProduct ? true : false,
        deleteProduct : deleteProduct ? deleteProduct : 'Cant not update product'
    })
})

module.exports = {
    createproducts,
    getproduct,
    getallproducts,
    updateProduct,
    deleteProduct
}
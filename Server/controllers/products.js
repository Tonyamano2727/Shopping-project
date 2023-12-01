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

module.exports = {
    createproducts
}
const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')


const createNewBlog = asyncHandler(async(req, res)=>{
    const { title , description , category} = req.body
    if(!title || !description || ! category) throw new Error('Missing inputs')
    const response = await Blog.create(req.body)
    return res.json({
        success : response ? true : false,
        createBlog: response ? response : 'Cannot create Blog'
    })
})

const updateBlog = asyncHandler(async(req, res)=>{
    const {bid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await Blog.findByIdAndUpdate(bid, req.body , {new:true})
    return res.json({
        success : response ? true : false,
        updateBlog: response ? response : 'Cannot update Blog'
    })
})

const getallBlog = asyncHandler(async(req, res)=>{
    const response = await Blog.find()
    return res.json({
        success : response ? true : false,
        getallBlog: response ? response : 'Cannot getall Blog'
    })
})

// Khi người dùng like một bài blog thì :
// 1. Check người dùng đó trước đó có dislike hay không
module.exports = {
    createNewBlog,
    updateBlog,
    getallBlog
}
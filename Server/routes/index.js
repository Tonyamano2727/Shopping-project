const userRouter = require('./user')
const productsRouter = require('./products')
const productCategoryRouter = require('./productCategory')
const productBlogCategoryRouter = require('./blogCategory')
const Blog = require('./blog')
const Brand = require('./brand')
const Coupon = require('./coupon')
const {notFound , errHandler} = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/productCategory', productCategoryRouter)
    app.use('/api/productBlogCategory', productBlogCategoryRouter)
    app.use('/api/blog', Blog)
    app.use('/api/brand', Brand)
    app.use('/api/coupon', Coupon)

    app.use(notFound)
    app.use(errHandler)
}


module.exports = initRoutes
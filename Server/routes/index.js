const userRouter = require('./user')
const productsRouter = require('./products')
const {notFound , errHandler} = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/products', productsRouter)

    app.use(notFound)
    app.use(errHandler)
}


module.exports = initRoutes
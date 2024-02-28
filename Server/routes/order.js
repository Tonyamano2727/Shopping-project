const router = require('express').Router()
const ctrls = require('../controllers/order')
const {verifyToken , isAdmin} = require('../middlewares/verifyToken')

router.post('/', verifyToken , ctrls.createOrder)

module.exports = router
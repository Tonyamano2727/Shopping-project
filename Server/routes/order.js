const router = require('express').Router()
const ctrls = require('../controllers/order')
const {verifyToken , isAdmin} = require('../middlewares/verifyToken')

router.post('/', verifyToken , ctrls.createOrder)
router.put('/status/:oid', verifyToken, isAdmin , ctrls.updateStatusorder)

module.exports = router
const router = require('express').Router()
const ctrls = require('../controllers/products')
const {verifyToken , isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyToken, isAdmin], ctrls.createproducts)


module.exports = router
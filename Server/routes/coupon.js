const router = require('express').Router()
const ctrls = require('../controllers/coupon')
const {verifyToken , isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyToken,isAdmin], ctrls.createCoupon)
router.put('/:cid',[verifyToken,isAdmin], ctrls.updateCoupon)
router.get('/', ctrls.getallCoupon)

module.exports = router
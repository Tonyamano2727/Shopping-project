const router = require('express').Router()
const ctrls = require('../controllers/blog')
const {verifyToken , isAdmin} = require('../middlewares/verifyToken')

router.get('/',ctrls.getallBlog)
router.post('/' , [verifyToken, isAdmin],ctrls.createNewBlog)
router.put('/:bid' , [verifyToken, isAdmin],ctrls.updateBlog)

module.exports = router
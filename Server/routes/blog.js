const router = require('express').Router()
const ctrls = require('../controllers/blog')
const {verifyToken , isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.cofig')

router.get('/',ctrls.getallBlog)
router.get('/one/:bid',ctrls.getBlog)
router.post('/' , [verifyToken, isAdmin],ctrls.createNewBlog)
router.put('/likes/:bid' , [verifyToken],ctrls.likeBlog)
router.put('/image/:bid' , [verifyToken, isAdmin],uploader.single('image'), ctrls.uploadImagesBlog)
router.put('/dislikes/:bid' , [verifyToken],ctrls.dislikeBlog)
router.put('/:bid' , [verifyToken, isAdmin],ctrls.updateBlog)
router.delete('/:bid' , [verifyToken, isAdmin],ctrls.deleteBlog)


module.exports = router
const router = require('express').Router()
const ctrls = require('../controllers/products')
const {verifyToken , isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.cofig')

router.post('/',[verifyToken, isAdmin], ctrls.createproducts)
router.get('/', ctrls.getallproducts)
router.put('/ratings',[verifyToken], ctrls.ratings)

router.put('/uploadimage/:pid',[verifyToken, isAdmin], uploader.single('images') , ctrls.uploadImagesProduct)
router.delete('/:pid',[verifyToken, isAdmin], ctrls.deleteProduct)
router.get('/:pid', ctrls.getproduct)

module.exports = router
const router = require('express').Router()
const ctrls = require('../controllers/user')
const {verifyToken , isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.cofig')

router.post('/register', ctrls.register)
router.get('/current',verifyToken,ctrls.getCurrent)
router.post('/login', ctrls.login)  
router.post('/Refreshtoken',ctrls.refreshAcessToken)
router.get('/logout', ctrls.logout)
router.post('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)
router.get('/',[verifyToken,isAdmin], ctrls.getUser)
router.delete('/:uid',[verifyToken,isAdmin], ctrls.deleteUser)
router.put('/current',[verifyToken],uploader.single('avatar'), ctrls.updateuser)
router.put('/address',[verifyToken], ctrls.updateuserAddress)
router.put('/cart',[verifyToken], ctrls.updateCart)
router.put('/:uid',[verifyToken,isAdmin], ctrls.updateuserbyadmin)

module.exports = router

// CREATE(POST) + PUT - body
// Get + delete - query

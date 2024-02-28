const router = require('express').Router()
const ctrls = require('../controllers/user')
const {verifyToken , isAdmin} = require('../middlewares/verifyToken')

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.get('/current',verifyToken,ctrls.getCurrent)
router.post('/Refreshtoken',ctrls.refreshAcessToken)
router.get('/logout', ctrls.logout)
router.get('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)
router.get('/',[verifyToken,isAdmin], ctrls.getUser)
router.delete('/',[verifyToken,isAdmin], ctrls.deleteUser)
router.put('/updateuser',[verifyToken], ctrls.updateuser)
router.put('/address',[verifyToken], ctrls.updateuserAddress)
router.put('/cart',[verifyToken], ctrls.updateCart)
router.put('/:uid',[verifyToken,isAdmin], ctrls.updateuserbyadmin)

module.exports = router

// CREATE(POST) + PUT - body
// Get + delete - query

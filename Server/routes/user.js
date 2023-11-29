const router = require('express').Router()
const ctrls = require('../controllers/user')
const {verifyToken} = require('../middlewares/verifyToken')

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.get('/current',verifyToken,ctrls.getCurrent)
router.post('/Refreshtoken',ctrls.refreshAcessToken)
router.get('/logout', ctrls.logout)
router.get('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)
module.exports = router

// CREATE(POST) + PUT - body
// Get + delete - query

const router = require('express').Router()
const ctrls = require('../controllers/user')
const {verifyToken} = require('../middlewares/verifyToken')

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.get('/current',verifyToken,ctrls.getCurrent)
router.post('/Refreshtoken',ctrls.refreshAcessToken)
router.get('/logout', ctrls.logout)
module.exports = router

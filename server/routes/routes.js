const express = require('express')
const router = express.Router()

const {register_post, login_post, registerValidation} = require('../controllers/authController')



router.post('/register', registerValidation,register_post)
router.post('/login', login_post)


module.exports = router